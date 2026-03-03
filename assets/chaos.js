const btn = document.getElementById('btn-masuk');
const judul = document.getElementById('judul');
let escapeCount = 0;

// Tombol kabur pas di-hover (Versi Modern Smooth)
btn.addEventListener('mouseover', function() {
    if (escapeCount < 10) {
        // Pindah-pindah menggunakan transform biar ada efek smooth dan hardware accelerated
        // Hitung batas layar relatif terhadap tombol
        const maxX = window.innerWidth / 2 - 100; 
        const maxY = window.innerHeight / 2 - 50;

        const randomX = (Math.random() * 2 - 1) * maxX;
        const randomY = (Math.random() * 2 - 1) * maxY;
        const randomRot = (Math.random() * 40 - 20); // Rotasi miring dikit
        
        this.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(0.9)`;
        
        // Ubah teks perlahan-lahan buat ngejek
        const taunts = [
            "Eits, meleset!",
            "Kurang cepet bro",
            "Masa gitu doang gak kena?",
            "Latihan nembak di mana lu?",
            "Gausah dipaksa bang",
            "Sini tangkep kalau bisa"
        ];
        this.innerText = taunts[escapeCount % taunts.length];
        
        escapeCount++;
    } else {
        // Kalau udah 10 kali kabur, kasih jalan, tapi...
        this.innerText = "Yaudah iya, masuk gih.";
        this.style.transform = "translate(0, 0) scale(1.1)";
        this.style.backgroundColor = "var(--danger-color)";
        this.style.boxShadow = "0 0 30px rgba(239, 68, 68, 0.8)";
    }
});

// Kalau user hoki atau pinter
btn.addEventListener('click', function() {
    document.getElementById('hidden-warning').style.display = 'block';
    judul.innerText = "WALAWE! LU NGE-CHEAT YAA??";
    
    // Efek glitch modern
    document.body.style.animation = "shake 0.1s infinite";
    document.body.style.filter = "hue-rotate(90deg) contrast(200%)";
    
    setTimeout(() => {
        document.body.style.animation = "none";
        document.body.style.filter = "none";
        // Pindah ke halaman neraka pertama
        window.location.href = "pages/walawe.html";
    }, 2000);
});
