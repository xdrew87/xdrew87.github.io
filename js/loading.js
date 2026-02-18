class LoadingScreen {
    constructor() {
        this.loadingElement = null;
        this.progressBar = null;
        this.loadingText = null;
        this.isLoaded = false;
    }

    init() {
        this.loadingElement = document.getElementById('loadingScreen');
        this.progressBar = document.querySelector('.loading-progress');
        this.loadingText = document.querySelector('.loading-text');
        
        if (!this.loadingElement) return;

        this.startLoading();
    }

    startLoading() {
        const messages = [
            'Initializing connections...',
            'Loading cybersecurity protocols...',
            'Establishing secure channels...',
            'Activating matrix defenses...',
            'Connection established!'
        ];

        let messageIndex = 0;
        let progress = 0;

        const updateProgress = () => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;

            this.progressBar.style.width = progress + '%';

            // Update message
            if (progress > messageIndex * 20 && messageIndex < messages.length - 1) {
                messageIndex++;
                this.loadingText.textContent = messages[messageIndex];
            }

            if (progress >= 100) {
                this.loadingText.textContent = messages[messages.length - 1];
                setTimeout(() => this.hideLoading(), 500);
            } else {
                setTimeout(updateProgress, Math.random() * 200 + 100);
            }
        };

        updateProgress();
    }

    hideLoading() {
        if (this.loadingElement && !this.isLoaded) {
            this.isLoaded = true;
            
            // Add hidden class to fade out
            this.loadingElement.classList.add('hidden');
            
            // Trigger page animations
            this.triggerPageAnimations();
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                try {
                    if (this.loadingElement && this.loadingElement.parentNode) {
                        this.loadingElement.parentNode.removeChild(this.loadingElement);
                    }
                } catch (e) {
                    console.log('Loading screen already removed');
                }
            }, 1200);
        }
    }

    triggerPageAnimations() {
        // Trigger fade-in animations
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animationDelay = (index * 0.1) + 's';
                element.classList.add('animate');
            }, index * 100);
        });

        // Trigger card animations
        const cardElements = document.querySelectorAll('.animate-card');
        cardElements.forEach((element, index) => {
            const delay = element.getAttribute('data-delay') || (index * 0.1);
            setTimeout(() => {
                element.classList.add('animate');
            }, parseFloat(delay) * 1000 + 500);
        });
    }

    // Force hide for development
    forceHide() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
    }
}

// Export for use
window.LoadingScreen = LoadingScreen;
