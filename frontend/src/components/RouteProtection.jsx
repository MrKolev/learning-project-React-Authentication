import { Outlet, useNavigate } from "react-router-dom";
import { getAuthToken } from "./util/auth"
import { useEffect } from "react";

export const RouteProtection = ({isAuth}) => {

    const token = getAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth && !token){    
            navigate('/');
        }
    },[])


    return <Outlet/>

}

RouteProtection.defaultProps = {isAuth: false}