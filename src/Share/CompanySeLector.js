import { useState, useEffect } from 'react';
import './CompanySelector.css'


const CompanySelector = (props) => {
    const [userData, setUserData] = useState(null);
    const USERID = sessionStorage.getItem('loginId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Load the inventoryQuantity data from the json file to the responseData Object
                const response = await fetch('/jsontest/user.json');
                const responseData = await response.json();
                console.log('responsedata:', responseData)

                // Write the data to the state
                setUserData(responseData);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [])


    if (!userData) {
        return <p>Loading...</p>
    }

    // Get the companys of the given user
    const user = userData.find(data => data._id === '652f73dfbb5be4ed4b9588b0');



    return <div className='company-select-box text-start mb-3'><select className='company-select font-weight-bold' onChange={props.onChange}>
        {user.companies_operator.map(data => <option key={data.company_id} selected={data.company_id === props.selected ? 'selected' : ''} value={data.company_id} >{data.company_name}</option>)}
    </select></div>

}

export default CompanySelector;