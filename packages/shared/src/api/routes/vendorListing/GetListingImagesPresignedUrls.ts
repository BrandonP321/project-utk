import { getErrorsMap } from "../routeErrors";

export namespace GetListingImagesPresignedUrls {
  export type SignedUrl = {
    url: string;
    objectKey: string;
  };

  export const Path = "/vendor-listing/media/get-presigned-urls";

  export type ReqBody = {
    imageNames: string[];
  };

  export type ResBody = {
    signedUrls: SignedUrl[];
  };

  export const Errors = getErrorsMap([]);
}
