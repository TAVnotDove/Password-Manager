import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getPassword } from "../api.js"
import { getUser } from "../utils/getUser.js"

const mainElement = document.querySelector('#content-main')

const editTemplate = (submitForm, response) => html`
    <form id="createPass" @submit=${submitForm}>
        <h2>Edit password</h2>
        <div>
            <label>URL</label>
            <input name="url" value=${response.url}>
        </div>
        <div>
            <label>Description</label>
            <input name="description" value=${response.description}>
        </div>
        <div>
            <label>Email</label>
            <input name="email" value=${response.email}>
        </div>
        <div>
            <label>Name</label>
            <input name="name" value=${response.name}>
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" value=${response.password}>
        </div>
        <button>Submit</button>
    </form>
`


export async function renderEdit(ctx) {
    async function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let url = formData.get('url').trim()
        let description = formData.get('description').trim()
        let email = formData.get('email').trim()
        let name = formData.get('name').trim()
        let password = formData.get('password').trim()

        if (email.length !== 0 && name.length !== 0 && password.length !== 0) {
            console.log(email, name, password)
            e.currentTarget.reset()
        }
    }

    let user = JSON.parse(getUser())
    let response = await getPassword(user.response.key, user.email, ctx.params.id)

    render(editTemplate(submitForm, response), mainElement)
}