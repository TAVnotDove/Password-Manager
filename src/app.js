import page from '../node_modules/page/page.mjs'
import { renderHomepage } from './views/homepage.js'

page('/', renderHomepage)
page('/create-password', () => console.log('create-password'))
page('/register', () => console.log('register'))
page('/login', () => console.log('login'))
page('/settings', () => console.log('settings'))
page('/logout', () => console.log('logout'))
page('/edit', () => console.log('edit'))
page('/delete', () => console.log('delete'))
page.start()