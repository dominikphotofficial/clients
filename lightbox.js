export class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lb');
        this.lightboxImg = document.getElementById('lbImg');
        this.closeBtn = document.getElementById('lbClose');
        this.photos = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.lightbox || !this.lightboxImg) return;

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
    }

    setPhotos(photos) {
        this.photos = photos;
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        if (!this.photos.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
        this.updateImage();
    }

    prev() {
        if (!this.photos.length) return;
        this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
        this.updateImage();
    }

    updateImage() {
        const photo = this.photos[this.currentIndex];
        if (!photo) return;
        this.lightboxImg.style.opacity = '0';
        this.lightboxImg.style.transition = 'opacity 0.2s ease';
        
        const temp = new Image();
        temp.src = photo.full || photo.thumb;
        temp.onload = () => {
            this.lightboxImg.src = temp.src;
            this.lightboxImg.style.opacity = '1';
        };
    }
}
