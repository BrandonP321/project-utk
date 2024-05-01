export enum SearchParamKeys {
  RedirectTo = "redirectTo",
}

export class RouteHelper {
  static Home = createRoute("/");

  static VendorLogin = createRoute<
    undefined,
    typeof SearchParamKeys.RedirectTo
  >("/vendor/login");

  static VendorRegistration = createRoute<
    undefined,
    typeof SearchParamKeys.RedirectTo
  >("/vendor/register");
}

type RouteParams<T extends string | undefined> = T extends string
  ? Record<T, string>
  : undefined;

function createRoute<
  URLParams extends string | undefined,
  SearchParams extends string = ""
>(path: string) {
  return (params?: {
    urlParams?: RouteParams<URLParams>;
    searchParams?: Partial<RouteParams<SearchParams>>;
  }) => {
    let url = path;

    if (params?.urlParams) {
      for (const key in params.urlParams) {
        url = url.replace(`:${key}`, params.urlParams[key]);
      }
    }

    if (params?.searchParams) {
      const searchParams = new URLSearchParams();
      for (const key in params.searchParams) {
        searchParams.append(key, encodeURIComponent(params.searchParams[key]!));
      }
      url += `?${searchParams.toString()}`;
    }

    return url;
  };
}
