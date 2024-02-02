import { useEffect, useState } from 'react';
import Button from '../Share/Button.js';
import Input from '../Share/Input.js';
import styles from './mycss/login.module.css'
import { useNavigate, useParams } from 'react-router-dom';

import table from './mycss/table.module.css'

import {transactionAdd} from '../utils/transaction'
import Modal from './modals/Modal.js';


const MyCompanyList = (props) => {
    const [userData, setUserData] = useState({id:'',email:''});
    const [findUserInfo, setFindUserInfo] = useState({email:"", user_name:"", role:"", companies_manager:[], companies_operator:[]});
    const navigate = useNavigate();
    const [searchCompanies, setSearchCompanies] = useState([]);

    /* Modal */
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    
    
    const [confirm, setConfirm] = useState(false);
    const [confirm2, setConfirm2] = useState(false);
    const [confirm3, setConfirm3] = useState(false);

    const [deleteCompany, setDeleteCompany] = useState({});
    const [updateCompany, setUpdateCompany] = useState({});

    const paramObj = useParams();

    const tableHead = ['DIVISON', 'COMPANY', 'REGISTER', 'ACTION'];
    
    const getUserData = (obj) => {
        setUserData(
            {id:obj.id, email:obj.email}
        )
    }
    useEffect(() => {
        let obj = {check:"isToken"};
        transactionAdd("post", "", obj, transactionAddCallback);
        
    }, []);

    useEffect(() => {

        if(findUserInfo.companies_manager.length > 0 || findUserInfo.companies_operator.length > 0){
            let comapanyArr = [];
            findUserInfo.companies_manager.forEach((elem)=>{  
                comapanyArr.push({"div": "manager", "companyName":elem.company_name, "regDate":elem.regDate, "companyId":elem.company_id})
            })

            findUserInfo.companies_operator.forEach((elem)=>{
                comapanyArr.push({"div": "operator", "companyName":elem.company_name, "regDate":elem.regDate, "companyId":elem.company_id})
            })
            setSearchCompanies(comapanyArr);  
            // console.log(comapanyArr);  
        }

    }, [findUserInfo]);

    useEffect(() => {
        // console.log(confirm2);
        if(confirm2 === true){
            companyDel();
        }
    },[confirm2]);

    const transactionAddCallback = (data, error) => { 
        if(data){
            getUserData(
                {id:data.id, email:data.email}
            )
            props.getLoginYn("y");
            userSearch(data.id)
        }

        if(error){
            console.log("token login fail" );
            props.getLoginYn("n");
            navigate('/login/')
        }
    }

    function companyDel(){
        // console.log(deleteCompany);
        let tranCompanyDel = async () => {
            
            transactionAdd("post", "delCompny", deleteCompany, tranCompanyDelCallback);
        }
        tranCompanyDel();
    }

    function tranCompanyDelCallback(data){
        setConfirm2(false);
        userSearch(userData.id);

    }


    function userSearch(id){
        let tranfindUserInfo = async () => {
            transactionAdd("get", "user/"+id, "", findUserInfoCallback);
        }
        
        const findUserInfoCallback = (findUserData) => {
            // console.log(findUserData);
            setFindUserInfo({
                email:findUserData.email,
                user_name:findUserData.userName,
                role:findUserData.role,
                companies_manager:findUserData.companies_manager,
                companies_operator:findUserData.companies_operator,
            });

        }

        tranfindUserInfo();
    }

    if(!userData.id){
        return <>loding...</>
    }

    const tbRowEnterClickHandler = (companyId) => {
        // console.log(e.target.id)
        navigate("/companyDashboard/"+companyId);
    }

    const tbRowUpdateClickHandler = (action, companyId) => {
        // console.log(e.target.id)
        // console.log(action, companyId);
        let obj={
            action:action,
            companyId:companyId,
            userId:userData.id,
            email:userData.email,
        }
        // console.log(obj);
        setUpdateCompany(obj)
        setModalShow3(true);
        
    }

    const tbRowDeleteClickHandler = (companyId) => {
        // console.log(e.target.id)
        let obj={
            companyId:companyId,
            userId:userData.id,
            email:userData.email,
        }
        // console.log(obj);
        setDeleteCompany(obj);
        setModalShow2(true);
    }

    const addComponyClickHandler = (action) => {
        setModalShow(true);
    }

    const setModalShowF = (yn) => { //regi company
        setModalShow(yn);
    }

    const setModalShowF2 = (yn) => { //delete
        setModalShow2(yn);
    }

    const setConfirmMod2 = (b) => {
        setConfirm2(b);
    }

    const setModalShowF3 = (yn) => { 
        setModalShow3(yn);
    }

    const setConfirmMod3 = (b) => {
        setConfirm3(b);
    }

    const setCompanyRegValue = (yn) => {
        if(yn === true){        
            userSearch(userData.id);
        }
    }

    
    
    if(searchCompanies.length < 0){
        return (
            <>
                <div className="content-box period-box mb-5">
                    <h2 className="report-title text-start">My Company</h2>
                    
                </div>


                 <div className='content-box table-box d-flex justify-content-center'>
                 
                    <div className='align-self-center'>
                         
                        <p className='fw-bolder'>You don't have any company yet</p>
                        <Button type='submit' buttonName='Add a company' onClick={e => addComponyClickHandler('save')}></Button>
                        {
                            (modalShow)?
                            <Modal setModalShowF={setModalShowF} setCompanyRegValue={setCompanyRegValue} modalTitle={"Add a company"} 
                            action={'save'}
                            type={"company"} obj={userData}/>
                            :""
                        }
                    </div>

                 </div>

            </>
        )
    }

    return ( 
        <>
            <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">My Company</h2>
                <hr/>
                <div className={"row mt-4 pe-3"}>
                    <div className='text-end mb-3'>

                        <Button type='submit' buttonName='Add a company' onClick={e => addComponyClickHandler('save')}></Button>
                        {
                            (modalShow)?
                            <Modal setModalShowF={setModalShowF} setCompanyRegValue={setCompanyRegValue} modalTitle={"Add a company"} 
                            action={'save'}
                            type={"company"} obj={userData}/>
                            :""
                        }

                        
                        {/* <select className={" "+styles.select } onChange={e => selectHandler(e)}>
                            <option value="">Entire</option>
                            {arrfindCompanyInfo.map((e)=>
                                <option key={e} value={e} >{e}</option>
                            )}
                        </select> */}
                    </div>
                    <div className='col-6 mb-1'>
                        {/* <Input type={"text"} id={"company_name"} name={"company_name"} onChange={e=>onchangeHandler(e)} placeholder={"Enter company name"}/> */}
                    </div>
                    <div className='col-3 mb-1 text-start'>
                        {/* <Button type='submit' buttonName='Search' onClick={e => clickHandler(e)}></Button> */}
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

                {(searchCompanies.length !== 0)?


                searchCompanies.map(
                    (e, i) => 
                    <tr key={i}>
                        <td>{e.div}</td>
                        <td>{e.companyName}</td>
                        <td>{e.regDate.slice(0, 10)}</td>
                        <td>
                            <Button buttonName={"Enter"} onClick={()=>tbRowEnterClickHandler(e.companyId)}/>&nbsp;
                            {(e.div==="manager")?<Button buttonName={"Update"} onClick={()=>tbRowUpdateClickHandler('update', e.companyId)}/>:""}&nbsp;
                            {(e.div==="manager")?<Button buttonName={"Delete"} onClick={()=>tbRowDeleteClickHandler(e.companyId)}/>:""}
                        </td>
                    </tr>
                    
                )
                :
                <tr >
                        <td colSpan={4}>no search results.</td>
                    </tr>
                }


                </tbody>
                </table>
                <div>
                {
                    (modalShow2)?
                    <Modal setModalShowF={setModalShowF2} modalTitle={"Company Deletion"} type={"confirm"} size="confirm" setConfirmMod={setConfirmMod2}
                    msg={"Would you like to delete as a Company?"}/>
                    :""
                }

                {
                    (modalShow3)?
                    <Modal setModalShowF={setModalShowF3} setCompanyRegValue={setCompanyRegValue} companyObj={updateCompany} modalTitle={"Update a company"}
                    action={'update'}
                    // updateCompany={updateCompany}
                    type={"company"} obj={updateCompany}/>
                    :""
                }
                </div>

                <div className='mt-1 ms-4 text-start'>
                    
                    
                </div> 


            </div>
        </>
     );
}
 
export default MyCompanyList;