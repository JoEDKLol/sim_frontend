import './Input.css'

const Input = (props) => {

    return (
        <>
        {
            (props.lable)?
            <label htmlFor={props.label} className={"form-label fw-bolder " + "labelText"}>{props.lable}</label>
            :""
        }

        <input type={props.type ? props.type : "text"} 
        className="input" name={props.name?props.name:"input"} id={props.id?props.id:"input"}
        placeholder={props.placeholder?props.placeholder:""}
        onChange={props.onChange}
        value={props.value} 
        
        />
        </>
    )
}

export default Input;