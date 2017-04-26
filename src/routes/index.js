import Router from 'koa-router'
import controllers from '../controllers'

const router = new Router()

// Status
router.get('/', controllers.status.getStatus)

// Users
router.post('/users', controllers.users.register)
router.get('/users', controllers.users.getUsers)
router.get('/users/:id', controllers.users.getUser)

// Notes
router.post('/users/:id/notes', controllers.notes.createNote)
router.get('/users/:id/notes', controllers.notes.getNotes)
router.get('/users/:id/notes/:noteId', controllers.notes.getNote)

const routes = router.routes()
export default routes
