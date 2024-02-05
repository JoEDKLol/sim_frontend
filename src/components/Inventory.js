import { useState, useEffect } from "react";
import Button from '../Share/Button.js';
import {transactionAdd} from '../utils/transaction'
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './modals/Modal.js';
import Input from '../Share/Input.js';
const Inventory = (props) => {
    const navigate = useNavigate();
    const tableHead = ['SKU', 'NAME', 'IN-STOCK', 'ACTION']
    const [inventoryData, setInventoryData] = useState();
    /* Modal */
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState({id:'',email:''});
    
    useEffect(()=>{
        let obj = {check:"isToken"};
        transactionAdd("post", "", obj, transactionAddCallback);

    },[]);


    const getUserData = (obj) => {
        setUserData(
            {id:obj.id, email:obj.email}
        )
    }
    const transactionAddCallback = (data, error) => { 
        if(data){
            getUserData(
                {id:data.id, email:data.email}
            )
            props.getLoginYn("y");
        }

        if(error){
            console.log("token login fail" );
            props.getLoginYn("n");
            navigate('/login/')
        }
    }

    const inventoryRegClickHandler = (e) => {
        setModalShow(true);
    }

    const setModalShowF = (yn) => {
        setModalShow(yn);
    }

    const onchangeHandler = () =>{

    }

    const clickHandler = () =>{

    }



    return (
        <>
        <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">Inventory</h2>
                <hr/>
                <div className={"row mt-4 ps-3 pe-3"}>
                    <div className='col-3 mb-1'>
                        <Input type={"text"} id={"company_name"} name={"company_name"} onChange={e=>onchangeHandler(e)} placeholder={"Enter inventory name"}/>
                    </div>
                    <div className='col-3 mb-1 text-start'>
                        <Button type='submit' buttonName='Search' onClick={e => clickHandler(e)}></Button>
                    </div>
                    <div className='col-6 text-end mb-3'>
                        <div className='text-end me-4'>
                            <Button type='submit' buttonName='Inventory Registration' onClick={e => inventoryRegClickHandler(e)}></Button>
                            {
                                (modalShow)?
                                <Modal setModalShowF={setModalShowF} modalTitle={"Inventory Registration"} type={"inventory"}/>
                                :""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-box table-box'>
            
                <table className="table">
                <thead>
                    <tr>
                         {tableHead.map(head => <th scope='col' key={head}>{head}</th>)} 
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
            
            </div>
        
        </>
    )


}


export default Inventory;