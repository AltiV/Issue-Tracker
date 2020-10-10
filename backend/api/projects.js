const router = require("express").Router();
let Project = require("../models/project.model");

/////////////////////
// PROJECT METHODS //
/////////////////////

// Get all projects
router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get project by id
router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then((Project) => res.json(Project))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create new project
router.route("/add").post((req, res) => {
  const projectData = {
    name: req.body.name,
    url: req.body.url,
    description: req.body.description,
    issues: [],
  };

  Project.create(projectData)
    .then((createdProject) =>
      res.json("Project added with id " + createdProject._id)
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update project
router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id).then((project) => {
    project.name = req.body.name;
    project.url = req.body.url;
    project.description = req.body.description;

    project
      .save()
      .then(() => res.json("Project updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

// Delete project
router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////////////
// ISSUE METHODS //
///////////////////

// Get issues in project
router.route("/:id/:type").get((req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project.issues.id(req.params.type)))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add issue to project
router.route("/:id/addissue").post((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (project != null) {
        const issueData = {
          name: req.body.name,
          description: req.body.description,
          status: req.body.status,
          workload: req.body.workload,
          updates: [],
        };

        project.issues.push(issueData);

        const updated = project
          .save()
          .then(() => console.log("Document updated: " + updated));
      } else {
        throw new Error("Project does not exist.");
      }
    })
    .then(() => res.json("Issue added to project ID " + req.params.id + "!"))
    .catch((err) => res.status(400).json("" + err));
});

// Update issue
router.route("/:id/:type/update").patch((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.issues.id(req.params.type).name = req.body.name;
      project.issues.id(req.params.type).description = req.body.description;
      project.issues.id(req.params.type).status = req.body.status;
      project.issues.id(req.params.type).workload = req.body.workload;

      project
        .save()
        .then(() => res.json("Issue updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete issue
router.route("/:id/:type/delete").delete((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.issues.pull(req.params.type);

      project
        .save()
        .then(() => res.json("Issue deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

////////////////////
// UPDATE METHODS //
////////////////////

// Get update in issue
router.route("/:id/:type/:update").get((req, res) => {
  Project.findById(req.params.id)
    .then((project) =>
      res.json(project.issues.id(req.params.type).updates.id(req.params.update))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create update in issue
router.route("/:id/:type/addupdate").post((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (project.issues.id(req.params.type) != null) {
        const updateData = {
          description: req.body.description,
        };

        project.issues.id(req.params.type).updates.push(updateData);

        const updated = project
          .save()
          .then(() => console.log("Document updated: " + updated));
      } else {
        throw new Error("Project does not exist.");
      }
    })
    .then(() =>
      res.json(
        "Update added to issue " +
          req.params.type +
          " in project ID " +
          req.params.id +
          "!"
      )
    )
    .catch((err) => res.status(400).json("" + err));
});

// Update update
router.route("/:id/:type/:update/update").patch((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.issues
        .id(req.params.type)
        .updates.id(req.params.update).description = req.body.description;

      project
        .save()
        .then(() => res.json("Update updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete update
router.route("/:id/:type/:update/delete").delete((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.issues.id(req.params.type).updates.pull(req.params.update);

      project
        .save()
        .then(() => res.json("Update deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
