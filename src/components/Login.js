import { Link, useNavigate } from 'react-router-dom';
import styles from './mycss/login.module.css'
import { useRef, useState } from 'react';
import '../Share/Button.css'
import axios from 'axios';
import {storeToken, transactionAdd} from '../utils/transaction'

const Login = (props) => {
    let [loginObj, setLoginObj] = useState({email:'',password:''});
    let [loginBtDisabled, setLoginBtDisabled] = useState(false);
    let [loginYn, setLoginYn] = useState("invisible");
    let [logMsg, setLogMsg] = useState("Authentication Failed");
    const navigate = useNavigate()
    const focusEmail = useRef();
    const focusPassword = useRef();


    const logInChangeHandler = (e) => {
        setLoginObj({...loginObj, [e.target.id]:e.target.value})
    }

    let loginMsg = "Authentication Failed";
    const loginClickHandler2 = (e) => {
        
        e.preventDefault();

        if(loginObj.email == ""){
            focusEmail.current.focus();
            return;
        }

        if(loginObj.password == ""){
            focusPassword.current.focus();
            return;
        }

        setLoginBtDisabled(true);
        setLoginYn("invisible");
        
        let authCheck = async () => {
            try{
                // let resp = await axios.post("http://localhost:3002/login",loginObj);
                // axios.defaults.withCredentials = true;
                let resp = await axios.post(process.env.REACT_APP_BACKURL + "login",loginObj);
                let data = await resp.data;
                
                    if(data.loginYn == "y"){
                        data.accesstoken = resp.headers.accesstoken;
                        data.refreshtoken = resp.headers.refreshtoken;
                        console.log(data);
                        
                        storeToken(data);
                        setLoginYn("y");
                        props.getLoginYn("y");
                        props.getUserData(data);
                        navigate('/myProfileManagement/')
                    }else{
                        setLoginYn("");                     
                        setLogMsg("Authentication Failed");
                    }
            }catch(e){
                // console.log(e);
            }finally{
                setLoginBtDisabled(false);
            }
        }
        
        authCheck();
    }

    
    const loginClickHandler = (e) => {
        e.preventDefault();
        //navigate('/main');
        let findUserInfo = props.userInfo.find((elem)=>{
            //return elem.email = loginObj.email;
            if(elem.email == loginObj.email && elem.password == loginObj.password){
                return true;
            }
        });


        if(findUserInfo){
            props.getLoginYn("y");
            sessionStorage.setItem('loginId', findUserInfo._id);
            sessionStorage.setItem('userName', findUserInfo.user_name);
            sessionStorage.setItem('role', findUserInfo.role);

            localStorage.setItem('loginId', findUserInfo._id);
            localStorage.setItem('userName', findUserInfo.user_name);
            localStorage.setItem('role', findUserInfo.role);

            navigate('/myProfileManagement/' + findUserInfo._id);
            setLogMsg("");
        }else{
            setLoginYn("");                     
            setLogMsg("Authentication Failed");
        }
    }

    const test = (e) => {
        e.preventDefault();
        transactionAdd("get", "operatoruser", loginObj, transactionAddCallback);
    }

    const transactionAddCallback = (data) => {
        console.log("here::", data);
    }

    

    return ( 
        <>
            <div id="container">
                <div className={styles.loginBox + " text-center "}>
                    <div className={styles.loginBoxTitle2 + " mt-4"}>Login Your Account</div>
                    <form className="pt-2" method="get">
                        <div className="form-group mb-4 mx-3">
                            <input type="email" ref={focusEmail} name="email" id="email" className={" " + styles.loginInputBox} aria-describedby="emailHelp" placeholder=" Enter email" onChange={(e) => logInChangeHandler(e)}/>
                        </div>
                        <div className="form-group mb-4 mx-3" >
                            <input type="password"  ref={focusPassword} name="password" id="password" className={" " + styles.loginInputBox} placeholder=" Password" onChange={(e) => logInChangeHandler(e)}/>
                        </div>
                        <div className="form-group form-check mb-4 mx-3 text-start">
                            <input type="checkbox" className={"form-check-input "+styles.loginCheck} id="exampleCheck1"/>
                            <label className={"form-check-label "+styles.loginFont} htmlFor="exampleCheck1">Remember me</label>
                            <Link to="/forgetpassword" className='ms-5'>Forgot Password</Link>
                        </div>
                        <div className='mx-3 mb-1'>
                            <button type="submit" className={"button " + styles.loginButton} onClick={(e)=>loginClickHandler2(e)} disabled={loginBtDisabled}>Log in</button>
                            {/* <button type="submit" className={"button " + styles.loginButton} onClick={(e)=>test(e)} >test</button> */}
                        </div>
                        <div className={loginYn + ' mt-3 ' + styles.loginFailFont}><span >{logMsg}</span></div>
                    </form>     
                    
                    
                    <hr/>
                    <div className='mb-2'>
                        <span className={styles.loginFont}>Not yet account,</span>  <Link to="/signUp" className=''>Sign up</Link>
                        
                    </div>
                  
                </div>
            </div>
        </>
     );
}
 
export default Login;