(function App() {
    this.canvas = document.getElementById('main');
    var ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.settings = {
        FPS: 60,
        hdpi: ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3))
    }

    var GestureDetector = function () {
        this.mouse = {
            x: 0,
            y: 0,
            speed: {
                x: 0,
                y: 0
            },
            pressed: false,
            onPress: false,
            onRelease: false

        };
        this.mouse_prevoius = {
            x: 0,
            y: 0,
            speed: {
                x: 0,
                y: 0
            }
        };

        this.touchEvent = function (touch, type) {

        };
        this.mouseEvent = function (x, y, type) {
            this.mouse.x = x;
            this.mouse.y = y;
            if (type == 0) {
                this.mouse.onPress = true;
                this.mouse.pressed = true;
            }
            else if (type == 2) {
                this.mouse.onRelease = true;
                this.mouse.pressed = false;
            }
        };
        this.keyEvent = function (code, down) {

        };

        this.loop = function (event) {
            //update speed based on previous mouse
            this.mouse.speed.x = this.mouse.x - this.mouse_prevoius.x;
            this.mouse.speed.y = this.mouse.y - this.mouse_prevoius.y;

            //update previous mouse for next loop
            this.mouse_prevoius.x = this.mouse.x + 0;
            this.mouse_prevoius.y = this.mouse.y + 0;
            this.mouse_prevoius.speed.x = this.mouse.speed.x + 0;
            this.mouse_prevoius.speed.y = this.mouse.speed.y + 0;

            this.mouse.onRelease = false;
            this.mouse.onPress = false;
        }
    };

    this.initialize = function () {
        if (this.settings.hdpi) {
            canvas.width = this.width * 2;
            canvas.height = this.height * 2;
            canvas.style.width = this.width + "px";
            canvas.style.height = this.height + "px";
            ctx.scale(2, 2);
        }
        this.gestureDetector = new GestureDetector();
        this.mouse = this.gestureDetector.mouse;

        document.addEventListener('mousedown', function (evt) {
            var rect = this.canvas.getBoundingClientRect();
            this.gestureDetector.mouseEvent(evt.clientX - rect.left, evt.clientY - rect.top, 0);
        }.bind(this));
        document.addEventListener('mousemove', function (evt) {
            var rect = this.canvas.getBoundingClientRect();
            this.gestureDetector.mouseEvent(evt.clientX - rect.left, evt.clientY - rect.top, 1);
        }.bind(this));
        document.addEventListener('mouseup', function (evt) {
            var rect = this.canvas.getBoundingClientRect();
            this.gestureDetector.mouseEvent(evt.clientX - rect.left, evt.clientY - rect.top, 2);
        }.bind(this));

        this.tree = new Tree();
    }

    var Tree = function () {
        var settings = {
            width: 240,
            height: 160,
            multipliers: {
                offset: 0.5,
                height: 0.9,
                width: 0.75
            }
        };
        this.peices = 4;
        this.x = app.width / 2;
        this.y = app.height - 30;

        var spline = [];
        var h = settings.height;
        var w = settings.width;
        var o = 0;
        for (var i = 0; i < this.peices; i++) {
            spline.push({
                height: h,
                width: w,
                offset: o,
                length: settings.multipliers.offset * h
            });

            o -= settings.multipliers.offset * h;
            h *= settings.multipliers.height;
            w *= settings.multipliers.width;
        };
        var grab = {
            x: 0,
            y: 0
        };

        this.grabbing = false;
        this.loop = function () {
            //Collision detection
            var oneColliding = false;
            for (var i = 0; i < spline.length; i++) {
                spline[i].a = {
                    x: this.x - spline[i].width / 2,
                    y: this.y + spline[i].offset
                };
                spline[i].b = {
                    x: this.x,
                    y: this.y - spline[i].height + spline[i].offset
                };
                spline[i].c = {
                    x: this.x + spline[i].width / 2,
                    y: this.y + spline[i].offset
                };
                spline[i].d = {
                    x: this.x,
                    y: this.y + spline[i].offset
                };
                spline[i].colliding = pointInTriangle(app.mouse, spline[i].a, spline[i].b, spline[i].c);
                if (spline[i].colliding) oneColliding = true;
            }
            if (app.mouse.onPress && oneColliding) {
                grab = {
                    x: app.mouse.x,
                    y: app.mouse.y
                }
                this.grabbing = app.mouse.pressed;
            }
            if (this.grabbing) this.grabbing = app.mouse.pressed;

            //Draw tree
            for (var i = 0; i < spline.length; i++) {
                ctx.beginPath();
                ctx.triangle(spline[i].a.x, spline[i].a.y, spline[i].b.x, spline[i].b.y, spline[i].c.x, spline[i].c.y);
                ctx.closePath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.stroke();

                if (spline[i].colliding) {
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.12)';
                    ctx.fill();
                }
                if (this.grabbing) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
                    ctx.fill();
                }

                var d = {
                    x: this.x,
                    y: this.y + spline[i].offset
                };
                var e = {
                    x: this.x,
                    y: this.y + spline[i].offset - spline[i].length
                };
                ctx.beginPath();
                ctx.rect(this.x - 3, this.y + spline[i].offset - spline[i].length, 6, spline[i].length);
                ctx.closePath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.54)';
                ctx.stroke();

                ctx.fillStyle = 'rgba(255, 255, 255, 0.54)';
                ctx.fillText(i + 1, spline[i].a.x, spline[i].a.y);
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.54)';
            ctx.beginPath();
            ctx.arc(grab.x, grab.y, 4, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }

        function pointInTriangle(pt, v1, v2, v3) {
            var b1, b2, b3;
            function sign(p1, p2, p3) {
                return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
            }
            b1 = sign(pt, v1, v2) < 0.0;
            b2 = sign(pt, v2, v3) < 0.0;
            b3 = sign(pt, v3, v1) < 0.0;

            return ((b1 == b2) && (b2 == b3));
        }
    }

    this.loops = 0;
    this.loop = function () {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.stroke();

        this.tree.loop();

        this.gestureDetector.loop();
        this.loops++;
    };

    var Vector = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;

        this.add = function (v) {
            if (typeof v == 'Vector') {
                this.x += v.x;
                this.y += v.y;
            } else if (typeof v === 'number') {
                this.x += v;
                this.y += v;
            }
            return this;
        }
        this.subtract = function (v) {
            if (typeof v == 'Vector') {
                this.x -= v.x;
                this.y -= v.y;
            } else if (typeof v === 'number') {
                this.x -= v;
                this.y -= v;
            }
            return this;
        }
        this.multiply = function (v) {
            if (typeof v == 'Vector') {
                this.x *= v.x;
                this.y *= v.y;
            } else if (typeof v === 'number') {
                this.x *= v;
                this.y *= v;
            }
            return this;
        }
        this.divide = function (v) {
            if (typeof v == 'Vector') {
                this.x /= v.x;
                this.y /= v.y;
            } else if (typeof v === 'number') {
                this.x /= v;
                this.y /= v;
            }
            return this;
        }
        this.normalize = function () {
            return this.divide(this.magnitude());
        }

        this.added = function () {
            return this.copy().add();
        }
        this.subtracted = function () {
            return this.copy().subtract();
        }
        this.multiplied = function () {
            return this.copy().multiply();
        }
        this.divided = function () {
            return this.copy().divide();
        }
        this.normalized = function () {
            return this.copy().normalize();
        }
        this.copy = function () {
            return new Vector(this.x, this.y);
        }

        this.magnitude = function () {
            return Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
        }
    }

    var Line = function(v1, v2) {
        this.v1 = v1 || { x: 0, y: 0 };
        this.v2 = v2 || { x: 0, y: 0 };

        this.delta = function() {
            return {
                x: v2.x - v1.x,
                y: v2.y - v1.y
            }
        }
        this.length = function() {
            return Math.sqrt(Math.pow(this.delta().x, 2) + Math.pow(this.delta().y, 2));
        }

        this.slope = function() {
            if (this.delta().x !== 0) {
                return this.delta().y / this.delta().x;
            } else return Number.NaN;
        }

        this.offset = function() {
            if (this.slope() !== Number.NaN) {
                return v1.y - this.slope() * v1.x;
            } else return 0;
        }

        this.A = function() {
            return this.delta().y;
        }

        this.B = function() {
            return -this.delta().x;
        }

        this.C = function() {
            return v2.x * v1.y - v2.y * v1.x;
        }

        this.distanceTo = function(o) {
            if (typeof o == 'Vector') {
                return Math.abs(this.A() * o.x + this.B() * o.y + this.C()) / this.length();
            } else if (typeof o == 'Line') {
                throw Error('Function distanceTo not implemented for type "Line".');
            } else {
                throw Error('Parameter type must be one of the compatible types.');
            }
        }
    }

    ctx.triangle = function (p1x, p1y, p2x, p2y, p3x, p3y, bend) {
        if (!bend) {
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.lineTo(p3x, p3y);
        }
        else {
            ctx.moveTo(p1x, p1y);
            var dx = p3x - p1x;
            var dy = p3y - p1y;
            var magnitude = Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
            var d = Math.abs((dy * p2x) - (dx * p2y) + p3x * p1y - p3y * p1x) / magnitude;
            var n = {
                x: dy / magnitude,
                y: -dx / magnitude
            };
            var p2 = {
                x: (d * n.x) + ((p1x + p3x) / 2),
                y: (d * n.y) + ((p1y + p3y) / 2)
            };
            var q1 = {
                x: (p2.x + p1x) / 2,
                y: (p2.y + p1y) / 2
            };
            var q2 = {
                x: (p2.x + p3x) / 2,
                y: (p2.y + p3y) / 2
            };

            ctx.bezierCurveTo(q1.x, q1.y, q1.x, q1.y, p2x, p2y);
            ctx.bezierCurveTo(q2.x, q2.y, q2.x, q2.y, p3x, p3y);
        }
    }

    ctx.fillTriangle = function (p1x, p1y, p2x, p2y, p3x, p3y, bend) {
        ctx.beginPath();
        ctx.triangle(p1x, p1y, p2x, p2y, p3x, p3y, bend);
        ctx.closePath();
        ctx.fill();
    }

    var app = this;

    this.initialize();

    setInterval(function () {
        this.loop();
    }.bind(this), 1000 / this.settings.FPS);

})();