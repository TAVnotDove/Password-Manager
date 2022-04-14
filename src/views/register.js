import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api.js"

const mainElement = document.querySelector('#content-main')

const registerTemplate = (submitForm) => html`
    <form id="createPass" @submit=${submitForm}>
        <h2>Register</h2>
        <div>
            <label>Email</label>
            <input name="email">
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password">
        </div>
        <div>
            <label>Repeat Password</label>
            <input name="repeat-password" type="password">
        </div>
        <button>Submit</button>
    </form>
`

export function renderRegister() {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()
        let repeatPassword = formData.get('repeat-password').trim()

        if (email.length !== 0 && password.length !== 0 && repeatPassword.length !== 0) {
            if (password === repeatPassword) {
                let response = await register(email, password)
                
                console.log(response)
                e.currentTarget.reset()
            }
        }
    }

    render(registerTemplate(submitForm), mainElement)
}