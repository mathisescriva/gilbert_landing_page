// API Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching for API documentation
    const docTabs = document.querySelectorAll('.api-doc-tab');
    
    docTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabType = this.getAttribute('data-tab');
            const parentItem = this.closest('.api-doc-item');
            
            if (!parentItem) {
                console.error('Parent item not found');
                return;
            }
            
            // Remove active class from all tabs in this endpoint
            parentItem.querySelectorAll('.api-doc-tab').forEach(t => t.classList.remove('active'));
            // Hide all code blocks in this endpoint
            parentItem.querySelectorAll('.api-doc-code').forEach(c => {
                c.classList.remove('active');
            });
            
            // Activate clicked tab
            this.classList.add('active');
            // Show corresponding content
            const targetCode = parentItem.querySelector(`.api-doc-code[data-content="${tabType}"]`);
            if (targetCode) {
                targetCode.classList.add('active');
            } else {
                console.error('Target code not found for:', tabType, 'in parent:', parentItem);
            }
        });
    });
    
    // Copy to clipboard functionality for code blocks
    const copyButtons = document.querySelectorAll('.api-code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const codeBlock = this.closest('.api-code-block');
            const code = codeBlock.querySelector('.api-code-content code');
            const text = code.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const icon = this.querySelector('i');
                const originalClass = icon.className;
                icon.className = 'fas fa-check';
                this.style.color = '#27c93f';
                
                setTimeout(() => {
                    icon.className = originalClass;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Erreur lors de la copie:', err);
            });
        });
    });
    
    // Hover effect on code blocks
    const codeBlocks = document.querySelectorAll('.api-code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            const copyBtn = this.querySelector('.api-code-copy');
            if (copyBtn) {
                copyBtn.style.opacity = '1';
            }
        });
        
        block.addEventListener('mouseleave', function() {
            const copyBtn = this.querySelector('.api-code-copy');
            if (copyBtn && !copyBtn.querySelector('.fa-check')) {
                copyBtn.style.opacity = '0.5';
            }
        });
    });
});

