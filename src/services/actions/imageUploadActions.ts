// services/actions/imageUploadActions.js

export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL as string, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Failed to upload image to ImageBB");
  }
};
