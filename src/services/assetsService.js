const AWS = require('aws-sdk')
require('dotenv').config()

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

/**
 * Uploads a JPEG file to S3
 * @param {*} image 
 */
module.exports.uploadImage = async (image) => {
  var base64data = Buffer.from(image, 'binary')
  const fileName = Date.now() + '.jpg'
  const response = await s3.upload({
    Bucket: process.env.AWS_ASSET_BUCKET,
    Key: fileName,
    Body: base64data,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }).promise()
  return response.Location
}
