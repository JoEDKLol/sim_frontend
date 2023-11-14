import { Link } from 'react-router-dom';
import Button from '../../Share/Button';


const InventoryTable = (props) => {
    return (
        <table className="table">
            <thead >
                <tr >
                    {props.tableHead.map(head => <th scope='col' key={head}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.tableData.map(data => {
                    return (
                        <tr key={data.name}>
                            <td>{data.sku_code}</td>
                            <td><Link to={`/inventoryHistory/${data._id}`}>{data.name}</Link></td>
                            <td>{data.in_stock}</td>
                            <td><Button buttonName='Add' />       <Button buttonName='Reduce' />      <Button buttonName='Delete' /></td>
                        </tr>
                    )

                })}
            </tbody>
        </table>
    )
}

export default InventoryTable;