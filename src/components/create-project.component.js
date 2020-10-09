import React, { Component } from "react";
import axios from "axios";

export default class CreateProject extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      url: "",
      description: "",
    };
  }

  componentDidMount() {
    //
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

    const project = {
      name: this.state.name,
      url: this.state.url,
      description: this.state.description,
    };

    // Send a POST request to the database to save the project
    axios.post("http://localhost:5000/projects/add", project).then((res) => {
      console.log(res.data);
      // Return to projects screen
      window.location = "/";
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input
            type="text"
            required
            className="form-control"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <div className="form-group">
            <label>Project Url (if applicable): </label>
            <input
              type="text"
              className="form-control"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </div>

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
            <input
              type="submit"
              value="Create Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
