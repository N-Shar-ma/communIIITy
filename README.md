# communIIITy
GAUS' team submission for Hackofiesta 2.0

## Installation Instructions
Installation involves two parts: setting up the frontend webapp, and connecting to the backbone network. Run `npm install` to install the dependencies.

### Setting up the webapp
1. Set up nginx/apache/similar and install your public certificates
1. Start mongodb locally(preferred) or on a provider like AWS
1. Run `npm start`, or `node server.js`. Remember to update your ports and mongodb database urls in the .env file as necessary.
2. Create and add google credentials (client id and client secret), redirect uri, cookie secret and the institute's college domain (for example `iiitl.ac.in`) 

### Connecting to backbone
1. Currently, you need a signed certificate signed by certificate authority(ca) Pranav Gade\<pranavgade20@gmail.com\> to connect to the network. This will be moved to a crowd-concensus/proof-of-stake model in the future.
1. So, create a certificate using openssl and get it signed by the relevant CA.
1. Add the said certificate and your api domain/url to the storage of the Tezos contract(not deployed on mainnet yet, but see contract.py).
1. Update sync.js and syncserver.js with the certificate and details.
1. Add your tezos details to enviornment variables as required by updater.py.
1. Set up a cronjob/jobber/script to run `node sync.js` every 18-24 hours(fewer if you would like more frequent updates)
    * If you are using heroku, you can run this on startup as heroku instances are restarted every 24 hours
1. Start syncserver.js with `node syncserver.js`

## Development

Follow installation instructions, but also install nodemon and dotenv as dev dependencies, and run `nm run devStart` or `nodemon server.js`. Also, create and add google credentials (client id and client secret), redirect uri, cookie secret and the institute's college domain (for example `iiitl.ac.in`) in the .env file.

