var updatePassword = false
var user
var row
var id

$('.update-editPassword').on('click', () => {
    let passwordGroup = $('.update-password')
    if ($("input[name='updatePassword']").prop("checked") === true) {
        passwordGroup.css('display', 'block')
    } else {
        passwordGroup.css('display', 'none')
    }
})

$('.update-user').on('click', function () {
    user = $(this).closest('.user').children()
    row = $(this).closest('.user')
    var username = user[0].textContent
    var isAdmin = user[1].textContent
    id = $(this).closest('.user').attr('id')

    $('span.user-name').text(username)
    $('input#id').attr('placeholder', id)
    $('input#username').val(username)
    if (isAdmin === 'true') {
        $('input#admin').click()
    } else {
        $('input#user').click()
    }
    if ($("input[name='updatePassword']").prop("checked") === true) {
        $("input[name='updatePassword']").click()
    }
    $('input#password').val('')
})

$('.update-button').on('click', () => {
    if ($("input[name='updatePassword']").prop("checked") === true) {
        updatePassword = true
    } else {
        updatePassword = false
    }
    var formData = 'id=' + $('input#id').attr('placeholder') + '&username=' + $('input#username').val() + '&isAdmin=' + $("input[name='isAdmin']:checked").val() + '&updatePassword=' + updatePassword
    if (updatePassword) {
        formData += '&password=' + $('input#password').val()
    }
    $.ajax({
            url: '/users/update',
            type: 'POST',
            data: formData
        })
        .done((data) => {
            if (data.user === 'invalid') {
                alert('Username aleready used')
            } else {
                user[0].textContent = data.user.username
                user[1].textContent = data.user.isAdmin
            }
        })
})

$('.delete-button').on('click', () => {
    $.ajax({
            url: '/users/' + id + '/delete',
            type: 'GET'
        })
        .done((data) => {
            if (data.user === 'deleted') {
                row.remove()
            } else {
                alert('Error while deleting user')
            }
        })
})