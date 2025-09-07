export async function getGif (text: string) {
  if (!text.length) return [];
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${text}`);
  const giphyData = await res.json();
  const gifList = giphyData.data.map((element: {images: {original: {url: string}}}) => (element.images.original.url))
  return gifList;
}