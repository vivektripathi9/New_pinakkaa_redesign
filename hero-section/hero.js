// Hero section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ensure video plays
    const video = document.querySelector('.video-background video');
    const logoContainer = document.querySelector('.hero-logo-container');
    if (video) {
        video.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
        const showLogo = () => {
            if (logoContainer) {
                logoContainer.classList.add('is-visible');
            }
        };
        if (video.readyState >= 2) {
            showLogo();
        } else {
            video.addEventListener('loadeddata', showLogo, { once: true });
            video.addEventListener('canplay', showLogo, { once: true });
        }
    }
});
