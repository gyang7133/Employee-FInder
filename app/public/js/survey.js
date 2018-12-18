$(function(){

    //Setup a verification for the form. Reste any invalid to empty values if return false
    const verifyForm = function() {
        let checker = true;
        $('input').each(function() {
            if (!$(this).val()) {
              checker = false;
            }
          });
    
        $('.user-select').each(function(i, element) {
            if (!$(this).val()) {
              checker = false;
            }
          });

          return checker;
}
    
//Submit Button Functionality
$("#submit").on('click', function () {

    //If form is verified then create an obeject for the user data results
    if(verifyForm()){
            
    const results = {
        name: $("name").val(),
        photo: $("photo").val(),
        scores: [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val(),
        ]

    }

    //Show the modal with best match along with name and photo.
    $.post("/api/employees", results).done(function (data) {
        console.log(data);
        $("#responseArea").text(`${data.matched}`);
        $('#myModal').modal('toggle');


    });
    }




})

    
})
    
   