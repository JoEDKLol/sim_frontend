import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import InventoryTable from "../components/InventoryTable";
import Button from "../../Share/Button";
// import CompanySelector from "../../Share/CompanySeLector";
import Modal from '../../components/modals/Modal.js';
const Inventory = () => {
    const tableHead = ['SKU', 'NAME', 'IN-STOCK', 'ACTION']
    const [inventoryData, setInventoryData] = useState();
    /* Modal */
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    // Get access to the company ID that's encoded in the URL
    // const companyUrlId = useParams().companyId;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Load the inventory data from the json file to the responseData Object
    //             const inventoryResponse = await fetch('/jsontest/inventory.json');
    //             const inventoryResponseData = await inventoryResponse.json();

    //             // Write the data to the state
    //             setInventoryData(inventoryResponseData);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     };

    //     fetchData();
    // }, [companyUrlId])

    // if (!inventoryData) {
    //     return <p>is Loading...</p>
    // }

    const selectHandler = e => {
        // Navigate to another company
        // console.log('selectworking')
        // navigate(`/companyDashboard/${e.target.value}`)

        // console.log('key', e.target)

    }

    // const clickHandler = e => {
    //     e.preventDefault();
    //     navigate(`/companyDashboard/${e.target.key}`)
    // }

    // Get the data for a specify company
    // const companyFilterByCompanyId = inventoryData.filter(data => data.company_id === companyUrlId);
    // console.log('id', companyFilterByCompanyId)
    const inventoryRegClickHandler = (e) => {
        setModalShow(true);
    }

    const setModalShowF = (yn) => {
        setModalShow(yn);
    }
    return (
        <>
        <div className="content-box period-box mb-4">
            <h2 className="report-title text-start">Inventory</h2>
            <hr/>
            <div className={"row mt-4 pe-3"}>
                <div className='text-end mb-3'>
                    <Button type='submit' buttonName='Inventory Registration' onClick={e => inventoryRegClickHandler(e)}></Button>
                </div>
            </div>

        </div>
        <div className='mt-1 ms-4 text-start'>
        {
            (modalShow)?
            <Modal setModalShowF={setModalShowF} modalTitle={"Inventory Registration"} type={"inventory"}/>
            :""
        }
        </div>
        </>
    )


}


export default Inventory;