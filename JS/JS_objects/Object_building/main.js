// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
//${Math.random().toFixed(1)}

function randomRGB() {
  return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)}, .16)`;
}

// Parent Ball object 
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.color = color
        this.size = size
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }

    update(){
        if((this.x + this.size) >= width) {
            this.velX = -(this.velX)
        }
        if((this.x - this.size) <= 0) {
            this.velX = -(this.velX)
        }

        if((this.y + this.size) >= height) {
            this.velY = -(this.velY)
        }
        if((this.y - this.size) <= 0) {
            this.velY = -(this.velY)
        }
        this.x += this.velX
        this.y += this.velY
    }

    // collision detection
    collisionDetection(){
        for (const ball of balls){
            if (this !== ball){
                const dx = this.x - ball.x
                const dy = this.y - ball.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                
                if (distance < this.size + ball.size){
                    ball.color = this.color = randomRGB()
                    // ball.size = this.size = random(20,60)
                }
            }
        }
    }

}

const balls = []
while (balls.length < 300){
    const size = random(1,99)
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    )
    balls.push(ball)
}

function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fillRect(0,0, width, height)

    for(const ball of balls){
        ball.draw()
        ball.update()
        ball.collisionDetection()
    }

    requestAnimationFrame(loop)
}

loop()