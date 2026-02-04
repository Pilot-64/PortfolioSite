import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

/**
 * Lazy-initialized S3 client to prevent "missing env" errors during 
 * the initial module import/hoisting phase.
 */
let s3Instance: S3Client | null = null;

function getS3Instance() {
  if (s3Instance) return s3Instance;

  const endpoint = process.env.MINIO_ENDPOINT;
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;

  if (!endpoint || !accessKey || !secretKey) {
    throw new Error(
      `MinIO Configuration Error: Missing required environment variables. 
       Check MINIO_ENDPOINT, MINIO_ACCESS_KEY, and MINIO_SECRET_KEY.`
    );
  }

  s3Instance = new S3Client({
    region: "us-east-1", // dummy region
    endpoint: endpoint,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
    forcePathStyle: true,
  });

  return s3Instance;
}

/**
 * Fetches image keys and public URLs from the configured bucket.
 */
export async function getImages() {
  const s3 = getS3Instance();
  const bucket = process.env.MINIO_BUCKET;
  const publicUrl = process.env.MINIO_PUBLIC_URL;

  if (!bucket || !publicUrl) {
    throw new Error("MINIO_BUCKET or MINIO_PUBLIC_URL is not defined.");
  }

  const res = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "barcelona2",
    })
  );

  console.log('Fetched images from MinIO:', res.Contents?.length || 0);

  return (
    res.Contents?.map((obj) => ({
      key: obj.Key!,
      url: `${publicUrl}/${obj.Key}`,
    })) || []
  );
}

/**
 * SERVER SIDE ONLY: Fetches the actual file stream from MinIO.
 */
export async function getFile(key: string) {
  const s3 = getS3Instance();
  const bucket = process.env.MINIO_BUCKET;

  if (!bucket) {
    throw new Error("MINIO_BUCKET is not defined.");
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3.send(command);
    return await response.Body?.transformToByteArray();
  } catch (error) {
    console.error("Error in getFile:", error);
    return null;
  }
}

/**
 * Generates the public URL for a file.
 */
export function getFileUrl(key: string) {
  const publicUrl = process.env.MINIO_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("MINIO_PUBLIC_URL is not defined.");
  }

  const cleanKey = key.startsWith("/") ? key.slice(1) : key;
  return `${publicUrl}/${cleanKey}`;
}