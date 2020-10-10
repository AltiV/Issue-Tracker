import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Table, Button } from "react-bootstrap";

export default class ProjectDetails extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      url: "",
      description: "",
      issues: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/projects/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          url: response.data.url,
          description: response.data.description,
          issues: response.data.issues,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return this.state.name ? (
      <>
        <Link to={"/"}>&lt; Return to Project List</Link>

        <h3>{this.state.name}</h3>
        <p>
          {" "}
          <a href={"//" + this.state.url} target="blank">
            {this.state.url}
          </a>
        </p>
        <p>{this.state.description}</p>

        <Link
          to={{
            pathname: "/api/projects/" + this.props.match.params.id + "/addissue",
            // query: { projectId: this.state._id, projectName: this.state.name },
          }}
        >
          <Button variant="primary float-right">Add New Issue</Button>
        </Link>

        <h3>Issues</h3>

        <Table bordered hover responsive size="sm">
          <thead className="thead-light">
            <tr>
              <th>Issue</th>
              <th>Status</th>
              <th>Workload</th>
            </tr>
          </thead>
          <tbody>
            {this.state.issues.map((issue) => {
              return (
                <tr key={issue._id}>
                  <td>
                    <Link
                      to={
                        "/api/projects/" +
                        this.props.match.params.id +
                        "/" +
                        issue._id
                      }
                    >
                      {issue.name}
                    </Link>
                  </td>
                  <td>{issue.status}</td>
                  <td>{issue.workload}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    ) : (
      <>Loading...</>
    );
  }
}
