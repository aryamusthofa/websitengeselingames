function initUI() {
    // Hindari duplikasi
    if(document.getElementById('google_translate_element')) return;

    // Container Utama untuk UI Tambahan
    const uiContainer = document.createElement('div');
    
    // 1. Google Translate Dropdown (Pojok Kanan Atas)
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    // Style diperkuat, z-index dimaksimalkan, dikasih overflow visible biar menu dropdownnya bisa turun.
    translateDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 2147483647; background: white; padding: 5px 10px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-family: Arial, sans-serif; overflow: visible; display: block !important; opacity: 1 !important; visibility: visible !important; min-width: 150px; min-height: 35px; color: black;';
    
    // 2. Bottom Left Menu (About & Donasi)
    const bottomMenu = document.createElement('div');
    // Memaksa posisi absolute bottom kiri dan max-width supaya tidak bergeser aneh di layar kecil. Flex wrap mencegah kepotong.
    bottomMenu.style.cssText = 'position: fixed; bottom: 15px; left: 15px; z-index: 2147483647; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: Arial, sans-serif; pointer-events: auto; width: 100%; max-width: 300px;';
    
    bottomMenu.innerHTML = `
        <button onclick="showAboutDev()" style="padding: 8px 12px; font-size: 13px; font-weight: bold; background: rgba(15, 23, 42, 0.9); color: white; border: 1px solid #444; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.5); font-family: Arial, sans-serif; margin: 0;">🧑‍💻 About Dev</button>
        <a href="https://saweria.co/armuzzbrothersdev" target="_blank" style="padding: 8px 12px; font-size: 13px; font-weight: bold; background: #ffcc00; color: black; border: 1px solid #da8b00; border-radius: 6px; cursor: pointer; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.5); font-family: Arial, sans-serif; display: inline-block; margin: 0;">☕ Donasi</a>
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
}

// Cek apakah DOM sudah diload. Jika sudah, langsung jalankan. Jika belum, tunggu event.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
} else {
    initUI();
}

// Global functions untuk Translasi dan Modal
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'id', 
        includedLanguages: 'en,id,ja,ko,zh-CN,ar,ru,es,fr,de,hi', // Bahasa penting
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};

// CSS Tambahan untuk maksa Google Translate tampil normal & sembunyikan bar atas google
const styleFix = document.createElement('style');
styleFix.innerHTML = `
    .goog-te-gadget-simple { background-color: white !important; border: none !important; font-size: 14px !important; padding: 2px !important; }
    .goog-te-gadget-icon { display: none !important; } /* Sembunyikan ikon Google */
    .goog-te-menu-value span { color: black !important; }
    .goog-te-banner-frame.skiptranslate { display: none !important; } /* Sembunyikan banner atas Google Translate */
    body { top: 0px !important; } /* Fix bug body turun karena Google Translate */
    #google_translate_element select { color: black; background: white; padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
`;
document.head.appendChild(styleFix);

window.showAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'block';
};
window.closeAboutDev = function() {
    document.getElementById('about-dev-modal').style.display = 'none';
};
