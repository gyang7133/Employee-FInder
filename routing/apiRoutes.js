// A GET route with the url /api/employees. This will be used to display a JSON of all possible employees.

const employees = require("../data/employees.js");

module.exports = function(app){
    app.get("/api/employees", function(eq, res){
        res.json(employees);
    })


//A POST routes /api/employees. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

    app.post("/api/employees", function(eq, res){
        
        const userArr = (req.body);
        const match = '';
        const totalDiff = 0;
        const currentDiff = 0;

        //Loop through all the employee selections in the employees data array
        for(let i = 0; i < employees.length; i++){

            //Loop through all the scores for each employee
            for(let z = 0; z < userArr.scores.length; z++){
                
                if((employees[i].scores[z] - userArr.scores[z]) !== 0){

                    currentDiff += (Math.abs(parseInt(employees[i].scores[z]) - parseInt(userArr.scores[z])));
                }
            }

            //If the sum of total difference is greater than the current difference of the match reset the match to be the new employee
            if(!totalDiff || totalDiff > currentDiff){
                match = employees[i].name;
                totalDiff = currentDiff;
                currentDiff = 0;
            }
            else{
                currentDiff = 0;
            }
        }

        //Save the user's new data to the employees data 
        employees.push(userArr);

        //Return a JSON with user's match
        res.json({status:"OK", matched: match, diff: totalDiff});
        
    });

}