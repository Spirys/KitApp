/*
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

'use strict';

function loadData(next) {
    var table = $('#my-documents');

    var callback = function (data) {
        if (data.code) {
            alert(data.message);
            return
        }

        for (var i = 0; i < data.books.length; i++) {
            var book = data.books[i];
            var authors = [];

            for (var author of book.authors) {
                authors.push(author.first_name + ' ' + author.last_name)
            }

            var due = book.take_due
                ? 'Take till ' + book.take_due
                : 'Due ' + book.due_back;

            var toAppend = `<tr data-id="${book.id}"><th scope="row">${i+1}</th><th><a href="#">${book.title}</a></th>` +
                            `<td>${authors.join(', ')}</td>` +
                            `<td>Book</td>` +
                            `<td>${due}</td>` +
                            `<td>${book.fine}</td>`;

            toAppend += (book.action === 'DOC_RENEW')
                ? `<td><button class="btn btn-primary btn-action">${book.action_msg}</button></td>`
                : `<td></td>`;

            toAppend += '</tr>';
            table.append(toAppend)
        }
        if (!data.books.length) {
            table.append('<tr><th colspan="7" class="text-center text-muted">' + msg(getLocale(), 'TABLE_EMPTY') + '</th></tr>')
        }
        next()
    };

    $.get( '/api/me/books', {token: getCookie()}, callback);
}

function onActionClick() {
    var button = $(this);
    var bookId = button.parent().parent().attr('data-id');

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
    loadData(function () { $('.btn-action').on('click', onActionClick)});
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