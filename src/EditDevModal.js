import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditDevModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('https://localhost:44354/api/Devices/' + this.props.devid, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceId:event.target.DeviceId.value,
                name: event.target.Name.value,
                status: event.target.Status.value,
                description: event.target.Description.value,
                locationId: event.target.LocationId.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Edit Success');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Device
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={10}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DeviceId">
                                        <Form.Label>DeviceId</Form.Label>
                                        <Form.Control type="text" name="DeviceId" required
                                            disabled
                                            defaultValue={this.props.devid}
                                            placeholder="DeviceId" />
                                    </Form.Group>

                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            defaultValue={this.props.devname}
                                            placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control type="text" name="Status" required
                                            defaultValue={this.props.devstatus}
                                            placeholder="Status" />
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="Description" required
                                            defaultValue={this.props.devdescription}
                                            placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group controlId="LocationId">
                                        <Form.Label>LocationId</Form.Label>
                                        <Form.Control type="text" name="LocationId" required
                                            defaultValue={this.props.devlocationid}
                                            placeholder="LocationId" />
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Device
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}