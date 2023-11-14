import { Link, useNavigate } from 'react-router-dom';
import styles from './mycss/login.module.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import {checkInputData} from '../utils/checkUserValidation';


const SignUp = () => {
    let [userObj, setUserObj] = useState({userName:'', email:'', password:'', repassword:'', regUser:"", updUser:""});
    let [signS, setSignS] = useState("");
    let [signSMsg, setSignSMsg] = useState("d-none");
    let [userName, setUserName] = useState("");

    let [nameMsg, setNameMsg] = useState(""); 
    let [emailMsg, setEmailMsg] = useState(""); 
    let [passwordMsg, setPasswordMsg] = useState(""); 
    let [rePasswordMsg, setRePasswordMsg] = useState(""); 
    
    const focusName = useRef();
    const focusEmail = useRef();
    const focusPassword = useRef();
    const focusRepassword = useRef();

    const navigate = useNavigate()

    const signUpChangeHandler = (e) => {
        setUserObj({...userObj, [e.target.id]:e.target.value})
    }

    const signUpClickHandler = (e) => {
        e.preventDefault();
        const retObj = checkInputData(userObj);
        // console.log(retObj);

        setNameMsg("");
        setEmailMsg("");
        setPasswordMsg("");
        setRePasswordMsg("");

        if(retObj.yn == false && retObj.field == "name"){
            focusName.current.focus();
            setNameMsg(retObj.str)
            return;
        }

        if(retObj.yn == false && retObj.field == "email"){
            focusEmail.current.focus();
            setEmailMsg(retObj.str);
            return;
        }

        if(retObj.yn == false && retObj.field == "password"){
            focusPassword.current.focus();
            setPasswordMsg(retObj.str);
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

        
        
        setUserObj(userObj => ({...userObj,regUser:userObj.userName,updUser:userObj.userName}));

        let authCheck = async () => {
            try{
                let resp = await axios.post(process.env.REACT_APP_BACKURL + "signup",userObj);
                let data = await resp.data;
                if(data.code == "11000"){
                    // console.log("The email already exists.");
                    setRePasswordMsg("The email already exists.");
                }else{
                    setSignS("d-none");
                    setSignSMsg("");
                    setUserName(data.userName);
                }

            }catch(e){
                
            }
        }
        authCheck();
    }

    const gotoLoginPageClickHandler = () => {
        navigate('/login');
    }




    return ( 
        <>
            <div id="container">
                <div className={styles.loginBox + " text-center "}>
                    <div className={styles.loginBoxTitle2 + " mt-4 "}>Sign Up</div>
                    <form className={"py-2 "+signS}>
                        <div className="form-group mx-3">
                            <input type="name" ref={focusName} className={" " + styles.loginInputBox} id="userName"  placeholder="Name" onChange={(e)=>signUpChangeHandler(e)}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{nameMsg}</span>
                            </div>
                        </div>
                        <div className="form-group mx-3">
                            <input type="email" ref={focusEmail} className={" " + styles.loginInputBox} id="email" aria-describedby="emailHelp" placeholder="Email" onChange={(e)=>signUpChangeHandler(e)}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{emailMsg}</span>
                            </div>
                        </div>
                        <div className="form-group mx-3" >
                            <input type="password" ref={focusPassword} className={" " + styles.loginInputBox} id="password" placeholder="Password" onChange={(e)=>signUpChangeHandler(e)}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{passwordMsg}</span>
                            </div>
                        </div>
                        <div className="form-group mb-3 mx-3" >
                            <input type="password" ref={focusRepassword} className={" " + styles.loginInputBox} id="repassword" placeholder="Confirm Password" onChange={(e)=>signUpChangeHandler(e)}/>
                            <div className={"ps-1 text-start " + styles.divFixHeight}>
                                <span className='text-danger'>{rePasswordMsg}</span>
                            </div>
                        </div>
                        <div className='mx-3 mb-4'>
                            <button type="submit" className={"button " + styles.loginButton} style={{width:'60%'}} onClick={(e)=>signUpClickHandler(e)}>Register Now</button>
                        </div>
                        
                        <hr/>
                        <div className='mb-2'>
                        <span className={styles.loginFont}>Already have an account?</span> <Link to="/login" className=''>Login</Link>
                        </div>
                    </form>
                    <div className={signSMsg}>
                        <p className='fs-5 fw-bold'>
                        {userName + "! Sign up is complete."}     
                        </p>
                        <button type="submit" className={"button mb-3 " + styles.loginButton} style={{width:'70%'}} onClick={(e)=>gotoLoginPageClickHandler(e)}>Go to Log in page</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default SignUp;