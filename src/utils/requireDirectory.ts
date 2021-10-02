import fs from "fs";
import path from "path";

export function requireDirectory<T>(
  basePath: string,
  foreachFile: (file: T) => void,
  depth = 2
) {
  if (depth > 0) {
    const files = fs.readdirSync(basePath);

    for (const file of files) {
      const filePath = path.join(basePath, file);
      if (fs.statSync(filePath).isDirectory()) {
        requireDirectory(filePath, foreachFile, depth - 1);
      } else {
        const requiredFile: T = require(filePath).default;
        foreachFile(requiredFile);
      }
    }
  }
}
