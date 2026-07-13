import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-1Pvi1-ZCG9L4473eGB8ZevfO3-8Ah8A",
    authDomain: "service-dp-portfolio.firebaseapp.com",
    projectId: "service-dp-portfolio",
    storageBucket: "service-dp-portfolio.firebasestorage.app",
    messagingSenderId: "635622036117",
    appId: "1:635622036117:web:203f9e274acb37df80019c",
    measurementId: "G-3V4H4NZQZT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const i18n = {
    en: {
        "enter_code": "Enter Gallery Code",
        "placeholder_code": "e.g. name/gallery or 3829/vestuves",
        "access_gallery": "Access Gallery",
        "or": "OR",
        "login": "Login",
        "register": "Register",
        "email": "Email",
        "password": "Password",
        "sign_in": "Sign In",
        "create_account": "Create Account",
        "social": "SOCIAL",
        "sign_google": "Sign in with Google",
        "sign_apple": "Sign in with Apple",
        "guest_gallery": "Guest Gallery",
        "client_portal": "Client Portal",
        "unlock_downloads": "Unlock High-Resolution Downloads",
        "payment_desc": "Complete your payment to enable full quality downloads.",
        "pay_paypal": "Pay with PayPal",
        "pay_revolut": "Pay with Revolut",
        "reviews": "Gallery Reviews & Comments",
        "leave_feedback": "Leave your feedback here...",
        "submit_review": "Submit Review",
        "logout": "Logout",
        "admin_dashboard": "Photographer Dashboard",
        "admin_code_label": "Gallery Code (e.g. dominik/vestuves)",
        "admin_files_label": "Select High-Resolution Images",
        "create_upload": "Create Gallery & Upload",
        "download_high_res": "Download High-Res",
        "uploading": "Uploading...",
        "toast_login": "Successfully logged in",
        "toast_reg": "Account created successfully",
        "toast_auth_g": "Authenticated with Google",
        "toast_auth_a": "Authenticated with Apple",
        "toast_auth_req": "Please log in or register to access client galleries.",
        "toast_err_gal": "Error loading gallery images.",
        "toast_err_com": "Error loading comments.",
        "toast_pay_ok": "Payment successful. High-resolution downloads unlocked.",
        "toast_rev_ok": "Review submitted successfully.",
        "toast_rev_err": "Error submitting review.",
        "toast_up_req": "Please provide a gallery code and select images.",
        "toast_up_ok": "Gallery created and images uploaded successfully.",
        "toast_up_err": "Error uploading images."
    },
    lt: {
        "enter_code": "Įveskite galerijos kodą",
        "placeholder_code": "pvz. vardas/galerija arba 3829/vestuves",
        "access_gallery": "Atidaryti galeriją",
        "or": "ARBA",
        "login": "Prisijungti",
        "register": "Registruotis",
        "email": "El. paštas",
        "password": "Slaptažodis",
        "sign_in": "Prisijungti",
        "create_account": "Sukurti paskyrą",
        "social": "SOCIALINIAI TINKLAI",
        "sign_google": "Prisijungti su Google",
        "sign_apple": "Prisijungti su Apple",
        "guest_gallery": "Svečių galerija",
        "client_portal": "Kliento portalas",
        "unlock_downloads": "Atrakinti aukštos raiškos atsisiuntimus",
        "payment_desc": "Atlikite mokėjimą, kad įgalintumėte pilnos kokybės atsisiuntimus.",
        "pay_paypal": "Mokėti per PayPal",
        "pay_revolut": "Mokėti per Revolut",
        "reviews": "Galerijos atsiliepimai ir komentarai",
        "leave_feedback": "Palikite savo atsiliepimą čia...",
        "submit_review": "Pateikti atsiliepimą",
        "logout": "Atsijungti",
        "admin_dashboard": "Fotografo prietaisų skydelis",
        "admin_code_label": "Galerijos kodas (pvz. dominik/vestuves)",
        "admin_files_label": "Pasirinkite aukštos raiškos nuotraukas",
        "create_upload": "Sukurti galeriją ir įkelti",
        "download_high_res": "Atsisiųsti",
        "uploading": "Įkeliama...",
        "toast_login": "Sėkmingai prisijungta",
        "toast_reg": "Paskyra sėkmingai sukurta",
        "toast_auth_g": "Prisijungta su Google",
        "toast_auth_a": "Prisijungta su Apple",
        "toast_auth_req": "Prašome prisijungti arba registruotis norint pasiekti kliento galerijas.",
        "toast_err_gal": "Klaida kraunant galerijos nuotraukas.",
        "toast_err_com": "Klaida kraunant komentarus.",
        "toast_pay_ok": "Mokėjimas sėkmingas. Aukštos raiškos atsisiuntimai atrakinti.",
        "toast_rev_ok": "Atsiliepimas sėkmingai pateiktas.",
        "toast_rev_err": "Klaida pateikiant atsiliepimą.",
        "toast_up_req": "Prašome nurodyti galerijos kodą ir pasirinkti nuotraukas.",
        "toast_up_ok": "Galerija sukurta ir nuotraukos sėkmingai įkeltos.",
        "toast_up_err": "Klaida įkeliant nuotraukas."
    }
};

let currentLang = localStorage.getItem('dp_lang') || 'en';

const updateLanguage = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            if (el.tagName === 'SPAN' || el.tagName === 'DIV' || el.tagName === 'LABEL' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'P') {
                el.textContent = i18n[currentLang][key];
            }
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[currentLang][key]) {
            el.placeholder = i18n[currentLang][key];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentLang = e.target.getAttribute('data-lang');
        localStorage.setItem('dp_lang', currentLang);
        updateLanguage();
    });
});

updateLanguage();

const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

const showToast = (msgKey) => {
    toast.textContent = i18n[currentLang][msgKey] || msgKey;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const getQueryParam = (param) => new URLSearchParams(window.location.search).get(param);
const path = window.location.pathname;

const loginTab = document.getElementById('tab-login');
const regTab = document.getElementById('tab-register');
const loginForm = document.getElementById('form-login');
const regForm = document.getElementById('form-register');

if (loginTab && regTab) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        regTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        regForm.classList.add('hidden');
    });
    regTab.addEventListener('click', () => {
        regTab.classList.add('active');
        loginTab.classList.remove('active');
        regForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
}

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const e = document.getElementById('login-email').value;
        const p = document.getElementById('login-password').value;
        try {
            await signInWithEmailAndPassword(auth, e, p);
            showToast('toast_login');
        } catch (err) {
            showToast(err.message);
        }
    });
}

const regBtn = document.getElementById('reg-btn');
if (regBtn) {
    regBtn.addEventListener('click', async () => {
        const e = document.getElementById('reg-email').value;
        const p = document.getElementById('reg-password').value;
        try {
            await createUserWithEmailAndPassword(auth, e, p);
            showToast('toast_reg');
        } catch (err) {
            showToast(err.message);
        }
    });
}

const googleBtn = document.getElementById('google-auth');
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            showToast('toast_auth_g');
        } catch (e) {
            showToast(e.message);
        }
    });
}

const appleBtn = document.getElementById('apple-auth');
if (appleBtn) {
    appleBtn.addEventListener('click', async () => {
        const provider = new OAuthProvider('apple.com');
        try {
            await signInWithPopup(auth, provider);
            showToast('toast_auth_a');
        } catch (e) {
            showToast(e.message);
        }
    });
}

const codeBtn = document.getElementById('submit-code');
if (codeBtn) {
    codeBtn.addEventListener('click', () => {
        const code = document.getElementById('gallery-code').value.trim();
        if (!code) return;
        if (/^\d+\//.test(code)) {
            window.location.href = `guest.html?code=${encodeURIComponent(code)}`;
        } else {
            if (auth.currentUser) {
                window.location.href = `client.html?code=${encodeURIComponent(code)}`;
            } else {
                showToast('toast_auth_req');
            }
        }
    });
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = 'index.html';
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
        }
    });
}

const loadGallery = async (code, isClient) => {
    const galleryContainer = document.getElementById('gallery-grid');
    const loader = document.getElementById('loader');
    if (!galleryContainer) return;
    if (loader) loader.classList.remove('hidden');
    galleryContainer.innerHTML = '';
    try {
        const listRef = ref(storage, `galleries/${code}`);
        const res = await listAll(listRef);
        for (const itemRef of res.items) {
            const url = await getDownloadURL(itemRef);
            const div = document.createElement('div');
            div.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = url;
            img.addEventListener('click', () => {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = url;
                    lightbox.classList.remove('hidden');
                }
            });
            div.appendChild(img);
            if (isClient) {
                const btn = document.createElement('a');
                btn.href = url;
                btn.target = '_blank';
                btn.className = 'download-btn hidden';
                btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span data-i18n="download_high_res">${i18n[currentLang]['download_high_res']}</span>`;
                btn.addEventListener('click', (e) => e.stopPropagation());
                div.appendChild(btn);
            }
            galleryContainer.appendChild(div);
        }
    } catch (error) {
        showToast('toast_err_gal');
    } finally {
        if (loader) loader.classList.add('hidden');
    }
};

const loadComments = async (code) => {
    const commentList = document.getElementById('comment-list');
    if (!commentList) return;
    commentList.innerHTML = '';
    try {
        const q = query(collection(db, `galleries/${code}/comments`), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'comment';
            const author = document.createElement('strong');
            author.textContent = data.user;
            const time = document.createElement('span');
            time.textContent = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : '';
            const text = document.createElement('p');
            text.textContent = data.text;
            div.appendChild(author);
            div.appendChild(time);
            div.appendChild(text);
            commentList.appendChild(div);
        });
    } catch (error) {
        showToast('toast_err_com');
    }
};

const unlockDownloads = () => {
    const paymentSection = document.getElementById('payment-section');
    if (paymentSection) paymentSection.classList.add('hidden');
    document.querySelectorAll('.download-btn').forEach(btn => btn.classList.remove('hidden'));
    showToast('toast_pay_ok');
};

const payPaypal = document.getElementById('pay-paypal');
if (payPaypal) payPaypal.addEventListener('click', unlockDownloads);

const payRevolut = document.getElementById('pay-revolut');
if (payRevolut) payRevolut.addEventListener('click', unlockDownloads);

const submitComment = document.getElementById('submit-comment');
if (submitComment) {
    submitComment.addEventListener('click', async () => {
        const text = document.getElementById('comment-text').value.trim();
        const code = getQueryParam('code');
        if (!text || !code) return;
        try {
            await addDoc(collection(db, `galleries/${code}/comments`), {
                text,
                user: auth.currentUser ? auth.currentUser.email : 'Client',
                timestamp: new Date()
            });
            document.getElementById('comment-text').value = '';
            loadComments(code);
            showToast('toast_rev_ok');
        } catch (error) {
            showToast('toast_rev_err');
        }
    });
}

const uploadBtn = document.getElementById('upload-btn');
if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
        const code = document.getElementById('admin-code').value.trim();
        const files = document.getElementById('admin-files').files;
        if (!code || files.length === 0) {
            showToast('toast_up_req');
            return;
        }
        uploadBtn.disabled = true;
        const btnSpan = uploadBtn.querySelector('span');
        const originalText = btnSpan.textContent;
        btnSpan.textContent = i18n[currentLang]['uploading'];
        try {
            for (const file of files) {
                const storageRef = ref(storage, `galleries/${code}/${file.name}`);
                await uploadBytes(storageRef, file);
            }
            await setDoc(doc(db, 'galleries', code), {
                createdAt: new Date(),
                code: code
            });
            showToast('toast_up_ok');
            document.getElementById('admin-code').value = '';
            document.getElementById('admin-files').value = '';
        } catch (error) {
            showToast('toast_up_err');
        }
        uploadBtn.disabled = false;
        btnSpan.textContent = originalText;
    });
}

if (path.endsWith('guest.html')) {
    const code = getQueryParam('code');
    if (code) loadGallery(code, false);
}

if (path.endsWith('client.html')) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            const code = getQueryParam('code');
            if (code) {
                loadGallery(code, true);
                loadComments(code);
            }
        }
    });
}
