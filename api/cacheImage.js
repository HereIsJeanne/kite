// api/cacheImage.js

export default async (req, res) => {
    const imageUrl = decodeURIComponent(req.query.imageUrl);

    try {
        console.log(`Fetching image: ${imageUrl}`);
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch the image. Status: ${response.statusText}`);
        }

        // Use arrayBuffer() instead of buffer()
        const imageArrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);

        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust as needed
        res.send(imageBuffer);
    } catch (error) {
        console.error(`Error fetching image from ${imageUrl}:`, error);
        res.status(500).send(`Error fetching image: ${error.message}`);
    }
};
