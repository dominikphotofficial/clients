import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const sessionData = sessionStorage.getItem('clientGallery');
if (!sessionData) {
    window.location.href = 'index.html';
}

const data = JSON.parse(sessionData);
document.getElementById('gTitle').innerText = data.title;
document.getElementById('gSubtitle').innerText = data.subtitle;

if (data.zip_url) {
    const zip = document.getElementById('zipLink');
    zip.href = data.zip_url;
    zip.style.display = 'block';
}

const grid = document.getElementById('grid');
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
let currentIdx = 0;

data.photos.forEach((photo, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${photo.thumb}" loading="lazy">`;
    div.onclick = () => {
        currentIdx = index;
        lbImg.src = data.photos[currentIdx].full;
        lb.classList.add('active');
    };
    grid.appendChild(div);
});

document.getElementById('lbClose').onclick = () => lb.classList.remove('active');

document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowRight') {
        currentIdx = (currentIdx + 1) % data.photos.length;
        lbImg.src = data.photos[currentIdx].full;
    } else if (e.key === 'ArrowLeft') {
        currentIdx = (currentIdx - 1 + data.photos.length) % data.photos.length;
        lbImg.src = data.photos[currentIdx].full;
    } else if (e.key === 'Escape') {
        lb.classList.remove('active');
    }
});

document.getElementById('reviewForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = "Siunčiama...";

    await addDoc(collection(db, "reviews"), {
        gallery: data.title,
        name: document.getElementById('revName').value,
        rating: document.getElementById('revRate').value,
        text: document.getElementById('revMsg').value,
        approved: false,
        date: new Date().toISOString()
    });

    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('revSuccess').style.display = 'block';
};
