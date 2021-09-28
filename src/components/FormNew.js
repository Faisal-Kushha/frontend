import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class FormNew extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.showFlag} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.updateFruit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  defaultvalue={this.props.image}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>name</Form.Label>
                <Form.Control type="text" defaultvalue={this.props.name} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>price</Form.Label>
                <Form.Control type="text" defaultvalue={this.props.price} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.updateFruit}>
              update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FormNew;
