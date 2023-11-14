import { Link, useNavigate } from 'react-router-dom';
import styles from './mycss/login.module.css'
import { useRef, useState } from 'react';
import '../Share/Button.css'
import axios from 'axios';
const Login = (props) => {
    const navigate = useNavigate()
    let [loginObj, setLoginObj] = useState({email:'',password:''});
    let [loginBtDisabled, setLoginBtDisabled] = useState(false);
    let [loginYn, setLoginYn] = useState("invisible");
    let [logMsg, setLogMsg] = useState("Authentication Failed");

    const focusEmail = useRef();
    const focusPassword = useRef();

    if(!props.userInfo){
        return <>Loding...</> 
    }

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
                let resp = await axios.post("http://localhost:3002/login",loginObj);
                let data = await resp.data;
                console.log(data);
                if(data.loginYn != "n"){
                    // props.getLoginYn("y");
                    // sessionStorage.setItem('loginId', data._id);
                    // sessionStorage.setItem('userName', data.userName);
                    // sessionStorage.setItem('role', data.role);

                    // localStorage.setItem('loginId', data._id);
                    // localStorage.setItem('userName', data.userName);
                    // localStorage.setItem('role', data.role);

                    // navigate('/myProfileManagement/' + data._id);
                    // setLogMsg("");
                }else{
                    // setLoginYn("");                     
                    // setLogMsg("Authentication Failed");
                }



            }catch(e){
                console.log(e);
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