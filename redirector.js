// Override the native fetch function to intercept network requests
const originalFetch = window.fetch;
window.fetch = function(input, init) {
    if (typeof input === 'string' && input.startsWith('https://tonyassi-voice-clone.hf.space/config')) {
        input = './tonyassi-voice-clone-config.json';
    } else if (typeof input === 'string' && input.startsWith('https://tonyassi-voice-clone.hf.space/info')) {
        input = './tonyassi-voice-clone-info.json'
    }
    return originalFetch(input, init);
};
