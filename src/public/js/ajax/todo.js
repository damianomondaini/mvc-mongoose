function buildTodo(todo) {
    let todoHtml = '<li class="list-group-item dashb-todo" id="' + todo._id + '"><p>' + todo.todo + '</p><a href="/admin/' + todo._id + '/todo-remove"><i class="fas fa-times delete-todo"></i></a></li>'
    return todoHtml
}

$(document).ready(() => {
    $('#todo').on('submit', (e) => {
        e.preventDefault()
        let formData = $(e.target).serialize()
        $('#todo > form').trigger('reset')

        $.ajax({
            url: '/admin/todo-add',
            type: 'POST',
            data: formData
        })
        .done((data) => {
            let todo = buildTodo(data.todo)
            $('.todo-list').append(todo)
        })
    })

    $('#todo').on('click', '.delete-todo', function(e) {
        e.preventDefault()
        let todo = $(this).closest('.dashb-todo')
        let id = $(todo).attr('id')

        $.ajax({
            url: '/admin/' + id + '/todo-remove',
            type: 'GET'
        })
        .done(
            $(todo).remove()
        )
    })
})