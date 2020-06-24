const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// variable height and width
const { width, height } = canvas;

// create random x and y starting points

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
  // increment the hue
  hue += 1;
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y values depending on user interaction
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a key handler

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
