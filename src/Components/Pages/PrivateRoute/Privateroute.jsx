import React,{useContext} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'
import useAuth from '../../Hooks/useAuth';


const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location=useLocation()

    if(loading){
        return <div className='flex justify-around py-10'><Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></div>
    }

    if(user){
        return children;
       }
       return <Navigate to="/login" state={{from: location.pathname}}   replace></Navigate>
    };

export default PrivateRoute;