import Button from '../../Share/Button.js';
import Input from '../../Share/Input.js';
import Textarea from '../../Share/Textarea.js';
const CompanyRegModal = () => {

    const onchangeHandler = (e) => {

            
    }

    const componySaveClickHandler = (e) => {

    } 

    return ( 
        <>
        
            <div className="container">
                <div className="row mb-3 mt-3">
                    <div className="col-6">
                        <Input type={"text"} id={"company_name"} name={"company_name"} onChange={e=>onchangeHandler(e)} lable={"Company name"}/>
                    </div>
                    <div className="col-6">
                        <Input type={"email"} id={"email"} name={"email"} onChange={e=>onchangeHandler(e)} lable={"Email"}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Input type={"text"} id={"address"} name={"address"} onChange={e=>onchangeHandler(e)} lable={"Address"}/>
                    </div>
                    <div className="col-6">
                        <Input type={"text"} id={"city"} name={"city"} onChange={e=>onchangeHandler(e)} lable={"City"}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Input type={"text"} id={"state"} name={"state"} onChange={e=>onchangeHandler(e)} lable={"State"}/>
                    </div>
                
                    <div className="col-6">
                        <Input type={"text"} id={"zipcode"} name={"zipcode"} onChange={e=>onchangeHandler(e)} lable={"Zipcode"}/>
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
 
export default CompanyRegModal;