import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

function ProtectedRoute({ children }) {
    const { signed, loading } = useContext(UserContext);

    if(loading) {
        return <div>Carregando...</div>;
    }

    if(signed) {
        return children;
    }
    else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;