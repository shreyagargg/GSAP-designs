const canvas = document.getElementById("myCanvas");
const brush = canvas.getContext("2d");

// ------------------ RESIZE ------------------
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ------------------ STATE ------------------
const state = {
  progress: 0,
  walkCycle: 0,
  visible: true,
  alpha: 1
};

// ------------------ CLOUDS ------------------
function clouds(x, y) {
  brush.save();
  brush.beginPath();
  brush.arc(x, y, 30, Math.PI * 0.5, Math.PI * 1.5);
  brush.arc(x + 35, y - 35, 45, Math.PI * 1, Math.PI * 1.8);
  brush.arc(x + 90, y - 30, 35, Math.PI * 1.2, Math.PI * 0.1);
  brush.arc(x + 130, y, 30, Math.PI * 1.5, Math.PI * 0.5);
  brush.lineTo(x, y + 30);
  brush.closePath();

  brush.fillStyle = "hsl(0, 0%, 100%)";
  brush.fill();
  
  // Subtle cloud shadow for depth
  brush.strokeStyle = "hsla(0, 0%, 80%, 0.5)";
  brush.lineWidth = 2;
  brush.stroke();
  brush.restore();
}

// ------------------ ENVIRONMENT ------------------
function drawEnvironment() {
  const horizon = canvas.height * 0.5;

  // Sky Gradient
  const skyGrad = brush.createLinearGradient(0, 0, 0, horizon);
  skyGrad.addColorStop(0, "hsl(199, 95%, 45%)");
  skyGrad.addColorStop(1, "hsl(190, 90%, 70%)");
  brush.fillStyle = skyGrad;
  brush.fillRect(0, 0, canvas.width, horizon);

  // Grass Gradient
  const grassGrad = brush.createLinearGradient(0, horizon, 0, canvas.height);
  grassGrad.addColorStop(0, "hsl(120, 40%, 35%)");
  grassGrad.addColorStop(1, "hsl(120, 50%, 45%)");
  brush.fillStyle = grassGrad;
  brush.fillRect(0, horizon, canvas.width, canvas.height - horizon);

  // Road
  brush.fillStyle = "hsl(15, 20%, 35%)";
  brush.beginPath();
  brush.moveTo(canvas.width * 0.1, canvas.height);
  brush.quadraticCurveTo(canvas.width * 0.7, canvas.height * 0.7, canvas.width * 0.48, horizon);
  brush.lineTo(canvas.width * 0.52, horizon);
  brush.quadraticCurveTo(canvas.width * 0.9, canvas.height * 0.7, canvas.width * 0.8, canvas.height);
  brush.closePath();
  brush.fill();

  drawStone(canvas.width * 0.75, canvas.height * 0.9, 25);
  drawStone(canvas.width * 0.72, canvas.height * 0.92, 15);
}

function drawStone(x, y, r) {
  // Stone Shadow
  brush.fillStyle = "hsla(0, 0%, 0%, 0.2)";
  brush.beginPath();
  brush.ellipse(x + r, y + r/2, r, r/3, 0, 0, Math.PI * 2);
  brush.fill();

  brush.fillStyle = "hsl(0, 0%, 60%)";
  brush.beginPath();
  brush.arc(x, y, r, 0, Math.PI * 2);
  brush.fill();
}

// ------------------ BOY ------------------
function drawBoy(x, y, scale) {
  brush.save();
  brush.globalAlpha = state.alpha;
  
  // Ground Shadow (Scales with boy)
  brush.fillStyle = "hsla(0, 0%, 0%, 0.25)";
  brush.beginPath();
  brush.ellipse(x, y + (10 * scale), 25 * scale, 8 * scale, 0, 0, Math.PI * 2);
  brush.fill();

  brush.translate(x, y);
  brush.scale(scale, scale);

  const swing = Math.sin(state.walkCycle) * 15;

  // Legs
  brush.strokeStyle = "hsl(231, 66%, 30%)";
  brush.lineWidth = 8;
  brush.lineCap = "round";

  brush.beginPath();
  brush.moveTo(0, -20);
  brush.lineTo(swing, 10);
  brush.stroke();

  brush.beginPath();
  brush.moveTo(0, -20);
  brush.lineTo(-swing, 10);
  brush.stroke();

  // Body
  brush.fillStyle = "hsl(4, 90%, 58%)";
  brush.fillRect(-12, -50, 24, 35);

  // Head
  brush.fillStyle = "hsl(33, 100%, 83%)";
  brush.beginPath();
  brush.arc(0, -65, 15, 0, Math.PI * 2);
  brush.fill();

  brush.restore();
}

// ------------------ PATH ------------------
function getBezierPoint(t) {
  const horizon = canvas.height * 0.5;
  const pStart = { x: canvas.width * 0.45, y: canvas.height };
  const pControl = { x: canvas.width * 0.8, y: canvas.height * 0.75 };
  const pEnd = { x: canvas.width * 0.5, y: horizon };

  const x = (1 - t) ** 2 * pStart.x + 2 * (1 - t) * t * pControl.x + t ** 2 * pEnd.x;
  const y = (1 - t) ** 2 * pStart.y + 2 * (1 - t) * t * pControl.y + t ** 2 * pEnd.y;

  return { x, y };
}

// ------------------ RENDER LOOP ------------------
function render() {
  brush.clearRect(0, 0, canvas.width, canvas.height);

  drawEnvironment();

  clouds(canvas.width * 0.1, canvas.height * 0.2);
  clouds(canvas.width * 0.4, canvas.height * 0.1);
  clouds(canvas.width * 0.7, canvas.height * 0.25);

  if (state.visible) {
    const pos = getBezierPoint(state.progress);
    const scale = 1.5 - state.progress * 1.1;
    drawBoy(pos.x, pos.y, scale);
  }
}

gsap.ticker.add(render);

// ------------------ ANIMATIONS ------------------
gsap.to(state, {
  progress: 1,
  duration: 6,
  ease: "none",
  onComplete: () => {
    gsap.to(state, {
      alpha: 0,
      duration: 0.6,
      onComplete: () => { state.visible = false; }
    });
  }
});

gsap.to(state, {
  walkCycle: Math.PI * 2,
  duration: 0.8,
  ease: "none",
  repeat: -1
});

// ------------------ H1 ANIMATION ------------------
const tl = gsap.timeline();
tl.from("h1", {
  x: -500,
  duration: 2,
  ease: "power2.out"
}, 0);

tl.from("h1", {
  y: -300,
  opacity: 0,
  duration: 2,
  ease: "bounce.out"
}, 0);