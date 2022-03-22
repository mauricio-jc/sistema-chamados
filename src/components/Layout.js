import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

function Layout({ children }) {
    const { user, logOut } = useContext(UserContext);

    return(
        <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-text mx-3">Home</div>
                </Link>
                
                <hr className="sidebar-divider my-0"/>
                
                <li className="nav-item active">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" style={{ margin: '0'}}/>

                <li className="nav-item active">
                    <Link to="/customers" className="nav-link">
                        <i className="fas fa-fw fa-users"></i>
                        <span>Clientes</span>
                    </Link>
                </li>

                <li className="nav-item active">
                    <Link to="/calls" className="nav-link">
                        <i className="fas fa-fw fa-headset"></i>
                        <span>Chamados</span>
                    </Link>
                </li>
        
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li> */}
            </ul>

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>

                        <ul className="navbar-nav ml-auto">
                            <div className="topbar-divider d-none d-sm-block"></div>

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Olá { user.name }</span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link to="/profile" className="dropdown-item">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Perfil
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button type="button" className="dropdown-item" onClick={ logOut }>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Sair
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    
                    <div className="container-fluid">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;