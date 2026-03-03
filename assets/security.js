document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.keyCode == 123) { alert("No peeking at the code boss!"); return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 73) { alert("Want to inspect element? Not today."); return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) { return false; }
    if(e.ctrlKey && e.keyCode == 85) { alert("View source disabled. Just enjoy the game."); return false; }
};

setInterval(function() {
    let before = new Date().getTime();
    debugger;
    let after = new Date().getTime();
    if (after - before > 100) {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20vh;'>CLOSE DEVELOPER TOOLS NOW! ARE YOU A HACKER??</h1>";
        document.body.style.background = "black";
    }
}, 1000);

document.addEventListener('dragstart', e => e.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
    if(!document.getElementById('bgm-ngeselin')) {
        let audio = document.createElement('audio');
        audio.id = 'bgm-ngeselin';
        audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; 
        audio.loop = true;
        audio.volume = 0.2; 
        document.body.appendChild(audio);

        document.body.addEventListener('click', function playAudio() {
            audio.play().catch(e => console.log("Audio play blocked:", e));
            document.body.removeEventListener('click', playAudio); 
        }, { once: true });
    }
});

function playBruh() {
    let sfx = new Audio('https://www.myinstants.com/media/sounds/movie_1.mp3'); 
    sfx.volume = 0.8;
    sfx.play().catch(e => {});
}