# communIIITy
GAUS team's submission for HackOFiesta 2.0

Devfolio Submission Link: https://devfolio.co/submissions/communiiity-2197

## The problem
There are no good online solutions for students of an institute(like our college, IIIT Lucknow) to discuss technical questions among their peers and instructors. We realized that this was a problem when our professor, Saurabh Sir, started receiving multiple emails with nearly identical questions. We had already tried and failed to use platforms like stackoverflow teams(which needs a subscription after 3 months). So, we decided to make a customizable solution geared towards catering to the needs of individual institutions.

## Our Solution
To tackle this problem and help everyone learn more effectively, we have made communIIITy. communIIITy is a platform where students and instructors from an institute can easily interact with each other, be it via asking questions or posting answers. Unlike global platforms like StackOverflow, communIIITy is primarily geared towards people from individual organizations. This provides an exclusive communIIITy (pun intended!) platform, customized to its unique needs. It also gives liberty to have discussions among people with a similar knowledge level and helps avoid the financial overhead of buying a teams subscription on StackOverflow. communIIITy is based upon the decentralized matrix protocol, which is used to share highest upvoted questions and answers are shared among peers (other institutes). It also means lower downtime when compared to websites such as StackOverflow which can face outages.

communIIITy uses Tezos blockchain for peer discovery, and uses that data to exchange information with its peers. The peer-to-peer exchange is cryptographically secured and authenticated via signed trusted certificates.

## Installation Instructions
Installation involves two parts: setting up the frontend webapp, and connecting to the backbone network. Run `npm install` to install the dependencies.

### Setting up the webapp
1. Set up nginx/apache/similar and install your public certificates
1. Start mongodb locally(preferred) or on a provider like MongoDB Atlas
1. Run `npm start`, or `node server.js`. Remember to update your ports and mongodb database urls in the .env file as necessary.

### Connecting to backbone
1. Currently, you need a signed certificate signed by certificate authority(ca) Pranav Gade\<pranavgade20@gmail.com\> to connect to the network. This will be moved to a crowd-concensus/proof-of-stake model in the future.
1. So, create a certificate using openssl and get it signed by the relevant CA.
1. Add the said certificate and your api domain/url to the storage of the Tezos contract(not deployed on mainnet yet, but see contract.py).
1. Update sync.js and syncserver.js with the certificate and details.
1. Add your tezos details to enviornment variables as required by updater.py.
1. Run `node updater.js` once. You typically won't need to execute it every day, as it is meant for peer discovery.
1. Set up a cronjob/jobber/script to run `node sync.js` every 18-24 hours(fewer if you would like more frequent updates)
    * If you are using heroku, you can run this on startup as heroku instances are restarted every 24 hours
1. Start syncserver.js with `node syncserver.js`

## Development

Follow installation instructions, but also install nodemon and dotenv as dev dependencies, and run `npm run devStart` or `nodemon server.js`. Also, create and add google credentials (client id and client secret), redirect uri, cookie secret and the institute's college domain (for example `iiitl.ac.in`) in the .env file.

## Presentation Link
https://github.com/N-Shar-ma/communIIITy/blob/master/Presentation.pdf

## Demo Link
https://youtu.be/Y4u6fQCsR8g

You can also visit the live demo at http://commun-iiit-y.herokuapp.com/ (you need an email ending with @iiitl.ac.in to login)

## Screenshots
Creating a question:
![6acdc4bd-5d7f-45e2-940b-ece06006714a](https://user-images.githubusercontent.com/26707046/115133797-97274000-a028-11eb-860f-39384f41fc44.png)

View question and its answers:
![52c6690a-cb87-472d-b008-c867a153e1e4](https://user-images.githubusercontent.com/26707046/115133799-98586d00-a028-11eb-9603-7aca636636f7.png)

Main page with latest questions:
![e794ea5f-9ea9-4c9f-871c-e47531e007bc](https://user-images.githubusercontent.com/26707046/115133802-98f10380-a028-11eb-922f-2369ea5de40f.png)

Login page:
![06bc136b-ec0c-4ab2-a9ba-4c493fb65d7f](https://user-images.githubusercontent.com/26707046/115133803-99899a00-a028-11eb-9855-9357c6cac114.png)

