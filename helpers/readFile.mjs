import fs from "fs";

export const readFile = async (pathFile) => {
  const content = await fs.readFile(pathFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    return data;
  });
  return content;
};
