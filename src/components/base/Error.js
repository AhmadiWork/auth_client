import React from 'react';
import {Jumbotron, Container} from 'reactstrap';

class Error extends React.Component {
    render() {
        return (
            <Jumbotron style={{textAlign: 'center'}}>
                <Container fluid>
                    <h1 className="display-3">{this.props.code}</h1>
                    <p className="lead">{this.props.description}</p>
                </Container>
            </Jumbotron>
        );
    }
}

export default Error;