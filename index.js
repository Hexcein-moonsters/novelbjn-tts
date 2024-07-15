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
            textContent = textContent.replace(/window\.pubfuturetag = window\.pubfuturetag \|\| \[\];window\.pubfuturetag\.push\({unit: ".*", id: ".*"}\)/g, '');

            // Remove empty lines at the start and end
            textContent = textContent.trim();
            textContent = textContent.replace(/^\s*[\r\n]/gm, '');

            // Remove lines starting with "Translator:"
            textContent = textContent.replace(/^.*Translator:.*$/gm, '');

            // Additional step: Remove any remaining lines with specific unwanted patterns
            textContent = textContent.replace(/^.*window\.pubfuturetag.*$/gm, '');

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


import { client } from 'https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js';

const response_0 = await fetch("./deep_voice.mp3");
const exampleAudio = await response_0.blob();
						
const app = await client("https://myshell-ai-openvoicev2.hf.space/--replicas/sh0ts/");
const result = await app.predict(1, [		
				"Howdy! But who are you?", // string  in 'Text Prompt' Textbox component		
				"en_us", // string (Option from: [('en_default', 'en_default'), ('en_us', 'en_us'), ('en_br', 'en_br'), ('en_au', 'en_au'), ('en_in', 'en_in'), ('es_default', 'es_default'), ('fr_default', 'fr_default'), ('jp_default', 'jp_default'), ('zh_default', 'zh_default'), ('kr_default', 'kr_default')]) in 'Style' Dropdown component
				exampleAudio, 	// blob in 'Reference Audio' Audio component		
				true, // boolean  in 'Agree' Checkbox component
	]);

console.log(result.data);