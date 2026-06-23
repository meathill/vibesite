interface UploadParams {
  bucket: R2Bucket;
  key: string;
  data: ArrayBuffer | ReadableStream;
  contentType: string;
  size: number;
}

export function uploadToR2(params: UploadParams): Promise<R2Object> {
  return params.bucket.put(params.key, params.data, {
    httpMetadata: { contentType: params.contentType },
    customMetadata: {
      size: String(params.size),
      uploadedAt: new Date().toISOString(),
    },
  });
}

export function getFromR2(bucket: R2Bucket, key: string): Promise<R2ObjectBody | null> {
  return bucket.get(key);
}

export function deleteFromR2(bucket: R2Bucket, key: string): Promise<void> {
  return bucket.delete(key);
}

export function generateR2Key(submissionId: string, filename: string): string {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `submissions/${submissionId}/${safeName}`;
}
