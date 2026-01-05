// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.contact-submit');
            const originalText = submitButton.innerHTML;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value || '';
            const phone = document.getElementById('phone').value || '';
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Map subject labels
            const subjectLabels = {
                'demo': 'Demande de démonstration',
                'pricing': 'Question sur les tarifs',
                'technical': 'Question technique',
                'partnership': 'Partenariat',
                'other': 'Autre'
            };
            const subjectLabel = subjectLabels[subject] || 'Autre';
            
            // Create email body
            let emailBody = `Nouveau message de contact - ${subjectLabel}\n\n`;
            emailBody += `Nom: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            if (company) emailBody += `Entreprise: ${company}\n`;
            if (phone) emailBody += `Téléphone: ${phone}\n`;
            emailBody += `\nMessage:\n${message}`;
            
            // Create mailto link
            const mailtoLink = `mailto:contact@lexiapro.fr?subject=${encodeURIComponent('Contact Gilbert - ' + subjectLabel)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            formMessage.textContent = 'Votre client de messagerie va s\'ouvrir. Si ce n\'est pas le cas, veuillez nous envoyer un email à contact@lexiapro.fr';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
});

