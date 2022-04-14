import page from '../node_modules/page/page.mjs'
import { renderCreatePassword } from './views/createPassword.js'
import { renderEdit } from './views/edit.js'
import { renderHomepage } from './views/homepage.js'
import { renderLogin } from './views/login.js'
import { renderNavigation } from './views/navigation.js'
import { renderRegister } from './views/register.js'

page(renderNavigation)
page('/', renderHomepage)
page('/create-password', renderCreatePassword)
page('/register', renderRegister)
page('/login', renderLogin)
page('/settings', () => console.log('settings'))
page('/logout', () => console.log('logout'))
page('/edit', renderEdit)
page('/delete', () => console.log('delete'))
page.start()