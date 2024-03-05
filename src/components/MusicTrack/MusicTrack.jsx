import Button from "../Button"
import style from "./MusicTrack.module.css"

export default function MusicTrack({ trackName, isLoaded, handleClick }) {
    return (
        <div className={style.musicTrack}>
            <span>{trackName}</span>
            <Button
                className={isLoaded ? "TrackButtonLoaded" : "TrackButton"}
                onClick={handleClick}
                value={isLoaded ? 'TrackButtonLoaded' : 'TrackButtonНеЗагрузился'}
            />
        </div>
    )
}

