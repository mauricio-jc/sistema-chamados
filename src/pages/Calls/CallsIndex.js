import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Url } from "../../enviroments/Url";
import { UserContext } from "../../contexts/UserProvider";
import ModalLoading from "../../components/ModalLoading";

function CallsIndex() {
    const { showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        listAll();
    }, []);

    function listAll() {
        modalLoadingShow();

        axios.get(Url('/calls/list.php'))
        .then(response => {
            modalLoadingClose();
            setCalls(response.data.calls);
        })
        .catch(error => {
            modalLoadingClose();
            alert('Ocorreu um erro ao buscar os dados: ' + error);
        });
    }

    function handleDelete(id) {
        let action = window.confirm('Deseja excluir este chamado?');
        
        if(action == true) {
            modalLoadingShow();

            axios.get(Url('/calls/delete.php'), {
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

    function ShowSpan(props) {
        if(props.status == 'Em aberto') {
            return <span className="badge badge-warning">{ props.status }</span>;
        }
        if(props.status == 'Em progesso') {
            return <span className="badge badge-primary">{ props.status }</span>;
        }
        if(props.status == 'Fechado') {
            return <span className="badge badge-success">{ props.status }</span>;
        }
    }

    return(
        <Layout>
            <h1>Chamados</h1>
            <Link to="/calls/add" className="btn btn-success">Novo chamado</Link>
            <hr/>

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th>Cliente</th>
                        <th>Assunto</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Cadastrado em</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        calls.map((item) => {
                            return(
                                <tr key={ item.id }>
                                    <td className="text-center">{ item.id }</td>
                                    <td>{ item.customer_name }</td>
                                    <td>{ item.subject }</td>
                                    <td className="text-center">
                                        <ShowSpan status={ item.status }/>
                                    </td>
                                    <td className="text-center">{ item.created_at }</td>
                                    <td className="text-center">
                                        <button type="button" className="btn btn-info mr-2" data-toggle="modal" data-target={'#modal-' + item.id}>
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <div className="modal fade" id={'modal-' + item.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Chamado: { item.id } - Cliente: { item.customer_name }</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body text-left">
                                                        <p>ID: { item.id }</p>
                                                        <p>Cliente: { item.customer_name }</p>
                                                        <p>Assunto: { item.subject }</p>
                                                        <p>Status: <ShowSpan status={ item.status }/></p>
                                                        <p>Complemento: { item.complement }</p>
                                                        <p>Cadastrado por: { item.user_name }</p>
                                                        <p>Cadastrado em: { item.created_at }</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Fechar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Link to={'/calls/edit/' + item.id} className="btn btn-primary mr-2">
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

export default CallsIndex;