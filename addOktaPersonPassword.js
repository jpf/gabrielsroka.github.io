/* 
This bookmarklet modifies the standard Okta Admin Add Person dialog box to allow you to create a user with a password.

Setup:
1. Drag this to the bookmark toolbar:
javascript:(function(){document.body.appendChild(document.createElement("script")).src="https://gabrielsroka.github.io/addOktaPersonPassword.js";})();

Usage:
1. In Okta Admin, go to Directory > People.
2. Click Add Person.
3. Click the bookmark from your toolbar.
4. Fill out the form including the password and click Save.
*/

(function () {
    var password = $('[name="profile.secondEmail"]');
    password.prop("type", "password");
    $('[for="' + password.prop("id") + '"]').html("Password");
    $(":submit")[0].onclick = function () {
        var profile = {
            firstName: $("[name='profile.firstName']").val(),
            lastName: $("[name='profile.lastName']").val(),
            login: $("[name='profile.login']").val(),
            email: $("[name='profile.email']").val()
        };
        var credentials = {password: {value: password.val()}};
        $.ajax({
            type: "POST",
            url: "/api/v1/users",
            data: JSON.stringify({profile: profile, credentials: credentials}),
            contentType: "application/json"
        }).done(function () {
            alert("New user was added."); // TODO add error checking, improve feedback, add second password field to compare with first.
        });
        return false; // Cancel the form.submit.
    };
})();
