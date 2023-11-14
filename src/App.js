//import logo from './logo.svg';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './Navbar.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import InventoryPurchaseDetail from './InventoryPurchase/Page/InventoryPurchaseDetail';

import Main from './components/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import { useEffect, useState } from 'react';
import PageSearch from './components/PageSearch';
import NotFound from './components/NotFound';
import ShareTestPage from './components/ShareTestPage';
import InventorySalesDetails from './InventorySales/Page/InventorySalesDetails';

// import LandingPage from './components/LandingPage';
import InventoryReport from './Report/page/InventroyReport';

import Landing from './components/Landing';
import MyProfileManagement from './components/MyProfileManagement';
import Sidebar from './components/Sidebar';
import MyCompanyList from './components/MyCompanyList';
import CompanyDashboard from './components/CompanyDashboard';
import InventoryHistory from './InventoryHistory/page/InventoryHistory';
import Inventory from './Inventory/page/Inventory';
import InventoryRegister from './InventoryRegister/page/InventoryRegister';


function App() {

    const [userData, setUserData] = useState([]);
    const [loninYn, setLoginYn] = useState("n");
    
    const getLoginYn = (yn) =>{
        setLoginYn(yn);
    }


    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('/jsontest/user.json');
            const data = await resp.json();
            setUserData(data);
            //console.log(data);
        };
        fetchData();
        // if(sessionStorage.getItem("loginId")){
        if(localStorage.getItem("loginId")){    
            setLoginYn("y");
        }

        

    }, []);

    return (
        <div className="App">
            {/* <Navbar /> */}
            {
                loninYn=="y"?<Sidebar getLoginYn={getLoginYn} />:""
            }
            {/* To fix the footer - wrapper */}
            <div className='wrapper'>

                <Routes>
                    <Route path="/" element={(loninYn==="y")?<Navigate to={"/myProfileManagement/"+localStorage.getItem("loginId")}/>:<Landing />} />
                    <Route path="/login" element={(loninYn==="y")?<Navigate to={"/myProfileManagement/"+localStorage.getItem("loginId")}/>:
                        <Login userInfo={userData} getLoginYn={getLoginYn} />} />
                    <Route path="/signup" element={(loninYn==="y")?<Navigate to={"/myProfileManagement/"+localStorage.getItem("loginId")}/>:<SignUp />} />
                    <Route path="/forgetpassword" element={(loninYn==="y")?<Navigate to={"/myProfileManagement/"+localStorage.getItem("loginId")}/>:<ForgetPassword />} />

                    <Route path="/myProfileManagement/:userId" element={<MyProfileManagement />} />
                    <Route path="/myCompanyList/:userId" element={<MyCompanyList />} />
                    <Route path="/companyDashboard/:companyId" element={<CompanyDashboard />} />
                    <Route path="/inventoryRegister/:companyId" element={<InventoryRegister />} />
                    <Route path="/inventory/:companyId" element={<Inventory />} />
                    <Route path="inventoryHistory/:inventoryId" element={<InventoryHistory />} />
                    <Route path="/purchaseDetail/:companyId" element={<InventoryPurchaseDetail />} />
                    <Route path="/salesDetail/:companyId" element={<InventorySalesDetails />} />
                    <Route path="/inventoryReport/:companyId" element={<InventoryReport />} />

                    <Route path="/test" element={<ShareTestPage />} />
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
            {
                loninYn=="y"?<Footer />:""
            }





        </div>
    );
}

export default App;
