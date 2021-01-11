# Login and Registration System
You can signup and login using this system and it provides token system for creating session.

## Requirements

For development, you will only need Node.js installed in your environement.

### Node
- #### Node installation on Windows
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  
- #### Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.
      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

## Running the project

    $ npm start

## Testing with Postman
- #### Go to http://localhost:3000/signup
    Pass the name, email, password to create a user.
- #### Go to http://localhost:3000/login
    Pass the email, password to login to generate unique token.    
