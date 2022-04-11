const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');


username.onblur = function () {
    checkInputs(username);
};

email.onblur = function () {
    checkInputs(email);
};

password.onblur = function () {
    checkInputs(password);
};

passwordConfirmation.onblur = function () {
    checkInputs(passwordConfirmation);
};

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}


const setSuccessFor = (input) => {
    const formControl = input.parentElement;

    formControl.className = 'form-control success';
}

const checkInputs = (input) => {

    switch (input) {
        case username:
            const usernameValue = username.value;
            if (usernameValue === '') {
                setErrorFor(username, 'O nome do usuário é obrigatório!');
            } else {
                setSuccessFor(username);
            }
            break;
        case email:
            const emailValue = email.value;

            if (emailValue === '') {
                setErrorFor(email, 'O email é obrigatório!');
            } else if (!validateEmail(emailValue)) {
                setErrorFor(email, 'O email é inválido!');
            }
            else {
                setSuccessFor(email);
            }
            break;
        case password:
            const passwordValue = password.value;
            if (passwordValue === '') {
                setErrorFor(password, 'A senha é obrigatória!');
            } else if (passwordValue.length < 7) {
                setErrorFor(password, 'A senha deve conter no mínimo 7 caracteres!');
            } else {
                setSuccessFor(password);
            }
            break;
        case passwordConfirmation:
            const passwordConfirmationValue = passwordConfirmation.value;
            const passwordValue_conf = password.value;

            if (passwordConfirmationValue === '') {
                setErrorFor(passwordConfirmation, 'A confirmação de senha é obrigatória!');
            } else if (passwordValue_conf !== passwordConfirmationValue) {
                setErrorFor(passwordConfirmation, 'As senhas não conferem!');
            } else {
                setSuccessFor(passwordConfirmation);
            }
            break;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formControls = form.querySelectorAll('.form-control');

    const formIsValid = [...formControls].every((formControl) => {

        var elements = document.getElementsByTagName('input');

        for (let index = 0; index < elements.length; index++) {
            checkInputs(elements[index]);
        }

        return (formControl.className === "form-control success");
    })

    if (formIsValid) {
        console.log('Enviado');
    } else {
        console.log('Erro, não foi possível enviar');
    }
})

