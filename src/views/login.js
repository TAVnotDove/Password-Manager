import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api.js"

const mainElement = document.querySelector('#content-main')

const loginTemplate = (submitForm) => html`
    <form id="createPass" @submit=${submitForm}>
        <h2>Login</h2>
        <div>
            <label>Email</label>
            <input name="email">
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password">
        </div>
        <button>Submit</button>
        <p id="error-message"></p>
    </form>
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
                document.querySelector('#error-message').textContent = "Incorrect email or password."
            }
        }
    }

    render(loginTemplate(submitForm), mainElement)
}