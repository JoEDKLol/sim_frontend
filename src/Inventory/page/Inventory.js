import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import InventoryTable from "../components/InventoryTable";
import Button from "../../Share/Button";
import CompanySelector from "../../Share/CompanySeLector";


const Inventory = () => {
    const tableHead = ['SKU', 'NAME', 'IN-STOCK', 'ACTION']
    const [inventoryData, setInventoryData] = useState();


    const navigate = useNavigate();

    // Get access to the company ID that's encoded in the URL
    const companyUrlId = useParams().companyId;

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

    return (
        <div>
            <CompanySelector onChange={e => selectHandler(e)} selected={companyUrlId} />

            <div className='content-box  table-box' >

                {/* {!companyFilterByCompanyId && <div><p>You don't have any inventory yet.</p> <Button buttonName='Add an inventory' onClick={e => clickHandler(e)} /></div>}
                {companyFilterByCompanyId && <InventoryTable tableHead={tableHead} tableData={companyFilterByCompanyId} />} */}

            </div>
        </div >
    )


}


export default Inventory;