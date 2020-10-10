import React, { Component } from "react";
import axios from "axios";

export default class CreateIssue extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      workload: "Low",
      status: "Open",
    };
  }

  componentDidMount() {
    axios
      .get("/api/projects/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          projectName: response.data.name,
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
      workload: this.state.workload,
      status: this.state.status,
    };

    // Send a POST request to the database to save the project
    axios
      .post(
        "/api/projects/" +
          this.props.match.params.id +
          "/addissue",
        issue
      )
      .then((res) => {
        console.log(res.data);
        // Return to projects screen
        window.location = "/api/projects/" + this.props.match.params.id;
      });
  }

  render() {
    return (
      <div>
        <h3>Create New Issue for {this.state.projectName}</h3>
        <form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input
            required
            className="form-control"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Workload: </label>
            <select
              className="form-control"
              name="workload"
              value={this.state.workload}
              onChange={this.handleInputChange}
            >
              <option defaultValue value="Low">
                Low
              </option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Issue"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
