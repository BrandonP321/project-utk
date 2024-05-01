import { createContext, useState } from "react";

type TCustomFormikContext = {
  isFormDisabled: boolean;
  setIsFormDisabled: (value: boolean) => void;
};

export const customFormikContext = createContext({} as TCustomFormikContext);

namespace CustomFormikProvider {
  export type Props = {
    children: React.ReactNode;
  };
}

function CustomFormikProvider(props: CustomFormikProvider.Props) {
  const { children } = props;

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  return (
    <customFormikContext.Provider value={{ isFormDisabled, setIsFormDisabled }}>
      {children}
    </customFormikContext.Provider>
  );
}

export default CustomFormikProvider;
