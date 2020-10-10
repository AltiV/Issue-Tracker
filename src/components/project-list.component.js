import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";

const Project = (props) => (
  <tr>
    <td>
      <Link to={"/projects/" + props.project._id}>{props.project.name}</Link>
    </td>
    <td>
      <a href={props.project.url} target="blank">
        {props.project.url}
      </a>
    </td>
    <td>{props.project.description}</td>
    <td>
      <Link to={"/projects/" + props.project._id + "/update"}>
        <button type="button" className="btn btn-info">
          Edit
        </button>
      </Link>{" "}
      <DeletionModal
        project={props.project}
        deleteProject={props.deleteProject}
      />
    </td>
  </tr>
);

const DeletionModal = (props) => {
  // Initialize show and setShow variables to a state of false
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const confirmDelete = () => {
    props.deleteProject(props.project._id);
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {props.project.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default class ProjectList extends Component {
  constructor() {
    super();

    this.deleteProject = this.deleteProject.bind(this);

    this.state = { projects: [] };
  }

  componentDidMount() {
    axios
      .get("/api/projects")
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProject(id) {
    axios
      .delete("/api/projects/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      projects: this.state.projects.filter((el) => el._id !== id),
    });
  }

  projectList() {
    return this.state.projects.map((currentProject) => {
      return (
        <Project
          project={currentProject}
          deleteProject={this.deleteProject}
          key={currentProject._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {/* Yes, putting the header after the button that floats right puts them on the same line...*/}
        <Link to="/projects/add">
          <Button variant="primary float-right">Add New Project</Button>
        </Link>

        <h3>Project List</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Url</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.projectList()}</tbody>
        </table>
      </div>
    );
  }
}
