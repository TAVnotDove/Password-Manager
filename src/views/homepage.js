import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getPasswords } from "../api.js"
import { getUser } from "../utils/getUser.js"

const mainElement = document.querySelector('#content-main')

const passwordTemplate = (passwords) => html`
    <div class="flex-div">
        ${passwords.length === 0 ? html`
            <p>You don't have any passwords.</p>
        ` : passwords.map(x => html`
            <div class="password">
                <h2>${x.name}</h2>
                <label>password</label>
                <input type="password" id="password" value=${x.password}>
                <input type="checkbox" @click=${showPassword}>Show Password
                <a href="/edit/${x._id}">Edit</a>
                <a href=${`/delete/${x._id}`}>Delete</a>
            </div>
        `)}
    </div>
`

const homepageTemplate = (user, passwords) => html`
        ${user ? html`
            <h1 class="page-title">Welcome ${user.email}</h1>
            ${passwordTemplate(passwords)}
        ` : html`
            <h1 class="page-title">Welcome to Password Manager!</h2>
        `}
`

export async function renderHomepage() {
    let user = JSON.parse(getUser())

    if (user) {
        let passwords = Object.values(await getPasswords(user.response.key, user.email))
        
        render(homepageTemplate(user, passwords), mainElement)
    } else {
        render(homepageTemplate(user), mainElement)
    }
}

function showPassword(e) {
    if (e.currentTarget.checked === true) {
        e.currentTarget.parentElement.querySelector('#password').type = 'text'
    } else {
        e.currentTarget.parentElement.querySelector('#password').type = 'password'
    }
}