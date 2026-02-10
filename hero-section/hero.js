// Hero section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ensure video plays
    const video = document.querySelector('.video-background video');
    if (video) {
        video.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
    }
});
