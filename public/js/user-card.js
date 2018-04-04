/*
 * Copyright (c) 2018 KitApp project
 */

// tr
// th#row-number(scope='row') #{row_number}
// th#title
// a(href='document.html') #{title}
// td#author #{author}
// td#type #{type}
// td#status #{status}

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

function loadData(next) {
    const table = $('#my-documents');

    const callback = (data) => {
        if (data.code) {
            alert(data.message);
            return
        }

        for (let i = 0; i < data.books.length; i++) {
            let book = data.books[i];
            const authors = [];

            for (let author of book.authors) {
                authors.push(author.first_name + ' ' + author.last_name)
            }

            const due = book.take_due
                ? 'Take till ' + book.take_due
                : 'Due ' + book.due_back;

            let toAppend = `<tr data-id="${book.id}"><th scope="row">${i+1}</th><th><a href="#">${book.title}</a></th>` +
                            `<td>${authors.join(',')}</td>` +
                            `<td>Book</td>` +
                            `<td>${due}</td>` +
                            `<td>${book.fine}</td>`;

            toAppend += (book.action === 'DOC_RENEW')
                ? `<td><button class="btn btn-primary btn-action">${book.action_msg}</button></td>`
                : `<td></td>`;

            toAppend += '</tr>';
            table.append(toAppend)
        }
        next()
    };

    $.get( '/api/me/books', {token: getCookie()}, callback);
}

function onActionClick() {
    const button = $(this);
    const bookId = button.parent().parent().attr('data-id');

    function callback (data) {
        if (data.code) {
            alert(data.message);
            return
        }
        button.html('DONE');
    }

    renewBook(bookId, callback);
}

$(document).ready(function () {
    loadData(() => $('.btn-action').on('click', onActionClick));
});

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