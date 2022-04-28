import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api.js"

const mainElement = document.querySelector('#content-main')

const registerTemplate = (submitForm) => html`
    <h1 class="page-title">Register</h1>
    <div class="flex-div">
        <form class="flex-form" @submit=${submitForm}>
            <div class="flex-form-div">
                <label>Email</label>
                <input name="email" placeholder="email@domain.extension">
            </div>
            <div class="flex-form-div">
                <label>Password</label>
                <input name="password" type="password" placeholder="••••••">
            </div>
            <div class="flex-form-div">
                <label>Repeat Password</label>
                <input name="repeat-password" type="password" placeholder="••••••">
            </div>
            <button type="submit">Submit</button>
            <p class="error-message"></p>
            <p class="requirements">Password should: <br>-be at least 6 characters long;<br>-have a small letter, capital letter, symbol, number.</p>
        </form>
    </div>
`

export function renderRegister(ctx) {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()
        let repeatPassword = formData.get('repeat-password').trim()

        let emailRegExp = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/gm
        let passwordRegExp = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{6,}$/gm
        let emailIsValid = email.match(emailRegExp)
        let passwordIsValid = password.match(passwordRegExp)

        let errorMessageElement = document.querySelector('.error-message')

        if (email.length !== 0 && password.length !== 0 && repeatPassword.length !== 0) {
            if (emailIsValid) {
                if (passwordIsValid) {
                    if (password === repeatPassword) {
                        let response = await register(email, password)
                        
                        if (response) {
                            localStorage.setItem('user', JSON.stringify({email, response}))
                            ctx.page.redirect('/')
                        } else {
                            errorMessageElement.textContent = "A user with the same email already exists."
                        }
                    } else {
                        errorMessageElement.textContent = "Passwords don't match."
                    }
                } else {
                    errorMessageElement.textContent = "Invalid password format."
                }
            } else {
                errorMessageElement.textContent = "Invalid email format."
            }
        } else {
            errorMessageElement.textContent = "Please fill in all input fields."
        }
    }

    render(registerTemplate(submitForm), mainElement)
}