import { useEffect, useState } from "react"
import { getGif } from "../services/getGif";

export function Giphy({ threeWords }: { threeWords: string }) {
  const [gifs, setGifs] = useState([])
  const [currentGif, setCurrentGif] = useState(0);

  useEffect(() => {
    getGif(threeWords).then(gifList => setGifs(gifList));
    setCurrentGif(0);
  }, [threeWords])

  const changeGif = () => {
    if (currentGif === gifs.length - 1) {
      setCurrentGif(0)
      return 0
    };
    setCurrentGif(currentGif + 1);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <img
        src={gifs[currentGif]}
        alt={`Gif searched with this words: ${threeWords}`}
        style={{
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          height: '100%'
        }}
      />
      <button onClick={changeGif}>Change gif</button>
    </div>
  )
}