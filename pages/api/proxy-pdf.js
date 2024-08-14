// pages/api/proxy-pdf.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    res.setHeader('Content-Type', 'application/pdf');
    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
