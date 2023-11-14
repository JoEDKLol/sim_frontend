import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '../Share/Button.js';
import Input from '../Share/Input.js';
import styles from './mycss/login.module.css'
import '../Share/Button.css'
import Table from "../Share/Table.js";
const MyProfileManagement = () => {

    const [userData, setUserData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [operatorUserData, setOperatorUserData] = useState([]);
    const [findOpUser, setFindOpuser] = useState([]);
    const [selectOpCom, setSelectOpCom] = useState();
    const [operatorUserEmail, setOperatorUserEmail] = useState("");

    const paramObj = useParams();
    
    useEffect(() => {

        const fetchData = async () => {
            const resp = await fetch('/jsontest/user.json');
            const data = await resp.json();

            const resp2 = await fetch('/jsontest/company.json');
            const data2 = await resp2.json();

            
            const resp3 = await fetch('/jsontest/operator_user.json');
            const data3 = await resp3.json();

            setUserData(data);
            setCompanyData(data2);
            setOperatorUserData(data3);
            //console.log(data);
        };
        fetchData();
        
    }, []);

    if(!userData[0]){
        return <>Loding...</> 
    }

    const tableHead = ['DATE', 'EMAIL', 'NAME'];
    let showHide = "d-none";
    let showHide2 = "";
    let findUserInfo = userData.find((elem)=>{
        //return elem.email = loginObj.email;
        if(elem._id == paramObj.userId){
            return true;
        }
    });

    
    let arrfindCompanyInfo = [];

    // console.log("findUserInfo", findUserInfo);

    findUserInfo.companies_manager.forEach((companyId) => {
        // console.log("companyId::",companyId);

        let findCompanyInfo = companyData.find((elem)=>{
            //return elem.email = loginObj.email;
            if(elem._id == companyId.company_id){
                return true;
            }
        });
        arrfindCompanyInfo.push(findCompanyInfo);
    });

    let arrfindOperatorUserInfo=[];

    if(arrfindCompanyInfo.length > 0){
        showHide = "";
        showHide2 = "d-none";
        //setFindOpuserFunc(arrfindCompanyInfo[0]._id);
    }

    function setFindOpuserFunc(id){
        arrfindOperatorUserInfo = operatorUserData.filter((elem)=>{
            return elem.company_id == id;
        });
        setFindOpuser(arrfindOperatorUserInfo);
        setSelectOpCom(id);
        
    }

    const companySelectHandler = (e) => {
        let id=e.target.value;
        setFindOpuserFunc(id);
    }

    const addOperatorUserHandler = () => {
        
        if(typeof selectOpCom == "undefined" || selectOpCom==""){
            alert("Plaese choose company");
            return;            
        }

        if(operatorUserEmail == ""){
            alert("Please enter your email"); 
            return;
        }
    
        if(!window.confirm("Would you like to register as an Operator user?")){
            return;
        }else{
            
        }
    }

    const operatorUserEmailHandler = (e) => {
        // alert(e.target.value);
        setOperatorUserEmail(e.target.value);
    }
    


    return ( 
        <>
            <div className="content-box period-box mb-5">
            <h2 className="report-title text-start">My Profile</h2>
            <hr/>
                <div className="ps-3">
                    <div className="row mt-2">
                        <p className="text-start fw-bolder">Email : {findUserInfo.email}</p>
                    </div>
                    <div className="row mt-2">
                        <p className="text-start fw-bolder">Name : {findUserInfo.user_name}</p>
                    </div>
                    <div className="row mt-2">
                        <p className="text-start fw-bolder">Role : {findUserInfo.role}</p>
                    </div>
                    <hr/>
                    <div className={"row mt-2 " + showHide}>
                        <div className='col-3 mb-1'>
                            <select className={" "+styles.select } onChange={(e) => companySelectHandler(e)}>
                                <option value="">Select</option>
                                {arrfindCompanyInfo.map((e)=>
                                    <option key={e._id} value={e._id} >{e.name}</option>
                                )}
                            </select>
                        </div>
                        <div className='col-6 mb-1'>
                            <Input type={"email"} id={"email"} name={"email"} placeholder={"Enter email"} onChange={(e)=>operatorUserEmailHandler(e)}/>
                        </div>
                        <div className='col-3 mb-1 text-start'>
                            <Button buttonName={"Add an operator"} onClick={(e)=>addOperatorUserHandler(e)}/>
                        </div>
                    </div>
                    
                    <div className={"row mt-2 " + showHide2}>
                        <div className="d-flex">
                            <div className="col-6"><p className="text-start fw-bolder me-3">You don't have any manager company yet</p></div>
                            <div className="col-6 text-end pe-3"><Button buttonName={"Add an company"}/></div>
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
                    {findOpUser.map(
                        (e) => 
                        <tr key={e._id}>
                            <td>{e.regDate.slice(0, 10)}</td>
                            <td>{e.user.user_name}</td>
                            <td>{e.user.user_email}</td>
                        </tr>
                        
                    )}
                    {/* {props.tableData.map(data => <InventoryPurchaseRow row={data} key={data.inventory_info._id} />)} */}
                </tbody>
            </table>
            </div>
        </>
     );
}
 
export default MyProfileManagement;