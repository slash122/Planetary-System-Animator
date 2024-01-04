////////////////////////
function getCurrentUrl() {
    return window.location.href;
}

function getSignUp() {
  url = getCurrentUrl();
  
  $.ajax({
      url: url + 'signup',
      method: 'GET',
      dataType: 'html',
      success: function(data) {
        // Handle the successful response
          document.getElementById('template-container').innerHTML = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors
        console.error('Error:', textStatus, errorThrown);
      }
  });
}

function postSignUp() {
  let url = getCurrentUrl();

  const usernameField = document.getElementById('username-field');
  const passwordField = document.getElementById('password-field');
  const usernameErrorDiv = document.getElementById('username-error');
  const passwordErrorDiv = document.getElementById('password-error');
  usernameErrorDiv.innerHTML = ''; passwordErrorDiv.innerHTML = '';

  const usernameFieldValue = usernameField.value;
  const passwordFieldValue = passwordField.value;

  let payload = {username: usernameFieldValue, password: passwordFieldValue};

  $.ajax({
    url: url + 'signup',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: 'json',
    success: function(data) {
      // Handle the successful response
      //document.getElementById('template-container').innerHTML = data;
      // console.log('POST /signup response handled');
      // window.location.href = '/editor'; //Izmenit
      //getSignUp();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      // console.error('Error:', textStatus, errorThrown);
      let errorJSON = JSON.parse(jqXHR.responseText);
      // console.log(errorJSON);
      usernameErrorDiv.innerHTML = errorJSON.username;
      passwordErrorDiv.innerHTML = errorJSON.password;
    }
  });
}

function postSignIn() {
  let url = getCurrentUrl();

  const usernameField = document.getElementById('username-field');
  const passwordField = document.getElementById('password-field');
  const usernameErrorDiv = document.getElementById('username-error');
  const passwordErrorDiv = document.getElementById('password-error');
  usernameErrorDiv.innerHTML = ''; passwordErrorDiv.innerHTML = '';

  const usernameFieldValue = usernameField.value;
  const passwordFieldValue = passwordField.value;

  let payload = {username: usernameFieldValue, password: passwordFieldValue};

  $.ajax({
    url: url + 'signin',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: 'json',
    success: function(data) {
      // Handle the successful response
      //document.getElementById('template-container').innerHTML = data;
      //document.getElementById('template-container').innerHTML = data;
      getSignIn();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      let errorJSON = JSON.parse(jqXHR.responseText);
      // console.log(errorJSON);
      usernameErrorDiv.innerHTML = errorJSON.username;
      passwordErrorDiv.innerHTML = errorJSON.password;
    }
  });
}

function getSignIn() {
  url = getCurrentUrl();

  $.ajax({
    url: url + 'signin',
    method: 'GET',
    dataType: 'html',
    success: function(data) {
      // Handle the successful response
        document.getElementById('template-container').innerHTML = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      console.error('Error:', textStatus, errorThrown);
    }
  });
}

//PROFILE GET

document.getElementById('profileLink').addEventListener('click', function(event) {
  event.preventDefault();
  getProfile();
});
  
function getProfile() {
  url = getCurrentUrl();
  
  $.ajax({
      url: url + 'profile',
      method: 'GET',
      dataType: 'html',
      success: function(data) {
        // Handle the successful response
          document.getElementById('template-container').innerHTML = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors
        console.error('Error:', textStatus, errorThrown);
      }
  });
}


// LOGOUT GET

document.getElementById('logoutLink').addEventListener('click', function(event) {
  event.preventDefault();
  getLogout();
});

function getLogout() {
  url = getCurrentUrl();

  $.ajax({
    url: url + 'logout',
    method: 'GET',
    dataType: 'html',
    success: function(data) {
      // Handle the successful response
      //document.getElementById('template-container').innerHTML = data;
      document.getElementById('template-container').innerHTML = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      console.error('Error:', textStatus, errorThrown);
    }
});
}

