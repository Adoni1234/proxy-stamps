export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // O reemplaza * por el dominio de tu frontend
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(buffer));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
