import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportTable from "../component/ReportTable";
import Button from "../../Share/Button";
import CompanySelector from "../../Share/CompanySeLector";
import { getLastMonth } from "../../utils/getLastMonth";

const [firstDayOfPreviousMonth, lastDayOfPreviousMonth] = getLastMonth();

const InventoryReport = () => {
    const tableHead = ['NAME', 'IN-STOCK', 'REVENUE', 'COST', 'PROFIT/LOSS', 'TURNOVER']
    const [inventoryData, setInventoryData] = useState();
    const [inventoryQuantityData, setInventoryQuantityData] = useState();
    const [SearchMode, setSearchMode] = useState(false);
    const [startDate, setStartDate] = useState(firstDayOfPreviousMonth);
    const [endDate, setEndDate] = useState(lastDayOfPreviousMonth);
    const [dataInPeriod, setDataInPeriod] = useState([]);
    const [period, setPeriod] = useState();


    const navigate = useNavigate();

    // Get access to the company ID that's encoded in the URL
    const companyUrlId = useParams().companyId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Load the inventoryQuantity data from the json file to the responseData Object
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
    }, [companyUrlId])

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

    const clickHandler = e => {
        e.preventDefault();
        // Search mode will display the search data base on the period selected
        setSearchMode(true);

        // ---------Needs modify ---------------
        // If endDate is smaller than the startDate,will show some err
        if (startDate > endDate) {
            alert('The end date should not earler than the start day')
        }

        // Get the data for a specify company
        const companyFilterByCompanyId = inventoryQuantityData.filter(data => data.company_id === companyUrlId);
        console.log('id', companyFilterByCompanyId)

        // Get the data within the seleted period
        const inventoryFilterByPeriod = companyFilterByCompanyId.filter(data => {
            return data.date.slice(0, 10) >= startDate && data.date.slice(0, 10) <= endDate;
        });

        console.log('period', inventoryFilterByPeriod)

        // Get the inventory data

        // Get the in-stock of each inventory

        // Need to group the data based on the name 
        // const tableData = []
        // totalCost to keep track total cost and revenue by inventoryId the {id: totalCost, id: totalCost}
        // totalRevenue, {id:totalRevenue,id: totalRevenue}
        // {id: {id: xx, cost: xx, revenue: xx, in_stock:xx}, id: {id: xx, cost: xx, revenue: xx, in_stock:xx}}
        const newTableData = {};

        inventoryFilterByPeriod.forEach(data => {
            console.log("2")
            // Find the inventory in the inventory collection
            const inventory = inventoryData.find(item => item._id === data.inventory_id);

            // Retrived the existing inventory cost and revenue
            if (!newTableData[inventory._id]) {
                newTableData[inventory._id] = { ...inventory, "cost": 0, "revenue": 0, "profit": 0 };
            }
            // Update the new inventory cost and revenue
            if (data.action === 'Purchase') {
                let cost = data.quantity * data.unit_price;
                newTableData[inventory._id].cost += cost;
            } else if (data.action === 'Reduce') {
                let revenue = data.quantity * data.unit_price;
                newTableData[inventory._id].revenue += revenue;
            }
            newTableData[inventory._id].profit = newTableData[inventory._id].revenue - newTableData[inventory._id].cost;
            console.log('inven', inventory);
        })

        const tableData = [];
        for (let id in newTableData) {
            tableData.push(newTableData[id])
        }
        console.log('tadata', tableData)

        setDataInPeriod(tableData);
        // Handle the period
        setPeriod(`${startDate} -- ${endDate}`)

    }


    const selectHandler = e => {
        // Navigate to another company
        navigate(`/companyDashboard/${e.target.value}`)

        setSearchMode(false);
        setStartDate(firstDayOfPreviousMonth);
        setEndDate(lastDayOfPreviousMonth);

    }

    const printHandler = (e) => {
        e.preventDefault();

        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        // Copy all stylesheets to the iframe
        Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach(linkOrStyle => {
            iframe.contentDocument.head.appendChild(linkOrStyle.cloneNode(true));
        });

        // Copy the content you want to print to the iframe
        iframe.contentDocument.body.innerHTML = document.getElementById('report-body').innerHTML;

        // Give some time for the browser to render and then print
        setTimeout(() => {
            iframe.contentWindow.print();

            // Remove the iframe after printing
            document.body.removeChild(iframe);
        }, 100);
    }


    return (
        <div>
            <CompanySelector onChange={e => selectHandler(e)} selected={companyUrlId} />

            <div className="content-box period-box mb-5">
                <h2 className="report-title text-start">Inventory Report</h2>
                <p className="text-start mb-1 mx-3">Report Period</p>
                <form className="period-search text-start pb-3">
                    <input type='date' className="start-date date-select mx-3" value={startDate || ''} onChange={e => StartDateHandler(e)}></input>
                    to
                    <input type='date' className="end-date date-select mx-3" value={endDate || ''} onChange={e => EndDateHandler(e)}></input>
                    <Button type='submit' buttonName='Run' onClick={e => clickHandler(e)}></Button>
                </form>
            </div>

            <div className='content-box table-box' >
                <div className="text-end px-5 py-2"><Button buttonName='Print' onClick={e => printHandler(e)} /></div>
                <div id='report-body'>
                    <h3>Inventory Report</h3>
                    <p>{period}</p>
                    {SearchMode && dataInPeriod.length === 0 && <p>No data found in this period.</p>}
                    {/* {!SearchMode && <p>Please Select a peirod for the report.</p>} */}
                    {/* {SearchMode && !DataInPeriod && <p>No data found.</p>} */}
                    {SearchMode && dataInPeriod.length > 0 && <ReportTable tableHead={tableHead} tableData={dataInPeriod} />}
                </div>
            </div>
        </div >
    )


}


export default InventoryReport;