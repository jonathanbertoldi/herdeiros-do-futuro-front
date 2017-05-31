import React, { Component } from 'react';

import { Button, Table, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Eventos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            eventos: []
        }
    }

    pegarEventos = () => 
        fetch("http://hdf-api.herokuapp.com/api/eventos")
            .then(response => response.json())
            .then(json => this.setState({ eventos: json }));

    componentWillMount() {
        this.pegarEventos();
    }

    open() {
        this.setState({ modalState: true })
    }

    close() {
        this.setState({ modalState: false })
    }

    enviarEvento() {
        this.close();
        console.log(this.refs.txtTitulo);
    }

    renderTableRows() {
        return this.state.eventos.map((content, index) => (
            <tr key={ index }>
                <td>{ content.id }</td>
                <td>{ content.titulo }</td>
                <td>{ content.data }</td>
                <td>
                    <Button bsStyle="warning" bsSize="xsmall">Editar</Button>
                    <Button bsStyle="danger" bsSize="xsmall">Excluir</Button>
                </td>
            </tr>
        ))
    }
    
    render() {
        return (
            <div>
                <Button bsStyle="success" onClick={ this.open.bind(this) }>Criar Evento</Button>
                <hr />
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
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
                        <div>
                            <FormGroup>
                                <ControlLabel>Título</ControlLabel>
                                <FormControl inputRef={ref => this.ref = ref} ref="txtTitulo" type="text" placeholder="Digite o título do evento" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Data</ControlLabel>
                                <FormControl ref="txtData" type="text" placeholder="Digite a data do evento" />
                            </FormGroup>
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