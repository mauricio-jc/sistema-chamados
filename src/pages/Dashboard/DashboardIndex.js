import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

function DashboardIndex() {
    return(
        <Layout>
            <h1>Dashboard</h1>
            <hr/>

            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Olá</h5>
                    <Link to="/calls/add" className="btn btn-success">
                        <i className="fas fa-plus"></i> Cadastrar chamado
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardIndex;