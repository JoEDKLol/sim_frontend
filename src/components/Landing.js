import styles from './mycss/login.module.css'
import '../Share/Button.css'
import { Link } from 'react-router-dom';

const Landing = () => {
    return ( 

        <div className={"container-fluid " + styles.landingbackground}>
            
                <div className={"row justify-content-center " + styles.landingAppName}>

                        <div className={"col-8 "}>
                            <div className={"text-start "}>
                                <span className={"" + styles.landingFont}>App Name</span>
                            </div>
                            <div className={"text-start "}>
                                <span className={"" + styles.landingFont2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Business Partner</span>
                            </div>
                        </div>

                </div>

                <div className={"row justify-content-center " + styles.landingDiv3}>

                        
                        <div className={"col-md-4 col-sm-6 " + styles.landingDiv4}>
                            
                            <p className={'text-center mt-3 ' + styles.landingFont3}>     
                            Fast and easy 
                            </p>
                            <p className={'text-center  ' + styles.landingFont3}>     
                            inventory
                            </p>
                            <p className={'text-center  ' + styles.landingFont3}>     
                            management 
                            </p>
                            <hr className={'' + styles.landingHr}/>
                            <div className='text-center mb-1'>
                                <Link to="/login">
                                <button className={"button " + styles.loginButton}>Log in</button>
                                </Link>
                            </div>
                        </div>
                        
                        <div className={"col-6 d-none d-md-block "}>
                            
                            <img className={'' + styles.landingImg} src='/images/lanading_img.png'/>
                            
                        </div>


                </div>
           
        </div>
        
     );
}
 
export default Landing;