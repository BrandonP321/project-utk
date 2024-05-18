import { createContext, useState } from "react";

type TLoadingContainerContext = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const LoadingContainerContext = createContext(
  {} as TLoadingContainerContext,
);

namespace LoadingContainerProvider {
  export type Props = React.PropsWithChildren<{ loading?: boolean }>;
}

function LoadingContainerProvider({
  loading,
  children,
}: LoadingContainerProvider.Props) {
  const [loadingState, setLoadingState] = useState(loading ?? false);

  return (
    <LoadingContainerContext.Provider
      value={{ loading: loading ?? loadingState, setLoading: setLoadingState }}
    >
      {children}
    </LoadingContainerContext.Provider>
  );
}

export default LoadingContainerProvider;
