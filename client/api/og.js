export default async function handler(req, res) {
    // 1. Get the path from the request URL
    const { url } = req;
    const VITE_API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://lss-unilorin-api.onrender.com/api';

    let ogTitle = "Law Students' Society, University of Ilorin";
    let ogDescription = "The official digital hub for the Law Students' Society (LSS), University of Ilorin.";
    let ogImage = "https://i.postimg.cc/SQTVn92z/Whats-App-Image-2025-10-04-at-07-25-48-8257343e.jpg";

    try {
        // 2. Parse the URL to see if it's a news post or an event
        if (url.includes('/news/')) {
            const slug = url.split('/news/')[1].split('?')[0];
            const response = await fetch(`${VITE_API_BASE_URL}/posts/${slug}`);
            if (response.ok) {
                const post = await response.json();
                ogTitle = `${post.title} | LSS Unilorin`;
                ogDescription = post.contentBody
                    ? post.contentBody.replace(/<[^>]+>/g, '').substring(0, 160) + '...'
                    : ogDescription;
                ogImage = post.coverImageUrl || ogImage;
            }
        } else if (url.includes('/events/')) {
            const id = url.split('/events/')[1].split('?')[0];
            const response = await fetch(`${VITE_API_BASE_URL}/events/${id}`);
            if (response.ok) {
                const event = await response.json();
                ogTitle = `${event.title} | LSS Unilorin`;
                ogDescription = event.description || ogDescription;
                ogImage = event.imageUrl || ogImage;
            }
        }

        // 3. To serve the HTML, we must fetch the underlying index.html 
        // We cannot fetch the same URL again or we will cause an infinite loop with the Vercel Rewrite.
        // Instead we fetch the base host domain without the path.
        const host = req.headers.host;
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

        // We fetch the raw index.html from the root of our deployment
        const htmlResponse = await fetch(baseUrl);
        let htmlContent = await htmlResponse.text();

        // 4. Inject the tags into the <head>
        const metaTagsToInject = `
    <!-- INJECTED BY VERCEL SERVERLESS FUNCTION -->
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${baseUrl}${url}" />
    <meta property="og:image" content="${ogImage}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    <!-- END INJECTED TAGS -->
    `;

        // Make sure we actually have head tags to replace
        if (htmlContent.includes('</head>')) {
            htmlContent = htmlContent.replace('</head>', `${metaTagsToInject}\n</head>`);
        } else {
            console.warn("Could not find </head> in fetched HTML. HTML might be malformed.");
        }

        // 5. Send back the HTML
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300'); // Cache for 1 min
        res.status(200).send(htmlContent);

    } catch (error) {
        console.error("Error generating OG tags:", error);
        // Fallback: If anything fails, at least redirect the bot back to the normal route
        // Note: Since we use rewrite, a raw redirect might loop. Instead, send a basic HTML structure.
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send(`<!DOCTYPE html><html><head><title>${ogTitle}</title></head><body>Redirecting...</body></html>`);
    }
}
