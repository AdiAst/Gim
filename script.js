var myGamePiece;
var myBackground;

function startGame() {
  myGamePiece = new component(90, 90, "player.png", 10, 120, "image");
  myBackground = new component(1040, 400, "bg.png", 0, 0, "image");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1040;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.5;
  this.gravitySpeed = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  };
  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  };
}

function updateGameArea() {
  myGameArea.clear();
  myBackground.newPos();
  myBackground.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function move(dir) {
  if (dir == "up") {
    myGamePiece.image.src = "player-mv.png";
    myGamePiece.speedY = -13;
    setTimeout(function () {
      clearmove();
    }, 1500);
  }
  if (dir == "left") {
    myGamePiece.speedX = -7;
  }
  if (dir == "right") {
    myGamePiece.speedX = 7;
  }
}

function clearmove() {
  myGamePiece.image.src = "player.png";
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
