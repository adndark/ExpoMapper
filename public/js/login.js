// Parse cookie
function loggedIn(cookiename) {
    if (1 == getCook("logged")) {
        console.log("Logged");
        return true;
    }
    console.log("Not logged");
    return false;
}

// Parse cookie
function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

$("#loginButton").on("click", function() {

    console.log("Loggin button clicked");
    // Hide alert
    $("#userNotFoundAlert").hide();
    // Show spinner
    $("#loginSpinner").show();
    // Get data from form
    const username = $("#username").val();
    const password = $("#password").val();

    // Send request
    $.ajax({
        type: "POST",
        data: { username: username, password: password },
        url: "/api/login",
        success: function(data) {
            console.log(data);

            // Hide spinner
            $("#loginSpinner").show();
            if (!data) {
                console.log("No data returned");
                $("#loginSpinner").hide();
                $("#userNotFoundAlert").show();
                return;
            }
            document.cookie = "userId=" + data.id + ";";
            document.cookie = "logged=1;"
            $("#userLoginModal").modal("toggle");
            console.log(document.cookie);
        }
    });
});

$("#signupButton").on("click", function() {

    console.log("Signup button clicked");
    // Hide alert
    $("#errorSignup").hide();
    $("#passwordNotMatch").hide();

    // Get data from form
    const name = $("#newName").val();
    const username = $("#newUsername").val();
    const email = $("#newEmail").val();
    const password = $("#newPassword").val();
    const confirmPassword = $("#newConfirmPassword").val();

    if(confirmPassword != password) {
        console.log("Passwords do not match");
        $("#passwordNotMatch").show();
        return;
    }

    // Show spinner
    $("#signSpinner").show();

    const user = new UserModel({ name: name, email: email, userName: username, password: password });
    user.save({}, {
        success: function(model, response) {

            console.log("Sucessfully signed up user");
            // Hide spinner
            $("#signupSpinner").show();
            // No data returned, failed to save user
            document.cookie = "userId=" + response.id + ";";
            document.cookie = "logged=1;"
            $("#userLoginModal").modal("toggle");
            console.log(document.cookie);
        },

        error: function() {
            console.log("Faile to save user");
            $("#signupSpinner").hide();
            $("#errorSignup").show();
        }
    });

});

$("#loginTabLink").on("click", function() {
    $("#loginModalHeader").show();
    $("#signModalHeader").hide();
    $("#modalFooterSignup").hide();
    $("#modalFooterLogin").show();
});

$("#signupTabLink").on("click", function() {
    $("#loginModalHeader").hide();
    $("#signModalHeader").show();
    $("#modalFooterLogin").hide();
    $("#modalFooterSignup").show();
});

// Logic to check cookie and display modal
if (!document.cookie) {
    document.cookie = "logged=0";
}

// If not logged display modal
if (document.cookie && !loggedIn("logged")) {

    console.log("There is no cookie set up");

    if (window.location.pathname != "/") {
        console.log("Redicting to home");
        window.location.href = "/";
    }

    // Avoid modal gets closed on clicks or keyboard ESC
    $("#userLoginModal").modal({ backdrop: 'static', keyboard: false });
    $("#loginModalHeader").show();
    // Display modal and login button
    $("#userLoginModal").modal();
    $("#modalFooterLogin").show();
}