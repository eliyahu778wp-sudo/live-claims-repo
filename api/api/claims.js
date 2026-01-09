export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch(
      "https://the-roofers-desk-api.com/v1/claims",
      {
        headers: {
          Authorization: `Bearer ${process.env.PARTNER_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Upstream API error",
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Proxy failure",
      details: err.message,
    });
  }
}
