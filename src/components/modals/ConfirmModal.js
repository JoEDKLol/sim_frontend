import Button from '../../Share/Button.js';

const ConfirmModal = (props) => {

    const confirmClickHandler = () => {
        props.setConfirmMod(true);
        props.setModalShowF(false);

    }
    const cancleClickHandler = () => {
        props.setModalShowF(false);
    };


    return ( 
        <>
            <div className='d-flex justify-content-center mt-4'><span className='fw-bolder'>{props.msg}</span></div>
            <div className='d-flex justify-content-center' style={{height:100}}>    
                <div className='align-self-center'>
                    <Button type = 'button' buttonName='confirm' onClick={e => confirmClickHandler(e)}></Button>
                    <span style={{ paddingRight: 10 }}></span>
                    <Button type = 'button' buttonName='cancle' onClick={e => cancleClickHandler(e)}></Button>
                </div>

              </div> 
        </>
     );
}
 
export default ConfirmModal;