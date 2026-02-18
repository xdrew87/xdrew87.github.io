<<<<<<< HEAD
class MatrixEffect {
    constructor(canvasId = 'matrixCanvas') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = null;
        this.animationId = null;
        this.drops = [];
        this.isRunning = false;
        
        // Matrix configuration
        this.matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.matrixArray = this.matrix.split("");
        this.fontSize = 10;
        this.columns = 0;
        
        // Performance settings
        this.frameRate = 35;
        this.lastTime = 0;
    }

    init() {
        if (!this.canvas) return false;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.setupEventListeners();
        this.start();
        
        return true;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        
        // Reset drops array
        this.drops = [];
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = Math.random() * -100;
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        // Pause/resume on visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    draw(currentTime) {
        if (currentTime - this.lastTime < 1000 / this.frameRate) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
            return;
        }
        
        this.lastTime = currentTime;

        // Black background with transparency for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Matrix text styling
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = this.fontSize + 'px monospace';

        // Draw matrix characters
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const text = this.matrixArray[Math.floor(Math.random() * this.matrixArray.length)];
            
            // Draw character
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop when it reaches bottom or randomly
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = Math.random() * -50;
            }
            
            // Move drop down
            this.drops[i]++;
        }

        if (this.isRunning) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animationId = requestAnimationFrame((time) => this.draw(time));
        }
    }

    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resume() {
        if (!this.isRunning) {
            this.start();
        }
    }

    stop() {
        this.pause();
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Adjust opacity for different pages
    setOpacity(opacity) {
        if (this.canvas) {
            this.canvas.style.opacity = opacity;
        }
    }

    // Change color theme
    setColor(color) {
        this.color = color;
    }
}

// Export for use
window.MatrixEffect = MatrixEffect;
=======
class MatrixEffect {
    constructor(canvasId = 'matrixCanvas') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = null;
        this.animationId = null;
        this.drops = [];
        this.isRunning = false;
        
        // Matrix configuration
        this.matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.matrixArray = this.matrix.split("");
        this.fontSize = 10;
        this.columns = 0;
        
        // Performance settings
        this.frameRate = 35;
        this.lastTime = 0;
    }

    init() {
        if (!this.canvas) return false;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.setupEventListeners();
        this.start();
        
        return true;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        
        // Reset drops array
        this.drops = [];
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = Math.random() * -100;
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        // Pause/resume on visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    draw(currentTime) {
        if (currentTime - this.lastTime < 1000 / this.frameRate) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
            return;
        }
        
        this.lastTime = currentTime;

        // Black background with transparency for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Matrix text styling
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = this.fontSize + 'px monospace';

        // Draw matrix characters
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const text = this.matrixArray[Math.floor(Math.random() * this.matrixArray.length)];
            
            // Draw character
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop when it reaches bottom or randomly
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = Math.random() * -50;
            }
            
            // Move drop down
            this.drops[i]++;
        }

        if (this.isRunning) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animationId = requestAnimationFrame((time) => this.draw(time));
        }
    }

    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resume() {
        if (!this.isRunning) {
            this.start();
        }
    }

    stop() {
        this.pause();
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Adjust opacity for different pages
    setOpacity(opacity) {
        if (this.canvas) {
            this.canvas.style.opacity = opacity;
        }
    }

    // Change color theme
    setColor(color) {
        this.color = color;
    }
}

// Export for use
window.MatrixEffect = MatrixEffect;
>>>>>>> 83efebb0887671e4e7a11817ff15ad4e2abd1572
