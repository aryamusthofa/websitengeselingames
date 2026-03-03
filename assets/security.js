// --- SISTEM KEAMANAN (ANTI-HACKER & ANTI-CHEAT) ---

// 1. Mencegah Klik Kanan (Context Menu)
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Mencegah kombinasi tombol Inspect Element / Developer Tools
document.onkeydown = function(e) {
    if(e.keyCode == 123) { alert("Dilarang ngintip kode bos!"); return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 73) { alert("Mau inspect element? Gak bisa wleee."); return false; }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) { return false; }
    if(e.ctrlKey && e.keyCode == 85) { alert("View source dimatikan. Nikmati aja gamenya."); return false; }
};

// 3. Deteksi kalau Developer Tools kebuka (Teknik Debugger)
setInterval(function() {
    let before = new Date().getTime();
    debugger;
    let after = new Date().getTime();
    if (after - before > 100) {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20vh;'>TUTUP DEVELOPER TOOLS SEKARANG JUGA! HACKER YAA??</h1>";
        document.body.style.background = "black";
    }
}, 1000);

// 4. Mencegah Drag & Drop
document.addEventListener('dragstart', e => e.preventDefault());

// --- SISTEM MEDIA (BGM & SOUND EFFECTS) ---
// Memasang BGM (Background Music) Ngeselin - Elevator Music (Kevin MacLeod - Local Forecast) dari URL public
document.addEventListener('DOMContentLoaded', () => {
    // Hindari duplikasi audio jika script ter-load dua kali
    if(!document.getElementById('bgm-ngeselin')) {
        let audio = document.createElement('audio');
        audio.id = 'bgm-ngeselin';
        // URL Publik yang dijamin jalan (No Copyright Music)
        audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; 
        audio.loop = true;
        audio.volume = 0.2; // Volume pelan biar kerasa kayak di lift beneran
        document.body.appendChild(audio);

        // Auto-play biasanya diblokir browser, jadi kita play pas user klik pertama kali
        document.body.addEventListener('click', function playAudio() {
            audio.play().catch(e => console.log("Audio play di-block:", e));
            document.body.removeEventListener('click', playAudio); // Hapus event setelah jalan
        }, { once: true });
    }
});

// Fungsi Global untuk Sound Effect "Bruh" / "Oof"
function playBruh() {
    let sfx = new Audio('https://www.myinstants.com/media/sounds/movie_1.mp3'); // Bruh sound
    sfx.volume = 0.8;
    sfx.play().catch(e => {});
}

