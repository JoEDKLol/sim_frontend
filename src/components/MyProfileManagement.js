import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '../Share/Button.js';
import Input from '../Share/Input.js';
import styles from './mycss/login.module.css'
import table from './mycss/table.module.css'

import '../Share/Button.css'
import Table from "../Share/Table.js";
import {transactionAdd} from '../utils/transaction'
import Modal from './modals/Modal.js';

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
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    
    const [confirm, setConfirm] = useState(false);
    const [confirm2, setConfirm2] = useState(false);

    const [pages, setPages] = useState([]);
    const [pageInf, setPageInf] = useState({prev:false, next:false, startPage:0, lastPage:0} );
    const [pageListCnt, setPageListCnt] = useState(10);
    const [dividePage, setDividePage] = useState(5);
    const [page, setPage] = useState(1);
    
    const [delOpUserId, setDelOpUserId] = useState({id:"",email:"",company_id:""});

    const navigate = useNavigate()
    const paramObj = useParams();

    const setConfirmMod = (b) => {
        setConfirm(b);
    }

    const getUserData = (obj) => {
        setUserData(
            {id:obj.id, email:obj.email}
        )
    }

    const tableHead = ['DATE', 'NAME', 'EMAIL', 'ACTION'];
    // const data = useContext(SimStateContext);
    useEffect(() => {
        let obj = {check:"isToken"};
        transactionAdd("post", "", obj, transactionAddCallback);
        
    }, []);

    useEffect(() => {
        // console.log(confirm);
        if(confirm === true){
            operatorUserReg();
        }
    }, [confirm]);

    useEffect(() => {
        if(confirm2 === true){
            operatorUserDel();
        }
    }, [confirm2]);

    const transactionAddCallback = (data, error) => { 
        if(data){
            getUserData(
                {id:data.id, email:data.email}
            )
            props.getLoginYn("y");
            // console.log(userData.id);
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
                }else{
                    setShowHide("d-none");
                    setShowHide2("");
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


    

    const companySelectHandler = (e) => { 
        let id=e.target.value;
        setPages([]);
        companySelectSearch(id)
    }

    const companySelectSearch = (id, page) => {
        setFindOpuser([]);
        setSelectOpCom("");
        setAddOpUserMsg("");
        
        setPageInf({prev:false, next:false, startPage:0, lastPage:0});
        
        if(!id){
            return;
        }
        setSelectOpCom(id);

        if(page === undefined) page = 1;
        setPage(page);
        let tranfindUserInfo = async () => {
            // console.log("operatoruser/"+id +"/"+page);
            transactionAdd("get", "operatoruser/"+id +"/"+page + "/"+pageListCnt, "", companySelectHandlerCallback);
        }
        tranfindUserInfo();
    }

    const companySelectHandlerCallback = (data) => {
        // console.log(data.totCnt);

        let operatorUserData = data.list;
        
        if(operatorUserData.length !== 0){
            let arrOpUserData = [];
            for(let i=0; i<operatorUserData.length; i++){
                let  obj = {
                    _id:operatorUserData[i]._id,
                    regDate:operatorUserData[i].regDate,
                    user_name:operatorUserData[i].user.user_name,
                    user_email:operatorUserData[i].user.user_email

                }
                arrOpUserData.push(obj);
             
            }

            setFindOpuser(arrOpUserData);

            let totCnt = data.totCnt;
            let currentPage = data.currentPage;
            let showTotPage = dividePage;
            let totPage = Math.ceil(totCnt / data.pageListCnt);            

            let showTotPages;
            
            let p = Math.floor(currentPage / showTotPage);
            let n = currentPage % showTotPage;
            if(n === 0){
                showTotPages = (p-1)*showTotPage + 1;
            }else{
                showTotPages = (p)*showTotPage + 1
            }
            let pageArr = [];
            for(let i=0; i<showTotPage; i++){
                if(showTotPages > totPage){                    
                    break;
                }else{

                    pageArr.push(showTotPages);
                    showTotPages++;
                }
            }
            let startPage = pageArr[0];
            let endPage = pageArr[pageArr.length-1];

            let prev, next;

            if(startPage > showTotPage){
                prev=true;
            }else{
                prev=false;
            }

            console.log(startPage, endPage, showTotPage, totPage);

            if(endPage < totPage){
                next = true;
            }else{
                next = false;
            }

            let pageObj={
                prev:prev, 
                next:next,
                startPage:startPage-1,
                lastPage:endPage+1
            }
            console.log(pageObj);
            setPageInf(pageObj);
            setPages(pageArr);  
        }

    }

    const pageMove = (e) => {
        // console.log(e.page);
        companySelectSearch(selectOpCom, e);
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

        setModalShow(true);


    }

    function operatorUserReg(){

        let selectedCompany = findUserInfo.companies_manager.find((elem)=>{return elem.company_id === selectOpCom});
        
        let tranOperatorUserReg = async () => {
            let obj ={
                id:userData.id,
                email:userData.email,
                company_id:selectOpCom,
                company_name:selectedCompany.company_name,
                operatorUserEmail:operatorUserEmail
            }
            // console.log(obj);
            transactionAdd("post", "regoperatoruser", obj, tranOperatorUserRegCallback);
        }
        tranOperatorUserReg();
    }


    

    function tranOperatorUserRegCallback(data){
        setConfirm(false);
        if(data.success === "n"){
            // console.log(data.message);
            setAddOpUserMsg(data.massage);  
            return ;
        }
        companySelectSearch(selectOpCom);
    }

    const setModalShowF = (yn) => {
        setModalShow(yn);
    }

    

    const operatorUserEmailHandler = (e) => {
        setAddOpUserMsg("");
        setOperatorUserEmail(e.target.value);
    }

    const deleteOperatorUserHandler = (id,email) => {
        let obj={
            id:id,
            email:email,
        }
        setDelOpUserId(obj);
        setModalShow2(true);
        console.log(obj);
    }

    const setModalShowF2 = (yn) => {
        setModalShow2(yn);
    }

    const setConfirmMod2 = (b) => {
        setConfirm2(b);
    }

    function operatorUserDel(){
        // console.log("");
        // alert(delOpUserId);
        let tranOperatorUserDel = async () => {
            let obj ={
                id:delOpUserId.id,
                company_id:selectOpCom,
                email:delOpUserId.email,
                updUser:userData.email
            }
            transactionAdd("post", "deloperatoruser", obj, tranOperatorUserDelCallback);
        }
        tranOperatorUserDel();
    }

    function tranOperatorUserDelCallback(data){
        setConfirm2(false);
        // if(data.success === "n"){
        //     // console.log(data.message);
        //     setAddOpUserMsg(data.massage);  
        //     return ;
        // }
        companySelectSearch(selectOpCom);
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
                                    <option key={e.company_id} value={e.company_id}>{e.company_name}</option>
                                )}

                            </select>
                        </div>
                        <div className='col-6 mb-1'>
                            <Input type={"email"} id={"email"} name={"email"} placeholder={"Enter email"} onChange={(e)=>operatorUserEmailHandler(e)}/>
                        </div>
                        <div className='col-3 mb-1 text-start'>
                            <Button buttonName={"Add an operator"} onClick={(e)=>addOperatorUserHandler(e)}/>
                        </div>
                        <div className='mt-1 ms-4 text-start'>
                        {
                            (modalShow)?
                            <Modal setModalShowF={setModalShowF} modalTitle={"Operator user Registration"} type={"confirm"} size="confirm" setConfirmMod={setConfirmMod}
                            msg={"Would you like to register as an Operator user?"}/>
                            :""
                        }
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

            <div className={'content-box ' + table.tableAdd }>
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
                            <td>
                                <Button buttonName={"Delete"} onClick={()=>deleteOperatorUserHandler(e._id, e.user_email)}/>
                            </td>
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
                <div>
                {
                    (modalShow2)?
                    <Modal setModalShowF={setModalShowF2} modalTitle={"Operator user Deletion"} type={"confirm"} size="confirm" setConfirmMod={setConfirmMod2}
                    msg={"Would you like to delete as an Operator user?"}/>
                    :""
                }
                </div>
                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {
                            (pages.length > 0)?
                                (pageInf.prev)?
                                <li  className="page-item "><a className="page-link" onClick={()=>pageMove(pageInf.startPage)} >Previous</a></li>:
                                <li  className="page-item disabled"><a className="page-link" onClick={()=>pageMove(pageInf.startPage)} >Previous</a></li>
                            :""
                            }

                            
                            {
                                pages.map((e, i)=>
                                    <li key={i} className={(page===e)?"page-item active":"page-item"}>
                                        <a key={i+"a"} className="page-link" onClick={()=>pageMove(e)}><span style={{color:"black"}}>{e}</span></a>
                                    </li>
                                )
                            }
                            {
                            (pages.length > 0)?
                                (pageInf.next && pages.length > 0)?
                                <li className="page-item "><a className="page-link" onClick={()=>pageMove(pageInf.lastPage)} >next</a></li>:
                                <li className="page-item disabled"><a className="page-link" onClick={()=>pageMove(pageInf.lastPage)} >next</a></li>
                            :""
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        // </SimStateContext.Consumer>
     );
}
 
export default MyProfileManagement;