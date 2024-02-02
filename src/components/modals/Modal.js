import { useEffect, useRef } from 'react';
import styles from './modal.module.css'
import CompanyRegModal from './CompanyRegModal';
import InventoryRegModal from './InventoryRegModal';
import ConfirmModal from './ConfirmModal';
const Modal = (props) => {
    
    const closeModal = () => {
        props.setModalShowF(false);
    };



    const modalRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                props.setModalShowF(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    },[]);
    return ( 
        <>
            {
                <div ref={modalRef} className={" " + 
                    (props.size === "confirm")?styles.containerConfirm:styles.container 
                }>
                    <div className='row text-end p-2'>
                        <div className='col-6 text-start fw-bold'>{props.modalTitle}</div>
                        <div className='col-6'>
                            <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                        </div>    
                    </div>
                    <hr className='m-0'/>
                    <div className={'row' }>
                        <div>
                            {
                                (props.type == "company")?<CompanyRegModal obj={props.obj} setModalShowF={props.setModalShowF} setCompanyRegValue={props.setCompanyRegValue}
                                action={props.action}
                                updateCompany={props.updateCompany}
                                />:
                                (props.type == "inventory")?<InventoryRegModal/>:
                                (props.type == "confirm")?<ConfirmModal msg={props.msg} setModalShowF={props.setModalShowF} setConfirmMod={props.setConfirmMod}/>:""
                                

                            }
                            
                        </div>
                    </div>
                    
                
                
                </div>
                
            }
            
        
        </>
     );
}
 
export default Modal;