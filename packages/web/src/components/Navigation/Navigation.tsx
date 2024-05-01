import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";
import VendorAuthentication from "../../pages/VendorAuthentication/VendorAuthentication";

namespace Navigation {
  export type Props = {};
}

function Navigation(props: Navigation.Props) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={RouteHelper.Home()} element={<div>Home</div>} />
          <Route
            path={RouteHelper.VendorLogin()}
            element={<VendorAuthentication isLoginPage />}
          />
          <Route
            path={RouteHelper.VendorRegistration()}
            element={<VendorAuthentication />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
