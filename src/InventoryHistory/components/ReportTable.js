
const ReportTable = (props) => {
    return (
        <table className="table">
            <thead >
                <tr>
                    {props.tableHead.map(head => <th className='p-1' scope='col' key={head}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.tableData.map(data => {
                    return (
                        <tr key={data.inventory_info.name}>
                            <td>{data.date.slice(0, 10)}</td>
                            {data.action === 'Reduce' ? <td>Sales</td> : <td>{data.action}</td>}
                            {/* <td>{data.in_stock}</td> */}
                            {data.action === 'Purchase' ? <td>{data.quantity * data.unit_price}</td> : <td>{''}</td>}
                            {data.action === 'Reduce' ? <td>{data.quantity * data.unit_price}</td> : <td>{''}</td>}
                            <td>{data.vendor}</td>
                        </tr>
                    )

                })}
            </tbody>
        </table>
    )
}

export default ReportTable;