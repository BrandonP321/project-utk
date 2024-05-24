import { createContext, useContext, useMemo, useRef, useState } from "react";
import { Crop } from "react-image-crop";
import { useListingMedia } from "../vendorListing/useListingMedia";

export type ImageAsset = {
  originalFile: File;
  croppedImgUrl?: string;
  crop?: Crop;
};

type TListingMediaEditorContext = {
  images: ImageAsset[];
  setImages: (images: ImageAsset[]) => void;
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number | null) => void;
  selectedImgRef: React.MutableRefObject<ImageAsset | null>;
};

const listingMediaEditorContext = createContext<TListingMediaEditorContext>(
  {} as TListingMediaEditorContext,
);

export const ListingMediaEditorProvider = ({
  children,
}: React.PropsWithChildren) => {
  const {} = useListingMedia();

  const [images, setImages] = useState<ImageAsset[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const selectedImgRef = useRef<ImageAsset | null>(null);

  return (
    <listingMediaEditorContext.Provider
      value={{
        images,
        setImages,
        setSelectedImageIndex,
        selectedImageIndex,
        selectedImgRef,
      }}
    >
      {children}
    </listingMediaEditorContext.Provider>
  );
};

export const useListingMediaEditor = () => {
  const context = useContext(listingMediaEditorContext);
  const { images, setImages, selectedImgRef } = context;

  const addImages = (files: File[]) => {
    setImages([...images, ...files.map((file) => ({ originalFile: file }))]);
  };

  const updateImage = (index: number, cb: (prev: ImageAsset) => ImageAsset) => {
    const updatedImages = [...images];

    updatedImages[index] = cb(updatedImages[index]);
    setImages(updatedImages);
  };

  const selectedImgSrc = useMemo(() => {
    return (
      selectedImgRef.current &&
      URL.createObjectURL(selectedImgRef.current.originalFile)
    );
  }, [selectedImgRef.current]);

  return {
    ...context,
    addImages,
    updateImage,
    selectedImgSrc,
  };
};
