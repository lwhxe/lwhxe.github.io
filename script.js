function addHoverEffect(elements, hoverClassName) {
    Array.from(elements).forEach(element => {
        element.addEventListener("mouseenter", () => {
            const hoverContent = element.querySelector('.' + hoverClassName);
            if (hoverContent) {
                hoverContent.style.display = 'block';
            }
        });

        element.addEventListener("mouseleave", () => {
            const hoverContent = element.querySelector('.' + hoverClassName);
            if (hoverContent) {
                hoverContent.style.display = 'none';
            }
        });
    });
}

let lastScrollTop = 0;
const banner = document.getElementById('scrollBanner');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        banner.style.top = '-50px';
    } else {
        banner.style.top = '0';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// Apply to image buttons
const imageButtons = document.getElementsByClassName("image-button");
addHoverEffect(imageButtons, 'hover-content');

// Apply to downlinks
const downlinks = document.getElementsByClassName("downlink");
addHoverEffect(downlinks, 'downlink-hover');

document.getElementById('closeStream').addEventListener('click', () => {
  document.getElementById('liveStreamContainer').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  const apiKey google_token; // Make sure to replace this with your actual API key
  const channelId = 'UCI-1llMHedQkNiLsLCZtjdQ';
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const liveStreamContainer = document.getElementById('liveStreamContainer');
      if (data.items.length > 0) {
        // If the channel is live, ensure the container is displayed and contains the iframe for the live stream
        if (!liveStreamContainer.querySelector('iframe')) { // Avoid adding multiple iframes
          const iframe = document.createElement('iframe');
          const closeButton = document.createElement('button');

          iframe.src = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.style.width = "300px";
          iframe.style.height = "200px";

          closeButton.textContent = "X";
          closeButton.onclick = () => { liveStreamContainer.style.display = 'none'; };
          closeButton.style.position = "absolute";
          closeButton.style.top = "0";
          closeButton.style.right = "0";
          closeButton.style.backgroundColor = "red";
          closeButton.style.color = "white";
          closeButton.style.border = "none";
          closeButton.style.borderRadius = "50%";
          closeButton.style.cursor = "pointer";

          liveStreamContainer.appendChild(iframe);
          liveStreamContainer.appendChild(closeButton);
          liveStreamContainer.style.display = 'block'; // Ensure the container is visible
        }
      } else {
        // If the channel is not live, remove the iframe and hide the container
        const iframe = liveStreamContainer.querySelector('iframe');
        if (iframe) {
          iframe.remove();
        }
        liveStreamContainer.style.display = 'none';
      }
      liveStreamContainer.style.position = "fixed";
      liveStreamContainer.style.bottom = "20px";
      liveStreamContainer.style.right = "20px";
      liveStreamContainer.style.zIndex = "1000";
    })
    .catch(error => console.error('Error fetching live stream status:', error));
});
