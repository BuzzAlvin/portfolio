import Project from "../models/Project.js";

const getPublicProject = async (req, res) => {
    console.log("ALL PROJECTS:", allProjects);

  const projects = await Project.find({ status: "published" })
    .sort({ featured: -1, updatedAt: -1 })
    .lean();

  console.log("PUBLISHED PROJECTS:", projects);
  res.json(projects);
};

export { getPublicProject };
