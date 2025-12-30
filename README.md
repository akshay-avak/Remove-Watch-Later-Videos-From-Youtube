# ✅ Script to REMOVE Watch Later Videos from YouTube 
# ❌ No need to install anything 

## Step 1️⃣ 
👉 Goto this link https://www.youtube.com/playlist?list=WL

⚠️Note : Make sure you are logged in the google account from which you want to remove videos from.    
If you want to switch account look at this👇
![switch google account](/Gif/switch_Account.gif)

<hr>

## Step 2️⃣
Open console by pressing **ctrl + shift + K**. It is important to be in the watch later webpage.     

![Console](/Screenshots/OpenBrowserConsole.png)  

## Step 3️⃣
 Now the console will be opened.Click the area that the red arrow is pointing to.Click there and  the console will be waiting for the code/instruction(the cursor blinking indicates that). 
![Console](/Screenshots/ConsoleOpened.png)

# Code 1
```javascript 
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

```
# Code 2 (✅Recommended)
```javascript
// Run on: https://www.youtube.com/playlist?list=WL

let deleting = false;
let loopId = null;

async function removeTopVideo() {
  const video = document.querySelector('ytd-playlist-video-renderer');
  if (!video) {
    console.log('No more videos – stopping.');
    if (loopId !== null) clearInterval(loopId);
    return;
  }

  try {
    video.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 1) Try multiple selectors for the 3-dots menu button
    let menuButton =
      video.querySelector('button[aria-label*="Action menu"]') ||
      video.querySelector('yt-icon-button#button') ||
      video.querySelector('button[aria-haspopup="true"]');

    if (!menuButton) {
      console.log('Menu button not found for this video, skipping.');
      return;
    }
    menuButton.click();

    // 2) Wait for the menu to open
    await new Promise(r => setTimeout(r, 800));

    // 3) Click "Remove from Watch later"
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

    // 4) Wait for YouTube to update the list
    await new Promise(r => setTimeout(r, 1500));
  } catch (e) {
    console.error('Error while removing video:', e);
  }
}

loopId = setInterval(() => {
  if (!deleting) {
    deleting = true;
    removeTopVideo().finally(() => (deleting = false));
  }
}, 2500);

```
<hr>
Copy paste the above code(Code 1 or Code 2) here 👇 in the line with two >> greater than symbols.

![close up](/Screenshots/CloseUpOnConsole.png) 

<hr>
This is how it will look after copy pasting the code

![Code Pasted](/Screenshots/CodePasted.png)
<hr>

After copy pasting the code goto the last line of code by scrolling down -> click at the last line and press **enter** Key.

![Last Line of Code](/Screenshots/LastLineOfCode.png)

## Step 4️⃣
Wait till all the videos are removed from **Watch Later**.
![Code In Action](/Gif/CodeInAction.gif)

If you want to quit the code being run in the middle of running use the this code 👉``` clearInterval(loopId);```.  

 here👇 and press enter 
 
![close up on console](/Screenshots/CloseUpOnConsole.png)

![To stop the code being run](/Screenshots/EndOutput.png)
<hr>

♻️Now refresh the page.You can see the number of videos has reduced here👇  
   
<br> 

![Videos are removed](/Screenshots/VideosRemoved.png)

<br>
😇You can run the code until all the videos are removed.  

# ⚠️ It is important to keep the tab and window OPEN in which the 'watch later' webpage and code is running.


