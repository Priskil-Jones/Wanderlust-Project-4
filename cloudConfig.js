const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config ({                        // adding api details in config variable
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({         // new = create object,     const = create variable
    cloudinary: cloudinary,               //Left side - Property NAme,      Right side: Cloudinary Variable          
    params: {
        folder: 'wanderlust_DEV',
        allowedFormats: ["png", "jpg", "jpeg"], // supports promises as well
        // public_id: (req, file) => 'computed-filename-using-request',
    },
});

module.exports = {cloudinary, storage};