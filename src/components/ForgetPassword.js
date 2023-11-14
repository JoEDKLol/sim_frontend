import { Link, useNavigate } from 'react-router-dom';
import styles from './mycss/login.module.css'
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {getRandomNumber} from '../utils/common'
import {checkPassword, checkEmail} from '../utils/checkUserValidation';


const ForgetPassword = () => {

    let [pwObj, setUserObj] = useState({email:'', number:'', password:'', repassword:'', user_id:''});
    let [sendAct, setSendAct] = useState(false);
    let [confirmAct, setConfirmAct] = useState(true);
    let [changeAct, setChangeAct] = useState(true);

    let [signS, setSignS] = useState("");
    let [signSMsg, setSignSMsg] = useState("d-none");

    let [emailMsg, setEmailMsg] = useState(""); 
    let [numberMsg, setNumberMsg] = useState(""); 
    let [passwordMsg, setPasswordMsg] = useState(""); 
    let [rePasswordMsg, setRePasswordMsg] = useState(""); 

    const navigate = useNavigate()
    
    
    useEffect(()=>{
        if(confirmAct == false){
            focusNumber.current.focus();
        }

        if(changeAct == false){
            focusPassword.current.focus();
        }


    },[confirmAct, changeAct])

    const focusEmail = useRef();
    const focusNumber = useRef();
    const focusPassword = useRef();
    const focusRepassword = useRef();

    const ForgetPasswordChangeHandler = (e) => {
        setUserObj({...pwObj, [e.target.id]:e.target.value})
    }
    
    const sendClickHandler = (e) => {
        e.preventDefault();
        setEmailMsg("");
        let retObj = checkEmail(pwObj);
        
        if(!retObj.yn){
            focusEmail.current.focus();
            // console.log(retObj.str);
            setEmailMsg(retObj.str);
            return;
        }


        
        // console.log(pwObj);
        let emailCheck = async () => {
            try{
                let resp = await axios.post("http://localhost:3002/fpChackEmail",pwObj);
                let data = await resp.data;
                
                if(data.fpChackEmail == "y"){
                    let rNum = getRandomNumber(6);
                    sendEmail(data, rNum);
                }
            }catch{
                
            }
        }
        emailCheck();
    
    }

    const fpChackEmailSave = (data, num) => {
        
        let fpChgReqObj = {
            user_id:data.user_id,
            email_number:num,
            regUser:pwObj.email
        }

        let fpChgReqSave = async () => {
            try{
                let resp = await axios.post("http://localhost:3002/fpChgReqSave",fpChgReqObj);
                let data = await resp.data;
                setUserObj({...pwObj, user_id:data.user_id})
                setSendAct(true)
                setConfirmAct(false);
                
            }catch{

            }
        }
        fpChgReqSave();
    }

    let sendEmail = (data, number) => {
        var templateParams = {
            to_email: pwObj.email,
            number: number
        };
        
        emailjs.send('service_lrjqxuy','template_624pjwq', templateParams, "8jpab6TZ9cNujQLXW")
        .then(function(response) {
            // console.log('SUCCESS!', response.status, response.text);
            fpChackEmailSave(data, number);
        }, function(err) {
            // console.log('FAILED...', err);
        });

    }

    let confirmClickHandler = (e) => {
        e.preventDefault();
        setNumberMsg("")
        if(pwObj.number == '' || pwObj.number.length != 6){
            focusNumber.current.focus();
            return;
        }

        

        let confirmCheck = async () => {
            try{
                let resp = await axios.post("http://localhost:3002/confirmCheck",pwObj);
                let data = await resp.data;
                console.log(data);
                if(data.confirmCheck == "y"){
                    setChangeAct(false);
                    setConfirmAct(true);
                }else{
                    
                    setChangeAct(true);
                    setNumberMsg("Please check your number")
                }

            }catch{
                
            }
        
        }

        confirmCheck();
    }
    
    const chanagePasswordClickHandler = (e) => {
        e.preventDefault();
        // console.log(pwObj);
        setPasswordMsg("");
        setRePasswordMsg("");
        const retObj = checkPassword(pwObj);
        if(retObj.yn == false && retObj.field == "password"){
            focusPassword.current.focus();
            setPasswordMsg(retObj.str)
            return;
        }

        if(retObj.yn == false && retObj.field == "repassword"){
            focusRepassword.current.focus();
            setRePasswordMsg(retObj.str);
            return;
        }

        if(retObj.yn == false && retObj.field == "pw_regex"){
            focusRepassword.current.focus();
            setRePasswordMsg(retObj.str);
            
            return;
        }
        



        let updatePassword = async () => {
            try{
                let resp = await axios.post("http://localhost:3002/updatePassword",pwObj);
                let data = await resp.data;
                
                // console.log(data);
                if(data.updatePassword == "y"){
                    setSignS("d-none");
                    setSignSMsg("");
                }
            }catch{
                
            }
        
        }

        updatePassword();
    }

    const gotoLoginPageClickHandler = () => {
        navigate('/login');
    }

    return ( 
        <>
            <div id="container">
                <div className={styles.loginBox + " text-center "}>
                    <div className={styles.loginBoxTitle2 + " mt-4"}>Find password </div>
                    <form className={"py-2 " + signS}>

                        <div className="form-group mx-3  ">
                            <div className='d-flex'>
                                <input type="email" ref={focusEmail} className={"me-2 " + styles.loginInputBox} id="email" aria-describedby="emailHelp" placeholder=" Email" onChange={e=>ForgetPasswordChangeHandler(e)} disabled={sendAct}/>
                                <button className={"button " + styles.loginButton2} onClick={e=>sendClickHandler(e)} disabled={sendAct}>Send</button>
                            </div>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{emailMsg}</span>
                            </div>
                        </div>
                        
                        <div className="form-group mx-3">
                            <div className='d-flex'>
                                <input type="text" ref={focusNumber} className={"me-2 " + styles.loginInputBox} id="number"  placeholder=" Enter the number received" onChange={e=>ForgetPasswordChangeHandler(e)} disabled={confirmAct}/>
                                <button className={"button " + styles.loginButton2} onClick={e=>confirmClickHandler(e)} disabled={confirmAct}>Confirm</button>
                            </div>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{numberMsg}</span>
                            </div>
                        </div>
                        <div className="form-group mx-3" >
                            <input type="password" ref={focusPassword} className={"me-2 " + styles.loginInputBox} id="password" placeholder=" Password" onChange={e=>ForgetPasswordChangeHandler(e)} disabled={changeAct}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{passwordMsg}</span>
                            </div>
                        </div>
                        <div className="form-group mx-3 mb-3" >
                            <input type="password" ref={focusRepassword} className={"me-2 " + styles.loginInputBox} id="repassword" placeholder=" Confirm Password" onChange={e=>ForgetPasswordChangeHandler(e)} disabled={changeAct}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{rePasswordMsg}</span>
                            </div>
                        </div>
                        <div className='mx-3 mb-4'>
                            <button type="submit" className={"button " + styles.loginButton} style={{width:'100%'}} onClick={e=>chanagePasswordClickHandler(e)} disabled={changeAct}>Change Password</button>
                        </div>
                        
                        <hr/>
                        <div className='mb-2'>
                        <span className={styles.loginFont}>Already have an account?</span> <Link to="/login" className=''>Login</Link>
                        </div>
                    </form>
                    <div className={signSMsg}>
                        <p className='fs-5 fw-bold'>
                        {"Password change was successful."}     
                        </p>
                        <button type="submit" className={"button mb-3 " + styles.loginButton} style={{width:'70%'}} onClick={(e)=>gotoLoginPageClickHandler(e)}>Go to Log in page</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ForgetPassword;