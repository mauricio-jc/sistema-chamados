import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from "../../components/Layout";
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";
import { Url } from "../../enviroments/Url";

function CustomersAdd() {
    const { showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const [name, setName] = useState('');
    const [cpfCnpj, setcpfCnpj] = useState('');
    const [address, setAddress] = useState('');
    const headers = { 'Content-Type': 'application/json' };
    let navigate = useNavigate();

    function validateFields() {
        if(name == '') {
            alert('Preencha o campo nome.');
            return false;
        }

        if(cpfCnpj == '') {
            alert('Preencha o campo cpf/cnpj.');
            return false;
        }

        if(address == '') {
            alert('Preencha o campo endereço.');
            return false;
        }

        return true;
    }

    function handleSaveCustomer() {
        if(!validateFields()) {
            return;
        }

        modalLoadingShow();
        let data = {
            name: name,
            cpfCnpj: cpfCnpj,
            address: address
        };

        axios.post(Url('/customers/add.php'), JSON.stringify(data), headers)
        .then(response => {
            modalLoadingClose();
            
            if(response.data.success) {
                alert(response.data.message);
                navigate('/customers');
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
            <h1>Novo cliente</h1>
            <Link to="/customers" className="btn btn-success">Voltar</Link>
            <hr/>

            <form className="row">
                <div className="form-group col-md-8">
                    <label>Nome: *</label>
                    <input type="text" name="name" className="form-control" value={ name } onChange={ (e) => setName(e.target.value) }/>
                </div>

                <div className="form-group col-md-4">
                    <label>CPF/CNPJ: *</label>
                    <input type="text" name="cpf_cnpj" className="form-control" value={ cpfCnpj } onChange={ (e) => setcpfCnpj(e.target.value) }/>
                </div>

                <div className="form-group col-md-12">
                    <label>Endereço: *</label>
                    <input type="text" name="address" className="form-control" value={ address } onChange={ (e) => setAddress(e.target.value) }/>
                </div>

                <div className="form-group col-md-12">
                    <button type="button" className="btn btn-primary" onClick={ handleSaveCustomer }>Salvar</button>
                </div>
            </form>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text="Cadastrando..."/>
        </Layout>
    );
}

export default CustomersAdd;