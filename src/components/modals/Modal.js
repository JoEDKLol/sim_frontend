import { useEffect, useRef } from 'react';
import styles from './modal.module.css'
import CompanyRegModal from './CompanyRegModal';
import InventoryRegModal from './InventoryRegModal';
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
                <div ref={modalRef} className={" " + styles.container }>
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
                                (props.type == "company")?<CompanyRegModal/>:
                                (props.type == "inventory")?<InventoryRegModal/>:""
                                

                            }
                            
                        </div>
                    </div>
                    
                
                
                </div>
                
            }
            
        
        </>
     );
}
 
export default Modal;