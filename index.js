async function fetchAndExtractText(url) {
    document.getElementById("myInput").style.display = "block";
    document.getElementById("tooltip").style.display = "block";
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
            
            document.getElementById("myInput").value = textContent

            //await text_to_speech(textContent)

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
			
async function text_to_speech(text) {

// //const app = await client("tonyassi/voice-clone");
// const result =  await app.predict("/predict", [
//   "Hey, it's me Megan Fox from Transformers. Type in whatever you'd like me to say. OKAY?",
//   {
//     "path": "/tmp/gradio/0ade2f086fea6743a2e24fbe73cae32bdeda0be6/Megan-Fox.mp3",
//     "url": "https://tonyassi-voice-clone.hf.space/file=/tmp/gradio/0ade2f086fea6743a2e24fbe73cae32bdeda0be6/Megan-Fox.mp3",
//     "size": null,
//     "orig_name": "Megan-Fox.mp3",
//     "mime_type": null,
//     "is_stream": false,
//     "meta": {
//       "_type": "gradio.FileData"
//     }
//   }
// ]);
// console.log(result.data);


   const response_0 = await fetch("./deep_voice.mp3");
   const exampleAudio = await response_0.blob();
    console.log(exampleAudio)            
    const app = await client("tonyassi/voice-clone");
    const result = await app.predict("/predict", [		
			"Hello!! And who are you?", // string  in 'Text' Textbox component
			exampleAudio, 	// blob in 'Voice reference audio file' Audio component
	]);
    console.log(result.data);
}







function copyNovel() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}
  
function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}