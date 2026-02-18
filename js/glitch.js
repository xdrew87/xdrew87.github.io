<<<<<<< HEAD
class GlitchEffect {
    constructor() {
        this.elements = [];
        this.isActive = false;
        this.intervals = new Map();
        
        // Glitch configuration
        this.config = {
            duration: 300,
            interval: 4000,
            intensity: 3,
            colors: ['#ff0080', '#0080ff', '#ffff00']
        };
    }

    init() {
        this.findGlitchElements();
        this.setupGlitchEffects();
        this.start();
    }

    findGlitchElements() {
        this.elements = document.querySelectorAll('.glitch');
    }

    setupGlitchEffects() {
        this.elements.forEach((element, index) => {
            // Ensure data-text attribute exists
            if (!element.getAttribute('data-text')) {
                element.setAttribute('data-text', element.textContent);
            }

            // Add unique identifier
            element.setAttribute('data-glitch-id', index);
            
            // Create glitch layers if they don't exist
            this.createGlitchLayers(element);
        });
    }

    createGlitchLayers(element) {
        // Check if layers already exist
        if (element.querySelector('.glitch-layer')) return;

        const text = element.getAttribute('data-text');
        
        // Create multiple glitch layers for more complex effect
        for (let i = 0; i < 2; i++) {
            const layer = document.createElement('span');
            layer.className = `glitch-layer glitch-layer-${i + 1}`;
            layer.textContent = text;
            layer.setAttribute('aria-hidden', 'true');
            element.appendChild(layer);
        }
    }

    triggerGlitch(element) {
        if (!element) return;

        element.classList.add('glitch-active');
        
        // Add random additional effects
        if (Math.random() > 0.7) {
            element.classList.add('glitch-intense');
        }

        setTimeout(() => {
            element.classList.remove('glitch-active', 'glitch-intense');
        }, this.config.duration);
    }

    triggerRandomGlitch() {
        if (this.elements.length === 0) return;

        const randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];
        this.triggerGlitch(randomElement);
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        // Set up intervals for each element
        this.elements.forEach((element, index) => {
            const interval = setInterval(() => {
                this.triggerGlitch(element);
            }, this.config.interval + (index * 500)); // Stagger the glitches
            
            this.intervals.set(element, interval);
        });

        // Random additional glitches
        this.randomInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                this.triggerRandomGlitch();
            }
        }, 2000);
    }

    stop() {
        this.isActive = false;
        
        // Clear all intervals
        this.intervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.intervals.clear();
        
        if (this.randomInterval) {
            clearInterval(this.randomInterval);
        }

        // Remove active classes
        this.elements.forEach(element => {
            element.classList.remove('glitch-active', 'glitch-intense');
        });
    }

    // Manual trigger for specific element
    trigger(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.triggerGlitch(element);
        }
    }

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (this.isActive) {
            this.stop();
            this.start();
        }
    }

    // Add new glitch element dynamically
    addElement(element) {
        if (!element.classList.contains('glitch')) {
            element.classList.add('glitch');
        }

        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }

        this.elements.push(element);
        this.createGlitchLayers(element);

        if (this.isActive) {
            const interval = setInterval(() => {
                this.triggerGlitch(element);
            }, this.config.interval);
            
            this.intervals.set(element, interval);
        }
    }

    // Screen-wide glitch effect
    triggerScreenGlitch() {
        const body = document.body;
        body.classList.add('screen-glitch');
        
        setTimeout(() => {
            body.classList.remove('screen-glitch');
        }, 200);
    }
}

// Export for use
window.GlitchEffect = GlitchEffect;
=======
class GlitchEffect {
    constructor() {
        this.elements = [];
        this.isActive = false;
        this.intervals = new Map();
        
        // Glitch configuration
        this.config = {
            duration: 300,
            interval: 4000,
            intensity: 3,
            colors: ['#ff0080', '#0080ff', '#ffff00']
        };
    }

    init() {
        this.findGlitchElements();
        this.setupGlitchEffects();
        this.start();
    }

    findGlitchElements() {
        this.elements = document.querySelectorAll('.glitch');
    }

    setupGlitchEffects() {
        this.elements.forEach((element, index) => {
            // Ensure data-text attribute exists
            if (!element.getAttribute('data-text')) {
                element.setAttribute('data-text', element.textContent);
            }

            // Add unique identifier
            element.setAttribute('data-glitch-id', index);
            
            // Create glitch layers if they don't exist
            this.createGlitchLayers(element);
        });
    }

    createGlitchLayers(element) {
        // Check if layers already exist
        if (element.querySelector('.glitch-layer')) return;

        const text = element.getAttribute('data-text');
        
        // Create multiple glitch layers for more complex effect
        for (let i = 0; i < 2; i++) {
            const layer = document.createElement('span');
            layer.className = `glitch-layer glitch-layer-${i + 1}`;
            layer.textContent = text;
            layer.setAttribute('aria-hidden', 'true');
            element.appendChild(layer);
        }
    }

    triggerGlitch(element) {
        if (!element) return;

        element.classList.add('glitch-active');
        
        // Add random additional effects
        if (Math.random() > 0.7) {
            element.classList.add('glitch-intense');
        }

        setTimeout(() => {
            element.classList.remove('glitch-active', 'glitch-intense');
        }, this.config.duration);
    }

    triggerRandomGlitch() {
        if (this.elements.length === 0) return;

        const randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];
        this.triggerGlitch(randomElement);
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        // Set up intervals for each element
        this.elements.forEach((element, index) => {
            const interval = setInterval(() => {
                this.triggerGlitch(element);
            }, this.config.interval + (index * 500)); // Stagger the glitches
            
            this.intervals.set(element, interval);
        });

        // Random additional glitches
        this.randomInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                this.triggerRandomGlitch();
            }
        }, 2000);
    }

    stop() {
        this.isActive = false;
        
        // Clear all intervals
        this.intervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.intervals.clear();
        
        if (this.randomInterval) {
            clearInterval(this.randomInterval);
        }

        // Remove active classes
        this.elements.forEach(element => {
            element.classList.remove('glitch-active', 'glitch-intense');
        });
    }

    // Manual trigger for specific element
    trigger(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.triggerGlitch(element);
        }
    }

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (this.isActive) {
            this.stop();
            this.start();
        }
    }

    // Add new glitch element dynamically
    addElement(element) {
        if (!element.classList.contains('glitch')) {
            element.classList.add('glitch');
        }

        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }

        this.elements.push(element);
        this.createGlitchLayers(element);

        if (this.isActive) {
            const interval = setInterval(() => {
                this.triggerGlitch(element);
            }, this.config.interval);
            
            this.intervals.set(element, interval);
        }
    }

    // Screen-wide glitch effect
    triggerScreenGlitch() {
        const body = document.body;
        body.classList.add('screen-glitch');
        
        setTimeout(() => {
            body.classList.remove('screen-glitch');
        }, 200);
    }
}

// Export for use
window.GlitchEffect = GlitchEffect;
>>>>>>> 83efebb0887671e4e7a11817ff15ad4e2abd1572
