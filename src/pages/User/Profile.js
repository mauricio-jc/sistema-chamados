import React, { useContext, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { UserContext } from "../../contexts/UserProvider";
import { Url } from "../../enviroments/Url";
import ModalLoading from "../../components/ModalLoading";
import Avatar from "../../images/avatar.png";
import './Profile.css';

function Profile() {
    const { user, setUser, showModalLoading, modalLoadingShow, modalLoadingClose } = useContext(UserContext);
    const [imageProfileUrl, setImageProfileUrl] = useState(user.image);
    const [imageProfileNew, setImageProfileNew] = useState(null);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const headers = { 'Content-Type': 'application/json' }
    
    function changeImageProfile(e) {
        if(e.target.files[0]) {
            let image = e.target.files[0];

            if(image.type == "image/jpeg" || image.type == "image/jpg" || image.type == "image/png") {
                setImageProfileNew(image);
                setImageProfileUrl(URL.createObjectURL(image));
            }
            else {
                alert("A imagem deve ser do tipo JPEG, JPG ou PNG.");
                setImageProfileNew(null);
                return null;
            }
        }
    }

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

    function update() {
        if(!validateFields()) {
            return;
        }

        modalLoadingShow();
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        if(imageProfileNew != null) {
            formData.append('image', imageProfileNew);
        }

        axios.post(Url('/users/update.php'), formData, headers)
        .then(response => {
            modalLoadingClose();
            if(response.data.success) {
                localStorage.setItem('UserLogged', JSON.stringify(response.data.user));
                setUser(response.data.user);
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
            <h1>Perfil</h1>
            <hr/>

            <div className="imgs">
                <div className="col-md-2 image-upload">
                    <label htmlFor="file-input-avatar" className="thumbnail">
                        <i id="icon" className="fas fa-camera fa-2x"></i>

                        {
                            (imageProfileUrl == null) ?
                            <img id="image-avatar" src={ Avatar } className="rounded" alt="Foto de perfil" width="250" height="250"/>
                            :
                            <img id="image-avatar" src={ imageProfileUrl } className="rounded" alt="Foto de perfil" width="250" height="250"/>
                        }

                        
                    </label>
                    <input type="file" name="image" id="file-input-avatar" className="form-control input-file" accept="image/*" onChange={ changeImageProfile }/>
                    <span id="remove-avatar" className="badge">X</span>
                </div>
            </div>
        
            <form>
                <div className="form-group col-md-4 row">
                    <label>Nome: *</label>
                    <input type="text" name="name" className="form-control" value={ name } onChange={ (e) => setName(e.target.value) }/>
                </div>

                <div className="form-group col-md-4 row">
                    <label>E-mail: *</label>
                    <input type="email" name="email" className="form-control" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
                </div>

                <div className="form-group col-md-4 row">
                    <label>Senha: *</label>
                    <input type="password" name="password" className="form-control" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
                </div>

                <div className="form-group col-md-12 row">
                    <button type="button" className="btn btn-primary" onClick={ update }>Atualizar</button>
                </div>
            </form>

            <ModalLoading show={ showModalLoading } handleClose={ modalLoadingClose } text="Atualizando..."/>
        </Layout>
    )
}

export default Profile;