export async function handler(event) {
  const category = event.queryStringParameters.category || "technology";
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${category}&language=en&pageSize=9&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
}
