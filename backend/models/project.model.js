const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    issues: [
      {
        type: new Schema(
          {
            name: {
              type: String,
            },
            description: {
              type: String,
            },
            status: {
              type: String,
            },
            workload: {
              type: String,
            },
            updates: [
              {
                type: new Schema(
                  {
                    description: { type: String, required: true },
                  },
                  { timestamps: true }
                ),
              },
            ],
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
