import { faUser } from "@fortawesome/pro-solid-svg-icons";
import SidebarLink from "../../components/SidebarLink/SidebarLink";
import { RouteHelper } from "../../utils/RouteHelper";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const listingEditorPages: SidebarLink.Props[] = [
  {
    label: "Basic Info",
    href: RouteHelper.ListingEditorBasicInfo(),
    icon: faUser,
  },
  {
    label: "Pricing",
    href: RouteHelper.ListingEditorPricing(),
    icon: faUser,
  },
  {
    label: "Media",
    href: RouteHelper.ListingEditorMedia(),
    icon: faUser,
  },
];

export const useListingEditorPage = () => {
  const location = useLocation();

  const pageData = useMemo(() => {
    return listingEditorPages.find((page) => page.href === location.pathname);
  }, [location.pathname]);

  return pageData;
};
