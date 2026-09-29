import Project from "../models/Project.js";

const getPublicProject = async (req, res) => {
  const projects = await Project.find({ status: "published" })
    .sort({ featured: -1, updatedAt: -1 })
    .lean();

  res.json(projects);
};

export { getPublicProject };
