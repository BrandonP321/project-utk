import { faUser } from "@fortawesome/pro-solid-svg-icons";
import SidebarLink from "../../components/SidebarLink/SidebarLink";
import { RouteHelper } from "../../utils/RouteHelper";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const vendorDashboardPages: (SidebarLink.Props & {
  hideFromNav?: boolean;
})[] = [
  {
    label: "Dashboard",
    href: RouteHelper.VendorDashboard(),
    icon: faUser,
  },
  {
    label: "Account",
    href: RouteHelper.VendorAccount(),
    icon: faUser,
  },
  {
    label: "Create Listing",
    href: RouteHelper.CreateListing(),
    icon: faUser,
    hideFromNav: true,
  },
];

export const useVendorDashboardPage = () => {
  const location = useLocation();

  const pageData = useMemo(() => {
    return vendorDashboardPages.find((page) => page.href === location.pathname);
  }, [location.pathname]);

  return pageData;
};
