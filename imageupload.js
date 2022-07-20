require(`dotenv`).config();

const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
const fs = require(`fs`);


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
    region, 
    accessKeyId,
    secretAccessKey
})

const checkFileType = (file, cb) => {
    //allowed image types
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Please upload a jpeg, jpg, or png file!')
    }
};

let uploadFile = (file) => {
    console.log(bucketName);
    console.log(region);
    console.log(accessKeyId);
    console.log(secretAccessKey);

    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: `${Date.now()}-${file.originalname}`
    }
    
    return s3.upload(uploadParams).promise()
}

module.exports = { uploadFile, checkFileType };