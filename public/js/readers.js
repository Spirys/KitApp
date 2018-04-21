function editReader(userId, callback){
$.ajax({
        type: 'PUT',
        url: `api/users/${userId}`,
        data:{
            first_name :$('#create_first_name').val(),
            last_name: $('#create_last_name').val(),
            type:$('#user_type option:selected').text(),
            birth_date:$('#create_birth_date').val(),
            phone:$('#create_phone').val(),
            occupation:$('#create_occupation').val(),
            //about: $('#create_about').val(),
            telegram:$('#create_telegram').val(),
            //avatar: $('#create_avatar').val(),
        },
        success: callback
    });
}

function addNewReader(callback){
$.ajax({
        type: 'POST',
        url: `api/users`,
        data: {
            first_name :$('#create_first_name').val(),
            last_name: $('#create_last_name').val(),
            type:$('#user_type option:selected').text(),
            birth_date:$('#create_birth_date').val(),
            phone:$('#create_phone').val(),
            occupation:$('#create_occupation').val(),
            //about: $('#create_about').val(),
            telegram:$('#create_telegram').val(),
            //avatar: $('#create_avatar').val(),
        },
        success: callback
    });
}
