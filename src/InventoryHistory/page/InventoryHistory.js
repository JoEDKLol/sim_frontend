import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportTable from "../components/ReportTable";
import Button from "../../Share/Button";
import CompanySelector from "../../Share/CompanySeLector";
import { getLastMonth } from "../../utils/getLastMonth";


// Set up the default searching period to last month
const [firstDayOfPreviousMonth, lastDayOfPreviousMonth] = getLastMonth();

const InventoryHistory = () => {
    const tableHead = ['DATE', 'ACTION', 'COST', 'REVENUE', 'VENDOR']
    const [inventoryQuantityData, setInventoryQuantityData] = useState();
    const [inventoryData, setInventoryData] = useState();
    const [SearchMode, setSearchMode] = useState(false);
    const [startDate, setStartDate] = useState(firstDayOfPreviousMonth);
    const [endDate, setEndDate] = useState(lastDayOfPreviousMonth);
    const [tableDataInPeriod, setTableDataInPeriod] = useState([]);


    const navigate = useNavigate();

    // Get access to the company ID that's encoded in the URL
    const companyUrlId = useParams().companyId;
    const inventoryUrlId = useParams().inventoryId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Load the inventoryQuantity and inventory data from the json file to the response Object
                const quantityResponse = await fetch('/jsontest/inventoryQuantity.json');
                const quantityResponseData = await quantityResponse.json();

                const inventoryResponse = await fetch('/jsontest/inventory.json');
                const inventoryResponseData = await inventoryResponse.json();

                // Write the data to the state
                setInventoryQuantityData(quantityResponseData);
                setInventoryData(inventoryResponseData);


            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [inventoryUrlId])

    if (!inventoryData || !inventoryQuantityData) {
        return <p>is Loading...</p>
    }

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

    // Get the data for a specify inventory id
    const inventoriesFilterById = inventoryQuantityData.filter(data => data.inventory_id === inventoryUrlId);
    const inventory = inventoryData.find(item => item._id === inventoryUrlId);
    // const inventoryStock = inventory.in_stock;
    const inventoryVendor = inventory.vendor;

    // Create a new tableData list of all 
    const tableData = [];
    inventoriesFilterById.forEach(data => {
        const inventoryTableRow = { ...data, "vendor": inventoryVendor }
        tableData.push(inventoryTableRow)

    })
    console.log('table', tableData);

    const clickHandler = (e) => {
        e.preventDefault();
        // Search mode will display the search data base on the period selected
        setSearchMode(true);

        // ---------Needs modify ---------------
        // If endDate is smaller than the startDate,will show some err
        if (startDate > endDate) {
            alert('The end date should not earler than the start day');
        }

        // Get the data within the seleted period
        const inventoryFilterByPeriod = inventoriesFilterById.filter(data => {
            return data.date.slice(0, 10) >= startDate && data.date.slice(0, 10) <= endDate;
        });



        // Create a new tableData List within the search period
        const newTableDataInPeriod = [];
        inventoryFilterByPeriod.forEach(data => {
            const inventoryTableRow = { ...data, "vendor": inventoryVendor }
            newTableDataInPeriod.push(inventoryTableRow)
            setTableDataInPeriod(newTableDataInPeriod)
        })
    }

    const selectHandler = e => {
        // Navigate to another company
        console.log('selectworking')
        navigate(`/companyDashboard/${e.target.value}`)

        // Reset all the state
        setSearchMode(false);
        setStartDate(firstDayOfPreviousMonth);
        setEndDate(lastDayOfPreviousMonth);

    }

    return (
        <div>
            <CompanySelector onChange={e => selectHandler(e)} selected={companyUrlId} />

            <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">History Detail</h2>
                <p className="text-start mb-1 mx-3">Search Period</p>
                <form className="period-search text-start pb-3">

                    <input type='date' className="start-date date-select mx-3" value={startDate} onChange={e => StartDateHandler(e)}></input>
                    to
                    <input type='date' className="end-date date-select mx-3" value={endDate} onChange={e => EndDateHandler(e)}></input>
                    <Button type='submit' buttonName='Search' onClick={e => clickHandler(e)}></Button>

                </form>
            </div>

            <div className='content-box table-box' >
                <div>
                    <h3>{inventory.name}</h3>
                    {SearchMode && tableDataInPeriod.length === 0 && <p>No data found in this period.</p>}
                    {!SearchMode && <ReportTable tableHead={tableHead} tableData={tableData} />}
                    {SearchMode && tableDataInPeriod.length > 0 && <ReportTable tableHead={tableHead} tableData={tableDataInPeriod} />}
                </div>
            </div>
        </div >
    )


}




export default InventoryHistory;

