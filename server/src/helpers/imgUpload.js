"use strict";
const { Storage } = require("@google-cloud/storage");
const { time } = require("console");
const fs = require("fs");

const gcs = new Storage({
  projectId: "travel-plan",
  keyFilename: "google-cloud-keys.json",
});

const bucketName = "plan_images";
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = Date.now().toString() + ".jpg";
  console.log("the gcs name is", gcsname);
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
