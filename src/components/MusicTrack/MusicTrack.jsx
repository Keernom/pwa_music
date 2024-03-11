import { useEffect, useState } from "react"
import Button from "../Button"
import style from "./MusicTrack.module.css"

export default function MusicTrack({ trackName, handleClick }) {
    const [isLoaded, setLoaded] = useState(false)

    const btnClick = () => {
        setLoaded(true)
    }

    return (
        <div className={style.musicTrack}>
            <span>{trackName}</span>
            <Button
                className={style.trackButton}
                handleClick={btnClick}
                value={isLoaded ? <i className="fa fa-play fa-lg"></i> : <i className="fa fa-cloud-download fa-lg"></i>}
            />
        </div>
    )
}

