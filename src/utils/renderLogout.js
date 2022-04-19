export function renderLogout(ctx) {
    if (confirm("Are you sure you want to logout?") === true) {
        localStorage.clear()
        ctx.page.redirect('/')
    } else {
        ctx.page.redirect('/')
    }
}