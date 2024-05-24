import imageCompression, { Options } from "browser-image-compression";

export class ImageCompressionUtils {
  static compressListingImage = async (file: File) => {
    const options: Options = {
      maxSizeMB: 0.75,
      maxWidthOrHeight: 2560,
      alwaysKeepResolution: true,
      fileType: "image/jpeg",
    };

    return await imageCompression(file, options);
  };
}
