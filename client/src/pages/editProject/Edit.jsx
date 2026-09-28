import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { useGetProjectsQuery } from "../../services/projectApi";
import EditProject from "./EditProject";

const Edit = () => {
  const { id } = useParams();

  const { data: projects, isLoading,  isError, error } = useGetProjectsQuery();

  const project = projects?.find((p) => p._id === id);

  if (isLoading) return <ClipLoader />;

  if (!project) return <p>Project not found</p>;

    if (isError) return <p>{error?.data || error.status || error.message}</p>;

  return <EditProject project={project} />;
};

export default Edit;
