import styles from "./ListingEditorMedia.module.scss";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import ListingMediaDropzone from "./componets/ListingMediaDropzone/ListingMediaDropzone";
import Grid from "../../../components/Grid/Grid";
import GridItem from "../../../components/GridItem/GridItem";
import AspectRatioImage from "../../../components/AspectRatioImage/AspectRatioImage";
import ListingImageEditorModal from "./componets/ListingImageEditorModal/ListingImageEditorModal";
import {
  ImageAsset,
  ListingMediaEditorProvider,
  useListingMediaEditor,
} from "../../../hooks/vendorDashboard/useListingMediaEditor";
import FormActions from "../../../components/FormActions/FormActions";
import Button from "../../../components/Button/Button";
import { ImageCompressionUtils } from "../../../utils/ImageCompressionUtils";
import { ImageCropUtils } from "../../../utils/ImageCropUtils";

namespace ListingEditorMedia {
  export type Props = {};
}

function ListingEditorMediaContent(props: ListingEditorMedia.Props) {
  const { images, addImages, selectedImgRef, setSelectedImageIndex } =
    useListingMediaEditor();

  const handleThumbnailClick = (index: number) => {
    selectedImgRef.current = images[index];
    setSelectedImageIndex(index);
  };

  const saveImages = async () => {
    const compressionErrors: ImageAsset[] = [];

    type CompressedImage = ImageAsset & { compressedImg: Blob };

    const compressedImages = await Promise.all(
      images.map(async (image): Promise<CompressedImage | undefined> => {
        try {
          const { croppedImgUrl } = image;

          // Get File instance from the cropped image URL
          const response = await fetch(croppedImgUrl!);

          if (!response.ok) {
            compressionErrors.push(image);
            return;
          }

          const blob = await response.blob();

          const compressedImg =
            await ImageCompressionUtils.compressListingImage(blob as File);

          return {
            ...image,
            compressedImg,
          };
        } catch (e) {
          compressionErrors.push(image);
          return;
        }
      }),
    );

    if (compressionErrors.length) {
      console.error("Error compressing images", compressionErrors);
      return;
    }

    await Promise.all(
      compressedImages
        .filter((img): img is CompressedImage => !!img)
        .map(async (image) => {
          const {
            compressedImg,
            originalFile,
            crop = ImageCropUtils.fullSizeCrop,
          } = image;

          // Upload to server
        }),
    );
  };

  return (
    <SpaceBetween vertical stretchChildren>
      <ListingMediaDropzone onDrop={addImages} />
      <Grid gapSize="m">
        {images.map((image, i) => (
          <GridItem key={image.originalFile.name} span={3}>
            <AspectRatioImage
              img={URL.createObjectURL(image.originalFile)}
              onClick={() => handleThumbnailClick(i)}
              classes={{ root: styles.imageThumbnail, img: styles.img }}
            />
          </GridItem>
        ))}
      </Grid>
      <FormActions noSpacer>
        <Button onClick={saveImages}>Save</Button>
      </FormActions>
      <ListingImageEditorModal />
    </SpaceBetween>
  );
}

export default function ListingEditorMedia(props: ListingEditorMedia.Props) {
  return (
    <ListingMediaEditorProvider>
      <ListingEditorMediaContent {...props} />
    </ListingMediaEditorProvider>
  );
}
