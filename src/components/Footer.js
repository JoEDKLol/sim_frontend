
import styles from './mycss/footer.module.css'

const Footer = () => {
    return (
             <footer className={"text-center text-white " + styles.footer}>
                <div className="text-center p-3" >
                    {/* © 2023 Copyright: <a className="text-dark" href="#"> Inventory Management</a> */}
                    <p className="text-dark">© 2023 Copyright: Inventory Management</p>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
    );
}

export default Footer;