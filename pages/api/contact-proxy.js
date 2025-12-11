import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const url = 'https://alphaone.greenlightautomotivesolutions.com/bridge/contact/';

  try {
    const response = await axios.post(url, req.body, { timeout: 10000 });
    return res.status(response.status).json(response.data ? response.data : response);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data || { error: 'Upstream error' });
    }
    return res.status(502).json({ error: 'Bad Gateway' });
  }
}
