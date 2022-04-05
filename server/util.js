export const getFileExtension = (fileName) => {
  let fileNameArray = fileName.split(".");
  return fileNameArray[fileNameArray.length - 1];
};
