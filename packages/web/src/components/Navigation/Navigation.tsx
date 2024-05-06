import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";
import VendorAuthentication from "../../pages/VendorAuthentication/VendorAuthentication";
import VendorAccount from "../../pages/VendorAccount/VendorAccount";
import VendorDashboard from "../../pages/VendorDashboard/VendorDashboard";
import VerifyVendorEmail from "../../pages/VerifyVendorEmail/VerifyVendorEmail";
import RequestVendorPasswordReset from "../../pages/RequestVendorPasswordReset/RequestVendorPasswordReset";
import ResetVendorPassword from "../../pages/ResetVendorPassword/ResetVendorPassword";

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
          <Route
            path={RouteHelper.RequestVendorPasswordReset()}
            element={<RequestVendorPasswordReset />}
          />
          <Route
            path={RouteHelper.ResetVendorPassword()}
            element={<ResetVendorPassword />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
