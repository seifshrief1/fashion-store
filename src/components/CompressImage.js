import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,          // الحجم النهائي الأقصى (مثلا 1MB)
      maxWidthOrHeight: 800, // أقصى عرض/ارتفاع
      useWebWorker: true,    // يستخدم web worker عشان ميهنجش الصفحة
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression error:", error);
    return file; // لو حصل error رجع الملف الأصلي
  }
};
export default compressImage;