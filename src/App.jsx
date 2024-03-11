import { useEffect, useState } from 'react'
import './App.css'
import MusicTrack from './components/MusicTrack/MusicTrack';
import Header from './components/Header/Header';
import Button from './components/Button';


function App() {

  const [tracks, setTracks] = useState([])

  return (
    <div className='mainDiv'>
      <Header tracksAction={setTracks} />
      {
        tracks.map((el) => { return <MusicTrack trackName={el} isLoaded={false} /> })
      }
    </div>
  )
}

export default App
