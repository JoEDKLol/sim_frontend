import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {

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
 
export default Main;