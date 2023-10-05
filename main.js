song1status=""
scoreleftWrist=0
scorerightWrist=0
song1=""
song2=""
leftWristX=0
leftWristY=0
rigthWristX=0
rigthWristY=0

function preload(){
    soundFormats('mp3');
    song1=loadSound("music")
    song2=loadSound("music2")
}

function setup(){
    context = new AudioContext();
    context.suspend();
    
    canvas=createCanvas(600,500);
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()

    posenet=ml5.poseNet(video,modelloaded)
    posenet.on("pose",got_results)
    
}
function modelloaded(){
    console.log("model loaded succsessfuly")
}

function got_results(results){
    if(results.length>0){
        scoreleftWrist=results[0].pose.keypoints[9].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        // console.log("left wrist x="+leftWristX)
        // console.log("left wrist y="+leftWristY)

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        // console.log("right wrist x="+rightWristX)
        // console.log("right wrist y="+rightWristY)
    }
}

function draw(){
    image(video,0,0,600,500)
    fill("#325ed9")
    stroke("#325ed9")
    song1status=song1.isPlaying()
    if(scoreleftWrist>0.2){    
        circle(leftWristX,leftWristY,20)
        song2status=song2.stop()
        if( song1status=false){
            song1.play()
        }
    }
}
