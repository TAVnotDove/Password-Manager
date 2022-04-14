export function renderLogout(ctx) {
    localStorage.clear()

    ctx.page.redirect('/')
}