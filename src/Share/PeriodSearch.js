import Button from "./Button";
import './PeriodSearch.css'

const PeriodSearch = (props) => {

    return (
        <div className="content-box mb-5">
            <h2 className="report-title text-start">{props.title}</h2>
            <p className="text-start mb-1">Search Period</p>
            <form className="period-search text-start pb-3">
                <select className="period-select">
                    <option seleted='selected'>All Dates</option>
                    <option>Custom</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                    <option>This Quarter</option>
                    <option>Last Quarter</option>
                </select>
                <input type='date' className="date-select mx-3"></input>
                to
                <input type='date' className="date-select mx-3"></input>
                <Button type='submit' buttonName='Search' onClick={props.onClick}></Button>
            </form>
        </div>
    )
}

export default PeriodSearch;