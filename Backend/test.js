const axios = require('axios');

async function testBackend(message) {
  try {
    const response = await axios.post('http://localhost:5000/ask', {
      message: message,
    });

    console.log('Backend Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Backend Response Data:', error.response.data);
    }
  }
}

const testMessage = 'What is compound interest?'; // Your test message

testBackend(testMessage);