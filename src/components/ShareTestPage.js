import Input from '../Share/Input.js';
import Button from '../Share/Button.js';
import PeriodSearch from '../Share/PeriodSearch.js';
import Table from '../Share/Table.js';


const ShareTestPage = () => {
    return ( 

        <>
            <div className='container mt-3 row'>
                <div className="col-3 mb-1"><span className='fs-6'>Input</span></div>
                <div className='col-9 mb-1' ><Input type={"text"} id={"test"} name={"test"}/></div>
                <hr className='mb-1'/>
                <div className="col-3 mb-1"><span className='fs-6'>Button</span></div>
                <div className='col-9 mb-1'><Button buttonName={"button"}/></div>
                <hr className='mb-1'/>
                <div className="col-3 mb-1"><span className='fs-6'>PeriodSearch</span></div>
                <div className='col-9 mb-1'><PeriodSearch title={"title"}/></div>
                <hr className='mb-1'/>
            </div>
        </>

     );
}
 
export default ShareTestPage;