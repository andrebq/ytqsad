let checkCount = 0;
const ytqsadData = {
    checks: 0,
    defaultSpeed: 1
};
function speedupVideo(nval) {
    let video = document.querySelector('.video-stream.html5-main-video');
    if (video) {
        video.playbackRate = nval;
    }
}
function autoClickSkipAd() {
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
    if (skipButton) {
        skipButton.click();
        console.info('Skip button clicked');
    }
}
function checkAdd() {
    let adMod = document.querySelector('.ytp-ad-module');
    if (adMod && adMod.childElementCount > 0) {
        autoClickSkipAd();
        speedupVideo(10);
    }
    ytqsadData.checks++;
}

function printStats() {
    console.info('YT QS Ad stats: ', ytqsadData);
}
window.setInterval(checkAdd, 100);
//window.setInterval(printStats, 1000);
Object.setPrototypeOf(window, 'ytqsad', {
    value: ytqsadData,
    writeable: false,
    enumerable: false,
})
console.info('Ad check installed');