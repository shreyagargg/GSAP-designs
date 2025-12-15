// Add a static body for the wall/ceiling where the art hangs from
// Alias common Matter.js modules
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Set to false for solid look
        background: '#f0f0f0'
    }
});

// Run the renderer
Render.run(render);

// Create a runner
var runner = Runner.create();
Runner.run(runner, engine);


var ceiling = Bodies.rectangle(window.innerWidth / 2, 50, 10, 10, { isStatic: true, render: { visible: false } });

// Create the art piece (e.g., a rectangle)
var artPiece = Bodies.rectangle(window.innerWidth / 2, 200, 100, 150, {
    mass: 5, // Adjust mass to control swing
    frictionAir: 0.05 // Air friction makes it return to rest
});

// Create a constraint (the "thread") between the ceiling and the art piece
var thread = Constraint.create({
    bodyA: ceiling,
    bodyB: artPiece,
    pointA: { x: 0, y: 0 }, // Center of the ceiling body
    pointB: { x: 0, y: -75 }, // Top center of the art piece
    length: 150, // Length of the thread
    stiffness: 1 // Stiffness of the thread, 1 is rigid
});

// Add all bodies and the constraint to the world
Composite.add(engine.world, [ceiling, artPiece, thread]);



// Add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(engine.world, mouseConstraint);

// Keep the mouse in sync with the rendering
render.mouse = mouse;
