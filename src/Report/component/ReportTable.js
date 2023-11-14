import { Link } from 'react-router-dom';
import './ReportTable.css'

const ReportTable = (props) => {
    return (
        <table className="table report-table">
            <thead >
                <tr className='report-table-head'>
                    {props.tableHead.map(head => <th className='report-table-head p-1' scope='col' key={head}>{head}</th>)}
                </tr>
            </thead>
            <tbody className='report-table-body'>
                {props.tableData.map(data => {
                    return (
                        <tr key={data.name}>
                            <td><Link to={`/inventoryHistory/${data._id}`}>{data.name}</Link></td>
                            <td>{data.quantity}</td>
                            <td>{data.revenue.toFixed(2)}</td>
                            <td>{data.cost.toFixed(2)}</td>
                            <td>{data.profit.toFixed(2)}</td>
                            <td>{data.sku_code}</td>
                        </tr>
                    )

                })}
            </tbody>
        </table>
    )
}

export default ReportTable;