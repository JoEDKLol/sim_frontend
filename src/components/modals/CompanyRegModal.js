import Button from '../../Share/Button.js';
import Input from '../../Share/Input.js';
import Textarea from '../../Share/Textarea.js';
import { useEffect, useState, useRef } from 'react';
import styles from '../mycss/login.module.css'
import {transactionAdd} from '../../utils/transaction'

const CompanyRegModal = (props) => {

    // console.log(props.action, props.updateCompany);
    useEffect(()=>{

        if(props.action === 'update'){
            // console.log(props.action, props.updateCompany);
            // console.log(props.obj.companyId);
            companySearch(props.obj.companyId);
        }
    },[]);

    function companySearch(companyId){
        let tranfindUserInfo = async () => {
            // console.log(companyId);
            transactionAdd("get", "companysearch/"+companyId, "", companySearchCallback);
        }
        tranfindUserInfo();
    }

    const companySearchCallback = (data) => {
        // console.log(data);
        let obj = {};
        obj={
            name:data.name
            , email:data.email
            , address:{
                city:data.address.city,
                state:data.address.state,
                zipcode:data.address.zipcode,
                no:data.address.no,
            },
            note:data.note,
            useremail:props.obj.email, 
            userId:props.obj.userId,
            companyId:props.obj.companyId,
        }
        // console.log(obj);
        setCompanyObj(obj);


        
    }

    let [companyObj, setCompanyObj] = useState({name:'', email:'', address:{city:'',state:'',zipcode:'',no:''}, note:'', useremail:props.obj.email, userId:props.obj.id});
    let [addComMsg, setAddComMsg] = useState('');
    const focusName = useRef();

    const onchangeHandler = (e) => {
        // setCompanyObj({...companyObj, [e.target.id]:e.target.value});
        if(e.target.id === 'city'){
            setCompanyObj({...companyObj, address:{...companyObj.address, city:e.target.value}});
        }

        if(e.target.id === 'state'){
            setCompanyObj({...companyObj, address:{...companyObj.address, state:e.target.value}});
        }

        if(e.target.id === 'zipcode'){
            setCompanyObj({...companyObj, address:{...companyObj.address, zipcode:e.target.value}});
        }

        if(e.target.id === 'no'){
            setCompanyObj({...companyObj, address:{...companyObj.address, no:e.target.value}});
        }

        if(e.target.id === 'name' || e.target.id === 'email' || e.target.id === 'note'){
            setCompanyObj({...companyObj, [e.target.id]:e.target.value});
        }

        if(e.target.id === 'name'){
            setAddComMsg("");
        }
    }

    const componySaveClickHandler = (e) => {
        if(companyObj.name === ''){
            setAddComMsg("Plaese input company name");
            focusName.current.focus();
            return;
        }
        let tranfindUserInfo = async () => {
            // console.log("operatoruser/"+id +"/"+page);
            transactionAdd("post", "companysave", companyObj, componySaveClickHandlerCallback);
        }

        tranfindUserInfo();
    }

    const componySaveClickHandlerCallback = (data) => {

        if(data.success === 'y'){
            props.setModalShowF(false);
            props.setCompanyRegValue(true);
        }
    }

    const componyUpdateClickHandler = (e) => {
        if(companyObj.name === ''){
            setAddComMsg("Plaese input company name");
            focusName.current.focus();
            return;
        }

        let tranfindUserInfo = async () => {
            // console.log("operatoruser/"+id +"/"+page);
            transactionAdd("post", "companyupdate", companyObj, componyUpdateClickHandlerCallback);
        }

        tranfindUserInfo();
        
    }

    const componyUpdateClickHandlerCallback = (data) => {
        console.log("여기", data);
        if(data.success === 'y'){
            props.setModalShowF(false);
            props.setCompanyRegValue(true);
        }
    }


    return ( 
        <>
        
            <div className="container">
                <div className="row mb-3 mt-3">
                    <div className="col-6">
                        {/* <Input type={"text"} ref={focusName} id={"name"} name={"name"} onChange={e=>onchangeHandler(e)} lable={"* Company name"}/> */}
                        <label className={"form-label fw-bolder " + "labelText"}>* Company name</label>
                        <input className="input" ref={focusName} type='text' id='name' name='name' onChange={e=>onchangeHandler(e)} value={companyObj.name}></input>
                    </div>
                    <div className="col-6">
                        <Input type={"email"} id={"email"} name={"email"} onChange={e=>onchangeHandler(e)} lable={"Email"} value={companyObj.email}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Input type={"text"} id={"no"} name={"no"} onChange={e=>onchangeHandler(e)} lable={"Address"} value={companyObj.address.no}/>
                    </div>
                    <div className="col-6">
                        <Input type={"text"} id={"city"} name={"city"} onChange={e=>onchangeHandler(e)} lable={"City"} value={companyObj.address.city}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Input type={"text"} id={"state"} name={"state"} onChange={e=>onchangeHandler(e)} lable={"State"} value={companyObj.address.state}/>
                    </div>
                
                    <div className="col-6">
                        <Input type={"text"} id={"zipcode"} name={"zipcode"} onChange={e=>onchangeHandler(e)} lable={"Zipcode"} value={companyObj.address.zipcode}/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                       <Textarea id={"note"} name={"note"} onChange={e=>onchangeHandler(e)} lable={"Note"} value={companyObj.note}/>
                    </div>
                </div>
                <div className={styles.loginFailFont + " text-start"}><span >{addComMsg}</span></div>
                <div className="row mt-2 mb-3 text-center ">
                    <div>
                    {
                    (props.action === 'update')?
                    <Button type='submit' buttonName='Update' onClick={e => componyUpdateClickHandler(e)}></Button>
                    :<Button type='submit' buttonName='Save' onClick={e => componySaveClickHandler(e)}></Button>
                    }
                    </div>
                </div>
                
            </div>
            
        </>
     );
}
 
export default CompanyRegModal;