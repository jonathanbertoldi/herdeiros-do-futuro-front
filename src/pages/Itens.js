import React, { Component } from 'react';

import { Button, Table, Modal } from 'react-bootstrap';

import { API_URL, SERVER_URL } from '../consts';

class Itens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            imageModalState: false,
            imagem: '',
            nomeError: false,
            imagemError: false,
            values: {
                itens: []
            }
        }
    }

    pegarItens = () =>
        fetch(API_URL.concat('itens'))
            .then(response => response.json())
            .then(json => this.setState({ values: json }));

    componentWillMount() {
        this.pegarItens();
    }

    open() {
        this.setState({ modalState: true })
    }

    close() {
        this.setState({ modalState: false })
    }

    openImage(imageUrl) {
        this.setState({ imageModalState: true, imagem: SERVER_URL.concat(imageUrl) })
    }

    closeImage() {
        this.setState({ imageModalState: false, imagem: '' })
    }

    enviarItem() {
        this.uploadFoto();        
    }

    uploadFoto() {
        this.setState({ nomeError: false, imagemError: false });
        var imageData = this.refs.inputFoto.files[0];
        var nomeValido = this.refs.txtNome.value.length > 4;

        if (!imageData) {
            this.setState({ imagemError: true });
        } 
        if (!nomeValido){
            this.setState({ nomeError: true });
        }
        
        if (imageData && nomeValido) {
            var data = new FormData();
            data.append("file", imageData);

            const config = {
                mode: 'cors',
                method: 'POST',
                body: data
            }

            fetch(API_URL.concat('upload'), config)
                .then(response => response.text())
                .then(text => this.salvarItem(text));
        }
    }

    salvarItem(url) {
        const body = {
            nome: this.refs.txtNome.value,
            imagem: url
        }

        const config = {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(API_URL.concat('itens'), config)
            .then(json => this.pegarItens());

        this.close();
    }

    removerItem(id) {
        const config = {
            method: 'DELETE',
            mode: 'cors'
        }

        fetch(API_URL.concat('itens/' + id), config)
            .then(response => this.pegarItens());
    }
    
    renderTableRows() {
        return this.state.values.itens.map((content, index) => (
            <tr key={ index }>
                <td>{ content.id }</td>
                <td>{ content.nome }</td>
                <td>
                    <Button onClick={ () => this.openImage(content.imagem) } bsStyle="primary" bsSize="xsmall">Foto</Button>
                    <Button onClick={ () => this.removerItem(content.id) } bsStyle="danger" bsSize="xsmall">Excluir</Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <p>
                    <Button bsStyle="success" onClick={ this.open.bind(this) }>Registrar Item</Button>
                </p>
                
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableRows() }
                    </tbody>
                </Table>
                
                <Modal show={ this.state.modalState } onHide={ this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {this.state.nomeError && <div className="alert alert-danger">
                                <b>Atenção</b>, insira um nome válido!
                            </div>}
                            {this.state.imagemError && <div className="alert alert-danger">
                                <b>Atenção</b>, insira uma foto válida!
                            </div>}

                            <div className="form-group">
                                <label className="control-label">Nome</label>
                                <input className="form-control" ref="txtNome" type="text" placeholder="ex. Geladeira"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Foto</label>
                                <input ref="inputFoto" type="file"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={ this.enviarItem.bind(this) }>Enviar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={ this.state.imageModalState } onHide={ this.closeImage.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Foto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} src={ this.state.imagem } alt="imagem" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={ this.closeImage.bind(this) }>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Itens;