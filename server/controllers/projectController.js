import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

const getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean();

  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }

  res.json(projects);
};

const createNewProject = async (req, res) => {

  const {
    title,
    description,
    technologies,
    category,
    githubUrl,
    liveUrl,
    featured,
    status,
  } = req.body;

  const image = req.file; // Access the uploaded file's path

  //check data
  if (
    !title ||
    !description ||
    !category ||
    !githubUrl ||
    !liveUrl ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //technologies check
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return res.status(400).json({
      message: "At least one technology is required",
    });
  }

  //check featured
  if (featured !== "true" && featured !== "false") {
    return res.status(400).json({
      message: "Featured must be true or false",
    });
  }

  if (status !== "draft" && status !== "published") {
    return res.status(400).json({
      message: "Status must be either 'draft' or 'published'",
    });
  }

  const isFeatured = featured === "true";

  //check image
  if (!image) {
    return res.status(400).json({ message: "Image project is required" });
  }

  const result = await cloudinary.uploader.upload(
    `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
    {
      folder: "portfolio-projects",
    },
  );

  const project = await Project.create({
    title,
    description,
    technologies,
    category,
    githubUrl,
    liveUrl,
    featured: isFeatured,
    status,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  if (project) {
    return res
      .status(201)
      .json({ message: `project ${title} has been uploaded` });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid project details provided" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    technologies,
    category,
    githubUrl,
    liveUrl,
    featured,
    status,
  } = req.body;

  const image = req.file; // uploaded file

  //check data
  if (
    !title ||
    !description ||
    !category ||
    !githubUrl ||
    !liveUrl ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //technologies check
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return res.status(400).json({
      message: "At least one technology is required",
    });
  }

  //check featured
  if (featured !== "true" && featured !== "false") {
    return res.status(400).json({ message: "Featured must be true or false" });
  }
  //check status
  if (status !== "draft" && status !== "published") {
    return res.status(400).json({
      message: "Status must be either 'draft' or 'published'",
    });
  }

  const isFeatured = featured === "true";

  //find the project by id
  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  //check for duplicate
  const duplicate = await Project.findOne({ title }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate project title" });
  }

  project.title = title;
  project.description = description;
  project.technologies = technologies;
  project.category = category;
  project.githubUrl = githubUrl;
  project.liveUrl = liveUrl;
  project.featured = isFeatured;
  project.status = status;

  // Only upload a new image if one was provided
  if (image) {
    const result = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
      {
        folder: "portfolio-projects",
      },
    );

    await cloudinary.uploader.destroy(project.image.publicId); // Delete the old image from Cloudinary

    project.image = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  //Save project
  const updatedProject = await project.save();

  res.json({
    message: `project with ${updatedProject.title} has been updated`,
  });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  //destroy image from cloudinary
  await cloudinary.uploader.destroy(project.image.publicId);

  //delete project
  await project.deleteOne();

  res.json({
    message: `Project with ${project.title} and ID ${project._id} has been deleted`,
  });
};

export { getAllProjects, createNewProject, updateProject, deleteProject };
