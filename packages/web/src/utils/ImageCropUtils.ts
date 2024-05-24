import { Crop, centerCrop, makeAspectCrop } from "react-image-crop";

export class ImageCropUtils {
  static getCroppedImageBlob(
    image: HTMLImageElement,
    crop: Crop,
    cb: (params: { blob: Blob; imgUrl: string }) => void,
  ) {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    // Calculate the crop dimensions in pixels
    const cropX = (crop.x / 100) * naturalWidth;
    const cropY = (crop.y / 100) * naturalHeight;
    const cropWidth = (crop.width / 100) * naturalWidth;
    const cropHeight = (crop.height / 100) * naturalHeight;

    // Set canvas size to the crop dimensions
    const canvas = document.createElement("canvas");
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw the cropped image on the canvas
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      canvas.toBlob((blob) => {
        cb({ blob: blob!, imgUrl: URL.createObjectURL(blob!) });
      }, "image/jpeg");
    }
  }

  static centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          height: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  static getCenter169Crop(img: HTMLImageElement) {
    return ImageCropUtils.centerAspectCrop(img.width, img.height, 16 / 9);
  }

  static fullSizeCrop: Crop = {
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  // Round all crop values to the nearest hundredth
  static getRoundedCrop(crop: Crop): Crop {
    function round(value: number) {
      return Math.round(value * 100) / 100;
    }

    return {
      ...crop,
      x: round(crop.x),
      y: round(crop.y),
      width: round(crop.width),
      height: round(crop.height),
    };
  }
}
