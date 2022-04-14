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
    </form>
`

export function renderLogin() {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()

        if (email.length !== 0 && password.length !== 0) {
            login(email, password)
            e.currentTarget.reset()
        }
    }

    render(loginTemplate(submitForm), mainElement)
}