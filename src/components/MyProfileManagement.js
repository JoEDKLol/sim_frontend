import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '../Share/Button.js';
import Input from '../Share/Input.js';
import styles from './mycss/login.module.css'
import '../Share/Button.css'
import Table from "../Share/Table.js";
import { SimStateContext } from "../App.js";
// import { SimStateContext } from "../App.js";
import {transactionAdd} from '../utils/transaction'
const MyProfileManagement = (props) => {

    const [userData, setUserData] = useState({id:'',email:''});
    const [findUserInfo, setFindUserInfo] = useState({email:"", user_name:"", role:"", companies_manager:[], companies_operator:[]});
    const [showHide, setShowHide] = useState("d-none");
    const [showHide2, setShowHide2] = useState("");
    
    
    const [companyData, setCompanyData] = useState([]);
    const [operatorUserData, setOperatorUserData] = useState([]);
    const [findOpUser, setFindOpuser] = useState([]);
    const [selectOpCom, setSelectOpCom] = useState("");
    const [operatorUserEmail, setOperatorUserEmail] = useState("");
    const [addOpUserMsg, setAddOpUserMsg] = useState("");
    
    
    const navigate = useNavigate()
    const paramObj = useParams();

    

    const getUserData = (obj) => {
        setUserData(
            {id:obj.id, email:obj.email}
        )
    }

    const tableHead = ['DATE', 'EMAIL', 'NAME'];
    // const data = useContext(SimStateContext);
    useEffect(() => {
        let obj = {check:"isToken"};
        transactionAdd("post", "", obj, transactionAddCallback);
        
    }, []);

    const transactionAddCallback = (data, error) => { 
        if(data){
            getUserData(
                {id:data.id, email:data.email}
            )
            props.getLoginYn("y");
            console.log(userData.id);
            let tranfindUserInfo = async () => {
                transactionAdd("get", "user/"+data.id, "", findUserInfoCallback);
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

                if(findUserData.companies_manager.length>0){
                    setShowHide("");
                    setShowHide2("d-none");
                }
            }

            tranfindUserInfo();
        }

        if(error){
            console.log("token login fail" );
            props.getLoginYn("n");
            navigate('/login/')
        }
    }

    if(!userData.id){
        return <>loding...</>
    }


    
    // console.log(findUserInfo);


    

    // let findUserInfo = userData.find((elem)=>{
    //     //return elem.email = loginObj.email;        
    //     // if(elem._id == paramObj.userId){
    //     //     return true;
    //     // }
    
    
    // });
    // if(!data.id){
    //     return;  
    // }
    
    let arrfindCompanyInfo = [];

    // console.log("findUserInfo", findUserInfo);

    // findUserInfo.companies_manager.forEach((companyId) => {
    //     // console.log("companyId::",companyId);

    //     // let findCompanyInfo = companyData.find((elem)=>{
    //     //     //return elem.email = loginObj.email;
    //     //     if(elem._id == companyId.company_id){
    //     //         return true;
    //     //     }
    //     // });
    //     // arrfindCompanyInfo.push(findCompanyInfo);
    // });

    let arrfindOperatorUserInfo=[];

    // if(arrfindCompanyInfo.length > 0){
    //     showHide = "";
    //     showHide2 = "d-none";
    //     //setFindOpuserFunc(arrfindCompanyInfo[0]._id);
    // }

    function setFindOpuserFunc(id){
        // arrfindOperatorUserInfo = operatorUserData.filter((elem)=>{
        //     return elem.company_id == id;
        // });
        // setFindOpuser(arrfindOperatorUserInfo);
        // setSelectOpCom(id);
        
    }

    const companySelectHandler = (e) => { 
        // let id=e.target.value;
        setFindOpuser([]);
        setSelectOpCom("");
        setAddOpUserMsg("");
        if(!e.target.value){
            return;
        }
        setSelectOpCom(e.target.value);
        let tranfindUserInfo = async () => {
            transactionAdd("get", "operatoruser/"+e.target.value, "", companySelectHandlerCallback);
        }
        tranfindUserInfo();
        // setFindOpuserFunc(id);
    }

    const companySelectHandlerCallback = (operatorUserData) => {
        // console.log(operatorUserData.length);
        if(operatorUserData.length !== 0){
            let arrOpUserData = [];
            for(let i=0; i<operatorUserData.length; i++){
                let  obj = {
                    _id:operatorUserData[0]._id,
                    regDate:operatorUserData[0].regDate,
                    user_name:operatorUserData[0].user.user_name,
                    user_email:operatorUserData[0].user.user_email

                }
                arrOpUserData.push(obj);
             
            }
            // console.log(arrOpUserData);
            setFindOpuser(arrOpUserData);
        }

    }

    const addOperatorUserHandler = () => {
        
        if(typeof selectOpCom == "undefined" || selectOpCom==""){
            // alert("Plaese choose company");
            setAddOpUserMsg("Plaese choose company");
            return;            
        }

        // console.log(selectOpCom);

        if(operatorUserEmail == ""){
            // alert("Please enter your email");
            setAddOpUserMsg("Please enter your email");  
            return;
        }
    
        if(!window.confirm("Would you like to register as an Operator user?")){
            return;
        }else{
            
        }
    }

    const operatorUserEmailHandler = (e) => {
        setAddOpUserMsg("");
        setOperatorUserEmail(e.target.value);
    }
    


    return ( 
        // <SimStateContext.Consumer>
        <div>
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
                                {findUserInfo.companies_manager.map((e)=> 
                                    <option key={e.company_id} value={e.company_id} >{e.company_name}</option>
                                )}

                            </select>
                        </div>
                        <div className='col-6 mb-1'>
                            <Input type={"email"} id={"email"} name={"email"} placeholder={"Enter email"} onChange={(e)=>operatorUserEmailHandler(e)}/>
                        </div>
                        <div className='col-3 mb-1 text-start'>
                            <Button buttonName={"Add an operator"} onClick={(e)=>addOperatorUserHandler(e)}/>
                        </div>
                        <div className={styles.loginFailFont + " text-start"}><span >{addOpUserMsg}</span></div>
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

                    {(findOpUser.length !== 0)?


                    findOpUser.map(
                        (e, i) => 
                        <tr key={i}>
                            <td>{e.regDate.slice(0, 10)}</td>
                            <td>{e.user_name}</td>
                            <td>{e.user_email}</td>
                        </tr>
                        
                    )
                    :
                       <tr >
                            <td colSpan={3}>no search results.</td>
                        </tr>
                    }

                    {/* {props.tableData.map(data => <InventoryPurchaseRow row={data} key={data.inventory_info._id} />)} */}
                </tbody>
            </table>
            </div>
        </div>
        // </SimStateContext.Consumer>
     );
}
 
export default MyProfileManagement;