import { useEffect, useState } from 'react';
import LowStock from './charts/LowStock';
import Profit from './charts/Profit';
import Selling from './charts/Selling';
import styles from './mycss/dashboard.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Share/Button';
import Modal from './modals/Modal.js';
import {transactionAdd} from '../utils/transaction'

const CompanyDashboard = (props) => {
    const paramObj = useParams();
    const navigate = useNavigate();
    const [companyInfo, setCompanyInfo] = useState([]);
    const [userData, setUserData] = useState({id:'',email:''});
    
    /* Modal */
    const [modalShow, setModalShow] = useState(false);
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
            companySearch(paramObj.companyId);
        }

        if(error){
            console.log("token login fail" );
            props.getLoginYn("n");
            navigate('/login/')
        }
    }

    function companySearch(companyId){
        console.log(companyId);
        let tranCompanySearch = async () => {
            
            transactionAdd("get", "companysearch/"+companyId, "", companySearchCallback);
        }
        tranCompanySearch();
    }

    function companySearchCallback(data){
        // setConfirm2(false);
        // userSearch(userData.id);
        console.log(data);

    }
    

    // useEffect(()=>{
    //     const fetchData = async () => {
    //         const resp = await fetch('/jsontest/company.json');
    //         const data = await resp.json();
    //         // console.log(paramObj.companyId);
    //         let findCompanyInfo = data.find((elem)=>{
    //             if(elem._id == paramObj.companyId){
    //                 return true;
    //             }
    //         });

    //        setCompanyInfo(findCompanyInfo);

            
    //     };
    //     fetchData();

    // },[]);

    const inventoryRegClickHandler = (e) => {
        setModalShow(true);
    }

    const setModalShowF = (yn) => {
        setModalShow(yn);
    }

    return ( 
        <>
            
            <div className="content-box period-box mb-4">
                <h2 className="report-title text-start">DashBoard</h2>
                <div className={"row mt-4 "}>
                    <div className='col-8 mb-1 '>
                        <p className="text-start fw-bolder text-start fs-3 p-0 m-0 ps-2">{(companyInfo.name)?companyInfo.name:""}</p>
                    </div>
                    <div className='col-4 mb-1 d-flex justify-content-end align-self-center '>
                        <p className="text-start fw-bolder me-3 p-0 m-0 ">username : {sessionStorage.getItem("userName")}</p>
                    </div>
                </div>
            </div>
                
            {/* <div className='text-end me-4'>
                <Button type='submit' buttonName='Inventory Registration' onClick={e => inventoryRegClickHandler(e)}></Button>
            </div> */}
            <div className='mt-1 ms-4 text-start'>
                {
                    (modalShow)?
                    <Modal setModalShowF={setModalShowF} modalTitle={"Inventory Registration"} type={"inventory"}/>
                    :""
                }
            </div>
            <div className={" table-box " + styles.divSize}>
                
                <div className={'row '} >
                    <div className='w-50'>
                    <div className={'' + styles.dashboardBox1}>
                    <Profit/>
                    </div>
                    </div>
                    <div className='w-50'>
                    <div className={'' + styles.dashboardBox1}>
                    <Selling/>
                    </div>
                    </div>
                </div>
                <div className={'row' + ""} >
                    <div className='w-100 mt-4'>
                        <div className={'' + styles.dashboardBox2}>
                            <LowStock/>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </>
     );
}
 
export default CompanyDashboard;