var canvas = null;
var context = null;

class GameObject {
  constructor(src) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.image = new Image();
    this.image.addEventListener('load', () => {
      this.width = this.image.width;
      this.height = this.image.height;
    });
    this.image.src = src;
  }
}

class Ball extends GameObject {
  constructor(){
    super('image/ball.png');

    this.speed = {x:3, y:3};
  }
}

var clicked = false;
var ball;

var gameObjectList = [];
var ballList = [];
var brickList = [];

function init() {
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');

  create('brick', 200, 50);
  create('brick', 100, 400);
  create('brick', 270, 300);



  ball = create('ball', 270, 450);

  requestAnimationFrame(update);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let o of gameObjectList) {
    context.drawImage(o.image, o.x, o.y);
  }



  //AABB 충돌
  for (let ball of ballList) {
    for (let brick of brickList) {
      if(brick.x + brick.width >= ball.x &&
        brick.x <= ball.x + ball.width &&
        brick.y + brick.height >= ball.y &&
        brick.y <= ball.y + ball.height
      ) {
      if(brick.y + brick.height == ball.y ||
         brick.y + brick.height == ball.y + ball.height ||
         brick.x + brick.width == ball.x){
         ball.speed.x *= -1;
         ball.speed.y *= 1;
       }
       else{
        ball.speed.x *= 1
        ball.speed.y *= -1
      }
       if(brick.y == ball.x){
          ball.speed.x *= -1;
       }
       if(brick.y + brick.height== ball.x){
          ball.speed.x *= -1;
       }


  }
    if(clicked) {
      ball.x -= ball.speed.x;
      ball.y -= ball.speed.y;
    }

    if(ball.x < 0 || ball.x + ball.width > canvas.width){
      ball.speed.x *= -1;
    }
    else if(ball.y < 0 || ball.y + ball.height > canvas.height){
      ball.speed.y *= -1;
    }
  }

  requestAnimationFrame(update);
}
}



function create(id, x, y) {
  let ret;

  switch (id) {
    case 'brick':
      ret = new GameObject('image/brick.png');
      brickList.push(ret);
      break;
    case 'ball':
      ret = new Ball();
      ballList.push(ret);
      break;
    default:
      return null;
  }

  ret.x = x;
  ret.y = y;
  gameObjectList.push(ret);

  return ret;
}

function onClick() {
  clicked = true;
}

window.addEventListener('click', onClick);
window.addEventListener('load', init);
