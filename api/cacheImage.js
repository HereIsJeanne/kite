// api/cacheImage.js

export default async (req, res) => {
    const { imageUrl } = req.query;

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch the image: ${response.statusText}`);
        }

        const imageBuffer = await response.buffer();

        // Set cache headers for edge caching
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type as needed

        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
};
