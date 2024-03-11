import { useEffect, useState } from 'react'
import './App.css'
import MusicTrack from './components/MusicTrack/MusicTrack';
import Header from './components/Header/Header';


function App() {

  const [tracks, setTracks] = useState([])

  return (
    <div className='mainDiv'>
      <Header tracksAction={setTracks} />
      <div className='tracksDiv'>
        {
          tracks.map((el, key) => { return <MusicTrack key={key} trackName={el} /> })
        }
      </div>
    </div>
  )
}

export default App
