const btn = document.getElementById('btn-masuk');
const judul = document.getElementById('judul');
let escapeCount = 0;

btn.addEventListener('mouseover', function() {
    if (escapeCount < 10) {
        const maxX = window.innerWidth / 2 - 100; 
        const maxY = window.innerHeight / 2 - 50;

        const randomX = (Math.random() * 2 - 1) * maxX;
        const randomY = (Math.random() * 2 - 1) * maxY;
        const randomRot = (Math.random() * 40 - 20); 
        
        this.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(0.9)`;
        
        const taunts = [
            "Oops, missed!",
            "Too slow bro",
            "Can't even catch this?",
            "Where did you learn to aim?",
            "Don't force it bro",
            "Come catch me if you can"
        ];
        this.innerText = taunts[escapeCount % taunts.length];
        
        escapeCount++;
    } else {
        this.innerText = "Fine, go ahead.";
        this.style.transform = "translate(0, 0) scale(1.1)";
        this.style.backgroundColor = "var(--danger-color)";
        this.style.boxShadow = "0 0 30px rgba(239, 68, 68, 0.8)";
    }
});

btn.addEventListener('click', function() {
    document.getElementById('hidden-warning').style.display = 'block';
    judul.innerText = "WOAH! ARE YOU CHEATING??";
    
    document.body.style.animation = "shake 0.1s infinite";
    document.body.style.filter = "hue-rotate(90deg) contrast(200%)";
    
    setTimeout(() => {
        document.body.style.animation = "none";
        document.body.style.filter = "none";
        window.location.href = "pages/walawe.html";
    }, 2000);
});