function getCookie() {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + '_sessionId' + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function onActionClick() {
    var button = $(this);
    var bookId = button.parent().attr('data-id');

    function callback(data) {
        if (data.code) {
            alert(data.message)
        }
        //alert (`You are #${data.awaiting + 1} in the queue`);
        button.html('DONE');
    }

    switch (button.attr('data-action')) {
        case 'DOC_RENEW':
            renewBook(bookId, callback);
            break;
        case 'DOC_RESERVE':
            reserveBook(bookId, callback);
            break;
    }
}

function onDetailsClick() {
    $('#documentDetailsModal').modal('show');
    var id = $(this).parent().attr('data-id');

    var callback = function (data) {
        if (data.code) {
            $('#details-body').hide();
            $('#details-error').fadeIn(100, function () {
                $(this).html(data.message);
            });
            return
        } else {
            $('#details-error').hide();
            $('.modal-body>.form-row').show(2);
        }

        var authorsData = data.authors;
        var authors = [];
        for (var author of authorsData) {
            authors.push(author.first_name + ' ' + author.last_name)
        }

        $('#details-title').html(data.title);
        $('#details-author').html(authors.join(', '));
        $('#details-edition').html(data.edition);
        $('#details-publisher').html(data.publisher);
        $('#details-keywords').html(data.keywords.join(', '));
        $('#details-description').html(data.description);

        $('#details-success').hide();
    };

    $.get('api/books/' + id, {token: getCookie()}, callback);
}

function onAddClick() {
    function callback(data) {
        if (data.code) {
            $('#details-body').hide();
            $('#new-error').fadeIn(100, function () {
                $(this).html(data.message);
            });
            return
        } else {
            $('#new-error').hide();
        }

        var authorsData = data.authors;
        var authors = [];
        for (var author of authorsData) {
            authors.push(author.first_name + ' ' + author.last_name)
        }

        $('#newDocumentModal').modal('hide');
        $('#documentDetailsModal').modal('show');

        $('#details-title').html(data.title);
        $('#details-author').html(authors.join(', '));
        $('#details-edition').html(data.edition);
        $('#details-publisher').html(data.publisher);
        $('#details-keywords').html(data.keywords.join(', '));
        $('#details-description').html(data.description);

        $('#details-success').fadeIn(100, function () {
            $(this).html('Creation was successful');
        });

        // noinspection JSJQueryEfficiency
        $('#details-body').show();
    }

    $.ajax({
        type: 'POST',
        url: 'api/books/',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            token: getCookie(),
            title: $('#title').val(),
            edition: $('#edition').val(),
            publisher: $('#publisher').val(),
            published: $('#published').val(),
            description: $('#description').val(),
            cost: parseInt($('#cost').val().toString()),
            type: $('#document-type').find('option:selected').text(),
            keywords: $('#keywords').val().toString().split(', '),
            available: parseInt($('#available-copies').val().toString()),
            reference: parseInt($('#reference-copies').val().toString()),
            maintenance: parseInt($('#maintenance-copies').val().toString()),
            authors: $('#authors').val().toString().split(', '),
            bestseller: $('#bestseller').prop('checked')
        }),
        success: callback
    });
}

$(document).ready(function () {
    $('.btn-action').on('click', onActionClick);
    $('.btn-details').on('click', onDetailsClick);
    $('#save-changes').on('click', onAddClick);

    $('#published').daterangepicker({
        singleDatePicker: true,
        locale: {
            format: 'DD.MM.YYYY'
        }
    });
});

/**
 * Reserves the book
 * @param bookId {number}
 * @param callback {function}
 */

function reserveBook(bookId, callback) {
    $.ajax({
        type: 'POST',
        url: `api/books/${bookId}/checkout`,
        data: {
            token: getCookie()
        },
        success: callback
    });
}

function renewBook(bookId, callback) {
    $.ajax({
        type: 'POST',
        url: `api/books/${bookId}/renew`,
        data: {
            token: getCookie()
        },
        success: callback
    });
}
