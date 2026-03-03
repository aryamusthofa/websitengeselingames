function initUI() {
    // Hindari duplikasi
    if(document.getElementById('modern_translate_btn')) return;

    // 1. Tombol Translate Modern (Pojok Kanan Atas)
    const translateBtn = document.createElement('button');
    translateDivId = 'modern_translate_btn';
    translateBtn.id = translateDivId;
    translateBtn.innerHTML = `🌍 <span id="current_lang_text">ID</span>`;
    translateBtn.style.cssText = `
        position: absolute; top: 15px; right: 15px; z-index: 2147483647; 
        background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px;
        padding: 8px 15px; color: white; font-weight: bold; font-size: 14px; font-family: 'Inter', sans-serif;
        cursor: pointer; display: flex; align-items: center; gap: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; animation: none !important; transform: none !important;
    `;
    
    // Hover effect untuk tombol
    translateBtn.onmouseover = () => { translateBtn.style.background = 'rgba(255, 255, 255, 0.2)'; translateBtn.style.transform = 'translateY(-2px)'; };
    translateBtn.onmouseout = () => { translateBtn.style.background = 'rgba(255, 255, 255, 0.1)'; translateBtn.style.transform = 'translateY(0)'; };

    // 2. Dropdown Menu Bahasa (Modern UI)
    const langMenu = document.createElement('div');
    langMenu.id = 'modern_lang_menu';
    langMenu.style.cssText = `
        display: none; position: absolute; top: 60px; right: 15px; z-index: 2147483647;
        background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
        padding: 10px; width: 140px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        flex-direction: column; gap: 5px; animation: fadeIn 0.2s ease;
    `;

    const languages = [
        { code: 'id', label: '🇮🇩 Indonesia' },
        { code: 'en', label: '🇬🇧 English' },
        { code: 'ja', label: '🇯🇵 Japanese' },
        { code: 'ko', label: '🇰🇷 Korean' },
        { code: 'ar', label: '🇸🇦 Arabic' },
        { code: 'ru', label: '🇷🇺 Russian' }
    ];

    languages.forEach(lang => {
        let opt = document.createElement('div');
        opt.innerHTML = lang.label;
        opt.style.cssText = `
            padding: 8px 12px; color: #e2e8f0; font-family: 'Inter', sans-serif; font-size: 13px;
            cursor: pointer; border-radius: 8px; transition: all 0.2s ease;
        `;
        opt.onmouseover = () => { opt.style.background = 'rgba(255, 255, 255, 0.1)'; opt.style.color = '#fff'; };
        opt.onmouseout = () => { opt.style.background = 'transparent'; opt.style.color = '#e2e8f0'; };
        
        opt.onclick = () => {
            document.getElementById('current_lang_text').innerText = lang.code.toUpperCase();
            triggerGoogleTranslate(lang.code);
            langMenu.style.display = 'none';
        };
        langMenu.appendChild(opt);
    });

    // Toggle Menu
    translateBtn.onclick = () => {
        langMenu.style.display = langMenu.style.display === 'none' ? 'flex' : 'none';
    };

    // 3. Bottom Left Menu (About & Donasi) - Tetap Modern
    const bottomMenu = document.createElement('div');
    bottomMenu.style.cssText = 'position: absolute; bottom: 15px; left: 15px; z-index: 2147483647; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: "Inter", sans-serif; pointer-events: auto; width: 100%; max-width: 300px; animation: none !important; transform: none !important;';
    
    bottomMenu.innerHTML = `
        <button onclick="showAboutDev()" style="padding: 10px 16px; font-size: 13px; font-weight: 600; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: all 0.3s ease; margin: 0; animation: none !important;">🧑‍💻 About Dev</button>
        <a href="https://saweria.co/armuzzbrothersdev" target="_blank" style="padding: 10px 16px; font-size: 13px; font-weight: 600; background: linear-gradient(135deg, #ffcc00, #ff9900); color: black; border: none; border-radius: 10px; cursor: pointer; text-decoration: none; box-shadow: 0 4px 12px rgba(255, 204, 0, 0.4); display: inline-block; margin: 0; animation: none !important; transition: transform 0.2s;">☕ Donasi</a>
    `;

    // 4. Modal About Dev
    const aboutModal = document.createElement('div');
    aboutModal.id = 'about-dev-modal';
    aboutModal.style.cssText = 'display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(15, 23, 42, 0.95); color: white; padding: 35px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); z-index: 2147483647; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.8); min-width: 320px; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); font-family: "Inter", sans-serif; animation: fadeInScale 0.3s ease !important;';
    
    aboutModal.innerHTML = `
        <h2 style="margin-top:0; color:#a5b4fc; font-size: 26px; font-weight: 800; margin-bottom: 20px; letter-spacing: -0.5px;">Developer Profile</h2>
        <div style="font-size: 15px; line-height: 1.8; color: #cbd5e1; text-align: left; padding: 0 10px; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 15px;">
            <p style="margin: 5px 0;"><strong>👤 Nama:</strong> Arya Musthofa</p>
            <p style="margin: 5px 0;"><strong>🌍 Asal:</strong> Indonesia, Central Java</p>
            <p style="margin: 5px 0;"><strong>📸 Instagram:</strong> <a href="https://instagram.com/galeri_armus" target="_blank" style="color: #fb7185; text-decoration: none; font-weight: bold;">@galeri_armus</a></p>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 25px; font-style: italic;">Sang Arsitek di balik penderitaan Anda di website ini.</p>
        <button onclick="closeAboutDev()" style="margin-top: 25px; padding: 12px 25px; background: #ef4444; color: white; font-weight: bold; border: none; border-radius: 10px; cursor: pointer; width: 100%; transition: background 0.2s;">Tutup</button>
    `;

    // 5. Container Tersembunyi buat API Google Translate Asli
    const hiddenGoogleDiv = document.createElement('div');
    hiddenGoogleDiv.id = 'google_translate_element';
    hiddenGoogleDiv.style.display = 'none';

    // Masukkan ke body
    document.body.appendChild(translateBtn);
    document.body.appendChild(langMenu);
    document.body.appendChild(bottomMenu);
    document.body.appendChild(aboutModal);
    document.body.appendChild(hiddenGoogleDiv);

    // CSS Tambahan untuk hide banner google yang ngeyel & animasi
    const styleFix = document.createElement('style');
    styleFix.innerHTML = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        #goog-gt-tt { display: none !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
    `;
    document.head.appendChild(styleFix);

    // Load API Google Translate
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
}

// Cek DOM Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
} else {
    initUI();
}

// Init API Tersembunyi
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'id',
        autoDisplay: false
    }, 'google_translate_element');
};

// Fungsi Rahasia buat Ngetrigger Translasi (Hack ala Hacker)
window.triggerGoogleTranslate = function(langCode) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    }
};

window.showAboutDev = function() { document.getElementById('about-dev-modal').style.display = 'block'; };
window.closeAboutDev = function() { document.getElementById('about-dev-modal').style.display = 'none'; };

window.showAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'block';
};
window.closeAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'none';
};
