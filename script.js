// Run on: https://www.youtube.com/playlist?list=WL
// It removes one video at a time, top‑to‑bottom.

let deleting = false;

async function removeTopVideo() {
  // Find the first video in the list
  const video = document.querySelector('ytd-playlist-video-renderer');
  if (!video) {
    console.log('No more videos – done.');
    clearInterval(loopId);
    return;
  }

  try {
    // 1) Click the 3‑dots "Action menu" on that video
    const menuButton = video.querySelector('#primary button[aria-label]');
    if (!menuButton) {
      console.log('Menu button not found, skipping this video.');
      video.scrollIntoView();
      return;
    }
    menuButton.click();

    // 2) Wait a bit for the menu to open
    await new Promise(r => setTimeout(r, 600));

    // 3) Click the "Remove from Watch later" item
    const items = Array.from(
      document.querySelectorAll('ytd-menu-service-item-renderer')
    );

    const removeItem = items.find(el =>
      /remove.*watch later/i.test(el.innerText)
    );

    if (removeItem) {
      removeItem.click();
      console.log('Removed one video.');
    } else {
      console.log('"Remove from Watch later" not found, closing menu.');
    }

    // 4) Small delay so YouTube can update the list
    await new Promise(r => setTimeout(r, 1200));
  } catch (e) {
    console.error('Error while removing video:', e);
  }
}

// Call the function every 2 seconds until the list is empty
const loopId = setInterval(() => {
  if (!deleting) {
    deleting = true;
    removeTopVideo().finally(() => (deleting = false));
  }
}, 2000);
