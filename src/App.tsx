import './index.css'
import SneakerProductCarousel from './ui/pages/Snacker/SnackerProductCarousal'
import products from './assets/data/data.json'


function App() {
  return (
    <SneakerProductCarousel products={products} />
  )
}

export default App
