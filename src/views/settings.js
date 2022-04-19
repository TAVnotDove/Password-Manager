import { html, render } from "../../node_modules/lit-html/lit-html.js"

const mainElement = document.querySelector('#content-main')

const settingsTemplate = () => html`
    <h1 class="page-title">Settings</h1>
    <input placeholder="email">
    <input type="password" placeholder="password">
`

export function renderSettings() {
    render(settingsTemplate(), mainElement)
}