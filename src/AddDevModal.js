import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddDevModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44354/api/Devices',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DeviceId:event.target.DeviceId.value,
                Name:event.target.Name.value,
                Status:event.target.Status.value,
                Description:event.target.Description.value,
                LocationId:event.target.LocationId.value
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('Add device Success');
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
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
            Add Device
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="DeviceId">
                        <Form.Label>DeviceId</Form.Label>
                        <Form.Control type="text" name="DeviceId" required 
                        placeholder="DeviceId"/>
                    </Form.Group>
                    <Form.Group controlId="Name">
                        <Form.Label>DeviceName</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        placeholder="Name"/>
                    </Form.Group>
                    <Form.Group controlId="Status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" name="Status" required 
                        placeholder="Status"/>
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="Description" required 
                        placeholder="Description"/>
                    </Form.Group>
                    <Form.Group controlId="LocationId">
                        <Form.Label>LocationId</Form.Label>
                        <Form.Control type="text" name="LocationId" required 
                        placeholder="LocationId"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Device
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