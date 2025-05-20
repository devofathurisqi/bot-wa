// chatController.js
const axios = require('axios');
const apiKey = "AIzaSyCulFn7sSwSuXjFiSSNXE_EoZB8RFtxrF4";


const chatWithGpt = async (req) => {
  try {

    const curl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: req,
            },
          ],
        },
      ],
    };

    const response = await axios.post(curl, payload);
    const reply = response.data.candidates[0].content.parts[0].text;
    
    console.log(reply);
    return reply;

  } catch (error) {
    console.error("OpenAI API error:", error);
  }
};

module.exports = { chatWithGpt }; 
