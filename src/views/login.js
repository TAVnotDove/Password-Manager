import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api.js"

const mainElement = document.querySelector('#content-main')

const loginTemplate = (submitForm) => html`
    <h1 class="page-title">Login</h1>
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
            <button>Submit</button>
            <p class="error-message"></p>
        </form>
    </div>
`

export function renderLogin(ctx) {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()

        if (email.length !== 0 && password.length !== 0) {
            let response = await login(email, password)
            
            if (response) {
                localStorage.setItem('user', JSON.stringify({email, response}))
                ctx.page.redirect('/')
            } else {
                document.querySelector('.error-message').textContent = "Incorrect email or password."
            }
        } else {
            document.querySelector('.error-message').textContent = "Please fill in both input fields."
        }
    }

    render(loginTemplate(submitForm), mainElement)
}