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
          document.getElementById('data-container').innerHTML = data;
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

  let payload = {username: usernameField.value, password: passwordField.value};

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
      getSignUp();
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

  let payload = {username: usernameField.value, password: passwordField.value};

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
        document.getElementById('data-container').innerHTML = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      console.error('Error:', textStatus, errorThrown);
    }
  });
}

//DELIGATING EVENTS
document.getElementById('data-container').addEventListener('click', function(event) {
  //Delegating link click events
  switch (event.target.id) {
    case 'profile-link':
      event.preventDefault();
      getProfile();
      break;
    case 'logout-link':
      event.preventDefault();
      getLogout();
      break;
    case 'signin-link':
      event.preventDefault();
      getSignIn();
      break;
  }

  //Delegating profile button click events
  if (event.target.classList.contains('profile-modify-button')) {
    const dataIndex = event.target.getAttribute('data-index');
    getEditorDisplay(dataIndex);
  }

  if(event.target.classList.contains('profile-delete-button')) {
    const dataIndex = event.target.getAttribute('data-index');
    //console.log(dataIndex);
    postProfileDelete(dataIndex-1);
  }
});



//PROFILE GET
function getProfile() {
  url = getCurrentUrl();
  
  $.ajax({
      url: url + 'profile',
      method: 'GET',
      dataType: 'html',
      success: function(data) {
        // Handle the successful response
          document.getElementById('data-container').innerHTML = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors
        console.error('Error:', textStatus, errorThrown);
      }
  });
}


// LOGOUT GET
function getLogout() {
  url = getCurrentUrl();

  $.ajax({
    url: url + 'logout',
    method: 'GET',
    dataType: 'html',
    success: function(data) {
      // Handle the successful response
      //document.getElementById('template-container').innerHTML = data;
      document.getElementById('data-container').innerHTML = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      console.error('Error:', textStatus, errorThrown);
    }
  });
}

//DISPLAY SYSTEM IN EDITOR
function getEditorDisplay(animationIdx) {
  let url = getCurrentUrl();

  const queryString = $.param({animationIdx : animationIdx});
  window.location.href = '/editor/display?' + queryString;
}

//DELETE USER'S SYSTEM
function postProfileDelete(animationIdx) {
  let url = getCurrentUrl();

  const payload = {toDelete: animationIdx};

  $.ajax({
    url: url + 'profile/delete',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: 'json',
    success: function(data) {
      getProfile();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      
    }
  });
}

function postSaveSystem() {
  url = getCurrentUrl();
  let systemName = document.getElementById('sname').value;
  let saveErrorDiv = document.getElementById('save-error');

  let planetsSerialized = [];
  planetList.forEach(planet => {
    planetsSerialized.push(planet.serialize());
  });
  let payload = {name: systemName, userId: '', planets: planetsSerialized};

  $.ajax({
    url: '/editor/savesystem',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: 'json',
    success: function(data) {
      saveErrorDiv.innerHTML = 'System was saved succesfully!'
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Handle errors
      let errorJSON = JSON.parse(jqXHR.responseText);
      // console.log(errorJSON);
      saveErorrDiv.innerHTML = errorJSON.systemName;
    }
  });
}

