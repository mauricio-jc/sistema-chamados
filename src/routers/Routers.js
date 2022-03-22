import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardIndex from "../pages/Dashboard/DashboardIndex";
import LoginIndex from "../pages/Login/LoginIndex";
import RegisterIndex from "../pages/Register/RegisterIndex";
import ForgotPasswordIndex from "../pages/Password/ForgotPasswordIndex";
import Profile from "../pages/User/Profile";
import CustomersIndex from "../pages/Customers/CustomersIndex";
import CustomersAdd from "../pages/Customers/CustomersAdd";
import CustomersEdit from "../pages/Customers/CustomersEdit";
import CallsIndex from "../pages/Calls/CallsIndex";
import CallsAdd from "../pages/Calls/CallsAdd";
import CallsEdit from "../pages/Calls/CallsEdit";


function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <LoginIndex/> } />
                <Route path="/register" element={ <RegisterIndex/> } />
                <Route path="/forgot-password" element={ <ForgotPasswordIndex/> } />
                <Route path="/" element={
                        <ProtectedRoute>
                            <DashboardIndex/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/customers" element={
                        <ProtectedRoute>
                            <CustomersIndex/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/customers/add" element={
                        <ProtectedRoute>
                            <CustomersAdd/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/customers/edit/:id" element={
                        <ProtectedRoute>
                            <CustomersEdit/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/calls" element={
                        <ProtectedRoute>
                            <CallsIndex/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/calls/add" element={
                        <ProtectedRoute>
                            <CallsAdd/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/calls/edit/:id" element={
                        <ProtectedRoute>
                            <CallsEdit/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;