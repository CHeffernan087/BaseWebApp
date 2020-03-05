function myFunction() {
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // jQuery can do a lot of crazy stuff so make sure to google around to find out more

  $("#demo").html("NEWWW PARAGRAPH #javascript #fire");

  // 'img-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#doge-image").append(
    `<img class="img-circle" src="images/wowdoge.jpeg" />`
  );
}

function submitForm() {
  const title = $("#title").val();
  const body = $("#body").val();
  addMessage(body, title);
}

// Gets called whenever the user clicks "sign in" or "sign out".
function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // if the user's not logged in, handle login
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log("success");
      })
      .catch(function(error) {
        console.error("error", error);
      });
  } else {
    // handle logout
    firebase.auth().signOut();
  }
  //This disables the button until login or logout is successful. You'll want to replace 'login-button' with the id of your login button.
  $("#login").attr("disabled", true);
}

function addMessage(title, body) {
  var postData = {
    title: title,
    body: body
  };

  var newPostKey = firebase
    .database()
    .ref()
    .child("stream")
    .push().key;

  firebase
    .database()
    .ref("/stream/" + newPostKey)
    .set(postData);
}

window.onload = function() {
  const databaseStreamReference = firebase.database().ref("/stream/");

  databaseStreamReference.on("value", function(snapshot) {
    var messages = snapshot.val();
    $("#stream").empty();

    if (messages) {
      Object.keys(messages).forEach(function(key) {
        const message = messages[key];
        $("#stream").append(`<div>${message.body}</div>`);
      });
    }
  });
};
