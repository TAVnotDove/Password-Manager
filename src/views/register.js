import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api.js"

const mainElement = document.querySelector('#content-main')

const registerTemplate = (submitForm) => html`
    <h1 class="page-title">Register</h1>
    <div class="flex-div">
        <form class="flex-form" @submit=${submitForm}>
            <div class="flex-form-div">
                <label>Email</label>
                <input name="email">
            </div>
            <div class="flex-form-div">
                <label>Password</label>
                <input name="password" type="password">
            </div>
            <div class="flex-form-div">
                <label>Repeat Password</label>
                <input name="repeat-password" type="password">
            </div>
            <button type="submit">Submit</button>
            <p class="error-message"></p>
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

        if (email.length !== 0 && password.length !== 0 && repeatPassword.length !== 0) {
            if (password === repeatPassword) {
                let response = await register(email, password)
                
                if (response) {
                    localStorage.setItem('user', JSON.stringify({email, response}))
                    ctx.page.redirect('/')
                } else {
                    document.querySelector('.error-message').textContent = "A user with the same email already exists."
                }
            } else {
                document.querySelector('.error-message').textContent = "Passwords don't match."
            }
        } else {
            document.querySelector('.error-message').textContent = "Please fill in all input fields."
        }
    }

    render(registerTemplate(submitForm), mainElement)
}