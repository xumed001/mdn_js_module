

const canvas = document.querySelector('.myCanvas')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)


const ctx = canvas.getContext('2d')

// fill black
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

// ctx.fillStyle = 'rgb(255,0,0)';
// ctx.fillRect(50,50,100,150);

// ctx.fillStyle = 'rgb(0,255,0)';
// ctx.fillRect(75,75,100,100);

// ctx.fillStyle = 'rgba(255,0,255,0.75)';
// ctx.fillRect(25,100,175,50);

// ctx.strokeStyle = "rgb(255, 255, 255)";
// ctx.strokeRect(25, 25, 175, 200);
// ctx.lineWidth = 5;



// // draw your path
// ctx.fill();

// function degToRad(degree){
//     return (degree * Math.PI / 180)
// }

// ctx.fillStyle = "rgb(255, 0, 0)";
// ctx.beginPath();
// ctx.moveTo(50, 50);

// ctx.lineTo(150, 50)
// const triHeight = 50 * Math.tan(degToRad(60))
// ctx.lineTo (100, 50 + triHeight)
// ctx.lineTo(50, 50)
// ctx.fill()

// ctx.fillStyle = "rgb(0, 0, 255)";
// ctx.beginPath();
// ctx.arc(150, 106, 50, degToRad(0), degToRad(180), false);
// ctx.fill();

// ctx.fillStyle = "yellow";
// ctx.beginPath();
// ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
// ctx.lineTo(200, 106);
// ctx.fill();


// // drawing text
// ctx.strokeStyle = 'white'
// ctx.lineWidth = 1
// ctx.font = '36px arial'
// ctx.strokeText('Canvas text', 200, 200)

// ctx.fillStyle = 'red'
// ctx.font = '48px georgia'
// ctx.fillText('Canvas text', 250, 250)

// ctx.fillStyle = 'red'
// ctx.font = '48px georgia'
// ctx.fillText('---------------------------------->>', 0, 300)

// canvas.setAttribute('arial-lable', 'Canvas text')


// loops in canvas
// moving origin point at the center
ctx.translate(width/2, height/2)

function degToRad(degree){
    return (degree * Math.PI / 180)
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let length = 250
let moveOffset = 20

for (let i=0; i<length; i++){
    ctx.fillStyle = `rgba(${255 - length},0,${255 - length},0.9)`
    ctx.beginPath()
    ctx.moveTo(moveOffset, moveOffset)
    ctx.lineTo(moveOffset + length, moveOffset)
    const triHeight = (length / 2) * Math.tan(degToRad(60))
    ctx.lineTo(moveOffset + length/2, moveOffset + triHeight)
    ctx.lineTo(moveOffset, moveOffset)
    ctx.fill()

    length--
    moveOffset += 0.7
    ctx.rotate(degToRad(5))
}


