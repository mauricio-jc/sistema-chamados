import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";
import { Url } from "../../enviroments/Url";

function ForgotPasswordIndex() {
    const [email, setEmail] = useState('');
    const { showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const headers = { 'Content-Type': 'application/json' }
    let navigate = useNavigate();

    function validateFields() {
        if(email == '') {
            alert('Preencha o campo e-mail.');
            return false;
        }

        return true;
    }

    function handleForgotPassword() {
        if(!validateFields()) {
            return;
        }

        axios.get(Url('/users/forgot-password.php?email=' + email))
        .then(response => {
            if(response.data.success) {
                alert(response.data.message + response.data.password);
            }
            else {
                alert(response.data.message);
            }
        })
        .catch(error => {
            alert('Erro de comunicação com o servidor: ' + error);
        });
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Recuperar senha!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" id="email" className="form-control form-control-user" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                                            </div>
                                            <button type="button" className="btn btn-primary btn-user btn-block" onClick={ handleForgotPassword }>Recuperar</button>
                                        </form>
                                        
                                        <hr/>

                                        <div className="text-center">
                                            <Link to="/login" className="small">Voltar para o login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text="Autenticando..."/>
        </div>
    )
}

export default ForgotPasswordIndex;