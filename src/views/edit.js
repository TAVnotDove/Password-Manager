import { html, render } from "../../node_modules/lit-html/lit-html.js"

const mainElement = document.querySelector('#content-main')

const editTemplate = (submitForm) => html`
    <form id="createPass" @submit=${submitForm}>
        <h2>Edit password</h2>
        <div>
            <label>Website</label>
            <input name="website">
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password">
        </div>
        <button>Submit</button>
    </form>
`

export function renderEdit() {
    function submitForm(e) {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let website = formData.get('website').trim()
        let password = formData.get('password').trim()

        if (website.length !== 0 && password.length !== 0) {
            console.log(website, password)
            e.currentTarget.reset()
        }
    }

    render(editTemplate(submitForm), mainElement)
}