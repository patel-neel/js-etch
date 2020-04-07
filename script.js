//select the elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');


const MOVE_AMOUNT = 10;

//setup our canvas for drawing
const { width, height } = canvas;

//create random x and y starting points
//since every time we refresh the page it should start somewhere different

let x = (Math.random() * width);
let y = (Math.random() * height);



ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); //starts the drawing.
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//write a draw function

function draw({ key }){
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key)
    //start the path of the drawing
    ctx.beginPath();
    ctx.moveTo(x, y)

    //move our x and y values depending on what the user did

    switch(key){
        case 'ArrowUp':
            y = y - MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y = y + MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x = x + MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x = x - MOVE_AMOUNT;
            break;
        default:
            break;
    }

    ctx.lineTo(x, y);
    ctx.stroke()
}

//write a handler for the keys 

function handleKey(e){

    if (e.key.includes('Arrow')){
        e.preventDefault();
        draw({ key: e.key });
    }

}

//clear shake function

function clearCanvas () {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height)
    canvas.addEventListener('animationend', function(){
        canvas.classList.remove('shake');
    }, { once: true })
}

//listen for arrow keys
window.addEventListener('keydown', handleKey)
shakeButton.addEventListener('click', clearCanvas)