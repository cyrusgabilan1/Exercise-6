$(document).ready(function() {  
    $('#emailInput').on('change', function() {
        var email = $(this).val();
        if (email) {
            $.ajax({
                type: 'POST',
                url: 'feedback.txt',
                data: { email: email },
                dataType: 'json',
                success: function(response) {
                    if (response.exists) {
                        $('#message').html("This email already exists!");
                    } else {
                        $('#message').html("").css('display', 'none');
                    }
                }
            });
        }
    });

    $('#postForm').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                $('#message').html(response.message);
                if (response.message.includes("Thank you")) {
                    $('#message').css('color', 'green');
                } else if (response.message.includes("email already exists")) {
                    $('#message').css('color', 'red');
                } else {
                    $('#message').css('color', 'red');
                }
                if (response.message.includes("Thank you")) {
                    $('#postForm')[0].reset();
                }
            }
        });
    });
});
