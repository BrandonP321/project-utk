import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import { S3Utils } from "../../utils";
import { Controller } from "../../utils/Controller";
import { GetListingImagesPresignedUrls } from "@project-utk/shared/src/api/routes/vendorListing/GetListingImagesPresignedUrls";

const controller = new Controller<
  GetListingImagesPresignedUrls.ReqBody,
  GetListingImagesPresignedUrls.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof GetListingImagesPresignedUrls.Errors
>(GetListingImagesPresignedUrls.Errors);

export const GetListingImagesPresignedUrlsController = controller.handler(
  async (req, res, errors) => {
    const { imageNames } = req.body;
    const { vendorId } = res.locals;

    const signedUrls = await Promise.all(
      imageNames.map(async (imageName) => {
        return await S3Utils.getPresignedUrlForAssetUpload({
          assetType: "image",
          entityId: vendorId,
          entityType: "vendorListing",
          fileName: imageName,
        });
      }),
    );

    return res.json({ signedUrls }).end();
  },
);
