noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup() {
    canvas = createCanvas(550, 550);
    canvas.position(980, 150);

    video = createCapture(VIDEO);
    video.size(550, 550);
    video.position(300, 150);

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    background("#ED8E53");
    fill("#D39DBF");
    stroke("#910A60");
    square(noseX, noseY, difference);
    document.getElementById("square-sides").value = "Width and Height of Square = " + difference + " pixels";
}

function modelLoaded() {
    console.log("Posenet is initialized!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log(noseX);
        console.log(noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        difference = floor(leftWristX - rightWristX);

        console.log("Left Wrist x: " + leftWristX);
        console.log("Right Wrist x: " + rightWristX);
        console.log("Difference: " + difference);
    }
}