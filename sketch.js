// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR
'use strict';
let video;
let poseNet;
let pose;
let skeleton;
let osc;
var env;

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  osc = new p5.Oscillator();
env = new p5.Envelope
env.setADSR();

}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  translate(-width / 2, -height / 2)
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    fill(0, 0, 255);
    osc.freq(d*40);
    osc.amp(.2);

    push();
    translate(pose.nose.x, pose.nose.y, d / 4);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(100);

  }
}
function mousePressed() {
  osc.start();
}

function mouseReleased() {
  osc.stop();
}
