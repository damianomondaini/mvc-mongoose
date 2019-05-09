let Todo = require('../models/todo.model')

exports.todo_create = (req, res, next) => {
    if (req.body.todo) {
        let todo = new Todo({
            todo: req.body.todo
        })

        todo.save((err) => {
            if (err) throw err
        })
        next()
    } else {
        next()
    }
}

exports.todo_all = (req, res, next) => {
    Todo.find((err, todo) => {
        if (err) throw err
        res.locals['todo'] = todo
        next()
    })
}

exports.todo_delete = (req, res, next) => {
    if (req.params.id) {
        Todo.findByIdAndRemove(req.params.id, (err) => {
            if (err) throw err
            next()
        })
    }
}