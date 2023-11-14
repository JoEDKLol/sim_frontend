import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Table from "../../Share/Table";
import Button from "../../Share/Button";

import './InventoryPurchaseDetail.css'
import CompanySelector from "../../Share/CompanySeLector";
import { getLastMonth } from "../../utils/getLastMonth";

// Set up the default searching period to last month
const [firstDayOfPreviousMonth, lastDayOfPreviousMonth] = getLastMonth();

const InventoryPurchaseDetail = () => {
    const tableHead = ['DATE', 'SKU', 'NAME', 'QUANTITY', 'COST']
    const [inventoryData, setInventoryData] = useState();
    const [SearchMode, setSearchMode] = useState(false);
    const [startDate, setStartDate] = useState(firstDayOfPreviousMonth);
    const [endDate, setEndDate] = useState(lastDayOfPreviousMonth);
    const [tableDataInPeriod, setTableDataInPeriod] = useState([]);

    const navigate = useNavigate();

    // Get access to the company ID that's encoded in the URL
    const companyDataId = useParams().companyId;
    console.log('companyId', companyDataId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Load the inventoryQuantity data from the json file to the responseData Object
                const response = await fetch('/jsontest/inventoryQuantity.json');
                const responseData = await response.json();
                console.log('responsedata:', responseData)

                // Write the data to the state
                setInventoryData(responseData);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [companyDataId])

    if (!inventoryData) {
        return <p>is Loading...</p>
    }



    // Get the data for a specify company
    const companyPurchaseData = inventoryData.filter(data => data.company_id === companyDataId)
    console.log(companyPurchaseData)

    // Get all the purchase data
    const tableData = companyPurchaseData.filter(data => data.action === 'Purchase')

    // set the start date to the date input value
    const StartDateHandler = e => {
        e.preventDefault();
        setStartDate(e.target.value);
    }

    // set the end date to the date input value 
    const EndDateHandler = e => {
        e.preventDefault();
        setEndDate(e.target.value);
    }

    const clickHandler = (e) => {
        e.preventDefault();
        // Search mode will display the search data base on the period selected
        setSearchMode(true);

        // ---------Needs modify ---------------
        // If endDate is smaller than the startDate,will show some err
        if (startDate > endDate) {
            alert('The end date should not earler than the start day')
        }


        // Get the data within the seleted period
        const newtableData = companyPurchaseData.filter(data => {
            return data.action === 'Purchase' && data.date.slice(0, 10) >= startDate && data.date.slice(0, 10) <= endDate
        });
        setTableDataInPeriod(newtableData);

    }

    const selectHandler = e => {
        // Navigate to another company
        navigate(`/companyDashboard/${e.target.value}`)

        // Reset all the states
        setSearchMode(false);
        setStartDate(firstDayOfPreviousMonth);
        setEndDate(lastDayOfPreviousMonth);
    }


    return (
        <div>
            <CompanySelector onChange={e => selectHandler(e)} selected={companyDataId} />

            <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">Purchase Details</h2>
                <p className="text-start mb-1 mx-3">Search Period</p>
                <form className="period-search text-start pb-3">
                    <input type='date' className="start-date date-select mx-3" value={startDate} onChange={e => StartDateHandler(e)}></input>
                    to
                    <input type='date' className="end-date date-select mx-3" value={endDate} onChange={e => EndDateHandler(e)}></input>
                    <Button type='submit' buttonName='Search' onClick={e => clickHandler(e)}></Button>
                </form>
            </div>

            <div className='content-box table-box'>
                {SearchMode && tableDataInPeriod.length === 0 && <p>No data found in this period.</p>}
                {!SearchMode && <Table tableHead={tableHead} tableData={tableData} />}
                {SearchMode && tableDataInPeriod.length > 0 && <Table tableHead={tableHead} tableData={tableDataInPeriod} />}
            </div>
        </div >
    )


}


export default InventoryPurchaseDetail;