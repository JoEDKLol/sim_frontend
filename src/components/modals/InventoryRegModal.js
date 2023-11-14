import Button from '../../Share/Button.js';
import Input from '../../Share/Input.js';
import Textarea from '../../Share/Textarea.js';
const InventoryRegModal = () => {
    const onchangeHandler = (e) => {

        
    }

    const componySaveClickHandler = (e) => {

    } 

    return ( 
        <>
            <div className="container">
                <div className="row mb-3 mt-3">
                    <div className="col-6">
                        <Input type={"text"} id={"sku"} name={"sku"} onChange={e=>onchangeHandler(e)} lable={"SKU"}/>
                    </div>
                    <div className="col-6">
                        <Input type={"text"} id={"name"} name={"name"} onChange={e=>onchangeHandler(e)} lable={"Name"}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Input type={"text"} id={"unit_price"} name={"unit_price"} onChange={e=>onchangeHandler(e)} lable={"Unit Price"}/>
                    </div>
                    <div className="col-6">
                        <Input type={"text"} id={"quantity"} name={"quantity"} onChange={e=>onchangeHandler(e)} lable={"Quantity"}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8">
                        <Input type={"text"} id={"vendor"} name={"vendor"} onChange={e=>onchangeHandler(e)} lable={"Vendor"}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                       <Textarea id={"zipcode"} name={"zipcode"} onChange={e=>onchangeHandler(e)} lable={"Note"}/>
                    </div>
                </div>
                <div className="row mb-3 text-center ">
                    <div>
                    <Button type='submit' buttonName='Save' onClick={e => componySaveClickHandler(e)}></Button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default InventoryRegModal;