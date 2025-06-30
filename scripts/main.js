// Función para cargar secciones dinámicamente
async function loadSections() {
    const sections = [
        'header',
        'about',
        'education-experience',
        'skills',
        'abilities',
        'friends-tools',
        'contact',
        'footer'
    ];
    
    const container = document.getElementById('sections-container');
    
    for (const section of sections) {
        try {
            const response = await fetch(`sections/${section}.html`);
            const html = await response.text();
            container.innerHTML += html;
        } catch (error) {
            console.error(`Error loading section ${section}:`, error);
        }
    }
    
    // Inicializar animaciones después de cargar las secciones
    initAnimations();
}

// Inicializar todas las animaciones
function initAnimations() {
    // Animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        titleObserver.observe(title);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.skill-category, .ability-card, .tool-item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // Animación de las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0';
        skillObserver.observe(bar);
    });
    
    // Form submission
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            messageForm.reset();
        });
    }
}

// Cargar secciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadSections);