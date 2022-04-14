import page from '../node_modules/page/page.mjs'
import { renderDelete } from './utils/renderDelete.js'
import { renderLogout } from './utils/renderLogout.js'
import { renderCreatePassword } from './views/createPassword.js'
import { renderEdit } from './views/edit.js'
import { renderHomepage } from './views/homepage.js'
import { renderLogin } from './views/login.js'
import { renderNavigation } from './views/navigation.js'
import { renderRegister } from './views/register.js'
import { renderSettings } from './views/settings.js'

page(renderNavigation)
page('/', renderHomepage)
page('/create-password', renderCreatePassword)
page('/register', renderRegister)
page('/login', renderLogin)
page('/settings', renderSettings)
page('/logout', renderLogout)
page('/edit/:id', renderEdit)
page('/delete/:id', renderDelete)
page.start()