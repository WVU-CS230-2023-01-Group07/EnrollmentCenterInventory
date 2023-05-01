![image](https://user-images.githubusercontent.com/89492411/235502463-a1d47a7b-bdc6-4d27-b457-487173d891a5.png)
# WVU Statler College of Enineering and Mineral Resources Outreach Center Inventory System

This WebApp was designed for the WVU Statler College of Engineering and Mineral Resources as an inventory tracking and management system. 

# Features:
- See a list of inventory items in the system
- Add or remove items from the system
- Audit the system to change the quantities and storage locations for items, then generate a report of the changes made
- Gnerate a report of the items based on attributes

# To Implement This System:
## Local Hosting:
1. Create a firebase database
2. Change all instances of "baseUrl" to the base URL of the database
3. Create an endpoint in your database called "Products"
4. Set up authorization with email on your database and add an authorized user
6. Make sure your Database rules will allow reading and writing
7. Use `ng serve` to start the app, and navigate to https://localhost:4200 in a browser window

## Cloud Hosting
1. Create a firebase database
2. Change all instances of "baseUrl" to the base URL of the database
3. Create an endpoint in your database called "Products"
4. Set up authorization with email on your database and add an authorized user
6. Make sure your Database rules will allow reading and writing
7. Set up hosting on your database and overwrite the code in the environments folder with the code that Firebase provides. Follow the instructions given by Firebase. 
8. Purchase a domain name and follow the instructions firebase provides for deploying to a custom domain
9. In a terminal, run `firebase init`, then `ng build`, then `firebase deploy`

### Note: The visuals in this system are currently West Virginia University Branded. To change branding, new images will need to be placed in the assets folder and all image paths will need to be updated


This specific project has been deployed to:
#### https://www.Outreach-Inventory.com

Engineers:
- Andrew Degarmo
- Jacob Comer
- Michael Barchett
- Samual Maatman
- Michael Townsend
- Matthew Guyer
- Ray King

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
