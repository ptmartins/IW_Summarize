async function summarizeContent(text) {
    const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    // const API_TOKEN = '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'; 
    const API_TOKEN = process.env.TOKEN; 

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: text
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch summary');
    }

    const data = await response.json();
    return data[0].summary_text; 
}


async function summarizeInputText() {
    const inputText = document.getElementById('inputText').value;

    if (!inputText) {
        document.getElementById('result').innerText = 'Please enter some text to summarize!';
        return;
    }

    const summary = await summarizeContent(inputText);

    document.getElementById('result').innerText = summary;
}

document.getElementById('summarizeBtn').addEventListener('click', summarizeInputText);