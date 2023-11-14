import { useEffect, useState } from 'react';
import Button from '../Share/Button.js';
import Input from '../Share/Input.js';
import styles from './mycss/login.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './modals/Modal.js';




const MyCompanyList = () => {
    const [userData, setUserData] = useState([]);
    const [arrfindCompanyInfo, setArrfindCompanyInfo]=useState(["manager", "operator"])
    const [searchObj, setSearchObj] = useState({"div":"entire", "userId":"", "companyName":""})
    const navigate = useNavigate();

    /* Modal */
    const [modalShow, setModalShow] = useState(false);
    
    const paramObj = useParams();

    useEffect(()=>{
        setSearchObj({...searchObj, "userId":paramObj.userId});

        const fetchData = async () => {
            const resp = await fetch('/jsontest/user.json');
            const data = await resp.json();

            setUserData(data);
        };
        fetchData();

    },[]);

    if(!userData[0]){
        return <>Loding...</> 
    }
    let findUserInfo = userData.find((elem)=>{
        //return elem.email = loginObj.email;
        if(elem._id == paramObj.userId){
            return true;
        }
    });

    let companies = [];

    findUserInfo.companies_manager.forEach(elem => {
        companies.push({"companyId":elem.company_id, "div": "manager", "companyName":elem.company_name, "regDate":elem.regDate})
    });

    findUserInfo.companies_operator.forEach(elem => {
        companies.push({"companyId":elem.company_id, "div": "operator", "companyName":elem.company_name, "regDate":elem.regDate})
    });

    // console.log(companies)
    const clickHandler = (e) => {
        console.log(searchObj);
    }

    const onchangeHandler = (e) => {
        setSearchObj({...searchObj, "companyName":e.target.value});
    }

    const selectHandler = (e) => {
        let id=e.target.value;
        setSearchObj({...searchObj, "div":e.target.value});
    }

    const tbRowEnterClickHandler = (e) => {
        // console.log(e.target.id)
        navigate("/companyDashboard/"+e.target.id);
    }

    const tbRowUpdateClickHandler = (e) => {
        // console.log(e.target.id)
    }

    const tbRowDeleteClickHandler = (e) => {
        // console.log(e.target.id)
    }

    const addComponyClickHandler = (e) => {
        setModalShow(true);
    }

    const setModalShowF = (yn) => {
        setModalShow(yn);
    }

    if(!companies){
        return (
            <>
                <div className="content-box period-box mb-5">
                    <h2 className="report-title text-start">My Company</h2>
                    
                </div>


                 <div className='content-box table-box d-flex justify-content-center'>
                 
                    <div className='align-self-center'>
                         
                        <p className='fw-bolder'>You don’t have any company yet</p>
                        <Button type='submit' buttonName='Add a company' onClick={e => clickHandler(e)}></Button>
                    </div>

                 </div>

            </>
        )
    }

    return ( 
        <>
            <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">My Company</h2>
                <div className={"row mt-4 "}>
                    <div className='col-3 mb-1'>
                        <select className={" "+styles.select } onChange={e => selectHandler(e)}>
                            <option value="">Entire</option>
                            {arrfindCompanyInfo.map((e)=>
                                <option key={e} value={e} >{e}</option>
                            )}
                        </select>
                    </div>
                    <div className='col-6 mb-1'>
                        <Input type={"text"} id={"company_name"} name={"company_name"} onChange={e=>onchangeHandler(e)} placeholder={"Enter company name"}/>
                    </div>
                    <div className='col-3 mb-1 text-start'>
                        <Button type='submit' buttonName='Search' onClick={e => clickHandler(e)}></Button>
                    </div>
                </div>
            </div>

            <div className='content-box table-box'>
           
                <div className={'row mb-3 ms-4 ' + styles.mycomDiv}>
                    <div className={'col-2 text-start overflow-hidden ' + styles.mycomDivColH}>
                        <span className={' ' + styles.mycomDivColHFont}>Division</span></div>
                    <div className={'col-4 text-start overflow-hidden ' + styles.mycomDivColH}>
                        <span className={' ' + styles.mycomDivColHFont}>Company</span></div>
                    <div className={'col-2 text-start overflow-hidden ' + styles.mycomDivColH}>
                        <span className={' ' + styles.mycomDivColHFont}>Register Date</span></div>
                    <div className={'col-4 text-start overflow-hidden ' + styles.mycomDivColE}>
                        <span className={' ' + styles.mycomDivColHFont}>Action</span></div>
                </div>
                <div className={'row ms-4 ' + styles.mycomDiv2}>
                    {companies.map((elem, index)=>
                        <div key={index} className='d-flex p-0'>
                            <div className={'col-2 text-start mb-2 ' + styles.mycomDivColRow}>
                                <span className={' ' + styles.mycomDivColRFont}>{elem.div}</span></div>
                            <div className={'col-4 text-start ' + styles.mycomDivColRow}>
                                <span className={' ' + styles.mycomDivColRFont}>{elem.companyName}</span></div>
                            <div className={'col-2 text-start ' + styles.mycomDivColRow}>
                                <span className={' ' + styles.mycomDivColRFont}>{elem.regDate.slice(0, 10)}</span></div>
                            <div className={'col-4 text-center ' + styles.mycomDivColRow}>
                            <button id={elem.companyId} onClick={e=>tbRowEnterClickHandler(e)} className={'button ' + styles.mycomButton}>Enter</button>
                                {/* {(elem.div==="manager")?<button className={'button ' + styles.mycomButton}>Enter</button>:""} */}
                                {(elem.div==="manager")?<button id={elem.companyId} onClick={e=>tbRowUpdateClickHandler(e)} className={'button ' + styles.mycomButton}>Update</button>:""}
                                {(elem.div==="manager")?<button id={elem.companyId} onClick={e=>tbRowDeleteClickHandler(e)} className={'button ' + styles.mycomButton}>Delete</button>:""}    
                            </div>
                        </div>
                    )}    
                </div>
                <div className='mt-1 ms-4 text-start'>
                    <Button type='submit' buttonName='Add a company' onClick={e => addComponyClickHandler(e)}></Button>
                    {
                        (modalShow)?
                        <Modal setModalShowF={setModalShowF} modalTitle={"Add a company"} type={"company"}/>
                        :""
                    }
                    
                </div>


            </div>
        </>
     );
}
 
export default MyCompanyList;