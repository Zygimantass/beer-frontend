import React from 'react';
import { InputGroup, Form, Col, Button, Spinner } from 'react-bootstrap';
import './CoordinateInput.css';

class CoordinateInput extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           longitude: 0,
           latitude: 0,
       };
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.props.onSubmit(this.state.latitude, this.state.longitude);
        event.preventDefault();
    }

    render() {
        return (
            <div className="coordinate-input">
                <h2>Enter your starting coordinates:</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Latitude</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="latitude"
                                    onChange={this.handleInputChange}
                                    placeholder="51.355468"
                                    aria-label="Latitude"
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Longitude</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="longitude"
                                    onChange={this.handleInputChange}
                                    placeholder="11.100790"
                                    aria-label="Longitude"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" type="submit">
                                {this.props.loading &&
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                }
                                Let's go!
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default CoordinateInput;