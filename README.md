# POS B2B Web

POS B2B Web is an Angular 9 project. It includes nebular and bootstrap libraries.

# Installation

Clone repository and run following command

    npm install

## Run Development Server Locally 

Once you have completed npm install successfully, you are ready to start the server. Run the following command.

    ng serve
This will start the server at default port 4200. Open http://localhost:4200 to view the application. If you want the server to run on a different port, do so by passing port number as below. But please note that you may have to whitelist the port in developer console.

    ng serve --port=8080

## Generate Production Bundle 

Run the following comment to generate the production dist folder. You need to make sure environment.prod.ts file is updated.

    ng build --configuration=production

