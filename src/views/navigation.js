import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getUser } from "../utils/getUser.js"

const headerElement = document.querySelector('#nav-header')

const navigationTemplate = (loggedIn) => html`
    <nav>
        <a class="nav-button" href="/">Home</a>
            ${loggedIn !== null ? html`
                <a class="nav-button" href="/create-password">Create new password</a>
                <a class="nav-button" href="/settings">Settings</a>
                <a class="nav-button" href="/logout">Logout</a>
            ` : html`
                <a class="nav-button" href="/register">Register</a>
                <a class="nav-button" href="/login">Login</a>
            `
            }
    </nav>
`

export function renderNavigation(ctx, next) {
    render(navigationTemplate(getUser()), headerElement)
    next()
}