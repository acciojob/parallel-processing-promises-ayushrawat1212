//your JS code here. If required.


const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Selecting HTML elements
      const button = document.getElementById("btn");
      const output = document.getElementById("output");
      const error = document.getElementById("error");
      const loading = document.getElementById("loading");

      // Function to download a single image
      function downloadImage(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();

          // If image loads successfully
          img.onload = () => {
            resolve(img);
          };

          // If image fails to load
          img.onerror = () => {
            reject(new Error("Image failed to load: " + url));
          };

          // Start downloading the image
          img.src = url;
        });
      }

      // Main function to download multiple images
      async function downloadImages() {
        // Clear previous content
        output.innerHTML = "";
        error.textContent = "";

        // Display loading message
        loading.style.display = "block";

        try {
          // Create an array of Promises
          const promises = imageUrls.map((img) => downloadImage(img.url));

          // Wait for all images to download successfully
          const images = await Promise.all(promises);

          // Display all downloaded images
          images.forEach((img) => {
            output.appendChild(img);
          });
        } catch (err) {
          // Display error if any image fails
          error.textContent = err.message;
        } finally {
          // Hide loading message whether successful or failed
          loading.style.display = "none";
        }
      }

      // Execute when button is clicked
      button.addEventListener("click", downloadImages);
