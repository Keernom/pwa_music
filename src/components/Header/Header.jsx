import { GetContents } from "../../services/IndexedDBService";
import Button from "../Button";
import style from "./Header.module.css"

export default function Header({ tracksAction }) {

    const getTrack = async () => {

        const url = "https://5.nikpv.z8.ru/MobileDeviceOS/getcfg.php"

        let fetchRes = await fetch(url)
        if (fetchRes.ok) {
            try {
                const result = await fetchRes.json()
                const contentArray = result.root.map((el, index) => {
                    return {
                        id: index,
                        loaded: false,
                        title: el
                    }
                })

                GetContents().add({ id: 1, contents: contentArray })

                tracksAction(result.root)

            }
            catch {
                console.warn('FETCH ERROR')
            }
        }
    }

    return (
        <header className={style.header_div}>
            <h2 className={style.header_title}>AUDIO ORGANIZER</h2>
            <Button className={style.header_button} handleClick={getTrack} value={<i className="fa fa-download fa-2x"></i>} />
        </header>
    )
}