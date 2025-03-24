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
function checkAdd() {
    let adMod = document.querySelector('.ytp-ad-module');
    if (adMod && adMod.childElementCount > 0) {
        console.info('Ad is playing...');
        speedupVideo(10);
        printStats();
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