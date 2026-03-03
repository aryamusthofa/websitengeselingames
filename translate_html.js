const fs = require('fs');

const files = {
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Personal Blog</title>
    <link rel="stylesheet" href="assets/main.css">
</head>
<body>
    <div class="container" style="text-align: left;">
        <h1 id="judul">Welcome.</h1>
        <p>Hello, this is my personal page. Nothing special here, just a place to write my thoughts.</p>
        <p>If you want to read my first article, please click the button below.</p>
        <button id="btn-normal" onclick="window.location.href='pages/level1.html'">Read Article</button>
        <button id="btn-reset" style="display:none; background:red; margin-top:10px;" onclick="resetProgress()">Erase Data (Reset)</button>
    </div>
    
    <script src="assets/security.js"></script>
    <script src="assets/progress.js"></script>
    <script>
        if(localStorage.getItem('level_ngeselin')) {
            document.getElementById('judul').innerText = "Oh, you're back?";
            document.querySelector('p').innerText = "Seems you haven't had enough. Want to continue the suffering?";
            document.getElementById('btn-normal').innerText = "Continue Journey";
            document.getElementById('btn-reset').style.display = 'inline-block';
            
            document.getElementById('btn-normal').onclick = function() {
                window.location.href = localStorage.getItem('level_ngeselin');
            };
        }
    </script>
</body>
</html>`,

  'pages/level1.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article 1 - Introduction</title>
    <link rel="stylesheet" href="../assets/main.css">
    <style>
        body { text-align: left; background: #fff; padding: 50px; }
        .artikel-teks { font-size: 18px; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333; }
        #lanjut { padding: 10px 20px; font-size: 16px; margin-top: 30px; cursor: pointer; transition: opacity 2s; }
        #pesan-aneh { display: none; color: red; font-size: 14px; margin-top: 10px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="artikel-teks">
        <h2>Chapter 1: The Beginning of Something Normal</h2>
        <p>Hello, thank you for reading. This world is full of unexpected things, but here, everything works as it should.</p>
        <p>There is nothing to worry about. If you feel ready to read the next chapter, please click the button below.</p>
        
        <button id="lanjut" onclick="window.location.href='level2_popup.html'">Next Chapter</button>
        <p id="pesan-aneh">Wait, where did the button go? Try refreshing or find a way to click it lol.</p>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/level1.html');

        const btn = document.getElementById('lanjut');
        const pesan = document.getElementById('pesan-aneh');
        
        document.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const dist = Math.hypot(e.clientX - (rect.left + rect.width/2), e.clientY - (rect.top + rect.height/2));
            
            if(dist < 150) {
                btn.style.opacity = Math.max(0, dist / 150);
                if(dist < 50) {
                    btn.style.pointerEvents = 'none';
                    pesan.style.display = 'block';
                } else {
                    btn.style.pointerEvents = 'auto';
                }
            } else {
                btn.style.opacity = 1;
                pesan.style.display = 'none';
            }
        });

        let tapCount = 0;
        let targetTaps = runConfig.level1_taps || 5;
        
        pesan.addEventListener('click', () => {
            tapCount++;
            if (tapCount < targetTaps) {
                pesan.innerHTML = `Wait, where did the button go? Try refreshing or find a way to click it lol. <br><span style="font-size:10px; color:#999;">(Tap \${tapCount}/\${targetTaps})</span>`;
            } else {
                btn.style.opacity = 1;
                btn.style.pointerEvents = 'auto';
                pesan.innerHTML = "Oh, you're smart enough to find the secret button. Go ahead and click it.";
                pesan.style.color = "lime";
            }
        });
    </script>
</body>
</html>`,

  'pages/level2_popup.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Confirmation</title>
    <style>
        body { background: #222; color: #fff; font-family: sans-serif; text-align: center; padding-top: 100px; overflow: hidden; }
        .modal {
            display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: white; color: black; padding: 30px; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.5);
            z-index: 1000; min-width: 300px;
        }
        .overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 999; }
        input { font-size: 18px; padding: 5px; width: 80%; margin-top: 10px; text-align: center; }
        button { margin-top: 15px; padding: 10px 20px; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Please Wait...</h1>
    <p>We detected suspicious activity. (Just an excuse honestly)</p>

    <div class="overlay" id="overlay"></div>
    <div class="modal" id="modal">
        <h2 id="modal-judul">Human Verification</h2>
        <p id="modal-teks">Click the button below to prove you are not a bored robot.</p>
        <button id="btn-klik">Click Me!</button>
        <div id="math-section" style="display:none; margin-top:20px;">
            <p id="math-text">Wait, prove you are smart:</p>
            <input type="number" id="jawaban" placeholder="Answer here...">
            <br>
            <button id="btn-jawab">Submit</button>
        </div>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/level2_popup.html');

        const overlay = document.getElementById('overlay');
        const modal = document.getElementById('modal');
        const btnKlik = document.getElementById('btn-klik');
        const mathSec = document.getElementById('math-section');
        const modalTeks = document.getElementById('modal-teks');
        const mathText = document.getElementById('math-text');
        
        let klikCount = 0;
        let butuhKlik = runConfig.level2_target;
        let twistKlik = runConfig.level2_twist;

        setTimeout(() => {
            overlay.style.display = 'block';
            modal.style.display = 'block';
            modalTeks.innerHTML = `Click the button below \${butuhKlik} times to prove you are not a bored robot.`;
            btnKlik.innerText = `Click Me! (0/\${butuhKlik})`;
            mathText.innerText = `Wait, prove you are smart: What is \${runConfig.math_q}?`;
        }, 1500);

        btnKlik.addEventListener('click', () => {
            klikCount++;
            btnKlik.innerText = `Click Me! (\${klikCount}/\${butuhKlik})`;
            
            if (klikCount === butuhKlik - 1) {
                butuhKlik = twistKlik;
                modalTeks.innerHTML = `Oops! Server lag. Due to our mistake, the target is now \${twistKlik} times. Good luck!`;
                btnKlik.innerText = `Click Me! (\${klikCount}/\${butuhKlik})`;
                btnKlik.style.background = 'red';
                btnKlik.style.color = 'white';
            }

            if (klikCount >= twistKlik) {
                btnKlik.style.display = 'none';
                modalTeks.innerHTML = `Wow you actually clicked it. Now solve the Math below.`;
                mathSec.style.display = 'block';
            }
        });

        document.getElementById('btn-jawab').addEventListener('click', () => {
            const jaw = document.getElementById('jawaban').value;
            if (jaw == runConfig.math_a) {
                alert("Pretty smart, where did you get that calculator?");
                window.location.href = 'checkpoint1.html';
            } else {
                if(typeof playBruh === 'function') playBruh();
                alert("Wrong boss! Try calculating slowly.");
            }
        });
    </script>
</body>
</html>`,

  'pages/checkpoint1.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkpoint 1</title>
    <style>
        body { background: #d4edda; color: #155724; font-family: 'Georgia', serif; text-align: center; padding-top: 15vh; }
        .box { background: white; display: inline-block; padding: 40px; border-radius: 10px; border: 2px solid #c3e6cb; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        h1 { margin-top: 0; }
        .btn-lanjut { margin-top: 20px; padding: 15px 30px; font-size: 18px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="box">
        <h1>First Refugee Camp ⛺</h1>
        <p>Congratulations! You have passed the initial gate of suffering.</p>
        <p>Please rest for a moment, take a breath, drink some water.</p>
        <p><em>Your progress has been saved (by force).</em></p>
        
        <button class="btn-lanjut" onclick="window.location.href='audio_trap.html'">Continue Climbing</button>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/checkpoint1.html');
    </script>
</body>
</html>`,

  'pages/audio_trap.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soundproof Room</title>
    <style>
        body { background: #111; color: #555; text-align: center; padding-top: 100px; font-family: monospace; transition: background 0.1s; overflow: hidden; }
        p { font-size: 14px; }
        h1 { color: #333; }
        #tombol-rahasia { 
            opacity: 0.05; cursor: pointer; padding: 50px; border: 1px solid #333; 
            position: absolute; 
        }
        #warning { display: none; color: red; font-size: 50px; font-weight: bold; margin-top: 50px; position: relative; z-index: 10;}
    </style>
</head>
<body>
    <h1>Shh... Don't make a sound.</h1>
    <p>Click the faint box on the screen to pass quietly.</p>
    <p>Do not click anywhere else. Seriously.</p>

    <div id="tombol-rahasia">Box</div>
    <div id="warning">TOO LOUD!!!</div>

    <audio id="audio-jumpscare" src="https://www.myinstants.com/media/sounds/vine-boom.mp3"></audio>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/audio_trap.html');
        
        const audio = document.getElementById('audio-jumpscare');
        const kotak = document.getElementById('tombol-rahasia');
        let kenaTrap = false;

        kotak.style.left = runConfig.audio_trap_x + '%';
        kotak.style.top = runConfig.audio_trap_y + '%';

        document.body.addEventListener('click', function(e) {
            if (e.target.id === 'tombol-rahasia') {
                if (!kenaTrap) {
                    window.location.href = 'button_hunt.html';
                }
            } else {
                audio.currentTime = 0;
                audio.play(); 
                
                document.body.style.background = 'white';
                setTimeout(() => document.body.style.background = '#111', 50);
                
                document.getElementById('warning').style.display = 'block';
                kenaTrap = true;
                
                setTimeout(() => {
                    alert("Told you not to click randomly! Go back!");
                    window.location.href = 'checkpoint1.html';
                }, 1000);
            }
        });
    </script>
</body>
</html>`,

  'pages/button_hunt.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hide and Seek</title>
    <style>
        body { background: white; margin: 0; overflow: hidden; height: 100vh; cursor: crosshair; }
        #petunjuk { position: absolute; top: 20px; left: 20px; font-family: sans-serif; color: #999; }
        .tombol-invisible {
            position: absolute; width: 30px; height: 30px; background: transparent; border: none; cursor: pointer;
            outline: none;
        }
    </style>
</head>
<body>
    <div id="petunjuk">Find and click the transparent button on this screen. <br><br>Use your instincts.</div>
    <button id="target" class="tombol-invisible"></button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/button_hunt.html');

        const btn = document.getElementById('target');
        const petunjuk = document.getElementById('petunjuk');
        
        btn.style.left = Math.random() * (window.innerWidth - 30) + 'px';
        btn.style.top = Math.random() * (window.innerHeight - 30) + 'px';

        let klikSalah = 0;

        document.body.addEventListener('click', (e) => {
            if (e.target.id !== 'target') {
                klikSalah++;
                const rect = btn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - btnX, e.clientY - btnY);
                
                let clueSuhu = "Freezing cold...";
                if (dist < 50) clueSuhu = "HOT HOT HOT! Very close!";
                else if (dist < 150) clueSuhu = "Getting warmer.";
                else if (dist < 300) clueSuhu = "Not too bad, keep looking.";

                petunjuk.innerHTML = `Wrong click boss. You've tried \${klikSalah} times.<br><br>Search status: <strong>\${clueSuhu}</strong>`;
            }
        });

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Tab') {
                e.preventDefault();
                alert("Hey, no using the Tab key in this level. Find it manually!");
            }
        });

        btn.addEventListener('click', () => {
            document.body.style.background = 'lime';
            petunjuk.style.color = 'black';
            petunjuk.innerHTML = "Whoa you found it! Nice eyes. Next!";
            setTimeout(() => {
                window.location.href = 'captcha_v2.html';
            }, 1500);
        });
    </script>
</body>
</html>`,

  'pages/captcha_v2.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Broken Captcha</title>
    <style>
        body { font-family: Arial; text-align: center; padding-top: 100px; background: #eee; }
        .captcha-box { font-size: 40px; letter-spacing: 10px; font-weight: bold; background: url('https://www.transparenttextures.com/patterns/stardust.png') #ccc; display: inline-block; padding: 20px; text-decoration: line-through; user-select: none; }
        input { font-size: 20px; padding: 10px; margin-top: 20px; text-align: center; }
        #pesan { color: red; margin-top: 10px; }
    </style>
</head>
<body>
    <h2>Retype the Text Below:</h2>
    <div class="captcha-box" id="captcha-display">LOADING...</div>
    <br>
    <input type="text" id="input-teks" placeholder="Type the word above">
    <div id="pesan"></div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/captcha_v2.html');

        const input = document.getElementById('input-teks');
        const pesan = document.getElementById('pesan');
        const captchaDisplay = document.getElementById('captcha-display');
        
        const targetWord = runConfig.captcha_word;
        captchaDisplay.innerText = targetWord;
        
        const keyboardRusak = {};
        const abjad = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i=0; i<targetWord.length; i++) {
            let hurufAsli = targetWord[i];
            let hurufPalsu = abjad[Math.floor(Math.random() * abjad.length)];
            keyboardRusak[hurufAsli.toLowerCase()] = hurufPalsu.toLowerCase();
            keyboardRusak[hurufAsli.toUpperCase()] = hurufPalsu.toUpperCase();
        }

        input.addEventListener('keydown', (e) => {
            if (keyboardRusak[e.key]) {
                e.preventDefault();
                input.value += keyboardRusak[e.key];
                pesan.innerText = `Wait, is your keyboard broken? You typed '\${e.key}' but '\${keyboardRusak[e.key]}' came out?`;
            }
        });

        input.addEventListener('input', () => {
            if(input.value.toUpperCase() === targetWord) {
                alert("Eww cheating using Copy-Paste! Fine, you can pass.");
                window.location.href = 'password_hell.html';
            }
            if(input.value.length > targetWord.length + 5) {
                input.value = "";
                pesan.innerText = "Too long bro. Restart.";
            }
        });
    </script>
</body>
</html>`,

  'pages/password_hell.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Password</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #2c3e50; color: white; }
        .card { background: #34495e; padding: 40px; border-radius: 10px; width: 400px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        input { width: 100%; padding: 10px; margin-top: 10px; font-size: 16px; border: none; border-radius: 4px; box-sizing: border-box; }
        .syarat { font-size: 13px; margin-top: 10px; color: #bdc3c7; }
        .salah { color: #e74c3c; font-weight: bold; }
        .benar { color: #2ecc71; text-decoration: line-through; }
        button { width: 100%; padding: 10px; margin-top: 20px; background: #3498db; color: white; border: none; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Create a New Password</h2>
        <input type="text" id="pwd" placeholder="Enter password...">
        
        <ul class="syarat" id="daftar-syarat">
            <li id="s1" class="salah">Minimum 5 characters</li>
            <li id="s2" class="salah">Must contain a number</li>
            <li id="s3" class="salah">Must contain an uppercase letter</li>
            <li id="s4" style="display:none;" class="salah" id="txt-s4">Must contain a month name...</li>
            <li id="s5" style="display:none;" class="salah" id="txt-s5">Must contain an animal emoji...</li>
            <li id="s6" style="display:none;" class="salah" id="txt-s6">Sum of digits must equal...</li>
        </ul>
        <button id="btn-submit">Register</button>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/password_hell.html');

        const pwd = document.getElementById('pwd');
        const s1 = document.getElementById('s1');
        const s2 = document.getElementById('s2');
        const s3 = document.getElementById('s3');
        const s4 = document.getElementById('s4');
        const s5 = document.getElementById('s5');
        const s6 = document.getElementById('s6');

        s4.innerText = `Must contain the month: \${runConfig.pwd_month}`;
        s5.innerText = `Must contain this emoji: \${runConfig.pwd_emoji}`;
        s6.innerText = `The sum of the digits in the password must equal \${runConfig.pwd_sum}`;

        pwd.addEventListener('input', () => {
            let val = pwd.value;
            
            if(val.length >= 5) s1.className = 'benar'; else s1.className = 'salah';
            if(/\d/.test(val)) s2.className = 'benar'; else s2.className = 'salah';
            if(/[A-Z]/.test(val)) s3.className = 'benar'; else s3.className = 'salah';

            if(s1.className=='benar' && s2.className=='benar' && s3.className=='benar') {
                s4.style.display = 'list-item';
                if(val.toUpperCase().includes(runConfig.pwd_month)) s4.className = 'benar'; else s4.className = 'salah';
            }

            if(s4.className == 'benar') {
                s5.style.display = 'list-item';
                if(val.includes(runConfig.pwd_emoji)) s5.className = 'benar'; else s5.className = 'salah';
            }

            if(s5.className == 'benar') {
                s6.style.display = 'list-item';
                let sum = 0;
                for(let i=0; i<val.length; i++) {
                    if(!isNaN(parseInt(val[i]))) {
                        sum += parseInt(val[i]);
                    }
                }
                if(sum === runConfig.pwd_sum) s6.className = 'benar'; else s6.className = 'salah';
            }
        });

        document.getElementById('btn-submit').addEventListener('click', () => {
            if(s6.className === 'benar') {
                alert("DAMN YOU ACTUALLY DID IT! You pass.");
                window.location.href = 'color_blind.html';
            } else {
                alert("Requirements not met boss. Read carefully.");
            }
        });
    </script>
</body>
</html>`,

  'pages/color_blind.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eye Test</title>
    <style>
        body { text-align: center; font-family: sans-serif; padding: 50px; background: #fff; }
        .grid { display: grid; grid-template-columns: repeat(5, 60px); gap: 5px; justify-content: center; margin-top: 20px; }
        .kotak { width: 60px; height: 60px; cursor: pointer; border-radius: 5px; }
    </style>
</head>
<body>
    <h2>Click the box that is <strong>RED</strong></h2>
    <p>Do not click the wrong one.</p>
    
    <div class="grid" id="grid-warna"></div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/color_blind.html');

        const grid = document.getElementById('grid-warna');
        
        let indexMerah = Math.floor(Math.random() * 25);
        
        for(let i=0; i<25; i++) {
            let kotak = document.createElement('div');
            kotak.className = 'kotak';
            
            if(i === indexMerah) {
                kotak.style.backgroundColor = '#FF0000'; 
                kotak.addEventListener('click', () => {
                    alert("Your eyes are still healthy apparently.");
                    window.location.href = 'mouse_reverse.html';
                });
            } else {
                let red = 250 + Math.floor(Math.random() * 5);
                let green = 30 + Math.floor(Math.random() * 20);
                kotak.style.backgroundColor = `rgb(\${red}, \${green}, 0)`;
                
                kotak.addEventListener('click', () => {
                    alert("That's orange bro! Are you color blind? Restart this level!");
                    window.location.reload();
                });
            }
            grid.appendChild(kotak);
        }
    </script>
</body>
</html>`,

  'pages/mouse_reverse.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upside Down World</title>
    <style>
        body { margin: 0; height: 100vh; background: #333; color: white; overflow: hidden; cursor: none; font-family: monospace; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        #fake-cursor {
            position: absolute; width: 20px; height: 20px;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 3 10 21 14 14 21 10 3 3"></polygon></svg>') no-repeat;
            pointer-events: none; z-index: 9999;
        }
        .target-btn {
            padding: 20px 40px; font-size: 20px; background: lime; color: black; border: none; font-weight: bold; cursor: none;
        }
        #info { margin-bottom: 50px; font-size: 24px; text-align: center; }
    </style>
</head>
<body>
    <div id="fake-cursor"></div>
    <div id="info">Click the green button to pass.<br>P.S: Your mouse is now reversed.</div>
    <button class="target-btn" id="btn-hijau">Pass</button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/mouse_reverse.html');

        const fakeCursor = document.getElementById('fake-cursor');
        const btn = document.getElementById('btn-hijau');

        document.addEventListener('mousemove', (e) => {
            let winW = window.innerWidth;
            let winH = window.innerHeight;
            
            let fakeX = winW - e.clientX;
            let fakeY = winH - e.clientY;
            
            fakeCursor.style.left = fakeX + 'px';
            fakeCursor.style.top = fakeY + 'px';

            let rect = btn.getBoundingClientRect();
            if (fakeX >= rect.left && fakeX <= rect.right && fakeY >= rect.top && fakeY <= rect.bottom) {
                btn.style.background = 'yellow';
            } else {
                btn.style.background = 'lime';
            }
        });

        document.addEventListener('click', (e) => {
            let winW = window.innerWidth;
            let winH = window.innerHeight;
            let fakeX = winW - e.clientX;
            let fakeY = winH - e.clientY;
            
            let rect = btn.getBoundingClientRect();
            if (fakeX >= rect.left && fakeX <= rect.right && fakeY >= rect.top && fakeY <= rect.bottom) {
                alert("Wow, you're good at playing reversed. GG!");
                window.location.href = 'checkpoint2.html';
            } else {
                let actx = new (window.AudioContext || window.webkitAudioContext)();
                let osc = actx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, actx.currentTime);
                osc.connect(actx.destination);
                osc.start();
                osc.stop(actx.currentTime + 0.1);
            }
        });
    </script>
</body>
</html>`,

  'pages/checkpoint2.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkpoint 2</title>
    <style>
        body { background: #cce5ff; color: #004085; font-family: 'Georgia', serif; text-align: center; padding-top: 15vh; }
        .box { background: white; display: inline-block; padding: 40px; border-radius: 10px; border: 2px solid #b8daff; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .btn-lanjut { margin-top: 20px; padding: 15px 30px; font-size: 18px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="box">
        <h1>Second Refugee Camp 🏕️</h1>
        <p>Crazy, you're still holding on. I salute you.</p>
        <p>From here on, the suffering gets more absurd and illogical.</p>
        <p><em>Progress saved. Don't cry if you die ahead.</em></p>
        
        <button class="btn-lanjut" onclick="window.location.href='walawe.html'">Enter the Death Zone</button>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/checkpoint2.html');
    </script>
</body>
</html>`,

  'pages/walawe.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patience is a Virtue</title>
    <link rel="stylesheet" href="../assets/main.css">
    <style>
        body { background-color: #000; color: #0f0; font-family: 'Courier New', Courier, monospace; cursor: none; }
        .matrix-text { font-size: 20px; padding: 50px; }
        #palsu-loading { width: 80%; height: 30px; border: 2px solid #0f0; margin: 20px auto; position: relative; }
        #bar { width: 0%; height: 100%; background-color: #0f0; transition: width 0.5s; }
        #teks-kecil { font-size: 10px; opacity: 0.1; position: absolute; bottom: 10px; right: 10px; cursor: pointer; }
        #teks-kecil:hover { opacity: 1; color: red; }
    </style>
</head>
<body>
    <div class="matrix-text">
        <h1 id="status">Downloading Your Patience...</h1>
        <div id="palsu-loading">
            <div id="bar"></div>
        </div>
        <p id="pesan">Hold on a sec, preparing memory (and emotions) for the next page.</p>
        
        <span id="teks-kecil" onclick="window.location.href='surga.html'">Skip to next page (if you can see this)</span>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/walawe.html');
        let progress = 0;
        const bar = document.getElementById('bar');
        const status = document.getElementById('status');
        const pesan = document.getElementById('pesan');

        const interval = setInterval(() => {
            if (progress < 99) {
                let tambah = Math.random() * (100 - progress) * 0.1;
                progress += tambah;
                bar.style.width = progress + '%';
            } else {
                status.innerText = "Error 418: I'm a teapot. Please wait until server wakes up.";
                pesan.innerText = "Loading stopped at 99.9%. Why? Because it's annoying, that's why.";
                clearInterval(interval);
            }
        }, 500);
    </script>
</body>
</html>`,

  'pages/surga.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>God Level Security</title>
    <style>
        body { background-color: #f4f4f4; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden; }
        .captcha-container { background-color: white; border: 1px solid #ccc; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); width: 350px; text-align: center; }
        h2 { font-size: 18px; color: #333; margin-top: 0; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin: 15px 0; }
        .kotak { width: 100px; height: 100px; background-color: #ddd; cursor: pointer; display: flex; justify-content: center; align-items: center; font-size: 12px; border: 2px solid transparent; transition: all 0.2s; }
        .kotak:hover { background-color: #ccc; }
        .selected { border: 2px solid blue; transform: scale(0.9); opacity: 0.7; }
        button { background-color: #1a73e8; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        button:hover { background-color: #1557b0; }
        #error-msg { color: red; font-size: 14px; margin-top: 10px; display: none; }
    </style>
</head>
<body>
    <div class="captcha-container">
        <h2>Select all images containing<br><strong>Your Lost Hopes and Dreams</strong></h2>
        <div class="grid" id="grid-gambar"></div>
        <button id="btn-verifikasi">Verify</button>
        <p id="error-msg">System detects you are lying to yourself. Try again.</p>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/surga.html');
        const grid = document.getElementById('grid-gambar');
        const kataSindir = ["The Past", "Salary Raise", "Ex", "Sweet Promises", "Enough Sleep", "Healing", "Smooth Wifi", "Finished Work", "Bad Gacha"];
        let dipilih = 0;

        for (let i = 0; i < 9; i++) {
            let kotak = document.createElement('div');
            kotak.className = 'kotak';
            kotak.innerText = kataSindir[Math.floor(Math.random() * kataSindir.length)];
            
            kotak.addEventListener('click', function() {
                this.classList.toggle('selected');
                if (this.classList.contains('selected')) {
                    dipilih++;
                    this.innerText = "Are you sure?";
                } else {
                    dipilih--;
                    this.innerText = "Too scared to admit?";
                }
            });
            grid.appendChild(kotak);
        }

        document.getElementById('btn-verifikasi').addEventListener('click', function() {
            const errorMsg = document.getElementById('error-msg');
            
            if (dipilih === 0) {
                errorMsg.innerText = "Select at least one! Don't pretend to be strong.";
            } else if (dipilih === 9) {
                errorMsg.innerText = "Too much life burden. System refuses to process.";
            } else {
                errorMsg.innerText = "Verification failed. Detected you are still pretending to be happy.";
            }
            
            errorMsg.style.display = 'block';
            
            document.querySelectorAll('.kotak').forEach(k => {
                k.classList.remove('selected');
                k.innerText = kataSindir[Math.floor(Math.random() * kataSindir.length)];
            });
            dipilih = 0;
            
            setTimeout(() => {
                const rahasia = document.createElement('a');
                rahasia.href = "quest.html"; 
                rahasia.style.color = "transparent";
                rahasia.style.textDecoration = "none";
                rahasia.innerText = ".";
                document.body.appendChild(rahasia);
            }, 5000);
        });
    </script>
</body>
</html>`,

  'pages/quest.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Very Serious Mission</title>
    <style>
        body { background-color: #111; color: #ddd; font-family: 'Courier New', Courier, monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
        #instruksi { font-size: 24px; margin-bottom: 50px; text-align: center; }
        #ruangan { width: 80%; height: 60vh; border: 2px dashed #444; position: relative; background: radial-gradient(circle, #222 0%, #000 100%); cursor: crosshair; }
        .pintu { width: 100px; height: 150px; background-color: #333; border: 5px solid #555; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; justify-content: center; flex-direction: column; cursor: not-allowed; color: #111; font-weight: bold; }
        .kunci { width: 20px; height: 20px; background-color: gold; border-radius: 50%; position: absolute; cursor: pointer; opacity: 0.1; transition: opacity 0.3s; }
        .kunci:hover { opacity: 1; }
        .lift-tombol { width: 20px; height: 20px; background-color: red; border-radius: 50%; margin-top: 10px; display: none; }
        #pesan-plot-twist { display: none; color: yellow; margin-top: 20px; font-size: 20px; text-align: center; max-width: 600px; }
        button.masuk { display: none; margin-top: 20px; padding: 10px 20px; background-color: white; color: black; border: none; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
    <div id="instruksi">Tense atmosphere. Find the <strong>Key</strong> to open this Old Door.</div>
    <div id="ruangan">
        <div class="pintu" id="pintu-tua">DOOR</div>
    </div>
    <div id="pesan-plot-twist"></div>
    <button class="masuk" id="btn-masuk" onclick="window.location.href='horror.html'">Enter the Elevator (Using Key)</button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/quest.html');
        const ruangan = document.getElementById('ruangan');
        const pintu = document.getElementById('pintu-tua');
        const pesan = document.getElementById('pesan-plot-twist');
        const btnMasuk = document.getElementById('btn-masuk');

        const kunci = document.createElement('div');
        kunci.className = 'kunci';
        kunci.style.left = Math.max(10, Math.random() * 90) + '%';
        kunci.style.top = Math.max(10, Math.random() * 70) + '%';
        ruangan.appendChild(kunci);

        let kunciDapat = false;

        pintu.addEventListener('click', () => {
            if (!kunciDapat) {
                alert("It's locked tight, bro. Find the key in this dark room first.");
            }
        });

        kunci.addEventListener('click', function() {
            kunciDapat = true;
            this.style.display = 'none';
            document.getElementById('instruksi').innerText = "Key obtained! Try opening the door now.";
            pintu.style.cursor = 'pointer';
            pintu.style.backgroundColor = '#666';
        });

        pintu.addEventListener('click', function() {
            if (kunciDapat) {
                this.innerHTML = "ELEVATOR<br><div class='lift-tombol' style='display:block'></div>";
                this.style.border = "5px solid silver";
                this.style.backgroundColor = "#ddd";
                
                pesan.innerHTML = "WOAH! The door opened and it's a <strong>Modern Elevator</strong>.<br>But you still need to turn a padlock key to press the elevator button. Where is the logic?!";
                pesan.style.display = 'block';
                btnMasuk.style.display = 'block';
            }
        });
    </script>
</body>
</html>`,

  'pages/horror.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RUN THERE'S A GHOST!!!</title>
    <style>
        body { margin: 0; padding: 0; background-color: black; color: white; font-family: Arial, sans-serif; height: 3000px; overflow-x: hidden; text-align: center; transition: background-color 0.1s; }
        .peringatan { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); font-size: 30px; color: red; font-weight: bold; z-index: 100; text-shadow: 2px 2px 0 #000; pointer-events: none; }
        #hantu { position: absolute; top: -200px; left: 50%; transform: translateX(-50%); font-size: 100px; z-index: 50; transition: top 0.1s linear, transform 0.5s; }
        #batu-sialan { position: absolute; top: 1500px; left: 50%; transform: translateX(-50%); width: 150px; height: 50px; background-color: gray; border-radius: 20px 20px 0 0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #333; border-bottom: 5px solid #444; }
        .darah-palsu { position: absolute; display: none; color: red; font-size: 40px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="peringatan" id="teks-peringatan">SCROLL DOWN FAST! THE GHOST IS CHASING!!!</div>
    <div id="hantu">👻🔪</div>
    <div id="batu-sialan">Aesthetic Rock</div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/horror.html');
        const hantu = document.getElementById('hantu');
        const batu = document.getElementById('batu-sialan');
        const teks = document.getElementById('teks-peringatan');
        let hantuPos = 0;
        let dahJatuh = false;

        let kedip = setInterval(() => {
            if(!dahJatuh) {
                document.body.style.backgroundColor = document.body.style.backgroundColor === 'darkred' ? 'black' : 'darkred';
            }
        }, 300);

        window.addEventListener('scroll', () => {
            if (dahJatuh) return;
            let scrollY = window.scrollY;
            hantuPos = scrollY - 100; 
            hantu.style.top = hantuPos + 'px';

            let posisiBatu = batu.offsetTop;
            if (hantuPos + 100 >= posisiBatu) {
                dahJatuh = true;
                clearInterval(kedip);
                document.body.style.backgroundColor = 'black';
                
                hantu.style.transform = 'translateX(-50%) rotate(90deg) scale(1.5)';
                hantu.style.top = (posisiBatu - 50) + 'px';
                hantu.innerText = "😵💥";
                
                teks.innerText = "Wait... the ghost tripped on a damn rock.";
                teks.style.color = "white";

                setTimeout(() => {
                    const ouch = document.createElement('div');
                    ouch.className = 'darah-palsu';
                    ouch.style.left = '55%';
                    ouch.style.top = posisiBatu + 'px';
                    ouch.innerText = "OUCH MY TAILBONE!!";
                    ouch.style.display = 'block';
                    document.body.appendChild(ouch);
                }, 500);

                setTimeout(() => {
                    window.location.href = 'tamat.html';
                }, 4000);
            }
        });

        window.scrollTo(0,0);
        setTimeout(() => {
            if (window.scrollY < 100 && !dahJatuh) {
                alert("SCROLL DOWN BRO DO YOU WANT TO DIE?");
            }
        }, 3000);
    </script>
</body>
</html>`,

  'pages/tamat.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The End. Just like that.</title>
    <style>
        body { background-color: black; color: white; font-family: 'Times New Roman', Times, serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; }
        h1 { font-size: 50px; letter-spacing: 5px; margin-bottom: 10px; }
        p { font-size: 20px; color: #aaa; max-width: 600px; line-height: 1.5; }
        button { margin-top: 50px; padding: 15px 30px; font-size: 16px; background-color: transparent; color: white; border: 1px solid white; cursor: pointer; transition: all 0.3s; }
        button:hover { background-color: white; color: black; }
    </style>
</head>
<body>
    <h1>GAME OVER</h1>
    <p>The ghost tripped and died. Its tailbone broke and must be treated in a supernatural ICU.</p>
    <p>Mission failed because there are no more obstacles threatening your life.</p>
    <p>Thank you for wasting your precious time on this website.</p>
    
    <button onclick="window.location.href='TermsAndCond.html'">Exit Game (Supposedly)</button>
    
    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/tamat.html');
        document.body.style.opacity = 0;
        let fade = 0;
        let interval = setInterval(() => {
            fade += 0.05;
            document.body.style.opacity = fade;
            if (fade >= 1) clearInterval(interval);
        }, 50);
    </script>
</body>
</html>`,

  'pages/TermsAndCond.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions (Must Read)</title>
    <style>
        body { font-family: Arial, sans-serif; background: #eee; text-align: center; overflow: hidden; }
        .box { width: 50%; height: 300px; margin: 50px auto; background: white; border: 1px solid #ccc; overflow-y: scroll; text-align: left; padding: 20px; color: black; }
        .btn-container { position: relative; height: 100px; margin-top: 20px; }
        button { padding: 10px 20px; font-size: 16px; position: absolute; left: 50%; transform: translateX(-50%); cursor: pointer; }
        #teks-ngejek { display: none; color: red; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <h2>Before Exiting, Agree to our T&C</h2>
    <div class="box" id="snk-box">
        <p>Article 1: You agree that you have been tricked.</p>
        <p>Article 2: Because you clicked the "Exit" button without reading this, then...</p>
        <div id="more-text"></div>
    </div>
    <div class="btn-container">
        <button id="btn-setuju">I Agree (Totally lying)</button>
    </div>
    <div id="teks-ngejek">Why are you scrolling? You aren't reading, you just want to agree!</div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/TermsAndCond.html');
        const btn = document.getElementById('btn-setuju');
        const box = document.getElementById('snk-box');
        let hoverCount = 0;

        for(let i=3; i<=100; i++) {
            document.getElementById('more-text').innerHTML += `<p>Article \${i}: We have the right to take \${i} seconds of your remaining lifespan.</p>`;
        }

        box.addEventListener('scroll', () => {
            if(box.scrollTop > 50) {
                document.getElementById('teks-ngejek').style.display = 'block';
            }
        });

        btn.addEventListener('mouseover', function() {
            if(hoverCount < 15) {
                const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2) + 100;
                const y = Math.random() * 200 - 100;
                this.style.transform = `translate(\${x}px, \${y}px)`;
                
                const bacotan = ["Sure you agree?", "Missed!", "Read first bro!", "Stop clicking blindly", "Giving up?", "Blehh"];
                this.innerText = bacotan[hoverCount % bacotan.length];
                hoverCount++;
            } else {
                this.innerText = "Fine, just click it";
                this.style.transform = "translateX(-50%)"; 
            }
        });

        btn.addEventListener('click', () => {
            window.location.href = 'clean_screen.html';
        });
    </script>
</body>
</html>`,

  'pages/clean_screen.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dirty Screen</title>
    <style>
        body { margin: 0; background-color: white; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: crosshair; }
        h1 { color: #ccc; user-select: none; z-index: 1; }
        #kotoran { width: 5px; height: 5px; background-color: black; border-radius: 50%; position: absolute; z-index: 10; }
        #info { position: absolute; bottom: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <h1>Your screen has some dust on it. Click to clean.</h1>
    <div id="kotoran"></div>
    <div id="info">Click that black dust to continue.</div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/clean_screen.html');
        const kotoran = document.getElementById('kotoran');
        kotoran.style.left = '50%';
        kotoran.style.top = '50%';

        kotoran.addEventListener('mouseover', function() {
            const newX = Math.random() * (window.innerWidth - 10);
            const newY = Math.random() * (window.innerHeight - 10);
            this.style.left = newX + 'px';
            this.style.top = newY + 'px';
            document.querySelector('h1').innerText = "How is the dust running away? Try again.";
        });

        kotoran.addEventListener('click', function() {
            document.body.style.backgroundColor = "black";
            document.querySelector('h1').style.color = "red";
            document.querySelector('h1').innerText = "Your hands are dirty!!";
            this.style.display = "none";
            document.getElementById('info').style.display = "none";
            
            setTimeout(() => {
                window.location.href = 'math_hell.html';
            }, 2000);
        });
    </script>
</body>
</html>`,

  'pages/math_hell.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Exam</title>
    <style>
        body { background: #ffeb3b; color: #333; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; padding-top: 100px; }
        .soal { font-size: 50px; margin-bottom: 30px; }
        .opsi-container { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .opsi { padding: 20px 40px; font-size: 30px; background: white; border: 3px solid #333; cursor: pointer; border-radius: 10px; transition: transform 0.1s; }
        .opsi:hover { transform: scale(1.1); background: #f0f0f0; }
        #jawaban-benar { display: none; margin-top: 40px; font-size: 20px; color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Very Easy Question</h1>
    <div class="soal">1 + 1 = ...?</div>
    <div class="opsi-container">
        <div class="opsi" onclick="salah()">2</div>
        <div class="opsi" onclick="salah()">11</div>
        <div class="opsi" onclick="salah()">3</div>
        <div class="opsi" onclick="salah()">Baaa</div>
    </div>
    
    <div id="jawaban-benar">
        All wrong! The correct answer is Window!<br>
        <img src="https://media.tenor.com/images/a4149fa4bd4a0c8b0244747eb11eeaf5/tenor.gif" width="200" style="margin-top:20px; display:none;" id="gif-ngeledek" alt="taunting">
        <br><br>
        <button onclick="window.location.href='infinite_scroll.html'" style="padding: 10px; font-size: 16px;">Keep crying</button>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/math_hell.html');
        let salahCount = 0;
        function salah() {
            if(typeof playBruh === 'function') playBruh();
            salahCount++;
            if (salahCount < 3) {
                alert("Wrong! Try using your brain, not your knees.");
            } else {
                document.getElementById('jawaban-benar').style.display = 'block';
                document.getElementById('gif-ngeledek').style.display = 'inline-block';
                document.body.style.background = "#ff9800";
            }
        }
    </script>
</body>
</html>`,

  'pages/infinite_scroll.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shortcut</title>
    <style>
        body { margin: 0; font-family: sans-serif; background: #fafafa; color: #222; overflow-x: hidden; }
        .header { position: fixed; top: 0; width: 100%; background: #333; color: white; padding: 20px; text-align: center; z-index: 100; }
        #konten { margin-top: 100px; padding: 20px; text-align: center; }
        .batu { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #aaa; border-bottom: 1px dashed #ccc; }
        #tombol-selamat { display: none; margin: 50px auto; padding: 20px 40px; font-size: 24px; background: lime; cursor: pointer; border: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Scroll Down to Find the Next Button</h2>
    </div>
    <div id="konten">
        <div class="batu">Keep scrolling down...</div>
    </div>
    
    <button id="tombol-selamat" onclick="window.location.href='fake_error.html'">YAY FOUND IT!</button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/infinite_scroll.html');
        const konten = document.getElementById('konten');
        const tombol = document.getElementById('tombol-selamat');
        let scrollCount = 0;
        let dahTampil = false;

        const bacotan = [
            "Still a long way bro...",
            "Just a little more (lie)",
            "Better just give up",
            "Are your thumbs tired yet?",
            "Keep scrolling underground",
            "Almost there",
            "Hey, did we pass it?",
            "Are you sure there's a button down here?"
        ];

        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                if (scrollCount < 15) {
                    let divBaru = document.createElement('div');
                    divBaru.className = 'batu';
                    divBaru.innerText = bacotan[scrollCount % bacotan.length];
                    konten.appendChild(divBaru);
                    scrollCount++;
                } else if (!dahTampil) {
                    tombol.style.display = 'block';
                    dahTampil = true;
                    let divBaru = document.createElement('div');
                    divBaru.className = 'batu';
                    divBaru.style.color = "black";
                    divBaru.innerText = "Finally, (this) suffering ends.";
                    konten.appendChild(divBaru);
                }
            }
        });
    </script>
</body>
</html>`,

  'pages/fake_error.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BSOD</title>
    <style>
        body { background-color: #0078D7; color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 10%; height: 100vh; box-sizing: border-box; cursor: none; }
        .emoticon { font-size: 150px; margin-bottom: 20px; }
        h1 { font-size: 30px; font-weight: normal; margin-bottom: 20px; }
        p { font-size: 20px; line-height: 1.5; }
        .qrcode { margin-top: 40px; display: flex; align-items: center; }
        .qr-box { width: 100px; height: 100px; background-color: white; margin-right: 20px; display: flex; justify-content: center; align-items: center; color: black; font-size: 10px; text-align: center; }
        .info { font-size: 16px; }
        #restart-btn { display: none; margin-top: 50px; background: white; color: #0078D7; border: none; padding: 10px 20px; font-size: 18px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
    <div class="emoticon">:(</div>
    <h1>Your device ran into a problem because you are too nosey.</h1>
    <p>We are collecting information on how bored you are, and then we will restart for you... (just kidding).</p>
    <p id="persentase">0% complete</p>
    
    <div class="qrcode">
        <div class="qr-box">Not a Real QR Code</div>
        <div class="info">
            <p>For more information about this issue, don't visit anyone.</p>
            <p>Stop Code: MENTAL_BREAKDOWN_EXCEPTION</p>
        </div>
    </div>

    <button id="restart-btn" onclick="window.location.href='survey.html'">Restart Suffering</button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/fake_error.html');
        let persen = 0;
        const teksPersen = document.getElementById('persentase');
        const btn = document.getElementById('restart-btn');

        let interval = setInterval(() => {
            if (persen < 99) {
                let tambah = Math.floor(Math.random() * 20);
                persen += tambah;
                if (persen > 99) persen = 99;
                
                if (Math.random() > 0.7) {
                    persen -= Math.floor(Math.random() * 10);
                }
                
                teksPersen.innerText = persen + "% complete";
            } else {
                clearInterval(interval);
                teksPersen.innerText = "Error calculating percentage. Whatever.";
                btn.style.display = 'block';
                document.body.style.cursor = 'default';
            }
        }, 1000);
    </script>
</body>
</html>`,

  'pages/survey.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Satisfaction Survey</title>
    <style>
        body { background: #fdfdfd; font-family: 'Arial', sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .kotak-survei { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
        h2 { color: #333; }
        .btn-group { margin-top: 30px; position: relative; height: 50px; display: flex; justify-content: center; gap: 20px; }
        button { padding: 10px 30px; font-size: 16px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; }
        #btn-ya { background: #28a745; color: white; }
        #btn-tidak { background: #dc3545; color: white; position: absolute; }
    </style>
</head>
<body>
    <div class="kotak-survei">
        <h2>Are you angry because of this website?</h2>
        <div class="btn-group">
            <button id="btn-ya" onclick="alert('Good. That was our goal.'); window.location.href='404_fake.html'">Yes, Very!</button>
            <button id="btn-tidak" style="right: 50px;">No, Not Really</button>
        </div>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/survey.html');

        const btnTidak = document.getElementById('btn-tidak');
        let lariCount = 0;

        btnTidak.addEventListener('mouseover', function() {
            let maxX = 300;
            let maxY = 300;
            
            let acakX = (Math.random() - 0.5) * maxX;
            let acakY = (Math.random() - 0.5) * maxY;
            
            this.style.transform = `translate(\${acakX}px, \${acakY}px)`;
            
            lariCount++;
            if(lariCount > 5) {
                this.innerText = "Too proud to admit lol";
            }
        });
        
        btnTidak.addEventListener('click', function() {
            alert("You cheated?! Fine, I'll just assume you're angry deep down.");
            window.location.href = '404_fake.html';
        });
    </script>
</body>
</html>`,

  'pages/404_fake.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        body { background: #fff; color: #333; font-family: Arial, sans-serif; text-align: center; padding-top: 15vh; }
        h1 { font-size: 100px; margin: 0; color: #ccc; }
        p { font-size: 20px; color: #666; }
        #rahasia { color: #fff; text-decoration: none; cursor: default; }
        #rahasia:hover { color: #eee; }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>Oops! The page you are looking for was not found.</p>
    <p>Maybe the server is tired of serving you.</p>
    
    <p style="margin-top: 100px; font-size: 12px; color: #ccc;">
        Return to <a href="#" onclick="balikin()" style="color: #007bff;">Home</a>. 
        Or find a <a href="mystery_box.html" id="rahasia">blind spot</a> here.
    </p>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/404_fake.html');

        function balikin() {
            alert("Why go back to home? Find the secret path in the faded text!");
        }
    </script>
</body>
</html>`,

  'pages/mystery_box.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose a Gift</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 100px; background: #ffebee; }
        .kotak-misteri {
            display: inline-block; width: 150px; height: 150px; background: #ff4081; color: white;
            line-height: 150px; font-size: 80px; font-weight: bold; margin: 20px; cursor: pointer;
            border-radius: 10px; transition: transform 0.3s;
        }
        .kotak-misteri:hover { transform: scale(1.1) rotate(5deg); }
        .kotak-terbuka {
            background: #fff; border: 5px dashed #ff4081; color: black; font-size: 20px; line-height: normal; padding-top: 50px; height: 100px;
        }
    </style>
</head>
<body>
    <h1>Guess the Mystery Box</h1>
    <p>One contains the way out, the others contain... disappointment.</p>
    
    <div id="area-kotak">
        <div class="kotak-misteri" onclick="buka(this)">?</div>
        <div class="kotak-misteri" onclick="buka(this)">?</div>
        <div class="kotak-misteri" onclick="buka(this)">?</div>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/mystery_box.html');
        let kesempatan = 3; 

        function buka(elemen) {
            kesempatan--;
            elemen.className = 'kotak-misteri kotak-terbuka';
            elemen.onclick = null; 

            if (kesempatan > 0) {
                elemen.innerHTML = "ZONK!<br>Try another.";
                let divBaru = document.createElement('div');
                divBaru.className = 'kotak-misteri';
                divBaru.innerText = '?';
                divBaru.onclick = function() { buka(this) };
                document.getElementById('area-kotak').appendChild(divBaru);
            } else {
                elemen.innerHTML = "Trap!<br>Back to Checkpoint!";
                setTimeout(() => {
                    window.location.href = 'checkpoint2.html';
                }, 1500);
            }
        }
    </script>
</body>
</html>`,

  'pages/flashbang.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Very Bright</title>
    <style>
        body { background-color: white; color: white; font-family: Arial, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        ::selection { background: black; color: white; }
        button { background: white; color: white; border: 1px solid white; padding: 10px 20px; cursor: pointer; transition: all 0.3s; }
        button:hover { border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h1>Welcome to the Blinding Room</h1>
    <p>You can only see the secret here if you highlight this text.</p>
    <p>If you're reading this, find the white button below and click it.</p>
    
    <button onclick="window.location.href='fake_win.html'">Proceed to Prize</button>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        saveProgress('pages/flashbang.html');
        document.body.style.opacity = '0';
        setTimeout(() => document.body.style.opacity = '1', 500);
    </script>
</body>
</html>`,

  'pages/fake_win.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CONGRATULATIONS YOU WON!</title>
    <style>
        body { background: linear-gradient(45deg, #ff0, #0ff, #f0f, #f00); background-size: 400% 400%; animation: gradient 3s ease infinite; color: black; font-family: 'Impact', Charcoal, sans-serif; text-align: center; padding-top: 100px; overflow: hidden; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        h1 { font-size: 80px; text-shadow: 2px 2px 0 #fff; margin-bottom: 0; }
        p { font-size: 24px; font-weight: bold; background: rgba(255,255,255,0.7); display: inline-block; padding: 10px; border-radius: 10px; }
        .kembang-api { position: absolute; width: 10px; height: 10px; background: red; border-radius: 50%; animation: ledak 1s infinite; }
        @keyframes ledak { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(10); opacity: 0; } }
        #btn-klaim { margin-top: 50px; padding: 20px 40px; font-size: 30px; font-weight: bold; background: gold; border: 5px solid red; cursor: pointer; animation: goyang 0.5s infinite; }
        @keyframes goyang { 0% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 50% { transform: rotate(0deg); } 75% { transform: rotate(-5deg); } 100% { transform: rotate(0deg); } }
    </style>
</head>
<body>
    <h1>🎉 CONGRATULATIONS! 🎉</h1>
    <p>YOU ARE THE WINNER OF THIS ANNOYING WEBSITE!</p>
    <br>
    <p style="font-size: 16px;">(Or is this just another trick? A mystery...)</p>
    <br>
    <button id="btn-klaim">CLAIM PRIZE!</button>

    <div id="video-container" style="display:none; margin-top:20px; z-index:9999; position:relative;">
        <h2 style="color:white;">HERE IS YOUR PRIZE...</h2>
        <iframe id="rickroll" width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <script src="../assets/security.js"></script>
    <script src="../assets/progress.js"></script>
    <script>
        localStorage.removeItem('level_ngeselin');

        for(let i=0; i<20; i++) {
            let api = document.createElement('div');
            api.className = 'kembang-api';
            api.style.left = Math.random() * 100 + 'vw';
            api.style.top = Math.random() * 100 + 'vh';
            api.style.background = `hsl(\${Math.random() * 360}, 100%, 50%)`;
            api.style.animationDelay = Math.random() + 's';
            document.body.appendChild(api);
        }

        document.getElementById('btn-klaim').addEventListener('click', () => {
            let tanya = confirm("Are you sure this is a real prize?");
            if(tanya) {
                alert("Ah, what a pity. You are too naive.");
                window.location.href = '../index.html'; 
            } else {
                alert("Good, you are smart. Please enjoy this exclusive prize.");
                
                if(document.getElementById('bgm-ngeselin')) {
                    document.getElementById('bgm-ngeselin').pause();
                }
                
                document.body.style.background = "black";
                document.body.style.animation = "none";
                document.getElementById('btn-klaim').style.display = 'none';
                document.querySelector('h1').style.display = 'none';
                document.querySelector('p').style.display = 'none';
                
                const vidContainer = document.getElementById('video-container');
                vidContainer.style.display = 'block';
                document.getElementById('rickroll').src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
            }
        });
    </script>
</body>
</html>`
};

for (const [path, content] of Object.entries(files)) {
    fs.writeFileSync('/home/armuzzdev/WebsiteNgeselin/' + path, content);
}
console.log('HTML files translated to English successfully.');
