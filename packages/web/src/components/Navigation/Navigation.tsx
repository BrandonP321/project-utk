import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";
import VendorAuthentication from "../../pages/VendorAuthentication/VendorAuthentication";
import VendorAccount from "../../pages/VendorAccount/VendorAccount";
import VendorDashboard from "../../pages/VendorDashboard/VendorDashboard";
import VerifyVendorEmail from "../../pages/VerifyVendorEmail/VerifyVendorEmail";

namespace Navigation {
  export type Props = {};
}

function Navigation(props: Navigation.Props) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={RouteHelper.Home()} element={<h1>Home</h1>} />
          <Route
            path={RouteHelper.VendorLogin()}
            element={<VendorAuthentication isLoginPage />}
          />
          <Route
            path={RouteHelper.VendorRegistration()}
            element={<VendorAuthentication />}
          />
          <Route
            path={RouteHelper.VendorAccount()}
            element={<VendorAccount />}
          />
          <Route
            path={RouteHelper.VendorDashboard()}
            element={<VendorDashboard />}
          />
          <Route
            path={RouteHelper.VerifyVendorEmail()}
            element={<VerifyVendorEmail />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
