import { useEffect, useRef, useState } from "react";
import styles from "./ListingImageEditorModal.module.scss";
import ReactCrop, { Crop } from "react-image-crop";
import Modal from "../../../../../components/Modal/Modal";
import { useModal } from "../../../../../components/Modal/useModal";
import Button from "../../../../../components/Button/Button";
import FormActions from "../../../../../components/FormActions/FormActions";
import { ImageCropUtils } from "../../../../../utils/ImageCropUtils";
import { useListingMediaEditor } from "../../../../../hooks/vendorDashboard/useListingMediaEditor";
import "react-image-crop/dist/ReactCrop.css";

namespace ListingImageEditorModal {
  export type Props = {};
}

function ListingImageEditorModal(props: ListingImageEditorModal.Props) {
  const { modalProps, showModal, hideModal } = useModal();
  const {
    selectedImgRef,
    selectedImageIndex,
    selectedImgSrc: src,
    updateImage,
    setSelectedImageIndex,
  } = useListingMediaEditor();

  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const htmlImgRef = useRef<HTMLImageElement | null>(null);

  const reset = () => {
    setCrop(selectedImgRef.current?.crop ?? ImageCropUtils.fullSizeCrop);
    setCompletedCrop(null);
  };

  useEffect(() => {
    if (selectedImageIndex === null) {
      hideModal();
    } else {
      reset();
      showModal();
    }
  }, [selectedImageIndex]);

  const onClose = () => {
    setSelectedImageIndex(null);
  };

  const handleSave = () => {
    if (completedCrop) {
      ImageCropUtils.getCroppedImageBlob(
        htmlImgRef.current!,
        completedCrop,
        ({ imgUrl, blob }) => {
          if (blob) {
            updateImage(selectedImageIndex!, (prev) => ({
              ...prev,
              croppedImgUrl: imgUrl,
              crop,
            }));
            onClose();
          }
        },
      );
    }
  };

  return (
    <Modal
      {...modalProps}
      fullSize
      classes={{ mainContent: styles.modalContent }}
      onClose={() => {
        onClose();
        modalProps.onClose();
      }}
      footer={
        <FormActions noSpacer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!completedCrop}>
            Save
          </Button>
        </FormActions>
      }
    >
      {src && (
        <ReactCrop
          crop={crop}
          className={styles.cropper}
          onComplete={(_, pc) =>
            setCompletedCrop(ImageCropUtils.getRoundedCrop(pc))
          }
          onChange={(_, percentCrop) =>
            setCrop(ImageCropUtils.getRoundedCrop(percentCrop))
          }
          keepSelection
        >
          {src && <img src={src} className={styles.image} ref={htmlImgRef} />}
        </ReactCrop>
      )}
    </Modal>
  );
}

export default ListingImageEditorModal;
