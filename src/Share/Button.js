import './Button.css'

const Button = (props) => {
    return (
        <button type='button' className="button" onClick={props.onClick}>{props.buttonName}</button>
    )
}

export default Button;