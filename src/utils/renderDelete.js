import { deletePassword } from "../api.js"
import { getUser } from "./getUser.js"

export async function renderDelete(ctx) {
    let user = JSON.parse(getUser())
    
    if (confirm("Are you sure you want to delete this password?") === true) {
        deletePassword(user.response.key, user.email, ctx.params.id)
        ctx.page.redirect('/')
    } else {
        ctx.page.redirect('/')
    }
}