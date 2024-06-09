import fs from "fs";
import path from "path";

export default (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, `${id}.json`);

    if (fs.existsSync(filePath)) {
      const profile = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      res.status(200).json({ status: "success", profile });
    } else {
      res.status(404).json({ status: "error", message: "Profile not found" });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
};
