/* Copyright S.V.G, 2019 */

if('function' == typeof Window && window instanceof Window)
/**
 * Creates a canvas element with simple landscape animation inside
 * @param {HTMLElement} target where to put the canvas 
 * @param {number|string} width 
 * @param {number|string} height
 * @param {Function} onresize in case if you need to resize the canvas when window is resized
 * @returns {HTMLCanvasElement} the canvas element with landscape animation
 * @example
 * sl(target, width, height, (canvas, event) => {
 *   canvas.width = width;
 *   canvas.height = height;
 * });
 */
window.sl = function (target, width, height, onresize) {
    'use strict';
    
    /**
     * Browser compatibility check
     */
    if (!(
        'function' == typeof HTMLCanvasElement &&
        'function' == typeof CanvasRenderingContext2D &&
        'function' == typeof CanvasRenderingContext2D.prototype.beginPath &&
        'function' == typeof CanvasRenderingContext2D.prototype.bezierCurveTo &&
        'function' == typeof CanvasRenderingContext2D.prototype.clearRect &&
        'function' == typeof CanvasRenderingContext2D.prototype.closePath &&
        'function' == typeof CanvasRenderingContext2D.prototype.createLinearGradient &&
        'function' == typeof CanvasRenderingContext2D.prototype.ellipse &&
        'function' == typeof CanvasRenderingContext2D.prototype.fill &&
        'function' == typeof CanvasRenderingContext2D.prototype.fillRect &&
        'function' == typeof CanvasRenderingContext2D.prototype.lineTo &&
        'function' == typeof CanvasRenderingContext2D.prototype.moveTo
    )) {
        if ('object' == typeof console && 'function' == typeof console.error)
            console.error('Current browser does not support required HTML5 Canvas features.');
        return;
    }
    
    /**
     * Landscape objects
     */
    var e = {
        /**
         * Sky (background)
         */
        a: function () {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        },
        /**
         * Sun
         */
        b: function (x, y, s) {
            this.b = false;
            this.c = 100;
            this.x = x;
            this.y = y;
            this.s = s
        },
        /**
         * Cloud
         */
        c: function (x, y, w, h) {
            this.b = [];
            this.e = false;
            this.f = false;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            for (var i = 0; i < Math.floor(Math.random() * 5) + 5; i++)
                this.b[this.b.length] = {
                    x: Math.random() * (x * 0.8),
                    y: Math.random() * (y * 0.8),
                    s: Math.random() * (y / 1.25)
                };
        },
        /**
         * Grass (touch it if you can)
         */
        d: function (y, h) {
            this.y = y;
            this.h = h;
        },
        /**
         * Dandelion
         */
        e: function (a, x, y) {
            this.b = a;
            this.c = (Math.random() * 15) + 25;
            this.e = 1;
            this.f = false;
            this.g = 1000 + Math.round(Math.random() * 1000);
            this.x = x;
            this.y = y;
        },
        /**
         * Flock
         */
        f: function (x, y) {
            this.r = 0;
            this.x = x;
            this.y = y;
        }
    },

    /**
     * Enviroment related
     */
    f = {
        a: document.createElement('canvas'),
        b: undefined, // for canvas drawing context
        /**
         * Next frame redraw
         */
        c: function () {
            f.b.clearRect(0, 0, f.a.width, f.a.height);
            for (var i in g) 
                g[i].a(); 
        },
        /**
         * Landscape initialization
         */
        d: function () {
            g[g.length] = new e.a();
            g[g.length] = new e.b(15, 5, 12);
            for (var i = 0; i < Math.floor(Math.random() * 5) + 3; i++)
                g[g.length] = new e.c(Math.random() * 100, Math.random() * 40, (f.a.width * 80) / 100, (f.a.height * 60) / 100);
            g[g.length] = new e.d((f.a.height * 50) / 100, (f.a.height * 50) / 100);
            for (var i = 0; i < Math.floor(Math.random() * 5) + 5; i++)
                g[g.length] = new e.e(Math.floor(Math.random() * 5) + 5, Math.random() * 100, Math.random() * 100);
        }, 
        e: 'function' == typeof onresize ? onresize : undefined,
        /**
         * Timeline function
         */
        f: function () {
            for (var i in g)
                if ('function' == typeof g[i].d)
                    g[i].d();
                f.c();
        },
        /**
         * Canvas size setter function
         * @param {number|string} width 
         * @param {number|string} height
         */
        g: function (a, b) {
            f.a.width = NaN == parseInt(a) ? 0 : parseInt(a);
            f.a.height = NaN == parseInt(b) ? 0 : parseInt(b);
        },
        /**
         * OnResize event handler
         * @param {Event} event
         */
        h: function (a) {
            if ('function' == typeof f.e) {
                f.e(f.a, a);
                f.c();
            }
        }
    },

    /**
     * Instance memory
     */
    g = [];
    
    /**
     * Landscape objects methods
     */

    /**
     * Landscape object redraw
     */
    e.a.prototype.a = function () {
        this.w = f.a.width;
        this.h = f.a.height;
        var a = f.b.createLinearGradient(this.x, this.y, 0, this.h);
        a.addColorStop(0, 'rgb(113,172,196)');
        a.addColorStop(1, 'rgb(150,221,247)');
        f.b.fillStyle = a;
        f.b.fillRect(0, 0, f.a.width, f.a.height);
        f.b.fillStyle = 'transparent';
    };
    /**
     * Landscape object redraw
     */
    e.b.prototype.a = function () {
        f.b.fillStyle = f.b.shadowColor = 'rgb(255,255,100)';
        f.b.shadowBlur = this.c;
        f.b.beginPath();
        f.b.ellipse((this.x * f.a.width) / 100, (this.x * f.a.height) / 100, (this.s * f.a.width) / 250, (this.s * f.a.width) / 250, 0, 0, Math.PI * 2);
        f.b.fill();
        f.b.closePath();
        f.b.fillStyle = f.b.shadowColor = 'transparent';
        f.b.shadowBlur = 0;
    };
    /**
     * Landscape object animation
     */
    e.b.prototype.d = function () {
        if (this.b)
            this.c -= 0.5;
        else
            this.c += 0.5;
        if (this.c >= 200)
            this.b = true;
        else if (this.c <= 100) 
            this.b = false; 
    };
    /**
     * Landscape object redraw
     */
    e.c.prototype.a = function () {
        f.b.fillStyle = 'rgb(255,255,255)';
        for (var i in this.b) {
            f.b.beginPath();
            f.b.ellipse(((this.x * f.a.width) / 100) + this.b[i].x, ((this.y * f.a.height) / 100) + this.b[i].y, this.b[i].s, this.b[i].s, 0, 0, Math.PI * 2);
            f.b.fill();
            f.b.closePath();
        }
        f.b.fillStyle = 'transparent';
    };
    /**
     * Landscape object animation
     */
    e.c.prototype.d = function () {
        if (this.x < 110)
            this.x += 0.005;
        else
            this.e = true;
        if (this.e && !this.f) {
            g[g.length] = new e.c(-10, Math.random() * 40, (f.a.width * 80) / 100, (f.a.height * 60) / 100);
            this.f = true;
        }
    };
    /**
     * Landscape object redraw
     */
    e.d.prototype.a = function () {
        f.b.fillStyle = 'rgb(0,180,0)';
        f.b.beginPath();
        f.b.moveTo(0, (this.y * f.a.height) / 100);
        f.b.bezierCurveTo((f.a.width * 15) / 100, (this.y * f.a.height) / 100, (f.a.width * 45) / 100, (this.y * f.a.height) / 100, (f.a.width * 30) / 100, (this.y * f.a.height) / 100);
        f.b.bezierCurveTo((f.a.width * 55) / 100, (this.y * f.a.height) / 100 + ((this.y * 10) / 100), (f.a.width * 85) / 100, (this.y * f.a.height) / 100 + ((this.y * 10) / 100), (f.a.width * 70) / 100, (this.y * f.a.height) / 100 + ((this.y * 10) / 100));
        f.b.lineTo(f.a.width, (this.y * f.a.height) / 100 + ((this.y * 10) / 100));
        f.b.lineTo(f.a.width, (this.y * f.a.height) / 100 + (this.h * f.a.height) / 100);
        f.b.lineTo(0, (this.y * f.a.height) / 100 + (this.h * f.a.height) / 100);
        f.b.fill();
        f.b.closePath();
        f.b.fillStyle = 'rgba(0,220,0,.5)';
        f.b.beginPath();
        f.b.moveTo(0, (this.y * f.a.height) / 100 + (this.h * 10) / 100);
        f.b.bezierCurveTo((f.a.width * 15) / 100, (this.y * f.a.height) / 100 + (this.h * 10) / 100, (f.a.width * 45) / 100, (this.y * f.a.height) / 100 + (this.h * 10) / 100, (f.a.width * 30) / 100, (this.y * f.a.height) / 100 + (this.h * 10) / 100);
        f.b.bezierCurveTo((f.a.width * 55) / 100, (this.y * f.a.height) / 100 + ((this.y * 20) / 100), (f.a.width * 85) / 100, (this.y * f.a.height) / 100 + ((this.y * 20) / 100), (f.a.width * 70) / 100, (this.y * f.a.height) / 100 + ((this.y * 20) / 100));
        f.b.lineTo(f.a.width, (this.y * f.a.height) / 100 + ((this.y * 20) / 100));
        f.b.lineTo(f.a.width, (this.y * f.a.height) / 100 + (this.h * f.a.height) / 100);
        f.b.lineTo(0, (this.y * f.a.height) / 100 + (this.h * f.a.height) / 100);
        f.b.fill();
        f.b.closePath();
        f.b.fillStyle = 'transparent';
    };
    /**
     * Landscape object redraw
     */
    e.e.prototype.a = function () {
        f.b.fillStyle = 'rgb(14,124,4)';
        f.b.fillRect((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100), (f.a.width * 0.2) / 100, this.c);
        if (this.b) {
            f.b.fillStyle = 'rgb(255,255,255)';
            f.b.beginPath();
            f.b.ellipse(((this.x * f.a.width) / 100) + (this.e * 2), this.y + ((f.a.height * 75) / 100) - this.e, f.a.width / 100 * this.e, f.a.width / 100 * this.e, 0, 0, Math.PI * 2);
            f.b.fill();
            f.b.closePath();
        }
        f.b.fillStyle = 'transparent';
    };
    /**
     * Landscape object animation
     */
    e.e.prototype.d = function () {
        if (this.b) {
            if (this.f)
                this.e -= 0.0005;
            else
                this.e += 0.0005;
            if (this.e >= 1.2)
                this.f = true;
            else if (this.e <= 1)
                this.f = false;
            if (!this.g && this.b > 0) { 
                g[g.length] = new e.f(this.x, this.y);
                this.b--;
                this.g = 1000 + Math.round(Math.random() * 1000);
            }
            else this.g--;
        }
    };
    /**
     * Landscape object redraw
     */
    e.f.prototype.a = function () {
        f.b.fillStyle = 'rgb(255,255,255)';
        f.b.beginPath();
        if (this.r >= 0 && this.r <= Math.PI / 2) {
            f.b.moveTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) + ((f.a.width / 100) * Math.sin(this.r)), (this.y + ((f.a.height * 75) / 100)) + ((f.a.width / 100) * Math.sin(this.r)) - (f.a.width / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) + 0.7, (this.y + ((f.a.height * 75) / 100)) - 1.4 + ((1.4 * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) + (f.a.width / 100), (this.y + ((f.a.height * 75) / 100)) - (f.a.width / 100) + (((f.a.width / 100) * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) + 1.4, (this.y + ((f.a.height * 75) / 100)) - 0.7 + ((0.7 * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) + (f.a.width / 100) - ((f.a.width / 100) * Math.sin(this.r)), (this.y + ((f.a.height * 75) / 100)) + ((f.a.width / 100) * Math.sin(this.r)));
            f.b.lineTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
        }
        else if (this.r >= Math.PI / 2 && this.r <= Math.PI) {
            f.b.moveTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) + (f.a.width / 100) + ((f.a.width / 100) * Math.cos(this.r)), (this.y + ((f.a.height * 75) / 100)) - ((f.a.width / 100) * Math.cos(this.r)));
            f.b.lineTo(((this.x * f.a.width) / 100) + 0.7 + ((0.7 * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) + 1.4 - ((1.4 * Math.cos(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) + (f.a.width / 100) + (((f.a.width / 100) * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) + (f.a.width / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) + 1.4 + ((1.4 * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) + 0.7 - (1.4 * Math.cos(this.r)));
            f.b.lineTo(((this.x * f.a.width) / 100) + ((f.a.width / 100) * Math.cos(this.r)), (this.y + ((f.a.height * 75) / 100)) + (f.a.width / 100) + ((f.a.width / 100) * Math.cos(this.r)));
            f.b.lineTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
        }
        else if (this.r >= Math.PI && this.r <= Math.PI * 1.5) {
            f.b.moveTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) + ((f.a.width / 100) * Math.sin(this.r)), (this.y + ((f.a.height * 75) / 100)) + (f.a.width / 100) + ((f.a.width / 100) * Math.sin(this.r)));
            f.b.lineTo(((this.x * f.a.width) / 100) - 0.7 + ((0.7 * Math.sin(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) + 1.4 + ((1.4 * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) - (f.a.width / 100), (this.y + ((f.a.height * 75) / 100)) + (f.a.width / 100) + (((f.a.width / 100) * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) - 1.4 + ((0.7 * Math.sin(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) + 0.7 + ((0.7 * Math.sin(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) - (f.a.width / 100) - ((f.a.width / 100) * Math.sin(this.r)), (this.y + ((f.a.height * 75) / 100)) + ((f.a.width / 100) * Math.sin(this.r)));
            f.b.lineTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
        }
        else if (this.r >= Math.PI * 1.5 && this.r <= Math.PI * 2) {
            f.b.moveTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) - (f.a.width / 100) + ((f.a.width / 100) * Math.cos(this.r)), (this.y + ((f.a.height * 75) / 100)) - ((f.a.width / 100) * Math.cos(this.r)));
            f.b.lineTo(((this.x * f.a.width) / 100) - 0.7 + ((0.7 * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) - 1.4 - ((1.4 * Math.cos(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) - (f.a.width / 100) + (((f.a.width / 100) * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) - (f.a.width / 100));
            f.b.lineTo(((this.x * f.a.width) / 100) - 1.4 + ((1.4 * Math.cos(this.r)) * 2), (this.y + ((f.a.height * 75) / 100)) - 0.7 - ((0.7 * Math.cos(this.r)) * 2));
            f.b.lineTo(((this.x * f.a.width) / 100) + ((f.a.width / 100) * Math.cos(this.r)), (this.y + ((f.a.height * 75) / 100)) - (f.a.width / 100) + ((f.a.width / 100) * Math.cos(this.r)));
            f.b.lineTo((this.x * f.a.width) / 100, this.y + ((f.a.height * 75) / 100));
        }
        f.b.fill();
        f.b.closePath();
        f.b.fillStyle = 'transparent';
    };
    /**
     * Landscape object animation
     */
    e.f.prototype.d = function () {
        if (this.x < 105) {
            this.x += 0.005;
            this.y -= 0.02;
            if (this.r >= Math.PI * 2)
                this.r = 0;
            else
                this.r += 0.01;
        }
    };
    
    /**
     * Initialization
     */
    addEventListener('resize', f.h);
    f.b = f.a.getContext('2d');
    f.d();
    f.g(width, height);
    setInterval(f.f, 1);
    return target instanceof HTMLElement ? target.appendChild(f.a) : f.a;
};