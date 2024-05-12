import { createContext, useState } from "react";

type TCustomFormikContext = {
  isFormDisabled: boolean;
  setIsFormDisabled: (value: boolean) => void;
};

export const customFormikContext = createContext({} as TCustomFormikContext);

namespace CustomFormikProvider {
  export type Props = {
    children: React.ReactNode;
    /** Default value for `isFormDisabled` */
    isFormDisabledDefault?: boolean;
  };
}

function CustomFormikProvider(props: CustomFormikProvider.Props) {
  const { children, isFormDisabledDefault = false } = props;

  const [isFormDisabled, setIsFormDisabled] = useState(isFormDisabledDefault);

  return (
    <customFormikContext.Provider value={{ isFormDisabled, setIsFormDisabled }}>
      {children}
    </customFormikContext.Provider>
  );
}

export default CustomFormikProvider;
