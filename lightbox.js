export class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lbModal');
        this.lightboxImg = document.getElementById('lbDisplayImg');
        this.counter = document.getElementById('lbCounter');
        this.downloadBtn = document.getElementById('lbDownloadBtn');
        this.closeBtn = document.getElementById('lbCloseBtn');
        this.prevBtn = document.getElementById('lbPrevBtn');
        this.nextBtn = document.getElementById('lbNextBtn');
        this.photos = [];
        this.currentIndex = 0;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.init();
    }

    init() {
        if (!this.lightbox || !this.lightboxImg) return;

        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox || e.target.classList.contains('lb-stage')) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });

        this.lightbox.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        this.lightbox.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < -50) this.next();
            if (deltaX > 50) this.prev();
        } else {
            if (deltaY > 80) this.close();
        }
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

        if (this.counter) {
            this.counter.innerText = `${this.currentIndex + 1} / ${this.photos.length}`;
        }
        if (this.downloadBtn) {
            this.downloadBtn.href = photo.full || photo.thumb;
        }

        this.lightboxImg.style.opacity = '0';
        const temp = new Image();
        temp.src = photo.full || photo.thumb;
        temp.onload = () => {
            this.lightboxImg.src = temp.src;
            this.lightboxImg.style.opacity = '1';
        };
    }
}
