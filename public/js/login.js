$('document').ready(function () {
        /**
         * Validation of the input
         */
        $("#login-form").validate({
            rules:
                {
                    password: {required: true},
                    email: {required: true, email: true}
                }
            , messages:
                {
                    password: {required: "Please, enter the password"},
                    email: {required: "Please, enter the email"}
                }
            , submitHandler: submitForm
        });

        function submitForm() {
            var form = $("#login-form");
            var password = form.find("#login-password")[0].value;
            var data = hashPassword(form, password);

            /**
             * Sending async request
             */
            $.ajax({
                type: 'POST',
                url: "../api/login",
                data: data,
                beforeSend: function () {
                    $("#error").fadeOut();
                    $("#button-login").html('<span class=\"glyphicon glyphicon-transfer\"></span> &nbsp; sending ...');
                },
                success: function (response) {
                    if (response.code === "ok") {
                        $("#button-login").html('<img src="../images/btn-loader.gif" /> &nbsp; Signing In ...');
                        setTimeout(' window.location.href = "dashboard"; ', 1000);
                    } else {
                        $("#error").fadeIn(1000, function () {
                            var errMessage = response.code;
                            if (response.message) {
                                errMessage = response.message;
                            }
                            $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span>' + errMessage + '</div>');
                            $("#button-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
                        });
                    }
                }
            });
            return false;
        }
    }
);

function hashPassword(data, password) {
    var values, index;

    // Get the parameters as an array
    values = data.serializeArray();

    // Find and replace `content` if there
    for (index = 0; index < values.length; ++index) {
        if (values[index].name === "password") {
            values[index].value = $.md5(password);
            break;
        }
    }

    // Add it if it wasn't there
    if (index >= values.length) {
        values.push({
            name: "password",
            value: $.md5('')
        });
    }

    // Convert to URL-encoded string
    values = jQuery.param(values);
    return values;
}