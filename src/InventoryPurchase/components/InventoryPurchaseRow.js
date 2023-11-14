const InventoryPurchaseRow = (props) => {
    return (
        <tr>
            <td>{props.row.date.slice(0, 10)}</td>
            <td>{props.row.inventory_info.sku_code}</td>
            <td>{props.row.inventory_info.name}</td>
            <td>{props.row.quantity}</td>
            <td>{(props.row.quantity * props.row.unit_price).toFixed(2)}</td>
        </tr>
    )
}

export default InventoryPurchaseRow;