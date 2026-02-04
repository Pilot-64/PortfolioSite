import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const minioEndpoint = process.env.MINIO_ENDPOINT;
if (!minioEndpoint) {
  throw new Error("MINIO_ENDPOINT environment variable is not defined.");
}

const minioSecretKey = process.env.MINIO_SECRET_KEY;
if (!minioSecretKey) {
  throw new Error("MINIO_SECRET_KEY environment variable is not defined.");
}

const s3 = new S3Client({
  region: "us-east-1", //dummy region, not used with minio
  endpoint: minioEndpoint,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: minioSecretKey
  },
  forcePathStyle: true
});
export async function getImages() {
  const bucket = process.env.MINIO_BUCKET;
  if (!bucket) {
    throw new Error("MINIO_BUCKET environment variable is not defined.");
  }
  const publicUrl = process.env.MINIO_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("MINIO_PUBLIC_URL environment variable is not defined.");
  }

  const res = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "barcelona2"
    })
  );

  console.log('Fetched image from S3:', res.Contents?.length || 0);

  return (
    res.Contents?.map((obj) => ({
      key: obj.Key!,
      url: `${publicUrl}/${obj.Key}`
    })) || []
  );
}

/**
 * SERVER SIDE ONLY: Fetches the actual file stream from MinIO.
 * Useful if you need to process the file or proxy it.
 */
export async function getFile(key: string) {
  const bucket = process.env.MINIO_BUCKET;
  if (!bucket) {
    throw new Error("MINIO_BUCKET environment variable is not defined.");
  } 
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3.send(command);
    // Returns the byte array of the file
    return await response.Body?.transformToByteArray();
  } catch (error) {
    console.error("Error in getFile:", error);
    return null;
  }
}

/**
 * VERSATILE: Generates the public URL for a file.
 * Use this for your project "link" property.
 */
export function getFileUrl(key: string) {
  const publicUrl = process.env.MINIO_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("MINIO_PUBLIC_URL environment variable is not defined.");
  }
  
  // Removes leading slash from key if present to prevent double slashes
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;
  return `${publicUrl}/${cleanKey}`;
}
