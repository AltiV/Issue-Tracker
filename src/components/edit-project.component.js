import React, { Component } from "react";
import axios from "axios";

export default class EditProject extends Component {
  constructor() {
    super();

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      url: "",
      description: "",
    };
  }

  componentDidMount() {
    axios
      .get("/projects/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          url: response.data.url,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      name: this.state.name,
      url: this.state.url,
      description: this.state.description,
    };

    axios
      .post(
        "/projects/update/" + this.props.match.params.id,
        project
      )
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Project - {this.state.name}</h3>
        <form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input
            ref="userInput"
            required
            className="form-control"
            value={this.state.name}
            onChange={this.onChangeName}
          />

          <div className="form-group">
            <label>Project Url (if applicable): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
            />
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
