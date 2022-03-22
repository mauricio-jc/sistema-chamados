import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ModalLoading from "../../components/ModalLoading";
import { UserContext } from "../../contexts/UserProvider";
import { Url } from "../../enviroments/Url";

function RegisterIndex() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const headers = { 'Content-Type': 'application/json' }
    let navigate = useNavigate();

    function validateFields() {
        if(name == '') {
            alert('Preencha o campo nome.');
            return false;
        }

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

    async function handleRegister() {
        if(!validateFields()) {
            return;
        }

        modalLoadingShow();
        let data = {
            name: name,
            email: email,
            password: password
        };
        
        axios.post(Url('/users/add.php'), JSON.stringify(data), headers)
        .then(response => {
            modalLoadingClose();

            if(response.data.success) {
                alert(response.data.message);
                navigate('/login');
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
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Criar conta!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group">
                                        <input type="text" id="name" className="form-control form-control-user" value={ name } onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" id="email" className="form-control form-control-user" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" className="form-control form-control-user" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
                                    </div>
                                    <button type="button" className="btn btn-primary btn-user btn-block" onClick={ handleRegister }>Cadastrar</button>
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <Link to="/login" className="small">Já possui uma conta? Login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text="Salvando. Por favor espere..."/>
        </div>
    );
}

export default RegisterIndex;