////////////////////////
function getCurrentUrl() {
    return window.location.href;
}


function signIn() {
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

// PROFILE GET
document.getElementById('profileLink').addEventListener('click', function(event) {
    event.preventDefault();
    getProfile();
})

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

// EDITOR GET
document.getElementById('editorLink').addEventListener('click', function(event) {
    event.preventDefault();
    //getProfile();
})

function getEditor() {
    
    url = getCurrentUrl();
    $.ajax({
        url: url + 'editor',
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

