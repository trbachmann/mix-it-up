# Mix It Up 
Mix It Up is a recipe app for bakers. Users can save links to recipes as well as personalized notes with their ingredient and cook time adjustments for those recipes.
#### See It Live:
https://mix-it-up-turing.herokuapp.com/ 

### Set-Up: 
Clone this repo  
Run `npm install` from the root directory  
Request an api key and id from [Yummly](https://developer.yummly.com/#the-api)  
In the root directory add a file named .env.development.local and add the code snippet below with your api id and key from Yummly
```
REACT_APP_API_KEY='your api id here';
REACT_APP_API_ID='your api key here';
```
Run `npm start` and visit localhost:3000 in your browser.  

### Preview:
![Mix It Up Video Preview](./src/images/mix-it-up.gif)  
### Primary Technologies Used:
* React 
* Redux
* React Router
* JavaScript
* SCSS

### Testing:
Jest and Enzyme for testing  
Run `npm test` from the root directory  

### Original Assignment: 
[Binary Challenge](http://frontend.turing.io/projects/binary-challenge.html) from Turing School of Software & Design  

### Wireframes:
![Mix It Up wireframes](./src/images/mix-it-up-wireframes-updated.jpg)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).