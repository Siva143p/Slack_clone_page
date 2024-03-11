//variables for signup form
const user_name = document.querySelector('#name');
const password = document.querySelector('#s-pwd');
const c_password = document.querySelector('#c-pwd');
const e_mail = document.querySelector('#s-email');

//variables for login form
const login_password = document.querySelector('#pwd');
const login_email = document.querySelector('#e-mail');
const rem_me = document.querySelector('#checkbox_rem--mee');

console.log(user_name);


//Signup input Validation
signup_InputValidation = () => {
    const username_val = user_name.value.trim();
    const email_val = e_mail.value.trim();
    const password_val = password.value.trim();
    const conform_pass_val = c_password.value.trim();

    let success = true;

    if (username_val === '') {
        set_error(user_name, 'Name please!');
        success = false;
    } else {
        set_success(user_name);
    }

    if (password_val === '') {
        set_error(password, 'Password please!');
        success = false;
    } else if (password_val.length < 8) {
        set_error(password, 'Password has to contain 8 characters or more!');
        success = false;
    } else {
        set_success(password);
    }

    if (conform_pass_val === '') {
        set_error(c_password, 'Enter conform password!');
        success = false;
    } else if (conform_pass_val !== password_val) {
        set_error(c_password, "Password doesn't match!");
        success = false;
    } else {
        set_success(c_password);
    }

    if (email_val === '') {
        set_error(e_mail, 'Enter an e-mail!');
        success = false;
    } else if (!A_validEmail(email_val)) {
        set_error(e_mail, 'Enter a valid e-mail!');
        success = false;
    } else if (Signup_Authentication(email_val)) {
        set_error(e_mail, 'Email already exists');
        success = false;
    } else {
        set_success(e_mail);
    }


    return success;
}

//Login input Validation
login_InputValidation = () => {
    const log_pass = login_password.value.trim();
    const log_email = login_email.value.trim();

    let success = true;

    if (log_email === '') {
        set_error(login_email, 'Enter an e-mail!');
    } else if (!A_validEmail(log_email)) {
        set_error(login_email, 'Enter a valid e-mail!');
        success = false;
    } else if (!Signup_Authentication(log_email)) {
        set_error(login_email, "Email doesn't exists");
        success = false;
    } else {
        set_success(login_email);
    }

    if (log_pass === '') {
        set_error(login_password, 'Enter the password!');
        success = false;
    } else if (!Login_Authentication(log_email, log_pass)) {
        set_error(login_password, 'Incorrect password!');
        success = false;
    } else {
        set_success(login_password);
    }

    return success;
}

//Setting error if input is invalid
set_error = (inp, error_msg) => {
    const target_input = inp.parentElement;
    const error_div = target_input.querySelector('.span--div');

    error_div.innerText = error_msg;
    error_div.classList.add('error');
}

//Setting success if input is valid
set_success = (inp) => {
    const target_input = inp.parentElement;
    const error_div = target_input.querySelector('.span--div');

    error_div.innerText = '';
    error_div.classList.remove('error');
}

//E-mail validation
A_validEmail = (emailAdress) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex))
        return true;

    else
        return false;
}

//Signup Authentication
Signup_Authentication = (key_value) => {
    user_info_checking_arr = JSON.parse(localStorage.getItem('users'));

    if (user_info_checking_arr) {
        const user_email = user_info_checking_arr.find(val => val.email === key_value);
        if (user_email) {
            console.log('email exists');
            return true;
        } else {
            console.log("email doesn't exists");
            return false;
        }
    } else {
        console.log('No user data found in local storage');
        return false;
    }

}

//login Authentication
Login_Authentication = (login_e, login_pass) => {
    user_info_checking_arr = JSON.parse(localStorage.getItem('users'));

    if (user_info_checking_arr) {
        const user_email = user_info_checking_arr.find(val => val.email === login_e && val.password === login_pass);
        if (user_email) {
            console.log('both exists');
            return true;
        } else {
            console.log("both doesn't exists");
            return false;
        }
    } else {
        console.log('No user data found in local storage');
        return false;
    }

}

//Login button
document.querySelector('#login--form').addEventListener('submit', (e) => {

    if (!login_InputValidation()) {
        e.preventDefault();
    } else {
        console.log("login success");
        login_password.value = '';
        login_email.value = '';

        window.location.href = "index.html";
        // window.location.reload();

    }
})

user_info = {}
arr = []
arr = JSON.parse(localStorage.getItem('users')) || [];

//Signup button
document.querySelector('#signup--form').addEventListener('submit', (e) => {

    if (!signup_InputValidation()) {
        e.preventDefault();
    } else {
        console.log("signup success");

        user_info['username'] = user_name.value.trim();
        user_info['email'] = e_mail.value.trim();
        user_info['password'] = password.value.trim();
        console.log(`obj: ${user_info}`);

        arr.push(user_info);
        localStorage.setItem('users', JSON.stringify(arr));

        user_info = {}
        user_name.value = '';
        e_mail.value = '';
        password.value = '';
        c_password.value = '';

        flip_card(e);
    }
})

console.log(`arr: ${arr}`);

//login & signup card animation
flip_card = (e) => {
    let card = document.querySelector('.log--sign--card');
    if (e.className == 'sign--up') {
        card.style.transform = 'rotateY(180deg)';
    } else if (e.className == 'log--in') {
        card.style.transform = 'rotateY(0deg)';
    }
}