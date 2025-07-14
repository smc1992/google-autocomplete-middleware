const express = require('express');
const axios = require('axios');
const app = express();

const GOOGLE_API_KEY = 'AIzaSyCRSVZvsrl-W9tMG5fa7Mh_iAGByhIi6sU';

app.get('/autocomplete', async (req, res) => {
  const input = req.query.input;
  if (!input) return res.status(400).json({ error: 'input erforderlich' });
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&key=${GOOGLE_API_KEY}&language=de`;
    const response = await axios.get(url);
    res.json(response.data.predictions.map(p => p.description));
  } catch (err) {
    res.status(500).json({ error: 'Fehler bei Google API', details: err.message });
  }
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));
