import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, query, orderBy, doc, setDoc, where } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
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
        "info_text": "This website is dedicated to client galleries and order management.",
        "enter_code": "Enter Gallery Code",
        "placeholder_code": "e.g. name/gallery or 3829/vestuves",
        "access_gallery": "Access Gallery",
        "client_login": "CLIENT LOGIN",
        "sign_google": "Sign in with Google",
        "sign_apple": "Sign in with Apple",
        "guest_gallery": "Guest Gallery",
        "client_portal": "Client Portal",
        "your_selection": "Your Selection",
        "total": "Total:",
        "buy_full": "Buy Full Gallery",
        "pay_paypal": "Pay with PayPal",
        "pay_revolut": "Pay with Revolut",
        "reviews": "Gallery Reviews & Comments",
        "leave_feedback": "Leave your feedback here...",
        "submit_review": "Submit Review",
        "logout": "Logout",
        "admin_dashboard": "Photographer Dashboard",
        "client_name": "Client Name",
        "client_surname": "Client Surname",
        "client_email": "Client Email",
        "admin_code_label": "Gallery Code (e.g. dominik/vestuves)",
        "price_single": "Price per Photo (€)",
        "price_full": "Price for Full Gallery (€)",
        "admin_files_label": "Select High-Resolution Images",
        "create_upload": "Create Gallery & Upload",
        "add_to_cart": "Add to Cart",
        "download": "Download",
        "uploading": "Uploading...",
        "my_galleries": "My Galleries",
        "open_gallery": "Open Gallery",
        "no_galleries": "No galleries found for your account.",
        "toast_auth_g": "Authenticated with Google",
        "toast_auth_a": "Authenticated with Apple",
        "toast_auth_req": "Please log in to access client galleries.",
        "toast_err_gal": "Error loading gallery images.",
        "toast_err_com": "Error loading comments.",
        "toast_pay_ok": "Payment successful. Downloads unlocked.",
        "toast_rev_ok": "Review submitted successfully.",
        "toast_rev_err": "Error submitting review.",
        "toast_up_req": "Please fill all fields and select images.",
        "toast_up_ok": "Gallery created and images uploaded successfully.",
        "toast_up_err": "Error uploading images.",
        "toast_cart_add": "Added to cart",
        "toast_cart_rem": "Removed from cart",
        "toast_cart_full": "Full gallery added to cart",
        "pricing_info": "Single photo: €{single} | Full gallery: €{full}"
    },
    lt: {
        "info_text": "Ši svetainė skirta klientų galerijoms ir užsakymų valdymui.",
        "enter_code": "Įveskite galerijos kodą",
        "placeholder_code": "pvz. vardas/galerija arba 3829/vestuves",
        "access_gallery": "Atidaryti galeriją",
        "client_login": "KLIENTO PRISIJUNGIMAS",
        "sign_google": "Prisijungti su Google",
        "sign_apple": "Prisijungti su Apple",
        "guest_gallery": "Svečių galerija",
        "client_portal": "Kliento portalas",
        "your_selection": "Jūsų pasirinkimas",
        "total": "Iš viso:",
        "buy_full": "Pirkti visą galeriją",
        "pay_paypal": "Mokėti per PayPal",
        "pay_revolut": "Mokėti per Revolut",
        "reviews": "Galerijos atsiliepimai ir komentarai",
        "leave_feedback": "Palikite savo atsiliepimą čia...",
        "submit_review": "Pateikti atsiliepimą",
        "logout": "Atsijungti",
        "admin_dashboard": "Fotografo prietaisų skydelis",
        "client_name": "Kliento vardas",
        "client_surname": "Kliento pavardė",
        "client_email": "Kliento el. paštas",
        "admin_code_label": "Galerijos kodas (pvz. dominik/vestuves)",
        "price_single": "Vienos nuotraukos kaina (€)",
        "price_full": "Visos galerijos kaina (€)",
        "admin_files_label": "Pasirinkite aukštos raiškos nuotraukas",
        "create_upload": "Sukurti galeriją ir įkelti",
        "add_to_cart": "Į krepšelį",
        "download": "Atsisiųsti",
        "uploading": "Įkeliama...",
        "my_galleries": "Mano galerijos",
        "open_gallery": "Atidaryti galeriją",
        "no_galleries": "Jūsų paskyrai priskirtų galerijų nerasta.",
        "toast_auth_g": "Prisijungta su Google",
        "toast_auth_a": "Prisijungta su Apple",
        "toast_auth_req": "Prašome prisijungti norint pasiekti kliento galerijas.",
        "toast_err_gal": "Klaida kraunant galerijos nuotraukas.",
        "toast_err_com": "Klaida kraunant komentarus.",
        "toast_pay_ok": "Mokėjimas sėkmingas. Atsisiuntimai atrakinti.",
        "toast_rev_ok": "Atsiliepimas sėkmingai pateiktas.",
        "toast_rev_err": "Klaida pateikiant atsiliepimą.",
        "toast_up_req": "Prašome užpildyti visus laukus ir pasirinkti nuotraukas.",
        "toast_up_ok": "Galerija sukurta ir nuotraukos sėkmingai įkeltos.",
        "toast_up_err": "Klaida įkeliant nuotraukas.",
        "toast_cart_add": "Pridėta į krepšelį",
        "toast_cart_rem": "Pašalinta iš krepšelio",
        "toast_cart_full": "Visa galerija pridėta į krepšelį",
        "pricing_info": "Viena nuotrauka: €{single} | Visa galerija: €{full}"
    }
};

let currentLang = localStorage.getItem('dp_lang') || 'en';
let cart = [];
let isFullGallery = false;
let galleryData = { priceSingle: 0, priceFull: 0 };
let hasPaid = false;

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
    renderCart();
};

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentLang = e.target.getAttribute('data-lang');
        localStorage.setItem('dp_lang', currentLang);
        updateLanguage();
    });
});

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

const googleBtn = document.getElementById('google-auth');
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            showToast('toast_auth_g');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
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
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
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

const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartOverlay = document.getElementById('cart-overlay');
const cartBadge = document.getElementById('cart-badge');

if (cartToggle) {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.remove('hidden');
        setTimeout(() => cartOverlay.classList.add('show'), 10);
    });
}

const closeCart = () => {
    if(cartSidebar) cartSidebar.classList.remove('open');
    if(cartOverlay) {
        cartOverlay.classList.remove('show');
        setTimeout(() => cartOverlay.classList.add('hidden'), 300);
    }
};

if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

const renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    if(cartBadge) cartBadge.textContent = isFullGallery ? '1' : cart.length;
    
    let total = 0;
    
    if (isFullGallery) {
        total = galleryData.priceFull;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${i18n[currentLang]['buy_full']}</div>
            </div>
            <button class="cart-item-remove" onclick="window.removeFullGallery()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    } else {
        total = cart.length * galleryData.priceSingle;
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.url}" alt="Photo">
                <div class="cart-item-info">
                    <div class="cart-item-title">Photo ${index + 1}</div>
                </div>
                <button class="cart-item-remove" onclick="window.removeFromCart('${item.url}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    if(cartTotalPrice) cartTotalPrice.textContent = `€${total.toFixed(2)}`;
};

window.removeFromCart = (url) => {
    cart = cart.filter(item => item.url !== url);
    showToast('toast_cart_rem');
    renderCart();
};

window.removeFullGallery = () => {
    isFullGallery = false;
    cart = [];
    showToast('toast_cart_rem');
    renderCart();
};

const buyFullBtn = document.getElementById('buy-full-btn');
if (buyFullBtn) {
    buyFullBtn.addEventListener('click', () => {
        isFullGallery = true;
        showToast('toast_cart_full');
        renderCart();
    });
}

const checkPaymentStatus = async (code, uid) => {
    try {
        const pDoc = await getDoc(doc(db, `galleries/${code}/payments`, uid));
        if (pDoc.exists() && pDoc.data().paid) {
            hasPaid = true;
            document.querySelectorAll('.add-cart-btn').forEach(btn => btn.classList.add('hidden'));
            document.querySelectorAll('.download-btn').forEach(btn => btn.classList.remove('hidden'));
        }
    } catch (e) {}
};

const processPayment = async () => {
    if (cart.length === 0 && !isFullGallery) return;
    const code = getQueryParam('code');
    if (!code || !auth.currentUser) return;
    try {
        await setDoc(doc(db, `galleries/${code}/payments`, auth.currentUser.uid), {
            paid: true,
            timestamp: new Date(),
            fullGallery: isFullGallery,
            items: isFullGallery ? [] : cart
        });
        hasPaid = true;
        closeCart();
        showToast('toast_pay_ok');
        document.querySelectorAll('.add-cart-btn').forEach(btn => btn.classList.add('hidden'));
        document.querySelectorAll('.download-btn').forEach(btn => btn.classList.remove('hidden'));
    } catch (e) {}
};

const payPaypal = document.getElementById('pay-paypal');
if (payPaypal) payPaypal.addEventListener('click', processPayment);

const payRevolut = document.getElementById('pay-revolut');
if (payRevolut) payRevolut.addEventListener('click', processPayment);

const loadGallery = async (code, isClient) => {
    const galleryContainer = document.getElementById('gallery-grid');
    const loader = document.getElementById('loader');
    const pricingInfo = document.getElementById('gallery-pricing-info');
    if (!galleryContainer) return;
    
    if (isClient) {
        try {
            const gDoc = await getDoc(doc(db, 'galleries', code));
            if (gDoc.exists()) {
                const d = gDoc.data();
                galleryData.priceSingle = parseFloat(d.priceSingle) || 0;
                galleryData.priceFull = parseFloat(d.priceFull) || 0;
                if (pricingInfo) {
                    pricingInfo.textContent = i18n[currentLang]['pricing_info'].replace('{single}', galleryData.priceSingle.toFixed(2)).replace('{full}', galleryData.priceFull.toFixed(2));
                }
            }
        } catch (e) {}
    }

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
                const overlay = document.createElement('div');
                overlay.className = 'item-overlay';
                
                const addBtn = document.createElement('button');
                addBtn.className = `action-btn add-cart-btn ${hasPaid ? 'hidden' : ''}`;
                addBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> <span>${i18n[currentLang]['add_to_cart']}</span>`;
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!cart.find(c => c.url === url)) {
                        cart.push({ url });
                        showToast('toast_cart_add');
                        renderCart();
                    }
                });
                
                const dlBtn = document.createElement('a');
                dlBtn.href = url;
                dlBtn.target = '_blank';
                dlBtn.className = `action-btn download-btn ${hasPaid ? '' : 'hidden'}`;
                dlBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span>${i18n[currentLang]['download']}</span>`;
                dlBtn.addEventListener('click', (e) => e.stopPropagation());
                
                overlay.appendChild(addBtn);
                overlay.appendChild(dlBtn);
                div.appendChild(overlay);
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

const submitComment = document.getElementById('submit-comment');
if (submitComment) {
    submitComment.addEventListener('click', async () => {
        const text = document.getElementById('comment-text').value.trim();
        const code = getQueryParam('code');
        if (!text || !code) return;
        try {
            await addDoc(collection(db, `galleries/${code}/comments`), {
                text,
                user: auth.currentUser ? auth.currentUser.email || 'Client' : 'Client',
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
        const name = document.getElementById('admin-name').value.trim();
        const surname = document.getElementById('admin-surname').value.trim();
        const email = document.getElementById('admin-email').value.trim();
        const code = document.getElementById('admin-code').value.trim();
        const pSingle = document.getElementById('admin-price-single').value;
        const pFull = document.getElementById('admin-price-full').value;
        const files = document.getElementById('admin-files').files;
        
        if (!code || !name || !surname || !email || !pSingle || !pFull || files.length === 0) {
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
                name,
                surname,
                clientEmail: email,
                code,
                priceSingle: parseFloat(pSingle),
                priceFull: parseFloat(pFull),
                createdAt: new Date()
            });
            showToast('toast_up_ok');
            document.getElementById('admin-name').value = '';
            document.getElementById('admin-surname').value = '';
            document.getElementById('admin-email').value = '';
            document.getElementById('admin-code').value = '';
            document.getElementById('admin-price-single').value = '';
            document.getElementById('admin-price-full').value = '';
            document.getElementById('admin-files').value = '';
        } catch (error) {
            showToast('toast_up_err');
        }
        uploadBtn.disabled = false;
        btnSpan.textContent = originalText;
    });
}

const checkAdmin = async (user) => {
    if (!user) return false;
    try {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        return adminDoc.exists() && adminDoc.data().isAdmin === true;
    } catch (e) {
        return false;
    }
};

updateLanguage();

if (path.endsWith('guest.html')) {
    const code = getQueryParam('code');
    if (code) loadGallery(code, false);
}

if (path.endsWith('client.html')) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            const code = getQueryParam('code');
            if (code) {
                await checkPaymentStatus(code, user.uid);
                loadGallery(code, true);
                loadComments(code);
            }
        }
    });
}

if (path.endsWith('dashboard.html')) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            const grid = document.getElementById('dashboard-grid');
            const loader = document.getElementById('loader');
            if(loader) loader.classList.remove('hidden');
            try {
                const q = query(collection(db, 'galleries'), where('clientEmail', '==', user.email));
                const snapshot = await getDocs(q);
                grid.innerHTML = '';
                if(snapshot.empty) {
                    grid.innerHTML = `<p data-i18n="no_galleries" style="grid-column: 1/-1; text-align: center; color: #666;">${i18n[currentLang]['no_galleries']}</p>`;
                } else {
                    snapshot.forEach(docSnap => {
                        const data = docSnap.data();
                        const card = document.createElement('div');
                        card.className = 'dashboard-card';
                        card.innerHTML = `
                            <h3>${data.name} ${data.surname}</h3>
                            <p>${data.code}</p>
                            <a href="client.html?code=${data.code}" class="btn">
                                <span data-i18n="open_gallery">${i18n[currentLang]['open_gallery']}</span>
                            </a>
                        `;
                        grid.appendChild(card);
                    });
                }
            } catch(e) {
                showToast(e.message);
            } finally {
                if(loader) loader.classList.add('hidden');
            }
        }
    });
}

if (path.endsWith('admin.html')) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            const isAdmin = await checkAdmin(user);
            if (!isAdmin) {
                window.location.href = 'index.html';
            }
        }
    });
}