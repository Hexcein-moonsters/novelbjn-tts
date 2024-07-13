async function fetchAndExtractText(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const contentDiv = doc.querySelector('#chr-content');
        if (contentDiv) {
            const textContent = contentDiv.textContent;
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
