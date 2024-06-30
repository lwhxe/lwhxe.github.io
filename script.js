// Function to add hover effects to elements
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

// Handling dynamic banner display based on scroll direction
let lastScrollTop = 0;
const banner = document.getElementById('scrollBanner');

let throttleTimeout = null; // Throttling implementation to optimize scroll event handling
window.addEventListener('scroll', () => {
    if (throttleTimeout) return;

    throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            banner.style.top = '-50px';
        } else {
            banner.style.top = '0';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 100); // Adjust the timeout as needed
}, false);

// Apply hover effect to specific elements
const imageButtons = document.getElementsByClassName("image-button");
addHoverEffect(imageButtons, 'hover-content');
const downlinks = document.getElementsByClassName("downlink");
addHoverEffect(downlinks, 'downlink-hover');

// Close stream functionality
document.getElementById('closeStream').addEventListener('click', () => {
    document.getElementById('liveStreamContainer').style.display = 'none';
});

// On DOMContentLoaded, initialize live stream fetching logic
document.addEventListener('DOMContentLoaded', () => {
    // Note: Replace 'google_token' with a secure method to access your API key
    // For demonstration, using a placeholder. In practice, use environment variables or server-side handling
    const apiKey = "AIzaSyB3Qk66D50oW-Oe1kdNPnuNURWGuxPfo0E"; // Placeholder, replace with secure handling
    const channelId = 'UCI-1llMHedQkNiLsLCZtjdQ';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const liveStreamContainer = document.getElementById('liveStreamContainer');
            if (data.items.length > 0) {
                if (!liveStreamContainer.querySelector('iframe')) {
                    const iframe = document.createElement('iframe');
                    const closeButton = document.createElement('button');

                    iframe.src = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
                    iframe.setAttribute('frameBorder', "0");
                    iframe.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
                    iframe.setAttribute('allowFullscreen', true);
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
                    closeButton.setAttribute('aria-label', 'Close live stream');

                    liveStreamContainer.appendChild(iframe);
                    liveStreamContainer.appendChild(closeButton);
                    liveStreamContainer.style.display = 'block';
                }
            } else {
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

// Twitch Stream Checker Logic
const clientId = 'tgf9j931hxqejri51yy1brgv6nawsx';
const redirectUri = "https://lwhxe.github.io/";
const userName = 'last_wish_lunch_break';

function getAccessToken() {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'token',
        scope: 'user:read:email'
    });

    window.location.href = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
}

async function checkStreamStatus(accessToken) {
    try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${userName}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch stream status:', response.statusText);
            return false;
        }

        const data = await response.json();
        return data.data.length > 0;
    } catch (error) {
        console.error('Error checking stream status:', error);
        return false;
    }
}

function embedTwitchStream() {
    const embedDiv = document.getElementById('twitch-embed');
    embedDiv.innerHTML = `<iframe
        src="https://player.twitch.tv/?channel=${userName}&parent=${window.location.hostname}"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen>
    </iframe>`;
    embedDiv.style.display = 'block';
}

function parseAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

(async function() {
    const accessToken = parseAccessTokenFromUrl();
    if (!accessToken) {
        console.log('No access token found, redirecting to Twitch for authorization');
        getAccessToken();
    } else {
        console.log('Access token found:', accessToken);
        const isLive = await checkStreamStatus(accessToken);
        if (isLive) {
            console.log('Stream is live, embedding Twitch player');
            embedTwitchStream();
        } else {
            console.log('Stream is not live');
        }
    }
})();
