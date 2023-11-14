import { useEffect, useState } from 'react';
import styles from './mycss/sidebar.module.css'
import { Link, useLocation, useParams } from 'react-router-dom';
const Sidebar = (props) => {
    const paramObj = useParams();
    const [myManus, setMyManus] = useState(["myProfileManagement", "MyCompanyList"])
    const [manus, setManus] = useState([])
    //props.sideBarManus


    // let manus = [];
    // let user_id = "652f73dfbb5be4ed4b9588b0";


    const location = useLocation();
    useEffect(() => {

        // location.p
        let currPage = location.pathname.split("/")[1];
        let param = location.pathname.split("/")[2];
        // console.log(myManus.indexOf(currPage));
        // console.log(location.pathname.split("/"));


        let manu = [];
        if (myManus.indexOf(currPage) > -1) {
            manu =
                [
                    //{"title":"My profile", "linkTo":"/myProfileManagement/"+param, "selected":styles.sideBarLinkSelected},
                    { "title": "My profile", "linkTo": "/myProfileManagement/" + param, "selected": (currPage === "myProfileManagement") ? styles.sideBarLinkSelected : "" },
                    { "title": "My company", "linkTo": "/MyCompanyList/" + param, "selected": (currPage === "MyCompanyList") ? styles.sideBarLinkSelected : "" }
                ];
        } else {
            manu =
                [
                    {"title":"DashBoard", "linkTo":"/companyDashboard/"+param, "selected":(currPage==="companyDashboard")?styles.sideBarLinkSelected:""},
                    {"title":"Inventory", "linkTo":"/inventory/"+param, "selected":(currPage==="inventory")?styles.sideBarLinkSelected:""},
                    {"title":"Purchase", "linkTo":"/purchaseDetail/"+param, "selected":(currPage==="purchaseDetail")?styles.sideBarLinkSelected:""},
                    {"title":"Sales", "linkTo":"/salesDetail/"+param, "selected":(currPage==="salesDetail")?styles.sideBarLinkSelected:""},
                    // {"title":"History", "linkTo":"//"+param, "selected":(currPage==="")?styles.sideBarLinkSelected:""},
                    {"title": "Report", "linkTo": "/inventoryReport/" + param, "selected": (currPage === "inventoryReport") ? styles.sideBarLinkSelected : "" }
                ];
        }


        setManus(manu)
    }, [location])



    const linkClickHandler = (e) => {

        manus.map((elem) => {
            return elem.selected = ""
        })

        setManus([...manus])

        const index = manus.findIndex((elem) => {
            return elem.title === e.target.id
        })

        manus[index].selected = styles.sideBarLinkSelected;
        setManus([...manus])

    }

    const logOutClickHandler = () => {
        props.getLoginYn("");
        sessionStorage.removeItem("loginId");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("role");
        localStorage.removeItem("loginId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        // window.sessionStorage.setItem('loginId', "");
    }


    return (
        <>
            <div className={"fixed-top d-flex flex-column flex-shrink-0 p-3 text-white " + styles.sideBar} >
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src="" alt="Your Logo" />
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto text-start">
                    {
                        manus.map((elme) => {
                            return <li key={elme.title} className='nav-item pt-2'><Link id={elme.title} className={elme.selected + " " + styles.sideBarLink} to={elme.linkTo} onClick={(e) => linkClickHandler(e)} >{elme.title}</Link></li>
                        })
                    }
                </ul>
                <hr />
                <Link to="/login" className={" " + styles.sideBarLink} onClick={(e) => logOutClickHandler(e)}>Log out</Link>
            </div>
        </>
    );
}

export default Sidebar;