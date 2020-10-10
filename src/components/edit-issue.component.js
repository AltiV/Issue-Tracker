import React, { Component } from "react";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

export default class EditProject extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      status: "",
      workload: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "/projects/" +
          this.props.match.params.id +
          "/" +
          this.props.match.params.type
      )
      .then((response) => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          status: response.data.status,
          workload: response.data.workload,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const issue = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      workload: this.state.workload,
    };

    // Send a PATCH request to the database to update the issue
    axios
      .patch(
        "/projects/" +
          this.props.match.params.id +
          "/" +
          this.props.match.params.type +
          "/update",
        issue
      )
      .then((res) => {
        console.log(res.data);
        // Return to projects screen
        window.location =
          "/projects/" +
          this.props.match.params.id +
          "/" +
          this.props.match.params.type;
      });
  }

  render() {
    return this.state.name ? (
      <>
        <h3>Edit Issue - {this.state.name}</h3>
        <Form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input
            name="name"
            required
            className="form-control"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <div className="form-group">
            <label>Description: </label>
            <input
              name="description"
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>

          <Form.Group controlId="status">
            <Form.Label>Status: </Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="workload">
            <Form.Label>Workload: </Form.Label>
            <Form.Control
              as="select"
              name="workload"
              value={this.state.workload}
              onChange={this.handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Edit Issue
          </Button>
        </Form>
      </>
    ) : (
      <>Loading...</>
    );
  }
}
