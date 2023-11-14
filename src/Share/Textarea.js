import './Textarea.css'
const Textarea = (props) => {
    return ( 
        <>
            {
                (props.lable)?
                <label htmlFor={props.label} className={"form-label fw-bolder " + "labelText"}>{props.lable}</label>
                :""
            }
            <textarea className={" " + " textarea"} id="note" rows="5"></textarea>
        </>
     );
}
 
export default Textarea;