import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
        return;
      }

      const fileName = path.basename(files.photo.path);
      const destPath = `/uploads/${fileName}`;

      const data = {
        name: fields.name,
        contact: fields.contact,
        address: fields.address,
        health: fields.health,
        allergy: fields.allergy,
        photoUrl: destPath,
      };

      const id = new Date().getTime().toString();
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      fs.writeFileSync(path.join(dataDir, `${id}.json`), JSON.stringify(data));

      res.status(200).json({ status: "success", id });
    });
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
};
