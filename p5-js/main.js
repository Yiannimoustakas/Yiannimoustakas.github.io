// console.log('Loaded');

const controls = {
  velocityScale: 0.01,
  gravity: 0.0,
};

let particles = [];

// this function will be run once when the sketch loads
// We actually have to use the alternate way of writing functions for the main two p5 functions! Weird...
function setup(){
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent("container");
  background(0);
  noStroke();
  // Change the colour space we use to specify colours
  colorMode(HSB, 255);

  // Add a control panel
  const gui = new dat.GUI();
  gui.add(controls, 'velocityScale', -1, 1);
  gui.add(controls, 'gravity', -1, 1);

};


function draw(){
  background(0);
  const x = mouseX//random(windowWidth);
  const y = mouseY //random(windowHeight);
  // const size = 80
  const xVel = (x - pwinMouseX) + 4;
  const yVel = (y - pwinMouseY) + 4;

  const h = Math.floor(Math.sqrt(x*x + y*y))
  // console.log(h);



  // get a percentage ('normalized value') for the mouse x position
  // const xPercent = x / windowWidth;
  // multiply it by the taget maximum range
  // const hue = map(x, 0, windowWidth, 0, 255);
  const hue = frameCount % 255;

  const size = Math.abs(xVel) + 50//map(y, 0, windowHeight, 20, 400 )

  fill(hue, 40, 40)

  if( mouseIsPressed ) {
    // draw a circle
    // ellipse(x, y, size, size)

    // register the creation of a new circle by adding it to our particle array as an object
    particles.push({ x, y, xVel, yVel, hue, size, life: 1.0 });
  };

  updateParticles();
}

function updateParticles(){
  // loop over our array of particles. drawing each of them

  let outputParticles = [];

  for (var i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += (p.xVel * controls.velocityScale); //change the postion of the circle based on the velocity of the mouse when it was created
    p.y += (p.yVel * controls.velocityScale);

    p.yVel += controls.gravity;

    if(p.x >= windowWidth || p.x <= 0){
      p.xVel *= -1
    }
    if(p.y >= windowHeight || p.y <= 0){
      p.yVel *= -1
    }

    p.life -= 0.1; //decrease life of the particle
    if(p.life > 0){
      // if the particle is still alive, add it to the output particle array
      outputParticles.pop(p);
    }

    fill(p.hue, 255, 255, p.life*255);
    ellipse(p.x, p.y, p.size, p.size);

    // particles = outputParticles;
  }
}
