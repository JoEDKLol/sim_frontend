import './Textarea.css'
const Textarea = (props) => {
    return ( 
        <>
            {
                (props.lable)?
                <label htmlFor={props.label} className={"form-label fw-bolder " + "labelText"}>{props.lable}</label>
                :""
            }
            <textarea className={" " + " textarea"} id={props.id} rows="5" onChange={props.onChange} value={props.value}></textarea>
        </>
     );
}
 
export default Textarea;