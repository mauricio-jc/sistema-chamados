import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Url } from "../../enviroments/Url";
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";

function CustomersIndex() {
    const { showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        listAll();
    }, []);

    function listAll() {
        modalLoadingShow();

        axios.get(Url('/customers/list.php'))
        .then(response => {
            modalLoadingClose();
            setCustomers(response.data.customers);
        })
        .catch(error => {
            modalLoadingClose();
            alert('Ocorreu um erro ao buscar os dados: ' + error);
        });
    }

    function handleDelete(id) {
        let action = window.confirm('Deseja excluir este cliente?');
        
        if(action == true) {
            modalLoadingShow();

            axios.get(Url('/customers/delete.php'), {
                params: {
                    id: id
                }
            })
            .then(response => {
                modalLoadingClose();
                alert(response.data.message);
                listAll();
            })
            .catch(error => {
                modalLoadingClose();
                alert('Ocorreu um erro na sua requisição: ' + error);
            });
        }
    }

    return(
        <Layout>
            <h1>Clientes</h1>
            <Link to="/customers/add" className="btn btn-success">Novo cliente</Link>
            <hr/>

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((item) => {
                            return(
                                <tr key={ item.id }>
                                    <td>{ item.name }</td>
                                    <td>{ item.cpf_cnpj }</td>
                                    <td>{ item.address }</td>
                                    <td>
                                        <Link to={'/customers/edit/' + item.id} className="btn btn-primary mr-2">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button type="button" className="btn btn-danger" onClick={ () => handleDelete(item.id) }>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text="Carregando..."/>
        </Layout>
    );
}

export default CustomersIndex;