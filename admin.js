import { auth, db, storage } from './firebase-config.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const saveGallery = async () => {
    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const pin = document.getElementById('pin').value;
    const zipUrl = document.getElementById('zip').value;
    const files = document.getElementById('files').files;
    const status = document.getElementById('status');
    
    if (!title || !pin || files.length === 0) {
        alert("Užpildykite visus laukus");
        return;
    }

    const photoData = [];
    status.innerText = "Pradedamas įkėlimas...";

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        status.innerText = `Kelama: ${i + 1} iš ${files.length}`;
        const storageRef = ref(storage, `galleries/${pin}/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        photoData.push({ thumb: url, full: url });
    }

    await addDoc(collection(db, "galleries"), {
        title: title,
        subtitle: subtitle,
        pin: pin,
        zip_url: zipUrl,
        photos: photoData,
        date: new Date().toISOString(),
        settings: {
            bg_color: "#FBF9F6",
            accent_color: "#113939",
            columns: 3
        }
    });

    status.innerText = "Galerija sėkmingai sukurta!";
    setTimeout(() => location.reload(), 2000);
};

document.getElementById('saveBtn').addEventListener('click', saveGallery);

document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
