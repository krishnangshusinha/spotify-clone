console.log("Welcome to Clone of Spotify"); // prints this in the console log 

// Initialize the variables
let songindex = 0;   // initially song index would be 0
let audioElement = new Audio('1.mp3');
let masterplay = document.getElementById('masterplay');   // id of the main play button 
let myprogressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songitem = Array.from(document.getElementsByClassName('songname'));

let songs = [
    {songname : "The Risk" , filepath : "1.mp3" , coverpath: "cover1.jpg"},
    {songname : "Unholy" , filepath : "2.mp3" , coverpath: "cover2.jfif"},
    {songname : "No Guidance" , filepath : "3.mp3" , coverpath: "cover3.png"},
    {songname : "Slow Motion" , filepath : "4.mp3" , coverpath: "cover4.jpg"},
    {songname : "Gang Gang" , filepath : "5.mp3" , coverpath: "cover5.jpg"},
    {songname : "Bad Boy" , filepath : "6.mp3" , coverpath: "cover6.jpg"},
    {songname : "Under The Influence" , filepath : "7.mp3" , coverpath: "cover7.jfif"},
    {songname : "Love Me Back" , filepath : "8.mp3" , coverpath: "cover8.jpg"},

]

songitem.forEach((element , i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songsname")[0].innerText = songs[i].songname;
})

// Handle play/pause click 
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');       // play button removed and replaced by pause button if audio is initially paused or its time is equal to 0
        gif.style.opacity = 1;   // opacity made 1 when the song is played
    }
    else{
        audioElement.pause();   // in this case is audio paused
        masterplay.classList.remove('fa-pause-circle');     
        masterplay.classList.add('fa-play-circle');             // audio paused and hence pause button removed
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    // updating progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myprogressbar.value = progress;
})

// incase we drag the progress bar
myprogressbar.addEventListener('change' , ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100 ;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeallplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songindex+1}.mp3`;
        mastersong.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');     
        masterplay.classList.add('fa-pause-circle');
        /*if(audioElement.paused){
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');     
            masterplay.classList.add('fa-play-circle');
        }*/
        
    })
})

// previous/next button editing 
document.getElementById('next').addEventListener('click',()=>{
    if(songindex >7 ){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioElement.src = `${songindex+1}.mp3`;
    mastersong.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');     
    masterplay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex <= 0 ){
        songindex = 7;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `${songindex+1}.mp3`;
    mastersong.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');     
    masterplay.classList.add('fa-pause-circle');
})