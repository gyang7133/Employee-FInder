// A GET route with the url /api/employees. This will be used to display a JSON of all possible employees.

const employees = require('../data/employees.js');

module.exports = function(app){

    app.get('/api/employees', function(req, res){
        res.json(employees);
    });


// A POST routes /api/employees. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

    app.post('/api/employees', function(req, res){
        
        //Find the closet employee match
        const findMatch = {
            name: '',
            photo: '',
            scoreDifference: 0
        };

        //Parse user choic results.
        const userInfo = req.body;
        const userScores = userInfo.scores;

        //The calculated difference
        let calcDifference;

        //Loop through each employee
        for (let i = 0; i < employees.length; i++) {
            const eachEmployee = employees[i];
            calcDifference = 0;

            //loop through scores of each employee
            for (let z = 0; z < eachEmployee.scores.length; z++) {
                const eachEmployeeScore = eachEmployee.scores[z];
                const eachUserScore = userScores[z];

                //get score diff and calculate the Diff
                calcDifference += Math.abs(parseInt(eachUserScore) - parseInt(eachEmployeeScore));
            }

            //Iif difference is less than closest match make close match the new employee
            if (calcDifference <= findMatch.scoreDifference) {

                findMatch.name = eachEmployee.name;
                findMatch.photo = eachEmployee.photo;
                findMatch.scoreDifference = calcDifference;
            }
        }

        //Save users input information into the employees data
        employees.push(userInfo);

        //json with match
        res.json(findMatch);
 
    });

};