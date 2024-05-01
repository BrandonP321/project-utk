import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import { useSearchParams } from "react-router-dom";

/**
 * Hook to get URLSearchParams as an object
 */
export const useURLSearchParams = <T extends string>() => {
  const [searchParams] = useSearchParams();

  return URLUtils.searchParamsToObject<T>(searchParams);
};
