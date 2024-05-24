import styles from "./ListingMediaDropzone.module.scss";
import Dropzone from "react-dropzone";

namespace ListingMediaDropzone {
  export type Props = {
    onDrop: (files: File[]) => void;
  };
}

function ListingMediaDropzone({ onDrop }: ListingMediaDropzone.Props) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag & drop images here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
}

export default ListingMediaDropzone;
