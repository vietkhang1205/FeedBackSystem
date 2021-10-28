import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDevModal } from './AddDevModal';
import { EditDevModal } from './EditDevModal';

export class Device extends Component {

    constructor(props) {
        super(props);
        this.state = { devs: [], addModalShow: false, editModalShow: false }
    }

    Working(devstatus) {
        if (devstatus) {
            return <span class="badge bg-success">Hoạt động</span>;
        } else {
            return <span class="badge bg-danger">Hỏng</span>;
        }
           
      }
    refreshList() {
        fetch('https://localhost:44354/api/Devices')
            .then(response => response.json())
            .then(data => {
                this.setState({ devs: data });
            }
            );

    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(devid) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44354/api/Devices/'+ devid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    
    render() {
        const { devs, devid, devname,devstatus, devdescription,devlocationid } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Device Name</th>
                            <th>Device Status</th>
                            <th>Description</th>
                            <th>Location ID</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devs.map(dev =>
                            <tr key={dev.deviceId}>
                                <td>{dev.deviceId}</td>
                                <td>{dev.name}</td>
                                <td>
                                <this.Working devstatus={dev.status}/>
                                </td>
                                <td>{dev.description}</td>
                                <td>{dev.locationId}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                devid: dev.deviceId, devname: dev.name, devstatus :dev.status,devdescription : dev.description,devlocationid :dev.locationId
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteDep(dev.deviceId)}>
                                            Delete
                                        </Button>

                                        <EditDevModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            devid={devid}
                                            devname={devname}
                                            devstatus={devstatus}
                                            devdescription={devdescription}
                                            devlocationid={devlocationid}
                                             />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Device</Button>

                    <AddDevModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}