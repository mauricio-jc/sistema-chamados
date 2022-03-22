import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../components/Layout";
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";
import { Url } from "../../enviroments/Url";

function CallsEdit() {
    const { id } = useParams();
    const { user, showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [idCall, setIdCall] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [subject, setSubject] = useState('Suporte');
    const [status, setStatus] = useState('aberto');
    const [complement, setComplement] = useState('');
    const [textModal, setTextModal] = useState('Carregando dados...');
    const headers = { 'Content-Type': 'application/json' };

    useEffect(() => {
        modalLoadingShow();
        loadCustomers();
    }, []);

    function loadCustomers() {
        axios.get(Url('/customers/list.php'))
        .then(response => {
            if(response.data.success) {
                setLoadingCustomers();
                setCustomers(response.data.customers);
                loadCall();
            }
            else {
                setLoadingCustomers();
                alert(response.data.message);
            }
        })
        .catch(error => {
            setLoadingCustomers();
            alert('Ocorreu um erro na sua requisição: ' + error);
        });
    }

    function loadCall() {
        axios.get(Url('/calls/get.php'), {
            params: {
                id: id
            }
        })
        .then(response => {
            modalLoadingClose();
            setFields(response.data.call);
        })
        .catch(error => {
            modalLoadingClose();
            alert('Problemas ao buscar os dados co cliente: ' + error);
        });
    }

    function setFields(fields) {
        setIdCall(fields.id);
        setCustomerId(fields.customer_id);
        setSubject(fields.subject);
        setStatus(fields.status);
        setComplement(fields.complement);
    }

    function validateFields() {
        if(customerId == 0) {
            alert('Selecione o cliente.');
            return false;
        }

        if(subject == '') {
            alert('Selecione o assunto.');
            return false;
        }

        if(status == '') {
            alert('Selecione o status.');
            return false;
        }

        return true;
    }

    function handleRegisterCall() {
        if(!validateFields()) {
            return;
        }

        setTextModal('Atualizando...');
        modalLoadingShow();
        let data = {
            id: idCall,
            customer_id: customerId,
            subject: subject,
            status: status,
            complement: complement,
            user_id: user.id
        };

        axios.post(Url('/calls/update.php'), JSON.stringify(data), headers)
        .then(response => {
            modalLoadingClose();
            
            if(response.data.success) {
                alert(response.data.message);
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
        <Layout>
            <h1>Novo chamado</h1>
            <Link to="/calls" className="btn btn-success">Voltar</Link>
            <hr/>

            <form className="row">
                <div className="form-group col-md-6">
                    <label>Cliente: *</label>
                    <select className="form-control" value={ customerId } onChange={ (e) => setCustomerId(e.target.value) }>
                        {
                            loadingCustomers ? 
                            <option key="0" value="0">Carregando clientes...</option>
                            :
                            customers.map(item => {
                                return <option key={ item.id } value={ item.id }>{ item.name }</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group col-md-6">
                    <label>Assunto: *</label>
                    <select className="form-control" name="subject" value={ subject } onChange={ (e) => { setSubject(e.target.value) } }>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita técnica">Visita técnica</option>
                        <option value="Financeiro">Financeiro</option>
                    </select>
                </div>

                <div className="form-group col-md-12">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            value="aberto"
                            onChange={ (e) => setStatus(e.target.value) }
                            checked={ status == 'aberto' }
                        />
                        <label className="form-check-label">Em aberto</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input"
                            type="radio"
                            name="status"
                            value="progresso"
                            onChange={ (e) => setStatus(e.target.value) }
                            checked={ status == 'progresso' }
                        />
                        <label className="form-check-label">Em progesso</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="status" 
                            value="fechado"
                            onChange={ (e) => setStatus(e.target.value) }
                            checked={ status == 'fechado' }
                        />
                        <label className="form-check-label">Fechado</label>
                    </div>
                </div>

                <div className="form-group col-md-12">
                    <label>Complemento: </label>
                    <textarea type="text" className="form-control" rows="10" cols="30" placeholder="Descreva o problema (Opcional)" value={ complement } onChange={ (e) => setComplement(e.target.value) }/>
                </div>

                <div className="form-group col-md-12">
                    <button type="button" className="btn btn-primary" onClick={ handleRegisterCall }>Atualizar</button>
                </div>
            </form>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text={ textModal }/>
        </Layout>
    );
}

export default CallsEdit;