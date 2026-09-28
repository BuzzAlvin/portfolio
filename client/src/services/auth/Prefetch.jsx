import { useEffect } from "react";
import { store } from "../../app/store";
import { projectApi } from "../projectApi";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    const projects = store.dispatch(projectApi.endpoints.getProjects.initiate());

    return () => {
      projects.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
