import InventoryPurchaseRow from "../InventoryPurchase/components/InventoryPurchaseRow";

import './Table.css'

const Table = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.tableHead.map(head => <th scope='col' key={head}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.tableData.map(data => <InventoryPurchaseRow row={data} key={data.inventory_info._id} />)}
            </tbody>
        </table>
    )
}

export default Table;