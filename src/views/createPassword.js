import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { createPassword } from "../api.js"
import { getUser } from "../utils/getUser.js"

const mainElement = document.querySelector('#content-main')

const createPasswordTemplate = (submitForm) => html`
    <h1 class="page-title">Create new password</h1>
    <div class="flex-div">
        <form class="flex-form" @submit=${submitForm}>
            <div class="flex-form-div">
                <label>URL</label>
                <input name="url" placeholder="Optional">
            </div>
            <div class="flex-form-div">
                <label>Description</label>
                <input name="description" placeholder="Optional">
            </div>
            <div class="flex-form-div">
                <label>Email</label>
                <input name="email" placeholder="Required">
            </div>
            <div class="flex-form-div">
                <label>Name</label>
                <input name="name" placeholder="Required">
            </div>
            <div class="flex-form-div">
                <label>Password</label>
                <input type="checkbox" @click=${showPassword}>Show
                <input name="password" type="password" placeholder="Required">
            </div>
            <button>Submit</button>
        </form>
    </div>
`

export function renderCreatePassword(ctx) {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let url = formData.get('url').trim()
        let description = formData.get('description').trim()
        let email = formData.get('email').trim()
        let name = formData.get('name').trim()
        let password = formData.get('password').trim()

        if (email.length !== 0 && name.length !== 0 && password.length !== 0) {
            let user = JSON.parse(getUser())
            
            let response = await createPassword(user.response.key, user.email, url, description, email, name, password)
            ctx.page.redirect('/')
        }
    }

    render(createPasswordTemplate(submitForm), mainElement)
}

function showPassword(e) {
    if (e.currentTarget.checked === true) {
        e.currentTarget.parentElement.querySelector('[name="password"]').type = 'text'
    } else {
        e.currentTarget.parentElement.querySelector('[name="password"]').type = 'password'
    }
}

{/* <h1 class="page-title">Create new password</h1>
    <div class="flex-div">
        <form class="form" @submit=${submitForm}>
            <div>
                <label>URL</label>
                <input name="url" placeholder="Optional">
            </div>
            <div>
                <label>Description</label>
                <input name="description" placeholder="Optional">
            </div>
            <div>
                <label>Email</label>
                <input name="email" placeholder="Required">
            </div>
            <div>
                <label>Name</label>
                <input name="name" placeholder="Required">
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" placeholder="Required">
                <input type="checkbox" @click=${showPassword}>Show Password
            </div>
            <button>Submit</button>
        </form>
    </div> */}