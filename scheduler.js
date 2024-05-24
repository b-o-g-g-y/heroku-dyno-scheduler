const axios = require('axios');

// Your Heroku API token
const HEROKU_API_TOKEN = process.env.HEROKU_API_TOKEN;
// Your Heroku app name
const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME;
// The type of dyno you want to scale (e.g., web, worker)
const DYNO_TYPE = process.env.DYNO_TYPE || 'web';
// Number of dynos to scale to
const DYNO_QUANTITY = process.env.DYNO_QUANTITY || 1;

async function scaleDynos() {
  try {
    const response = await axios.patch(
      `https://api.heroku.com/apps/${HEROKU_APP_NAME}/formation/${DYNO_TYPE}`,
      {
        quantity: DYNO_QUANTITY
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.heroku+json; version=3',
          'Authorization': `Bearer ${HEROKU_API_TOKEN}`
        }
      }
    );
    console.log(`Successfully scaled ${DYNO_TYPE} dynos to ${DYNO_QUANTITY}`);
  } catch (error) {
    console.error('Error scaling dynos:', error.response ? error.response.data : error.message);
  }
}

// Call the function to scale the dynos
scaleDynos();
