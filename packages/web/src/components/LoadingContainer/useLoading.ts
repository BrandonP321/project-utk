import { useContext } from "react";
import { LoadingContainerContext } from "./LoadingContainerProvider";

export const useLoading = () => {
  const { loading, setLoading } = useContext(LoadingContainerContext);

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  return {
    loading: loading,
    setLoading: setLoading,
    startLoading,
    stopLoading,
  };
};
