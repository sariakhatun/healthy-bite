import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading}=use(AuthContext)
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>

    }
    if(!user){
        <Navigate to={`/login`}></Navigate>
    }
    return children
};

export default PrivateRoute;