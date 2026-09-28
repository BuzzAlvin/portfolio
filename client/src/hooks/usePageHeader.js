import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const usePageHeader = ({
  title,
  description,
  actions,
  hideActionsOnMobile,
}) => {
  const { setPageInfo } = useOutletContext();

  useEffect(() => {
    setPageInfo({
      title,
      description,
      actions,
      hideActionsOnMobile,
    });
  }, [
    title,
    description,
    actions,
    hideActionsOnMobile,
    setPageInfo,
  ]);
};

export default usePageHeader;