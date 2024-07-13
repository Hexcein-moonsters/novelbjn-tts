async function fetchAndExtractText(url) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let html = await response.json();
        html = html.contents;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const contentDiv = doc.querySelector('#chr-content');
        if (contentDiv) {
            let textContent = contentDiv.textContent;

            // Remove lines containing "window.pubfuturetag"
            textContent = textContent.replace(/window\.pubfuturetag[\s\S]*?\);/g, '');

            // Remove empty lines at the start and end
            textContent = textContent.trim();
            textContent = textContent.replace(/^\s*$(?:\r\n?|\n)/gm, '');

            // Remove lines starting with "Translator:"
            textContent = textContent.replace(/^.*Translator:.*$/gm, '');

            console.log(textContent);
        } else {
            console.error('Content div not found');
        }
    } catch (error) {
        console.error('Error fetching and extracting text:', error);
    }
}

// Example usage
fetchAndExtractText('https://novelbjn.novelupdates.net/book/release-that-witch/chapter-483');
