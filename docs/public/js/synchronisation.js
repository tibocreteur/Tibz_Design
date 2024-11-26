// When the entire page is loaded
window.addEventListener("load", (event) => {
    // Initialize the syncImages function every 1.5 seconds to synchronize the images every 1.5 seconds
    window.setInterval(() => {
        const syncImgContainers = document.querySelectorAll(".js-sync-image-container");

        // Loop through each container and synchronize the images within it
        syncImgContainers.forEach((syncImgContainer) => {
            // Get all the images within the container and find the currently active image
            const images = syncImgContainer.getElementsByTagName('img');
            let currentIndex = Array.from(images).findIndex(image => image.classList.contains('active'))
            let nextIndex = currentIndex + 1;

            // If there are no more images, reset the index to the first image
            if (nextIndex >= images.length) {
                nextIndex = 0;
            }

            // Remove the active class from the current image and add it to the next image
            images[currentIndex].classList.remove('active');
            images[nextIndex].classList.add('active');
        })
    }, 1500 // You can change the time duration of the event, 1500 = 1.5s, 2000 = 2s...
    )
});