'use strict';

function getCookie() {
    // const matches = document.cookie.match(new RegExp(
    //     "(?:^|; )" + '_sessionId'.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
    // ));
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + '_sessionId' + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function onActionClick() {
    const button = $(this);
    const bookId = button.parent().attr('data-id');

    function callback (data) {
        if (data.code) {
            alert(data.message)
        }
        button.html('DONE');
    }

    switch (button.attr('data-action')) {
        case 'DOC_RENEW': renewBook(bookId, callback); break;
        case 'DOC_RESERVE': reserveBook(bookId, callback); break;
    }
}

function onDetailsClick() {
    $('#documentDetailsModal').modal('show');
    const id = $(this).parent().attr('data-id');

    const callback = (data) => {
        if (data.code) {
            const errorView = $('#details-error');
            errorView.parent().children().hide();
            errorView.attr('hidden', false);
            errorView.fadeIn(100, function () {
                $(this).html(data.message);
            });
            return
        }

        const authorsData = data.authors;
        let authors = [];
        for (let author of authorsData) {
            authors.push(author.first_name + ' ' + author.last_name)
        }

        $('#details-title').html(data.title);
        $('#details-author').html(authors.join(', '));
        $('#details-edition').html(data.edition);
        $('#details-publisher').html(data.publisher);
        $('#details-keywords').html(data.keywords.join(', '));
        $('#details-description').html(data.description);
    };

    $.get( 'api/books/' + id, {token: getCookie()}, callback);
}
function onAddClick(){
    $.ajax({
        type: 'PUT',
        url: `api/books/${bookId}`,
        data: {
            token: getCookie(),
            title: $('#title').val(),
            edition: $('#edition').val(),
            publisher: $('#publisher').val(),
            published: $('#published').val(),
            description: $('#description').val(),
            cost: $('#cost').val(),
            type: $('#document-type option:selected').text(),
            keywords: $('#keywords').val().split(', '),
            available: $('#available-copies').val(),
            reference: $('#reference-copies').val(),
            maintenance: $('#maintenance-copies').val(),
            published: $('#published').val(),
            authors: $('#authors').split(', '),
            bestseller: $('#bestseller').prop('checked'),
            image: "https://www.bookopolis.com/img/no_book_cover.jpg"

        },
        success: callback
    });
}
$(document).ready(function () {
    $('.btn-action').on('click', onActionClick);
    $('.btn-details').on('click', onDetailsClick);
    $('#save-changes').on('click', onAddClick);
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
