import Router from 'koa-router'
import controllers from '../controllers'

const router = new Router()

// Status
router.get('/', controllers.status.getStatus)

// // Sessions
// router.post('/sessions', controllers.session.create)
//
// // Users
router.post('/users', controllers.users.register)
router.get('/users', controllers.users.getUsers)
router.get('/users/:id', controllers.users.getUser)
// router.post('/users/reset-password', controllers.user.resetPassword)

const routes = router.routes()
export default routes
