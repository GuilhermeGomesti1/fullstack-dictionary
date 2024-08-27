import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadFile(
  url: string,
  outputPath: string
): Promise<void> {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

export async function readFileContent(filePath: string): Promise<string> {
  try {
    return fs.promises.readFile(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}
