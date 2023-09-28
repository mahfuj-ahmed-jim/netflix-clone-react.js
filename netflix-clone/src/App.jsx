import './App.css'
import Row from './components/rows/Row'
import requests from './request'

function App() {

  return (
    <div>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}></Row>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
    </div>
  )
}

export default App
