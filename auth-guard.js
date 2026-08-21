document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const isGallery = currentPath.includes('gallery');
    const sessionData = sessionStorage.getItem('clientGallery');

    if (isGallery && !sessionData) {
        window.location.replace('index.html');
        return;
    }

    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
});
