import Button from "../../Button";
import style from "./Header.module.css"

export default function Header({ handleClick }) {
    return (
        <header className={style.header_div}>
            <h2 className={style.header_title}>AUDIO ORGANIZER</h2>
            <Button className={style.header_button} handleClick={handleClick} value={'загрузить треки'} />
        </header>
    )
}