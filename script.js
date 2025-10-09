document.addEventListener('DOMContentLoaded', () => {
    // Animation pour redresser les images lorsque la souris passe dessus
    // Utiliser un code plus simple et plus direct
    const actionImages = document.querySelectorAll('.action-image');
    
    actionImages.forEach(image => {
        const img = image.querySelector('img');
        
        image.addEventListener('mouseenter', () => {
            console.log('Mouse enter on image');
            // Redresser l'image avec un effet d'élévation
            image.classList.add('hovered');
        });
        
        image.addEventListener('mouseleave', () => {
            console.log('Mouse leave from image');
            // Remettre l'image dans sa position initiale
            image.classList.remove('hovered');
        });
    });

    // Cartes de fonctionnalités maintenant statiques - aucune animation

    
    // Cartes de fonctionnalités statiques - pas d'effet parallax
    
    // Animations 3D supprimées des images

    // Gestion du clic sur le bouton de lecture vidéo - Version simplifiée
    const playButton = document.getElementById('play-button');
    const videoPreview = document.getElementById('video-preview');
    const videoEmbed = document.getElementById('video-embed');
    
    if (playButton && videoPreview && videoEmbed) {
        playButton.addEventListener('click', function() {
            // 1. Cacher la prévisualisation
            videoPreview.style.display = 'none';
            
            // 2. Afficher le conteneur de la vidéo
            videoEmbed.style.display = 'block';
            
            // 3. Insérer l'iframe YouTube
            videoEmbed.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="border: none; outline: none;"
                ></iframe>
            `;
        });
    }

    // Smooth scroll pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Ajuster la position pour tenir compte du header fixe
                setTimeout(() => {
                    window.scrollBy(0, -80);
                }, 100);
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    // Détecter si nous sommes sur la page ambassadeur
    const isAmbassadorPage = window.location.pathname.includes('ambassadeur');
    
    // Si nous sommes sur la page ambassadeur, appliquer directement le style bleu
    if (isAmbassadorPage) {
        header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.9) 0%, rgba(26, 60, 141, 0.8) 100%)';
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (isAmbassadorPage) {
                // Sur la page ambassadeur, maintenir le fond bleu mais ajouter une ombre
                header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.95) 0%, rgba(26, 60, 141, 0.9) 100%)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                // Sur les autres pages, comportement normal
                header.classList.add('sticky');
            }
        } else {
            if (isAmbassadorPage) {
                // Sur la page ambassadeur, maintenir le fond bleu mais enlever l'ombre
                header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.9) 0%, rgba(26, 60, 141, 0.8) 100%)';
                header.style.boxShadow = 'none';
            } else {
                // Sur les autres pages, comportement normal
                header.classList.remove('sticky');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Screenshots slider navigation (for mobile touch)
    const screenshotsSlider = document.querySelector('.screenshots-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (screenshotsSlider) {
        screenshotsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            screenshotsSlider.classList.add('active');
            startX = e.pageX - screenshotsSlider.offsetLeft;
            scrollLeft = screenshotsSlider.scrollLeft;
        });

        screenshotsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            screenshotsSlider.classList.remove('active');
        });

        screenshotsSlider.addEventListener('mouseup', () => {
            isDown = false;
            screenshotsSlider.classList.remove('active');
        });

        screenshotsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshotsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            screenshotsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Cartes de fonctionnalités statiques - pas d'animation au scroll

    // Slider des témoignages
    const testimonialSlider = document.querySelector('.testimonials-slider-inner');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next');
    const testimonialGroups = document.querySelectorAll('.testimonials-group');
    
    let currentSlide = 0;
    const totalSlides = testimonialGroups.length;
    
    // Fonction pour mettre à jour l'affichage du slider
    function updateSlider() {
        // Déplacer le slider à la position actuelle
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points de navigation
        testimonialDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Gestionnaire pour le bouton précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Gestionnaire pour le bouton suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Gestionnaire pour les points de navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Initialiser le slider
    updateSlider();

});

// CSS pour navigation mobile uniquement
document.head.insertAdjacentHTML('beforeend', `
<style>
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        padding: 20px;
        z-index: 1000;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 7px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    header.sticky {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        padding: 5px 0;
    }
    
    .screenshots-slider.active {
        cursor: grabbing;
    }
</style>
`);

    // Gestion des boutons "En savoir plus" avec animation de scroll
    const expandButtons = document.querySelectorAll('.expand-details');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detailsPanel = this.nextElementSibling;
            const actionCard = this.closest('.action-card');
            
            // Toggle du panneau de détails
            const isExpanded = detailsPanel.classList.contains('active');
            
            // Fermer tous les autres panneaux
            document.querySelectorAll('.details-panel.active').forEach(panel => {
                if (panel !== detailsPanel) {
                    panel.classList.remove('active');
                    panel.style.maxHeight = '0';
                }
            });
            
            // Toggle du panneau actuel
            if (isExpanded) {
                detailsPanel.classList.remove('active');
                detailsPanel.style.maxHeight = '0';
            } else {
                detailsPanel.classList.add('active');
                detailsPanel.style.maxHeight = detailsPanel.scrollHeight + 'px';
                
                // Animation de scroll fluide vers le panneau ouvert
                setTimeout(() => {
                    detailsPanel.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest'
                    });
                }, 100); // Petit délai pour que l'animation d'ouverture commence
                
                // Animation en cascade des éléments de la liste
                const listItems = detailsPanel.querySelectorAll('.key-points li');
                listItems.forEach((item, index) => {
                    item.style.setProperty('--item-index', index);
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-10px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 200 + (index * 100)); // Délai progressif
                });
            }
            
            // Animation du chevron
            const chevron = this.querySelector('i');
            if (chevron) {
                chevron.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
                chevron.style.transition = 'transform 0.3s ease';
            }
        });
    });
