document.addEventListener('DOMContentLoaded', () => {
    // Container Utama untuk UI Tambahan
    const uiContainer = document.createElement('div');
    
    // 1. Google Translate Dropdown (Pojok Kanan Atas)
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: sans-serif;';
    
    // 2. Bottom Left Menu (About & Donasi)
    const bottomMenu = document.createElement('div');
    bottomMenu.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 10000; display: flex; gap: 10px; align-items: center; font-family: sans-serif;';
    
    bottomMenu.innerHTML = `
        <button onclick="showAboutDev()" style="padding: 10px 15px; font-size: 13px; background: rgba(0,0,0,0.8); color: white; border: 1px solid #444; border-radius: 8px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">🧑‍💻 About Dev</button>
        <a href="https://saweria.co/armuzzbrothersdev" target="_blank" style="padding: 10px 15px; font-size: 13px; background: #ffcc00; color: black; font-weight: bold; border: 1px solid #da8b00; border-radius: 8px; cursor: pointer; text-decoration: none; display: flex; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">☕ Donasi</a>
    `;

    // 3. Modal About Dev
    const aboutModal = document.createElement('div');
    aboutModal.id = 'about-dev-modal';
    aboutModal.style.cssText = 'display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(15, 23, 42, 0.95); color: white; padding: 30px; border-radius: 16px; border: 1px solid #334155; z-index: 10001; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.8); min-width: 320px; backdrop-filter: blur(10px); font-family: sans-serif;';
    
    aboutModal.innerHTML = `
        <h2 style="margin-top:0; color:#818cf8; font-size: 24px; margin-bottom: 20px;">Developer Profile</h2>
        <div style="font-size: 16px; line-height: 1.8; color: #cbd5e1; text-align: left; padding: 0 10px;">
            <p style="margin: 5px 0;"><strong>👤 Nama:</strong> Arya Musthofa</p>
            <p style="margin: 5px 0;"><strong>🌍 Asal:</strong> Indonesia, Central Java</p>
            <p style="margin: 5px 0;"><strong>📸 Instagram:</strong> <a href="https://instagram.com/galeri_armus" target="_blank" style="color: #fb7185; text-decoration: none; font-weight: bold;">@galeri_armus</a></p>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 25px; font-style: italic;">Sang Arsitek di balik penderitaan Anda di website ini.</p>
        <button onclick="closeAboutDev()" style="margin-top: 20px; padding: 12px 25px; background: #ef4444; color: white; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; width: 100%;">Tutup</button>
    `;

    // Masukkan ke body
    uiContainer.appendChild(translateDiv);
    uiContainer.appendChild(bottomMenu);
    uiContainer.appendChild(aboutModal);
    document.body.appendChild(uiContainer);

    // Load Google Translate Script secara dinamis
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
});

// Global functions untuk Translasi dan Modal
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'id', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
};

window.showAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'block';
};
window.closeAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'none';
};
