if (!document.cookie) {
    document.cookie = "logged=0";
}

if (document.cookie && !loggedIn("logged")) {
    console.log("There is no cookie set up");
    if(window.location.pathname != "/") {
        console.log("Redicting to home");
        window.location.href = "/";
    }
    $("#userLoginModal").modal();

    const username = $("#username").val();
    const password = $("#password").val();

    $("#login").on("click", function() {

        $.ajax({
            type: "POST",
            data: { username: username, password: password },
            url: "/api/login",
            success: function(data) {
                console.log(data);
                document.cookie = "userId=" + data.id + ";";
                document.cookie = "logged=1;"
                $("#userLoginModal").modal("toggle");
                console.log(document.cookie);
            }
        });
    })
}

// Parse cookie
function loggedIn(cookiename) {
    if (1 == getCook("logged")) {
        console.log("Logged");
        return true;
    }
    console.log("Not ogged");
    return false;
}

// Parse cookie
function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}