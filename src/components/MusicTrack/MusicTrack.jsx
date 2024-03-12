import { useEffect, useState } from "react"
import Button from "../Button"
import style from "./MusicTrack.module.css"
import { GetTracks } from "../../services/IndexedDBService"

export default function MusicTrack({ trackId, trackName, handleClick }) {
    const ON_SERVER = 'onServer'
    const READY_TO_PLAY = 'rtp'
    const PLAYING = 'playing'
    const SLIDING = 'sliding'

    const VOLUME = 0.1

    const [trackState, setTrackState] = useState(ON_SERVER)
    const [audioObj, setAudio] = useState(new Audio())
    const [sliderValue, setValue] = useState(0)

    useEffect(() => {
        audioObj.currentTime = sliderValue
    }, [sliderValue])

    const btnClick = async () => {
        if (trackState == ON_SERVER) {
            await downloadTrack()
        }
        else if (trackState == READY_TO_PLAY) {
            playTrack()
        }
        else if (trackState == PLAYING) {
            audioObj.pause()
            setTrackState(READY_TO_PLAY)
        }
    }

    const downloadTrack = async () => {
        const url = `https://5.nikpv.z8.ru/MobileDeviceOS/get.php?url=${trackName}.mp3`

        let fetchRes = await fetch(url, {
            headers: {
                'Track_id': trackId
            }
        })

        if (fetchRes.ok) {
            try {
                const result = await fetchRes.blob()
                console.log(result)
                GetTracks().add({ id: trackId, mp3: result })
                setTrackState(READY_TO_PLAY)
            }
            catch {
                console.warn('MP-3 FETCH ERROR')
            }
        }
    }

    const playTrack = () => {
        let getRequest = GetTracks().get(trackId)

        getRequest.onsuccess = () => {
            let record = getRequest.result
            let audioURL = URL.createObjectURL(record.mp3)
            if (!audioObj.src) {
                audioObj.src = audioURL
            }
            audioObj.volume = VOLUME
            setValue(audioObj.currentTime)
            audioObj.play()
            setTrackState(PLAYING)
        }
    }

    const GetIcon = () => {
        if (trackState == ON_SERVER) {
            return <i className="fa fa-cloud-download fa-lg"></i>
        }
        else if (trackState == READY_TO_PLAY) {
            return <i className="fa fa-play fa-lg"></i>
        }
        else if (trackState == PLAYING || trackState == SLIDING) {
            return <i className="fa fa-solid fa-pause fa-lg"></i>
        }
    }

    const onSliderChange = (e) => {
        setValue(e.target.value)
    }

    const slider = trackState == ON_SERVER ? <></> :
        <input
            type="range"
            min="0"
            max={audioObj.duration}
            value={sliderValue}
            onInput={e => onSliderChange(e)}
            onMouseDown={() => { audioObj.pause(); }}
            onMouseUp={() => { audioObj.play(); setTrackState(PLAYING) }}
            className="slider"></input>

    return (
        <div className={style.musicTrack}>
            <span>{trackName}</span>
            {slider}
            <Button
                className={style.trackButton}
                handleClick={btnClick}
                value={GetIcon()}
            />
        </div>
    )
}

