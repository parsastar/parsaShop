import { api } from "./config";

export const uploadImage = (formData: FormData) =>
  api.post("/api/files", formData);

export const deleteImage = (fileName: string) =>
  api.delete(`/api/files?fileName=${encodeURIComponent(fileName)}`);
