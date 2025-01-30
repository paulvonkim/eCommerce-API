import { Router } from "express";
import upload from "../middleware/fileUpload.js";

const uploadRouter = Router();

uploadRouter.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ error: "No file selected" });
      } else {
        res.json({
          message: "File uploaded successfully",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

export default uploadRouter;
