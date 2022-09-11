# Node Rest-server-api


This is an API similar to an online store, but it does not handle purchases. It handles the data of: users, products and categories. (CRUD)

 - It uses token-based authentication. 
 - The upload of files (images) can be either in the own system or in    the Cloudinary platform.

## Installation

You need to have NodeJs istalled. To install all the packages you can use:

    npm i

Or installing manually:

    npm i <package names in package.json>


## ENV variables

 - **PORT**: the port that Express will listen for. Example: 3000
 - **MONGODB_CNN**: your MongoDB connection string.
 - **SECRETORPRIVATEKEY**: JWT secretOrPrivateKey string.
 - **CLOUDINARY_URL**: API Environment variable provided by Cloudinary.

## Start server

To start the server you must have installed the dependency packages and set the environment variables. Then just:

    npm start

## Behind this API

This API was created when I was studying NodeJS two years ago. Also it was written first in spanish but I translate its code to english.