var form = document.getElementById("form")
var inputName = document.getElementById("inputName")
var inputEmail = document.getElementById("inputEmail")
var inputPassword = document.getElementById("inputPassword")
var signInLink = document.getElementById("signInLink")
var rowLogIn = document.getElementById("rowLogIn")
var rowSignIn = document.getElementById("rowSignIn")
var submitSignUp = document.getElementById("submitSignUp")
var signUpLink = document.getElementById("signUpLink")
var inputNameLogIn = document.getElementById("inputNameLogIn")
var inputPasswordLogIn = document.getElementById("inputPasswordLogIn")
var submitLogIn = document.getElementById("submitLogIn")
var home = document.getElementById("home")
var welcomeUser = document.getElementById("welcomeUser")
var parentContainer = document.getElementById("parentContainer")
var logOutBtn = document.getElementById("logOutBtn")
var regexNm;
var regexEm;
var regexPass;
// form.addEventListener('submit', function (eventInfo) {
//     eventInfo.preventDefault()
// })
signInLink.addEventListener('click', function (eventInfo) {
    rowLogIn.classList.remove('d-none')
    rowSignIn.classList.add('d-none')

})
signUpLink.addEventListener('click', function (eventInfo) {
    rowLogIn.classList.add('d-none')
    rowSignIn.classList.remove('d-none')

})
var container;
if (localStorage.getItem('users')) {
    container = JSON.parse(localStorage.getItem('users'))
} else {
    container = [];
}
var userObj;
function findSameUsers() {
    for (var i = 0; i < container.length; i++) {
        if (inputName.value == container[i].userName && inputEmail.value == container[i].userEmail) {
            var overlayTwo = document.getElementById('overlayTwo');
            var popupTwo = document.getElementById('popupTwo');
            overlayTwo.style.opacity = '1';
            overlayTwo.style.visibility = 'visible';
            popupTwo.classList.add('open');
            overlayTwo.addEventListener('click', function (e) {
                if (e.target === overlayTwo) {
                    overlayTwo.style.opacity = '0';
                    overlayTwo.style.visibility = 'hidden';
                    popupTwo.classList.remove('open');
                }
            });
            container.splice(i, 1)
        }
    }
}
submitSignUp.addEventListener('click', function (eventInfo) {
    var user = {
        userName: inputName.value,
        userEmail: inputEmail.value,
        userPassword: inputPassword.value,
    }
    userObj = user
    if (regexNm.test(inputName.value) && regexEm.test(inputEmail.value) && regexPass.test(inputPassword.value)) {
        findSameUsers()
        container.push(user)
        localStorage.setItem('users', JSON.stringify(container))
        console.log(container);
        clearForm()
    } else {
        var overlay = document.getElementById('overlay');
        var popup = document.getElementById('popup');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        popup.classList.add('open');
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                popup.classList.remove('open');
            }
        });
    }
    inputEmail.nextElementSibling.innerHTML = '';
    inputEmail.classList.remove('is-invalid', 'is-valid')
    inputName.nextElementSibling.innerHTML = '';
    inputName.classList.remove('is-invalid', 'is-valid')
    inputPassword.nextElementSibling.innerHTML = '';
    inputPassword.classList.remove('is-invalid', 'is-valid')
})


inputName.addEventListener('input', function (eventInfo) {
    var regexName = /^(?!.*\s{2})[A-Za-z\s'-]{2,30}$/;
    regexNm = regexName
    if (regexName.test(inputName.value)) {
        inputName.nextElementSibling.innerHTML = 'valid Name';
        inputName.nextElementSibling.style.color = '#82D53B'
        inputName.classList.add('is-valid', 'fw-semibold')
        inputName.classList.remove('is-invalid')
    } else {
        inputName.nextElementSibling.innerHTML = "oobs, name doesn't macth";
        inputName.nextElementSibling.style.color = 'red'
        inputName.classList.add('is-invalid', 'fw-semibold')
        inputName.classList.add('is-valid')
    }
})
inputEmail.addEventListener('input', function (eventInfo) {
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    regexEm = regexEmail
    if (regexEmail.test(inputEmail.value)) {
        inputEmail.nextElementSibling.innerHTML = 'valid Email';
        inputEmail.nextElementSibling.style.color = '#82D53B'
        inputEmail.classList.add('is-valid', 'fw-semibold')
        inputEmail.classList.remove('is-invalid')
    } else {
        inputEmail.nextElementSibling.innerHTML = "oobs, Email doesn't macth";
        inputEmail.nextElementSibling.style.color = 'red'
        inputEmail.classList.add('is-invalid', 'fw-semibold')
        inputEmail.classList.add('is-valid')
    }
})
inputPassword.addEventListener('input', function (eventInfo) {
    var regexPassword = /^[a-zA-Z0-9_@#!$%^&*()-+=]{6,16}$/;
    regexPass = regexPassword
    if (regexPassword.test(inputPassword.value)) {
        inputPassword.nextElementSibling.innerHTML = 'valid stronge Password';
        inputPassword.nextElementSibling.style.color = '#82D53B'
        inputPassword.classList.add('is-valid', 'fw-semibold')
        inputPassword.classList.remove('is-invalid')
    } else {
        inputPassword.nextElementSibling.innerHTML = "oobs, Password is very easy create a stronger one";
        inputPassword.nextElementSibling.style.color = 'red'
        inputPassword.classList.add('is-invalid', 'fw-semibold')
        inputPassword.classList.add('is-valid')
    }
})

function clearForm() {
    inputName.value = '';
    inputEmail.value = '';
    inputPassword.value = '';
    inputNameLogIn.value = '';
    inputPasswordLogIn.value = '';
}

var currentUser;
submitLogIn.addEventListener('click', function (eventInfo) {
    for (var i = 0; i < container.length; i++) {
        if (container[i].userName == inputNameLogIn.value && container[i].userPassword == inputPasswordLogIn.value) {
            currentUser = inputNameLogIn.value
            rowLogIn.classList.add('d-none')
            parentContainer.classList.add('d-none')
            home.classList.remove('d-none')
            welcomeUser.innerHTML = `Welcome ${currentUser}`
        }
    }
    clearForm()
    exict()
})
var f;
function exict() {
    for (var i = 0; i < container.length; i++) {
        if (container[i].userName == inputNameLogIn.value && container[i].userPassword == inputPasswordLogIn.value) {
            inputPasswordLogIn.nextElementSibling.innerHTML = 'email exicts you can login !'
            inputPasswordLogIn.nextElementSibling.style.color = '#82D53B'
            f = i;
            break;
        } else {
            inputPasswordLogIn.nextElementSibling.innerHTML = "email doesn't exict !, sign up first";
            inputPasswordLogIn.nextElementSibling.style.color = '#8B0000';
        }
    }
}

logOutBtn.addEventListener('click', function (eventInfo) {
    home.classList.add('d-none');
    rowLogIn.classList.remove('d-none');
    parentContainer.classList.remove('d-none')
    inputPasswordLogIn.nextElementSibling.innerHTML = "";
    container.splice(f, 1)
    localStorage.setItem('users', JSON.stringify(container))
    console.log(container);
    console.log(f)
})

console.log(container);