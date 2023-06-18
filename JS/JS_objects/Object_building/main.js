// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para =document.querySelector('p')

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// for generic shape
class Shape {
    constructor(x, y, velX, velY){
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
    }
}

//  generate Balls
class Ball extends Shape{
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY)

        this.color = color
        this.size = size
        this.exist = true
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
            if (!(this === ball) && ball.exist){
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

const totalBalls = 20
let count = totalBalls
// # of balls on screen
const balls = []
while (balls.length < totalBalls){
    const size = random(1,5)
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

// animation loop
function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fillRect(0,0, width, height)

    for(const ball of balls){
        if (ball.exist){
            ball.draw()
            ball.update()
            ball.collisionDetection()
        }
        para.textContent = `Particles left: ${count}`
    }
    eCircle.draw()
    eCircle.checkBounds()
    eCircle.collisionDetection()
    
    requestAnimationFrame(loop)
}

// player circle
class EvilCircle extends Shape {

    constructor(x, y){
        super(x, y, 20, 20)
        this.color = 'white'
        this.size = 10

            // movement
        window.addEventListener('keydown', (e) => {
            switch (e.key){
                case 'a':
                    this.x -= this.velX
                    break;
                case 'd':
                    this.x += this.velX
                    break;
                case 'w':
                    this.y -= this.velY
                    break;
                case 's':
                    this.y += this.velY
                    break; 
            }
        })
    }

    draw(){
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.stroke()
    }

    checkBounds(){
        if((this.x + this.size) >= width) {
            this.x = this.size
        }
        if((this.x - this.size) <= 0) {
            this.x = this.size
        }

        if((this.y + this.size) >= height) {
            this.y = this.size
        }
        if((this.y - this.size) <= 0) {
            this.y = this.size
        }
    }

    // collision detection
    collisionDetection(){
        for (const ball of balls){
            if (ball.exist){
                const dx = this.x - ball.x
                const dy = this.y - ball.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                
                if (distance < this.size + ball.size){
                    ball.exist = false
                    count--
                }
            }
        }
    }
}

const eCircle = new EvilCircle(random(0, width), random(0, height));


loop()