import Button from "../Button"
import style from "./MusicTrack.module.css"

export default function MusicTrack({ trackName, isLoaded, handleClick }) {
    return (
        <div className={style.musicTrack}>
            <span>{trackName}</span>
            <Button
                className={style.trackButton}
                onClick={handleClick}
                value={isLoaded ? <i class="fa fa-cloud-download fa-lg"></i> : <i class="fa fa-play fa-lg"></i>}
            />
        </div>
    )
}

