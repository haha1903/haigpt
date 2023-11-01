# Haigpt

Haigpt is a proxy software that wraps the Azure ChatGPT service into the OpenAI ChatGPT API. Users can call the Azure ChatGPT service through the OpenAI ChatGPT API.

In addition, haigpt has the following features:

1. **Retry Mechanism**: haigpt has added a retry mechanism. If the Azure ChatGPT service returns a 429 Too Many Requests or other 500 errors, haigpt will automatically retry multiple times until it succeeds or reaches the maximum number of retries.

2. **Support for Two Azure ChatGPT Services**: haigpt supports two Azure ChatGPT services, primary and secondary. The primary service is used by default. When the primary service is intercepted by the content filter, it will automatically switch to the secondary service.

3. **Support for Custom User Tokens**: haigpt supports defining your own user tokens for access control.

## Usage

There are three ways to use haigpt:

1. **Pure Proxy**: The service itself has no configuration and simply forwards the OpenAI ChatGPT API to the Azure ChatGPT service. The API key needs to be provided by the client. Add a request header in the request: Authentication. The format is `Bearer AZURE_RESOURCE_ID:OPENAI_MODEL_NAME1|AZURE_MODEL_DEPLOYMENT1,OPENAI_MODEL_NAME2|AZURE_MODEL_DEPLOYMENT2:AZURE_API_KEY:API_VERSION`. API_VERSION is an optional parameter, the default is 2023-05-15.

   Sample:
   ```
   Authentication: Bearer gpt1:gpt-3.5-turbo|gpt-35-turbo,gpt-4|gpt-4,gpt-4-32k|gpt-4-32k:4f29ec7c704d453fbb15e82a6700beef
   ```

2. **Configuration with config.json**: Use config.json to configure the proxy service. The format of the configuration file is as follows:

   ```json
   {
     "primaryApiKey": {
       "resourceId": "gpt1",
       "deployment": {
         "gpt-3.5-turbo": "gpt-35-turbo",
         "gpt-4": "gpt-4",
         "gpt-4-32k": "gpt-4-32k"
       },
       "apiKey": "4f29ec7c704d453fbb15e82a6700beef",
       "apiVersion": "2023-05-15"
     },
     "secondaryApiKey": {
       "resourceId": "gpt2",
       "deployment": {
         "gpt-3.5-turbo": "gpt-35-turbo",
         "gpt-4": "gpt-4",
         "gpt-4-32k": "gpt-4-32k"
       },
       "apiKey": "2c7f38da89274c96b85b345632a01fde",
       "apiVersion": "2023-05-15"
     },
     "userTokens": [
       {
         "userId": "user1",
         "token": "sk-87vbtyWRh5tHEwRrZPd3z6U2CmGKQ1JnXbZtVgYpBmHZP9JKH"
       },
       {
         "userId": "user2",
         "token": "sk-lktyzjVEt9cXDsOPe3q5Y2RsMnGKJ9ZpYbLtWhZnCdZYJ2KLH"
       }
     ]
   }
   ```

3. **Configuration with Environment Variables**:

   ```
   PrimaryApiKey=gpt1:gpt-3.5-turbo|gpt-35-turbo,gpt-4|gpt-4,gpt-4-32k|gpt-4-32k:4f29ec7c704d453fbb15e82a6700beef:2023-05-15
   SecondaryApiKey=gpt2:gpt-3.5-turbo|gpt-35-turbo,gpt-4|gpt-4,gpt-4-32k|gpt-4-32k:2c7f38da89274c96b85b345632a01fde
   UserTokens=user1|sk-87vbtyWRh5tHEwRrZPd3z6U2CmGKQ1JnXbZtVgYpBmHZP9JKH,user2|sk-lktyzjVEt9cXDsOPe3q5Y2RsMnGKJ9ZpYbLtWhZnCdZYJ2KLH
   ```
## Running the Application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)