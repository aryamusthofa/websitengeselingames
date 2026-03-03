// Menambahkan Partikel Modern Dinamis ke Background
function createParticles() {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize size, position, and animation duration
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

// Jalankan saat load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Load UI Extras (Translate, Donasi, About) secara otomatis
    const uiScript = document.createElement('script');
    const isRoot = !window.location.pathname.includes('/pages/') && !window.location.pathname.includes('pages');
    uiScript.src = isRoot ? 'assets/ui.js' : '../assets/ui.js';
    document.body.appendChild(uiScript);
});

// --- SISTEM DINAMIS (ROGUELIKE) TANPA PHP ---
function getRunConfig() {
    let config = localStorage.getItem('run_config');
    if (!config) {
        // Generate random parameters untuk run ini
        const words = [
            "KUCING", "BIAWAK", "KADAL", "TIKUS", "KAMBING", "KECOA", 
            "NYAMUK", "TRENGGILING", "CENDRAWASIH", "KAPIBAKA", "PLATIPUS",
            "JANGKRIK", "LUNDU", "UNDURUNDUR", "BUNGLON"
        ];
        const bulan = ['JANUARI','FEBRUARI','MARET','APRIL','MEI','JUNI','JULI','AGUSTUS','SEPTEMBER','OKTOBER','NOVEMBER','DESEMBER'];
        const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐯', '🦁', '🐮', '🐷', '🐵', '🦉'];

        let a = Math.floor(Math.random() * 50) + 10;
        let b = Math.floor(Math.random() * 10) + 2;
        let c = Math.floor(Math.random() * 30) + 1;

        config = {
            level1_taps: Math.floor(Math.random() * 5) + 3, // 3 sampai 7 tap
            level2_target: Math.floor(Math.random() * 15) + 5, // 5 sampai 20 klik
            level2_twist: Math.floor(Math.random() * 100) + 30, // Twist 30 sampai 130
            math_q: `${a} x ${b} - ${c}`,
            math_a: (a * b) - c,
            captcha_word: words[Math.floor(Math.random() * words.length)],
            pwd_sum: Math.floor(Math.random() * 20) + 15, // Sum 15-35
            pwd_month: bulan[Math.floor(Math.random() * bulan.length)],
            pwd_emoji: emojis[Math.floor(Math.random() * emojis.length)],
            // Trap audio posisi dinamis (X dan Y persen)
            audio_trap_x: Math.floor(Math.random() * 80) + 10,
            audio_trap_y: Math.floor(Math.random() * 60) + 20
        };
        localStorage.setItem('run_config', JSON.stringify(config));
    }
    return JSON.parse(localStorage.getItem('run_config'));
}

// Inisialisasi config saat load
const runConfig = getRunConfig();

// Fungsi buat simpen data level
function saveProgress(pagePath) {
    localStorage.setItem('level_ngeselin', pagePath);
}

// Fungsi buat ngereset penderitaan (Ganti Seed/Random)
function resetProgress() {
    if(confirm("Yakin mau hapus semua penderitaan ini dan mengulang dari nol? Semua teka-teki akan diacak ulang!")) {
        if(confirm("Beneran yakin? Usaha Anda bakal sia-sia lho.")) {
            // Animasi hancur sebelum reset
            document.body.style.transition = "all 1s cubic-bezier(0.5, -0.5, 0.5, 1.5)";
            document.body.style.transform = "scale(0) rotate(720deg)";
            document.body.style.opacity = "0";
            
            setTimeout(() => {
                localStorage.removeItem('level_ngeselin');
                localStorage.removeItem('run_config'); // Hapus seed biar isi teka-tekinya kerandom ulang
                
                // Selalu kembali ke index.html (Gerbang Awal)
                if(window.location.pathname.includes('/pages/')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        }
    }
}

// Bikin tombol Tawaran Reset melayang di pojok layar
function showResetOffer() {
    const btn = document.createElement('button');
    btn.innerText = "🔄 Nyerah & Ulangi (Acak Map)";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px 15px";
    btn.style.fontSize = "12px";
    btn.style.background = "rgba(0,0,0,0.5)";
    btn.style.color = "white";
    btn.style.border = "1px solid white";
    btn.style.zIndex = "9999";
    btn.onclick = resetProgress;
    
    // Tombol kabur dikit kalau di-hover biar tetep konsisten ngeselin
    btn.onmouseover = function() {
        if(Math.random() > 0.5) {
            this.style.transform = `translate(${Math.random()*20-10}px, ${Math.random()*20-10}px)`;
        }
    };
    
    document.body.appendChild(btn);
}

// Tampilkan tombol nyerah setelah 3 detik di tiap halaman
setTimeout(showResetOffer, 3000);
