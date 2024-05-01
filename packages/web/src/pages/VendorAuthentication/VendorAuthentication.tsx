import { useState } from "react";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { RouteHelper, SearchParamKeys } from "../../utils/RouteHelper";
import LoginVendorForm from "./components/LoginVendorForm";
import RegisterVendorForm from "./components/RegisterVendorForm";

namespace VendorAuthentication {
  export type Props = {
    isLoginPage?: boolean;
  };
}

function VendorAuthentication({ isLoginPage }: VendorAuthentication.Props) {
  const [showLoginForm, setShowLoginForm] = useState(!!isLoginPage);

  const { redirectTo } = useURLSearchParams<SearchParamKeys.RedirectTo>();

  const onAuthSuccess = () => {
    window.location.href = redirectTo ?? RouteHelper.Home();
  };

  const toggleForm = () => setShowLoginForm(!showLoginForm);

  return (
    <div>
      {showLoginForm ? (
        <LoginVendorForm
          onAuthSuccess={onAuthSuccess}
          toggleForm={toggleForm}
        />
      ) : (
        <RegisterVendorForm
          onAuthSuccess={onAuthSuccess}
          toggleForm={toggleForm}
        />
      )}
    </div>
  );
}

export default VendorAuthentication;
