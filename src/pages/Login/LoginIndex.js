import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";
import { Url } from "../../enviroments/Url";

function LoginIndex() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const headers = { 'Content-Type': 'application/json' }
    let navigate = useNavigate();

    function validateFields() {
        if(email == '') {
            alert('Preencha o campo e-mail.');
            return false;
        }

        if(password == '') {
            alert('Preencha o campo senha.');
            return false;
        }

        return true;
    }

    function handleLogin() {
        if(!validateFields()) {
            return;
        }

        modalLoadingShow();
        let data = {
            email: email,
            password: password
        };

        axios.post(Url('/users/login.php'), JSON.stringify(data), headers)
        .then(response => {
            modalLoadingClose();
            
            if(response.data.success) {
                localStorage.setItem('UserLogged', JSON.stringify(response.data.user));
                setUser(response.data.user);
                navigate('/');
            }
            else {
                alert(response.data.message);
            }
        })
        .catch(error => {
            modalLoadingClose();
            alert('Ocorreu um erro na sua requisição: ' + error);
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
                                            <h1 className="h4 text-gray-900 mb-4">Acessar!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" id="email" className="form-control form-control-user" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" id="password" className="form-control form-control-user" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                                            </div>
                                            <button type="button" className="btn btn-primary btn-user btn-block" onClick={ handleLogin }>Login</button>
                                        </form>
                                        
                                        <hr/>

                                        <div className="text-center">
                                            <Link to="/forgot-password" className="small">Recuperar senha?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link to="/register" className="small">Criar conta!</Link>
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
    );
}

export default LoginIndex;