const Button = ({ className, handleClick, value }) => {
    return (
        <button className={className} onClick={handleClick}>{value}</button>
    )
}

export default Button