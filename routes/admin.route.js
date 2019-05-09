let express = require('express')
let router = express.Router()
let user_controller = require('../controllers/user.controller')
let todo_controller = require('../controllers/todo.controller')

router.get('/', user_controller.user_count, todo_controller.todo_all, (req, res) => {
    res.render('admin/dashboard', { data: res.locals, board: 'main' })
})

router.post('/todo-add', todo_controller.todo_create, (req, res) => {
    res.redirect('/admin')
})

router.get('/:id/todo-remove', todo_controller.todo_delete, (req, res) => {
    res.redirect('/admin')
})

module.exports = router