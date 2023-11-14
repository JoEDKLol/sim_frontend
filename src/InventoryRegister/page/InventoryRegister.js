import { useNavigate, useParams } from "react-router-dom"
import CompanySelector from "../../Share/CompanySeLector"
import Input from '../../Share/Input';
import Button from '../../Share/Button';
import './InventoryRegister.css';
import { useState } from "react";


const InventoryRegister = () => {
    const companyUrlId = useParams().companyId;
    const navigate = useNavigate();

    const [formObj, setFormObj] = useState({ 'sku_code': '', 'name': '', 'unit_price': 0, 'quantity': 0, 'vendor': '', 'note': '' })

    const selectHandler = e => {
        // Navigate to another company
        navigate(`/companyDashboard/${e.target.value}`)
    }

    const formHandler = e => {
        e.preventDefault();
        setFormObj({ ...formObj, [e.target.name]: e.target.value })
        console.log(formObj);
    }

    return (
        <div >
            <CompanySelector onChange={e => selectHandler(e)} selected={companyUrlId} />
            <div className="content-box table-box regiter-box">
                <div className="container">
                    <form className="register-form py-5">
                        <div className="row">
                            <div className="col-md-6 p-3">
                                <label className="float-start">SKU</label>
                                <Input name='sku_code' onChange={e => formHandler(e)} />
                            </div>
                            <div className="col-md-6 p-3">
                                <label className="float-start">Name</label>
                                <Input name='name' onChange={e => formHandler(e)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 p-3">
                                <label className="float-start">Unit Price</label>
                                <Input type='Number' name='unit_price' onChange={e => formHandler(e)} />
                            </div>
                            <div className="col-md-6 p-3">
                                <label className="float-start">Quantity</label>
                                <Input type='Number' name='quantity' onChange={e => formHandler(e)} />
                            </div>
                        </div>
                        <div className="p-1 py-3">
                            <label className="float-start">Vendor</label>
                            <Input name='vendor' onChange={e => formHandler(e)} />
                        </div>

                        <div className="p-1 py-3">
                            <label className="float-start">Note</label>
                            <textarea rows="5" cols="20" name='note' onChange={e => formHandler(e)} />
                        </div>
                        <Button buttonName='Save' />
                    </form>
                </div>


            </div >

        </div >
    )
}

export default InventoryRegister;