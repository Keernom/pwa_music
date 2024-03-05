import { useState } from 'react'
import './App.css'
import MusicTrack from './components/MusicTrack/MusicTrack';
import Header from './components/MusicTrack/Header/Header';
import Button from './components/Button';


function App() {

  const getTrack = async () => {
    const url = "https://5.nikpv.z8.ru/MobileDeviceOS/getcfg.php"

    let res = await fetch(url)
    console.log(res.json())
  }

  return (
    <div className='mainDiv'>
      <Header />
      <MusicTrack trackName={'бла'} isLoaded={false} />
      <MusicTrack trackName={'бла-в-квадрате'} isLoaded={true} />
      <Button handleClick={getTrack}></Button>
    </div>
  )
}

export default App
