(function App() {

    var isMobile = (function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    })();

    this.canvas = document.getElementById('main');
    var ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.settings = {
        FPS: 60,
        hdpi: ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3)),
        snowball: {
            count: 400,
            size: {
                min: 2,
                max: 6
            },
            speed: {
                downwards: {
                    min: 0.1,
                    max: 0.6
                },
                sideways: {
                    min: -0.1,
                    max: 0.1
                }
            },
            acceleration: {
                x: 0,
                y: 0
            },
            jiggle: {
                min: 0,
                mmax: 4
            },
            opacity: {
                min: 0.3,
                max: 0.54
            }
        },
        tree: {
            count: 5,
            stem: {
                height: 10,
                width: 10
            },
            top: {
                min: 3,
                max: 5,
                width: 60,
                height: 40,
                multipliers: {
                    offset: 0.5,
                    height: 0.9,
                    width: 0.75
                }
            }
        },
        ground: {
            horizon: 60,
            base: {
                height: 15
            },
            amount: 10
        },
        background: colors.indigo_700
    };

    var Snowball = function (isParticle) {
        this.x = random.between(0, app.width);
        this.isParticle = isParticle || false;
        this.settings = app.settings.snowball;
        this.y = random.between(0, app.height + this.settings.size.max - app.settings.ground.horizon - app.settings.ground.base.height / 2);
        this.size = random.between(this.settings.size);
        this.landing = random.between(-app.settings.ground.base.height / 2, app.settings.ground.base.height / 2);
        this.drift = {
            downwards: !this.isParticle ? random.between(this.settings.speed.downwards) :
                random.between(this.settings.speed.sideways),
            sideways: random.between(this.settings.speed.sideways)
        };
        this.acceleration = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.opacity = random.between(this.settings.opacity);
        this.jiggle = random.between(this.settings.jiggle);
        this.particles = [];
        this.force = {
            x: 0,
            y: 0
        };

        this.applyForce = function (force) {
            this.force = force;
        }

        this.loops = 0;
        this.loop = function () {
            var strength = 0.07;
            var dt = 1;
            var m = app.gestureDetector.mouse;
            var absoluteProximity = utils.distance(app.gestureDetector.mouse, this);
            var radius = 120;
            var gradient = 0;
            if (absoluteProximity < radius) gradient = (radius - absoluteProximity) / radius;
            if (!this.isParticle) {
                var wind = {
                    x: m.speed.x * strength * gradient,
                    y: m.speed.y * strength * gradient
                };
                this.acceleration = {
                    x: (wind.x - (this.velocity.x * 0.2)) / this.size,
                    y: (wind.y - (this.velocity.y * 0.2)) / this.size
                };
            } else {
                this.acceleration = {
                    x: this.force.x + ((-(this.velocity.x * 0.2)) / this.size),
                    y: this.force.y + ((-(this.velocity.y * 0.2)) / this.size)
                };
                this.force = {
                    x: 0,
                    y: 0
                };
            }

            this.velocity.x += this.acceleration.x * dt;
            this.velocity.y += this.acceleration.y * dt;

            //update position according to speed
            this.x += this.velocity.x * dt;
            this.y += this.velocity.y * dt;
            if (!this.isParticle) {
                this.x += this.drift.sideways;
                this.y += this.drift.downwards;
            }

            //clip position to view bounds (+ padding)
            if (this.x > app.width + this.settings.size.max) this.x = -this.settings.size.max;
            if (this.y > app.height + this.settings.size.max - app.settings.ground.horizon - app.settings.ground.base.height / 2 + this.landing
                || (app.gestureDetector.mouse.pressed && utils.distance(m, this) < this.size * 3)) {
                if (!this.isParticle) {
                    var particleCount = random.between(3, 8);
                    this.particles = [];
                    for (var i = 0; i < particleCount; i++) {
                        var particle = new Snowball(true);
                        particle.x = this.x + 0;
                        particle.y = this.y + 0;
                        particle.size = (this.size / particleCount) * 3;
                        particle.opacity = this.opacity * 0.5;
                        var v = this.drift.downwards + this.velocity.y;
                        particle.applyForce({
                            x: random.between(-v, v),
                            y: random.between(-v, -0.1)
                        });
                        this.particles.push(particle);
                    }
                    this.loops = 0;
                    this.y = -this.settings.size.max;
                    this.x = random.between(0, app.width);
                }
            }
            if (this.x < -this.settings.size.max) this.x = app.width + this.settings.size.max;
            if (this.y < -this.settings.size.max) this.y = app.height + this.settings.size.max;

            var margin = 0.3;
            var maginSide = 0.1;
            var multiplier = 1;
            if (this.y < (app.height * margin)) multiplier *= this.y / (app.height * margin);
            if (this.x < (app.width * maginSide)) multiplier *= this.x / (app.width * maginSide);
            if ((app.width - this.x) < (app.width * maginSide)) multiplier *= (app.width - this.x) / (app.width * maginSide);

            multiplier = Math.min(1, Math.max(0, multiplier));

            if (this.isParticle) multiplier *= Math.max(0, 1 - (this.loops / 120));
            if (!this.isParticle && this.loops > 120) this.particles = [];

            //draw the snowball
            //ctx.fillStyle = 'rgba(255, 255, 255, 0.54)';
            //ctx.fillText(multiplier, this.x, this.y);
            if (this.isParticle) ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.opacity) + ')';
            else ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.opacity * multiplier) + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, (multiplier * (this.size / 2)), 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].loop();
            }

            this.loops++;
        }
    }

    var Tree = function () {
        var searching = true;
        var tries = 0;
        while (searching) {
            this.x = random.between(30, app.width - 30);
            var allGood = true;
            for (var i = 0; i < app.trees.length; i++) {
                if (Math.abs(app.trees[i].x - this.x) >= app.settings.tree.top.width + 20) {
                    allGood = allGood && true;
                } else allGood = false;
            }
            searching = !allGood;
            if (app.trees.length == 0) searching = false;
            tries++;
            if (tries > 1000) searching = false;
        }
        this.y = app.height - app.settings.ground.horizon;
        this.settings = app.settings.tree;
        this.color = colors["teal_" + random.int(7, 9) + "00"];
        this.peices = random.int(this.settings.top);
        this.snow = [];
        this.bend = random.between(-0.3, 0.3);

        var count = 0;
        for (var i = 0; i < this.peices; i++) {
            if (Math.random() > 0.5 && count < 2) {
                var snow = {
                    width: random.between(0.3, 0.9),
                    height: random.between(4, 5),
                    offset: Math.random() > 0.5
                };
                snow.bubble = {
                    visible: Math.random() > 1 - snow.width,
                    offset: random.between(0.2, 0.8)
                };
                this.snow.push(snow);
                count++;
            }
            else this.snow.push(false);
        }

        this.loop = function () {
            var m = app.gestureDetector.mouse;
            var sw = this.settings.stem.width;
            var sh = this.settings.stem.height;
            var tw = this.settings.top.width;
            var th = this.settings.top.height;

            //Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, sw * 1.5, sw * 0.5, 0, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            //Trunk
            ctx.fillStyle = colors.brown_600;
            ctx.fillRect(this.x - sw / 2, this.y - sh, sw / 2, sh);
            ctx.fillStyle = colors.brown_500;
            ctx.fillRect(this.x, this.y - sh, sw / 2, sh);

            //Calculations
            var testy = this.y;
            var testth = th;
            for (var i = 0; i < this.peices - 1; i++) {
                testy -= testth * this.settings.top.multipliers.offset;
                testth *= this.settings.top.multipliers.height;
            }
            var tallness = (this.y - testy) + testth;

            //Treetop
            ctx.fillStyle = colors.teal_800;
            var x = this.x;
            var y = this.y;
            for (var i = 0; i < this.peices; i++) {
                if (i > 0) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
                    ctx.fillRect(x - tw / 2, y - sh + th * 0.1 - th, tw, th);
                    ctx.restore();
                }

                ctx.fillStyle = this.color;
                ctx.fillTriangle(x - tw / 2, y - sh, x, y - sh - th, x + tw / 2, y - sh, true);

                //Snow on the tree
                if (this.snow[i]) {
                    var s = this.snow[i];
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.87)';
                    var offset = s.offset ? -s.height / 4 : (tw * (1 - s.width)) + s.height / 4;
                    var sx = x - tw / 2 + offset;
                    var sw = tw * s.width;
                    var sy = y - sh - s.height / 2;
                    ctx.beginPath();
                    ctx.bar(sx, sy, sw, s.height);
                    if (s.bubble.visible) {
                        ctx.bar(sx + s.bubble.offset * sw, sy + s.height / 2, s.height, s.height);
                    }
                    ctx.closePath();
                    ctx.fill();
                }

                ctx.save();
                ctx.triangle(x - tw / 2, y - sh, x, y - sh - th, x + tw / 2, y - sh);
                ctx.clip();

                y -= th * this.settings.top.multipliers.offset;
                th *= this.settings.top.multipliers.height;
                tw *= this.settings.top.multipliers.width;
            }
            ctx.restore();

            //Debug
            //ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
            //ctx.fillRect(this.x - 3, this.y - tallness - sh, 6, tallness);
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
    }

    var Ground = function () {
        this.x = app.width / 2;
        this.settings = app.settings.ground;
        this.y = app.height - this.settings.horizon;
        this.bars = [];
        for (var i = 0; i < this.settings.amount; i++) {
            var bh = this.settings.base.height;
            var h = random.between(bh * 0.5, bh);
            var y = this.y + random.between(-bh * 0.5 - h, bh * 0.5);
            var w = Math.max(h, random.between(app.width * 0.1, app.width * 0.5));
            var x = random.between(app.width * 0.05, app.width - w - (app.width * 0.05));
            this.bars.push({ x: x, y: y, w: w, h: h });
        }

        this.mask = function () {
            ctx.arc(this.settings.base.height / 2, this.y, this.settings.base.height / 2, Math.PI * 0.5, Math.PI * 1.5, false);
            ctx.arc(app.width - (this.settings.base.height / 2), this.y, this.settings.base.height / 2, Math.PI * 1.5, Math.PI * 2.5, false);
            for (var i = 0; i < this.bars.length; i++) {
                var b = this.bars[i];
                ctx.bar(b.x, b.y, b.w, b.h);
            }
        }

        this.loop = function () {
            //base
            ctx.fillStyle = 'rgba(255, 255, 255, 0.54)';
            ctx.beginPath();
            this.mask();
            ctx.closePath();
            ctx.fill();
        }

        ctx.bar = function (x, y, w, h) {
            ctx.moveTo(x + (h / 2), y + h)
            ctx.arc(x + (h / 2), y + (h / 2), h / 2, Math.PI * 0.5, Math.PI * 1.5, false);
            ctx.arc((x + w) - (h / 2), y + (h / 2), h / 2, Math.PI * 1.5, Math.PI * 2.5, false);
        }

        ctx.fillBar = function (x, y, w, h) {
            ctx.beginPath();
            ctx.arc(x + (h / 2), y + (h / 2), h / 2, Math.PI * 0.5, Math.PI * 1.5, false);
            ctx.arc((x + w) - (h / 2), y + (h / 2), h / 2, Math.PI * 1.5, Math.PI * 2.5, false);
            ctx.closePath();
            ctx.fill();
        }
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
        if (isMobile) {
            document.addEventListener('touchstart', function (evt) {
                if (evt.touches.length === 1) {
                    var touch = evt.touches[0];
                    this.gestureDetector.touchEvent(touch, 0);
                }
            }.bind(this));
            document.addEventListener('touchmove', function (evt) {
                evt.preventDefault();
                if (evt.touches.length === 1) {
                    var touch = evt.touches[0];
                    this.gestureDetector.touchEvent(touch, 1);
                }
            }.bind(this));
            document.addEventListener('touchend', function (evt) {
                this.gestureDetector.touchEvent(null, 2);
            }.bind(this));
        }
        else {
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
            document.addEventListener('keydown', function (evt) {
                this.gestureDetector.keyEvent(evt.keyCode, true);
            }.bind(this));
            document.addEventListener('keyup', function (evt) {
                this.gestureDetector.keyEvent(evt.keyCode, false);
            }.bind(this));
        }

        this.objects = [];
        this.ground = new Ground();
        this.trees = [];

        //Add snowballs
        var originalLength = this.objects.length;
        for (var i = 0; i < this.settings.snowball.count; i++) {
            var index = originalLength + i;
            this.objects.push(new Snowball(false))
        }

        for (var i = 0; i < this.settings.tree.count; i++) {
            this.trees.push(new Tree())
        }
    }

    this.loop = function () {
        ctx.clearRect(0, 0, this.width, this.height);

        this.ground.loop();
        for (var i = 0; i < this.trees.length; i++) {
            this.trees[i].loop();
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].loop();
        }

        this.gestureDetector.loop();
    };

    setInterval(function () {
        this.loop();
    }.bind(this), 1000 / this.settings.FPS);

    var animate = function (options) {
        if (!window.__animation_stack) window.__animation_stack = [];
        if (typeof Object.id === 'undefined') {
            var id = 0;
            Object.id = function (o) {
                if (typeof o.__uniqueid === 'undefined') {
                    Object.defineProperty(o, '__uniqueid', {
                        value: ++id,
                        enumerable: false,
                        writable: false
                    });
                }
                return o.__uniqueid;
            };
        }

        var uID = null;
        if (options.object) {
            var objT = typeof options.object;
            if (objT !== 'object') throw new Error('The object to animate must be a JSON object, not a ' + objT + '.');
            if (!options.property) throw new Error('You must specify an property to animate on the object.');
            if (typeof options.property !== 'string') throw new Error('The property name must be a string.');

            uID = Object.id(options.object) + options.property;
        }
        else if (options.step) {
            uID = Object.id(options.step);
        } else uID = Object.id(options);

        if (__animation_stack[uID]) {
            window.clearInterval(__animation_stack[uID]);
            delete __animation_stack[uID];
        }

        var animation = {
            object: options.object,
            property: options.property || null,
            from: (options.object && options.property && !options.from) ? options.object[options.property] : (options.from || 0),
            value: (options.object && options.property && !options.from) ? options.object[options.property] : (options.from || 0),
            to: options.to || 0,
            duration: options.duration || 500,
            offset: options.offset || 0,
            elapsed: 0,
            fraction: 0,
            interpolator: (function () {
                var weight = options.weight || 3.5;
                var interpolation = options.interpolation || 'asymmetric';
                switch (interpolation) {
                    case 'linear':
                    case 'line':
                    case 'lin':
                        return function (t) {
                            return t;
                        };
                    case 'decelerate':
                    case 'decel':
                    case 'dec':
                        return function (t) {
                            return 1 - Math.pow(1 - t, weight);
                        };
                    case 'accelerate':
                    case 'accel':
                    case 'acc':
                        return function (t) {
                            return Math.pow(t, weight);
                        };
                    case 'asymmetric':
                    case 'asym':
                    case 'asy':
                        return function (t) {
                            var r = 0.3;
                            var value = 0;
                            if (t <= r)
                                value = Math.pow(t / r, weight) * r;
                            else
                                value = (1 - r) * (1 - Math.pow((1 / (1 - r) * (1 - t)), weight)) + r;
                            return value;
                        };
                }
            })()
        };

        var argumentLists = {};
        var callbacks = ['step', 'start', 'finish'];
        for (var h = 0; h < callbacks.length; h++) {
            if (options[callbacks[h]] !== undefined && typeof options[callbacks[h]] === 'function') {
                var fn = options[callbacks[h]].toString().replace(' ', '');
                var args = fn.substr(fn.match(/\(/).index + 1, fn.match(/\)/).index).split(',');
                var keys = Object.keys(animation);
                var matched = false;
                for (var i = 0; i < args.length; i++) {
                    for (var j = 0; j < keys.length; j++) {
                        if (args[j] === keys[i]) {
                            argumentLists[callbacks[h]].push('animation.' + keys[i]);
                            matched = true;
                        }
                    }
                }
                if (!matched && args.length > 0) argumentLists[callbacks[h]] = ['animation'];
            }
        }

        if (options.offset !== undefined && options.offset > 0) {
            setTimeout(start, options.offset);
        } else
            start();

        function start() {
            window.clearInterval(__animation_stack[uID]);
            __animation_stack[uID] = setInterval(step, 1000 / 60);
            var startTime = Date.now();

            if (options.object) options.object[options.property] = animation.from;

            if (options.start !== undefined && typeof options.start === 'function')
                eval('options.start(' + argumentLists['start'].join(', ') + ')');

            function step() {
                animation.elapsed = Date.now() - startTime;
                var clipped = animation.elapsed > animation.duration ? animation.duration : animation.elapsed;
                animation.fraction = animation.interpolator(clipped / animation.duration);
                animation.value = animation.from + (animation.fraction * (animation.to - animation.from));

                //TODO: make it work on primitives too
                //set property value
                if (options.object) options.object[options.property] = animation.value;

                if (options.step !== undefined && typeof options.step === 'function') {
                    eval('options.step(' + argumentLists['step'].join(', ') + ')');
                }

                if (animation.elapsed >= animation.duration) {
                    window.clearInterval(__animation_stack[uID]);
                    if (options.finish !== undefined && typeof options.finish === 'function')
                        eval('options.finish(' + argumentLists['finish'].join(', ') + ')');
                }
            }
        }
    };

    var random = {
        between: function (a, b) {
            if (typeof a === 'object') {
                return a.min + ((a.max - a.min) * Math.random());
            }
            else return a + ((b - a) * Math.random());
        },
        int: function (a, b) {
            if (typeof a === 'object') {
                return Math.floor(a.min + ((a.max - a.min) * Math.random()));
            }
            else return Math.floor(a + ((b - a) * Math.random()));
        }
    }

    var utils = {
        vector_length: function (p1) {
            return Math.sqrt(Math.pow(p1.x, 2) + Math.pow(p1.y, 2));
        },
        distance: function (p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }
    }

    var app = this;

    this.initialize();

})();
