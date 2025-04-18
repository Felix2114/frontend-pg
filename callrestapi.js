var url = "https://pg-restapi-poke.onrender.com/api/users";
//var url = "http://localhost:8080/api/users";
function postUser() {

    console.log(url);

    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.user));
        },
        data: JSON.stringify(myuser)
    });
}
function getUsers() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">';
	  htmlTableUsers += '<tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Comments</th><th>Acciones</th></tr>';
        arrUsers.forEach(function(item) {
            console.log(item);
            htmlTableUsers += '<tr>' +
                                '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td><input type="text" id="name_' + item.id + '" value="' + item.name + '"></td>' +
                '<td><input type="text" id="email_' + item.id + '" value="' + item.email + '"></td>' +
                '<td><input type="text" id="age_' + item.id + '" value="' + item.age + '"></td>' +
                '<td><input type="text" id="comments_' + item.id + '" value="' + item.comments + '"></td>' +
                '<td>' +
                    '<button onclick="updateUser(' + item.id + ')">Actualizar</button>' +
                    '<button onclick="deleteUser(' + item.id + ')">Eliminar</button>' +
                '</td>' +
            '</tr>';

        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}



function updateUser(id) {
     var myName = $('#name_' + id).val();
    var myEmail = $('#email_'+ id).val();
    var myAge = $('#age_'+ id).val();
    var myComments = $('#comments_'+ id).val();

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };


    $.ajax({
        url: url + '/' + id,
        type: 'put',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myuser),
        success: function (data) {
            alert('usuario actualizado correctamente');
            getUsers(); // refresca la tabla
        },
        error: function (xhr, status, error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el usuario');
        }
    });
}




function deleteUser(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    $.ajax({
        url: url + '/' + id,
        type: 'delete',
        success: function (data) {
            alert('usuario eliminado correctamente');
            getUsers(); // refresca la tabla
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el usuario');
        }
    });
}

