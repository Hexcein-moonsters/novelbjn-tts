// Override the native fetch function to intercept network requests
const originalFetch = window.fetch;
window.fetch = function(input, init) {
    if (typeof input === 'string' && input.startsWith('https://tonyassi-voice-clone.hf.space/config')) {
        input = './tonyassi-voice-clone-config.json';
    }
    return originalFetch(input, init);
};

// // Override the native XMLHttpRequest to intercept network requests
// const originalXhrOpen = XMLHttpRequest.prototype.open;
// XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
//     if (url.startsWith('https://api.dashcraft.io/trackv2/65bd295e635608c4d25bf536')) {
//         url = 'https://api.dashcraft.io/trackv2';
//     }
//     return originalXhrOpen.call(this, method, url, async, user, password);
// };