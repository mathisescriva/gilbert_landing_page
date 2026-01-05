// API Demo Streaming Animation
document.addEventListener('DOMContentLoaded', function() {
    const streamingContainer = document.getElementById('streamingText');
    if (!streamingContainer) return;
    
    // Store original words with their classes
    const words = Array.from(streamingContainer.children);
    const wordsData = words.map(w => ({
        text: w.textContent,
        classes: w.className
    }));
    
    // Clear container
    streamingContainer.innerHTML = '';
    
    // Stream words one by one with animation
    let index = 0;
    const streamWords = () => {
        if (index < wordsData.length) {
            const wordData = wordsData[index];
            const wordSpan = document.createElement('span');
            wordSpan.className = wordData.classes;
            wordSpan.textContent = wordData.text;
            wordSpan.style.opacity = '0';
            wordSpan.style.animation = 'streamIn 0.3s ease forwards';
            streamingContainer.appendChild(wordSpan);
            
            // Add space after word (except for punctuation)
            if (!wordData.text.match(/^[.,!?;:]$/)) {
                streamingContainer.appendChild(document.createTextNode(' '));
            }
            
            index++;
            setTimeout(streamWords, 70); // Speed of streaming
        }
    };
    
    // Start streaming after a short delay
    setTimeout(streamWords, 300);
});

