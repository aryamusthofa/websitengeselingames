function createParticles() {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        let size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        let duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(particle);
    }
}

function getRunConfig() {
    let config = localStorage.getItem('run_config');
    if (!config) {
        const words = [
            "CAT", "LIZARD", "GECKO", "MOUSE", "GOAT", "COCKROACH", 
            "MOSQUITO", "PANGOLIN", "BIRD", "CAPYBARA", "PLATYPUS",
            "CRICKET", "CATFISH", "ANTLION", "CHAMELEON"
        ];
        const bulan = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐯', '🦁', '🐮', '🐷', '🐵', '🦉'];

        let a = Math.floor(Math.random() * 50) + 10;
        let b = Math.floor(Math.random() * 10) + 2;
        let c = Math.floor(Math.random() * 30) + 1;

        config = {
            level1_taps: Math.floor(Math.random() * 5) + 3,
            level2_target: Math.floor(Math.random() * 15) + 5,
            level2_twist: Math.floor(Math.random() * 100) + 30,
            math_q: `${a} x ${b} - ${c}`,
            math_a: (a * b) - c,
            captcha_word: words[Math.floor(Math.random() * words.length)],
            pwd_sum: Math.floor(Math.random() * 20) + 15,
            pwd_month: bulan[Math.floor(Math.random() * bulan.length)],
            pwd_emoji: emojis[Math.floor(Math.random() * emojis.length)],
            audio_trap_x: Math.floor(Math.random() * 80) + 10,
            audio_trap_y: Math.floor(Math.random() * 60) + 20
        };
        localStorage.setItem('run_config', JSON.stringify(config));
    }
    return JSON.parse(localStorage.getItem('run_config'));
}

const runConfig = getRunConfig();

function saveProgress(pagePath) {
    localStorage.setItem('level_ngeselin', pagePath);
}

function resetProgress() {
    if(confirm("Are you sure you want to erase all this suffering and start from scratch? All puzzles will be randomized!")) {
        if(confirm("Really sure? Your efforts will be in vain.")) {
            document.body.style.transition = "all 1s cubic-bezier(0.5, -0.5, 0.5, 1.5)";
            document.body.style.transform = "scale(0) rotate(720deg)";
            document.body.style.opacity = "0";
            
            setTimeout(() => {
                localStorage.removeItem('level_ngeselin');
                localStorage.removeItem('run_config');
                
                if(window.location.pathname.includes('/pages/')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        }
    }
}

function showResetOffer() {
    const btn = document.createElement('button');
    btn.innerText = "🔄 Give Up & Restart (Random Map)";
    btn.style.position = "fixed";
    btn.style.bottom = "80px";
    btn.style.right = "20px";
    btn.style.padding = "10px 15px";
    btn.style.fontSize = "12px";
    btn.style.background = "rgba(0,0,0,0.5)";
    btn.style.color = "white";
    btn.style.border = "1px solid white";
    btn.style.zIndex = "9999";
    btn.onclick = resetProgress;
    
    btn.onmouseover = function() {
        if(Math.random() > 0.5) {
            this.style.transform = `translate(${Math.random()*20-10}px, ${Math.random()*20-10}px)`;
        }
    };
    
    document.body.appendChild(btn);
}

setTimeout(showResetOffer, 3000);

(function loadUI() {
    const uiScript = document.createElement('script');
    const isRoot = !window.location.pathname.includes('/pages/') && !window.location.pathname.includes('pages');
    uiScript.src = isRoot ? 'assets/ui.js' : '../assets/ui.js';
    document.head.appendChild(uiScript);
})();

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});