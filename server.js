// Dependecies - NPM packages that will be used to give our server useful fucntionlaity
const express = require('express');
const path = require('path');

// Express and PORT Configurations 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.JSON());

app.use(express.static(path.join(_dirname, 'app/public')));

// Point to our router files
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

//Initiate server and listens on PORT 3000
app.listen(PORT, function() {
    console.log(`Application is listening on PORT: ${PORT}`);
});