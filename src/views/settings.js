import { html, render } from "../../node_modules/lit-html/lit-html.js"

const mainElement = document.querySelector('#content-main')

const settingsTemplate = () => html`
    <div class="password">
        <h1>Welcome</h2>
        <input placeholder="email">
        <input type="password" placeholder="password">
    </div>
`

export function renderSettings() {
    render(settingsTemplate(), mainElement)
}