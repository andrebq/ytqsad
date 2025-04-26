(() => {
    const ytqsadData = {
        checks: 0,
        skips: 0,
        speedups: 0
    };

    function log(...args) {
        console.info('[YT QS Ad]', ...args);
    }

    function getVideo() {
        return document.querySelector('.video-stream.html5-main-video');
    }

    function speedupVideo(rate = 2) {
        const video = getVideo();
        if (video && video.playbackRate < 5) {
            const randomized = rate + (Math.random() * 0.4 - 0.2);
            video.playbackRate = randomized;
            ytqsadData.speedups++;
            log(`Playback speed set to ${randomized.toFixed(2)}`);
        }
    }

    function autoClickSkipAd() {
        const skipButton = [...document.querySelectorAll('button')].find(btn =>
            btn.textContent?.toLowerCase().includes('skip')
        );
        if (skipButton) {
            const delay = 500 + Math.random() * 800;
            setTimeout(() => {
                if (skipButton.isConnected) {
                    skipButton.click();
                    ytqsadData.skips++;
                    log('Skip button clicked');
                }
            }, delay);
        }
    }

    function checkForAd() {
        const adModule = document.querySelector('.ytp-ad-module');
        if (adModule && adModule.childElementCount > 0) {
            autoClickSkipAd();
            speedupVideo(10);
        }
        ytqsadData.checks++;
    }

    function observeDomChanges() {
        const observer = new MutationObserver(() => {
            checkForAd();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        log('Mutation observer installed');
    }

    function waitForPageReady() {
        const tryInit = () => {
            if (document.readyState === 'complete') {
                observeDomChanges();
                log('Ad check initialized');
            } else {
                setTimeout(tryInit, 300 + Math.random() * 200);
            }
        };
        tryInit();
    }

    waitForPageReady();

    // Optional: expose stats in a safe way for debugging
    //window.__ytqsad = Object.freeze(ytqsadData);
})();
