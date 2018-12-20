$(function(){

    //Setup a verification for the form. Reste any invalid to empty values if return false
    const verifyForm = function() {
        let isVerifed = true;

        $('input').each(function() {
          if (!$(this).val()) {
            isVerified = false;
          }
        });
    
        $('.form-control').each(function(i, element) {
          if (!$(this).val()) {
            isVerifed = false;
          }
        });
    
        return isVerifed;
     }
    
//Submit Button Functionality
const showModal = function(data) {

    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    $('#modalName').text(data.name);
    $('#modalPhoto').attr('src', data.photo);

    // Show the modal with the best match
    $('#myModal').modal('toggle');
  }

  const submit = function(event) {
    event.preventDefault();

    // Check to see if all required fields are filled and verified.
    if (verifyForm()) {

      // Create an object for the user's input information
      const userArr = {
        name: $('#name').val().trim(),
        photo: $('#image').val().trim(),
        scores: [
          $('#q1').val(),
          $('#q2').val(),
          $('#q3').val(),
          $('#q4').val(),
          $('#q5').val(),
          $('#q6').val(),
          $('#q7').val(),
          $('#q8').val(),
          $('#q9').val(),
          $('#q10').val()
        ]
      };

      // AJAX post the data to the employees API.
      $.post('/api/employees', userArr, showModal);

    } else {

      // Display an warning alert if the form is not valid
      $('#warningMessage')
        .text('Warning! All fields need to be completed before submitting!')
        .addClass('alert alert-danger');
    }
  }

  $('#submit').on('click', submit)

    
})
    
   