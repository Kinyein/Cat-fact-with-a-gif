import './App.css'
import { CatFact } from './components/CatFact'

function App() {

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      placeItems: 'center',
      gap: '20px',
    }}>
      <CatFact />
    </div>
  )
}

export default App
