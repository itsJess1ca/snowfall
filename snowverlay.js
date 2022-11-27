function randBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}
var SnowFlake = /** @class */ (function () {
    function SnowFlake(canvas) {
        this.canvas = canvas;
        this.angle = randBetween(0, .02);
        this.speed = randBetween(0.45, 0.5);
        this.baseSize = 2;
        this.sizeRandomiser = [0.2, 1];
        if (this.speed > 1) {
            this.speed -= 0.5;
        }
        this.spawn();
    }
    SnowFlake.prototype.spawn = function () {
        var sizeModifier = randBetween.apply(void 0, this.sizeRandomiser);
        this.size = this.baseSize * sizeModifier;
        this.x = randBetween(-this.canvas.width * .5, this.canvas.width * 1.5);
        this.y = randBetween(0, this.canvas.height * 2);
        this.draw();
    };
    SnowFlake.prototype.fall = function () {
        this.angle += 0.005;
        this.y += this.speed;
        this.x += Math.sin(this.angle) * this.speed;
        /*if (this.x > this.canvas.width || this.x < 0) {
          this.respawn();
          return;
        }*/
        if (this.y > this.canvas.height) {
            this.respawn();
            return;
        }
        this.draw();
    };
    SnowFlake.prototype.draw = function () {
        var x = this.x + (this.size / 2);
        var y = this.y + (this.size / 2);
        var context = this.canvas.getContext('2d');
        context.beginPath();
        context.arc(x, y, this.size, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
    };
    SnowFlake.prototype.respawn = function () {
        this.x = randBetween(-this.canvas.width * .5, this.canvas.width * 1.5);
        this.y = randBetween(0, this.canvas.height) - this.canvas.height;
        this.draw();
    };
    return SnowFlake;
}());
var Snowverlay = /** @class */ (function () {
    function Snowverlay(container) {
        var _this = this;
        this.flakeCount = 750;
        this.flakes = [];
        this.container = container;
        this.setupCanvas();
        this.spawnSnowflakes();
        setInterval(function () {
            var context = _this.canvas.getContext('2d');
            context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            for (var _i = 0, _a = _this.flakes; _i < _a.length; _i++) {
                var flake = _a[_i];
                flake.fall();
            }
        }, 1);
    }
    Snowverlay.prototype.setupCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.container.appendChild(this.canvas);
    };
    Snowverlay.prototype.spawnSnowflakes = function () {
        for (var i = 0; i < this.flakeCount; i++) {
            this.flakes.push(new SnowFlake(this.canvas));
        }
    };
    return Snowverlay;
}());
var container = document.querySelector('#snowverlay');
var snowverlay = new Snowverlay(container);
