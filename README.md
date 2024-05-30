# strapi-provider-upload-s3
AWS S3 provider for strapi upload

Add the provider to the "providers" directory  
`./providers/strapi-provider-upload-s3/`:
```
 - index.js
 - package.json
```

In the package.json file add:
```json
{
  "dependencies": {
      "s3-provider": "file:providers/strapi-provider-upload-s3"
  }
}
```

In the ./config/plugins add:
```js
export default ({ env }) => ({
  
  /**
   * S3 CONFIGURATION
   */
    upload: {
      config: {
        provider: 's3-provider',
        providerOptions: {
          accessKeyId: env('S3_ACCESS_KEY_ID'),
          secretAccessKey: env('S3_ACCESS_SECRET'),
          region: env('S3_REGION'),
          params: {
            Bucket: env('S3_BUCKET'),
          },
          RootPath: env('S3_ROOT_PATH')
        },
      }
    },
    
  });
```

In the file .env add:
```env
########################
## S3
########################
S3_ACCESS_KEY_ID="AKIA0000000000000Z"
S3_ACCESS_SECRET="a0000000000000000000000TCex"
S3_REGION="eu-south-1"
S3_BUCKET="bucket-name"
S3_ROOT_PATH="public/testing/"
```

Run comand in direcotory provider custom:
`./providers/strapi-provider-upload-s3`

```bash
  npm install
```
