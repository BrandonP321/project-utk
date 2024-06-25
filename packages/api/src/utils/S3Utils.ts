import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../clients/aws/s3";
import crypto from "crypto";
import { apiConfig } from "../config";

type PresignedUrlParams = {
  Bucket: string;
  Key: string;
  expiresIn?: number;
};

export class S3Utils {
  public static assetsBucket = apiConfig.mediaBucket.name;

  public static getPresignedUrl = async ({
    Bucket,
    Key,
    expiresIn = 60 * 5,
  }: PresignedUrlParams) => {
    const command = new PutObjectCommand({ Bucket, Key });

    return await getSignedUrl(s3Client, command, { expiresIn });
  };

  public static getPresignedUrlForAssetUpload = async (params: {
    fileName: string;
    entityType: "vendorListing";
    entityId: string;
    assetType: "image" | "video";
  }) => {
    const { fileName, entityType, entityId, assetType } = params;

    const randomHash = crypto.randomBytes(16).toString("hex");
    const objectKey = `temp/${entityType}/${entityId}/${randomHash}/${encodeURIComponent(fileName)}`;

    const signedUrl = await this.getPresignedUrl({
      Bucket: this.assetsBucket,
      Key: objectKey,
    });

    return { url: signedUrl, objectKey };
  };

  public static removeObjectKeyTempPrefix = (objectKey: string) => {
    return objectKey.replace("temp/", "");
  };
}
