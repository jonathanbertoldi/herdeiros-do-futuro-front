import React, { Component } from 'react';

import { Button, Table, Modal } from 'react-bootstrap';

import { API_URL, DATE_REGEXP } from '../consts';

class Eventos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            dataError: false,
            tituloError: false,
            values: {
                eventos: []
            }
        }
    }

    componentWillMount() {
        this.pegarEventos();
    }

    open() {
        this.setState({ modalState: true })
    }

    close() {
        this.setState({ tituloError: false, dataError: false, modalState: false })
    }

    pegarEventos = () => 
        fetch(API_URL.concat('eventos'))
            .then(response => response.json())
            .then(json => this.setState({ values: json }));

    enviarEvento() {
        this.setState({ tituloError: false, dataError: false });

        const tituloValido = this.refs.txtTitulo.value.length > 4;
        const dataValida = DATE_REGEXP.test(this.refs.txtData.value); 

        if (!tituloValido) {
            this.setState({ tituloError: true });
        }
        if (!dataValida) {
            this.setState({ dataError: true });
        }

        if (tituloValido && dataValida) {
            this.setState({ tituloError: false, dataError: false });

            const body = {
                titulo: this.refs.txtTitulo.value,
                data: this.refs.txtData.value
            }
            
            const config = {
                method: 'POST',
                body: JSON.stringify(body),
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            console.log(body);

            fetch(API_URL.concat('eventos'), config)
                .then(json => this.pegarEventos());

            this.close();
        }
    }

    removerEvento(id) {
        const config = {
            method: 'DELETE',
            mode: 'cors'
        }

        fetch(API_URL.concat('eventos/' + id), config)
            .then(response => this.pegarEventos());
    }

    renderTableRows() {
        return this.state.values.eventos.map((content, index) => (
            <tr key={ index }>
                <td>{ content.id }</td>
                <td>{ content.titulo }</td>
                <td>{ content.data }</td>
                <td>
                    <Button onClick={ () => this.removerEvento(content.id) } bsStyle="danger" bsSize="xsmall">Excluir</Button>
                </td>
            </tr>
        ))
    }
    
    render() {
        return (
            <div>
                <p>
                    <Button bsStyle="success" onClick={ this.open.bind(this) }>Criar Evento</Button>
                </p>
                
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableRows() }
                    </tbody>
                </Table>

                <Modal show={ this.state.modalState } onHide={ this.close.bind(this) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Novo Evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.tituloError && <div className="alert alert-danger">
                            <b>Atenção</b>, insira um título válido!
                        </div>}
                        {this.state.dataError && <div className="alert alert-danger">
                            <b>Atenção</b>, insira uma data válida!
                        </div>}
                        <div>
                            <div className="form-group">
                                <label className="control-label">Título</label>
                                <input className="form-control" ref="txtTitulo" type="text" placeholder="ex. Noite do Bingo"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Data</label>
                                <input className="form-control" ref="txtData" type="text" placeholder="ex. 20/12/2017"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={ this.enviarEvento.bind(this) }>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Eventos;