class UrlHelper {
  public url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }

  get pathWithQueryAndHash() {
    return `${this.url.pathname}${this.url.search}${this.url.hash}`;
  }

  get href() {
    return this.url.href;
  }

  setPath(path: string) {
    this.url.pathname = path;

    return this;
  }

  updateSearchParams(params: Record<string, string>) {
    Object.entries(params).forEach(([key, value]) => {
      this.url.searchParams.set(key, encodeURIComponent(value));
    });

    return this;
  }

  getSearchParam(key: string) {
    const value = this.url.searchParams.get(key);

    return value && decodeURIComponent(value);
  }
}

export class URLUtils {
  static url = (url = window.location.href) => new UrlHelper(url);

  static searchParamsToObject = <T extends string>(
    searchParams: URLSearchParams
  ) => {
    const obj: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      obj[key] = decodeURIComponent(value);
    });

    return obj as Record<T, string | null>;
  };

  static updatePath = (path: string) => {
    return this.url().setPath(path).href;
  }
}
