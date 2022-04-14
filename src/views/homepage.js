import { html, render } from "../../node_modules/lit-html/lit-html.js"

const mainElement = document.querySelector('#content-main')

const homepageTemplate = () => html`
    <div class="password">
        <h1>Welcome</h2>
        <input placeholder="email">
        <input type="password" placeholder="password">
    </div>
`

export function renderHomepage() {
    render(homepageTemplate(), mainElement)
}

{/* <div class="password">
    <h2>Website Name</h2>
    <label>password</label>
    <input type="password" value="password">
    <input type="checkbox">Show Password
    <a href="/edit">Edit</a>
    <a href="/delete">Delete</a>
</div>
<div class="password">
    <h2>Website Name</h2>
    <label>password</label>
    <input type="password" value="password">
    <input type="checkbox">Show Password
    <a href="/edit">Edit</a>
    <a href="/delete">Delete</a>
</div>
<div class="password">
    <h2>Website Name</h2>
    <label>password</label>
    <input type="password" value="password">
    <input type="checkbox">Show Password
    <a href="/edit">Edit</a>
    <a href="/delete">Delete</a>
</div> */}