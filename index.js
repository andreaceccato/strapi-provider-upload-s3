'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const AWS = require('aws-sdk');

function assertUrlProtocol(url) {
  // Regex to test protocol like "http://", "https://"
  return /^\w*:\/\//.test(url);
}

module.exports = {

  init(providerOptions) {

    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      ...providerOptions,
    });

    var rootPath = providerOptions.RootPath;

    // Prevent missing slash in root path
    if (rootPath[rootPath.length-1] !== '/') {
      rootPath += '/'
    }

    const upload = (file, customParams = {}) =>

      new Promise((resolve, reject) => {
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : '';
        S3.upload(
          {
            Key: `${rootPath}${path}${file.hash}${file.ext}`,
            Body: file.stream || Buffer.from(file.buffer, 'binary'),
            ContentType: file.mime,
            // Tagging: 'public=true'
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            // set the bucket file url
            if (assertUrlProtocol(data.Location)) {
              file.url = data.Location;
            } else {
              // Default protocol to https protocol
              file.url = `https://${data.Location}`;
            }

            resolve();
          }
        );

      }); // upload

    return {
      uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      delete(file, customParams = {}) {

        return new Promise((resolve, reject) => {

          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject(
            {
              Key: `${rootPath}${path}${file.hash}${file.ext}`,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });

      }

    };
  }

};
