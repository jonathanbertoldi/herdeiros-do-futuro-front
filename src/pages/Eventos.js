import React, { Component } from 'react';

import { Button, Table } from 'react-bootstrap';

class Eventos extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <Button bsStyle="success">Criar Evento</Button>
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
            </div>
        )
    }
}

export default Eventos;