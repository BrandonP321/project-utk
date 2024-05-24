import { useEffect } from "react";
import { useLoading } from "../../components/LoadingContainer/useLoading";
import { useListing } from "../../features/listing/useListing";

export const useListingMedia = () => {
  const { media } = useListing();
  const { stopLoading } = useLoading();

  useEffect(() => {
    stopLoading();
  }, []);

  return {
    media: [],
    isLoading: false,
  };
};
