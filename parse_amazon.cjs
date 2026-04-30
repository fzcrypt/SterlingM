const https = require('https');

https.get('https://www.amazon.in/GREEN-GARDENS-Plants-Langra-Grafted/dp/B0CKT44TJD', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    let match = data.match(/hiRes" *: *"([^"]+)"/);
    if (!match) {
        match = data.match(/"large" *: *"([^"]+)"/);
    }
    if (!match) {
        match = data.match(/data-old-hires="([^"]+)"/);
    }
    if (!match) {
      match = data.match(/img src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
    }
    
    if (match) {
      console.log('Found Image:', match[1]);
    } else {
      console.log('No image found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});