import { useEffect, useState } from "react"
import { getCatFact } from "../services/getCatFact"
import { Giphy } from "./Giphy"

export function CatFact() {
  const [catFact, setCatFact] = useState("")

  const setANewCatFact = () => {
    getCatFact().then(fact => setCatFact(fact))
  }

  useEffect(() => {
    setANewCatFact();
  }, [])

  const threeWords = catFact.split(" ", 3).join(" ");

  return (
    <>
      <Giphy threeWords={threeWords} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <h1>{catFact}</h1>
        <button onClick={setANewCatFact}>New Fact</button>
      </div>
    </>
  )
}