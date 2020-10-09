import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import individual components
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";

import ProjectList from "./components/project-list.component";
import CreateProject from "./components/create-project.component";
import EditProject from "./components/edit-project.component";
import ProjectDetails from "./components/project-details.component";

import CreateIssue from "./components/create-issue.component";
import EditIssue from "./components/edit-issue.component";
import IssueDetails from "./components/issue-details.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
        <Route path="/" exact component={ProjectList} />
        <Route path="/projects/add" component={CreateProject} />
        <Route path="/projects/:id" exact component={ProjectDetails} />
        <Route path="/projects/:id/update" component={EditProject} />
        <Route path="/projects/:id/addissue" component={CreateIssue} />
        <Route path="/projects/:id/:type" exact component={IssueDetails} />
        <Route path="/projects/:id/:type/update" component={EditIssue} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
