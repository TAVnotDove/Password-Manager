import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getUser } from "../utils/getUser.js"

const headerElement = document.querySelector('#nav-header')

const navigationTemplate = (loggedIn) => html`
    <nav>
        <div class="nav-buttons">
            <a class="button" href="/">Home</a>
            ${loggedIn !== null ? html`
                <a class="button" href="/create-password">Create new password</a>
                <a class="button" href="/settings">Settings</a>
                <a class="button" href="/logout">Logout</a>
            ` : html`
                <a class="button" href="/register">Register</a>
                <a class="button" href="/login">Login</a>
            `
            }
        </div>
    </nav>
`

export function renderNavigation(ctx, next) {
    render(navigationTemplate(getUser()), headerElement)

    let navButtons = Array.from(document.querySelectorAll('.nav-buttons .button'))

    navButtons.forEach(x => x.classList.remove('active'))

    let activeButton = navButtons.find(x => x.pathname === ctx.pathname)

    if (activeButton) {
        activeButton.classList.add('active')
    }
    
    next()
}