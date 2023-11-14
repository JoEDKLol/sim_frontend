import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageSearch = () => {
    const navigate = useNavigate()
    
    useEffect(()=>
        {
            navigate('/main/homepage')
        }
        ,[]
    )

    return ( 
        <>
        page movement
        </>
     );
}
 
export default PageSearch;