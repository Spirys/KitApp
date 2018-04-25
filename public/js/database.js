function returnBook(bookId, userId, callback) {
    $.ajax({
        type: 'POST',
        url: 'api/books/' + bookId + '/return',
        data: {
            token: getCookie(),
            user: userId
        },
        success: callback
    });
}

function placeOutstanding(bookId, callback) {
    $.ajax({
        type: 'POST',
        url: 'api/books/' + bookId + '/outstanding',
        data: {
            token: getCookie()
        },
        success: callback
    });
}

function giveOutBook(bookId, userId, callback) {
    $.ajax({
        type: 'POST',
        url: 'api/books/' + bookId + '/checkout',
        data: {
            token: getCookie(),
            user: userId
        },
        success: callback
    });
}

function renewBook(bookId, userId, callback) {
    $.ajax({
        type: 'POST',
        url: 'api/books/' + bookId + '/renew',
        data: {
            token: getCookie(),
            user: userId
        },
        success: callback
    });
}

function onActionClick() {
    var button = $(this);
    var bookId = button.parents('tr').attr('data-id');

    function callback(data) {
        if (data.code) {
            alert(data.message);
            return
        }

        button.html('DONE');
    }

    switch (button.attr('data-action')) {
        case actions.GIVE_OUT:
            giveOutBook(bookId, button.parents('tr').attr('data-taker'), callback);
            break;
        case actions.RENEW:
            renewBook(bookId, button.parents('tr').attr('data-taker'), callback);
            break;
        case actions.RETURN:
            returnBook(bookId, button.parents('tr').attr('data-taker'), callback);
            break;
        case actions.OUTSTANDING:
            placeOutstanding(bookId, callback);
            break;
    }
}

function loadBooks(callback) {
    $.get('api/books/all', {token: getCookie(), fields: 'id,title,instances'}, callback);
}

function filterInstances(books) {
    let instances = [];
    for (let j = 0; j < books.length; j++) {
        let b = books[j];
        for (let k = 0; k < b.instances.length; k++) {
            let i = b.instances[k];
            if (i.status === statuses.RESERVED && i.taker) {
                i.actions = [];
                i.doc = b.title;
                i.docId = b.id;
                if (!i.renewed) i.actions.push(actions.RENEW);
                i.actions.push(actions.GIVE_OUT);
                i.actions.push(actions.RETURN);
                instances.push(i);
            } else if (i.status === statuses.LOANED && i.taker) {
                i.actions = [];
                i.doc = b.title;
                i.docId = b.id;
                if (!i.renewed) i.actions.push(actions.RENEW);
                i.actions.push(actions.RETURN);
                instances.push(i);
            }
        }
    }
    return instances
}

function buildRow(i) {
    function buildButton(action, style) {
        return (i.actions.includes(action))
            ? '<button class="btn ' + style + ' btn-action" style="margin: 5px" data-action="' + action + '">' + msg(getLocale(), action) + '</button>'
            : false
    }

    let status = i.status === statuses.RESERVED
        ? (msg(getLocale(), 'RESERVED_TILL') + i.take_due)
        : i.fine
            ? (msg(getLocale(), 'LOANED_FINE') + i.fine)
            : (msg(getLocale(), 'LOANED_TILL') + i.due_back),

        btnGiveOut = buildButton(actions.GIVE_OUT, 'btn-primary'),
        btnRenew = buildButton(actions.RENEW, 'btn-outline-primary'),
        btnReturn = buildButton(actions.RETURN, 'btn-success'),
        btnRequest = buildButton(actions.OUTSTANDING, 'btn-outline-danger');

    return '<tr data-id="' + i.docId + '" data-taker="' + i.taker.id + '"><th scope="row"><a href="">' + i.docId
        + '</a></th><td>' + i.taker.first_name
        + '</td><td>' + i.taker.last_name
        + '</td><td>' + i.taker.type
        + '</td><td><a href="#">' + i.doc
        + '</a></td><td>' + status
        + '</td><td>'
        + (btnGiveOut || '')
        + (btnRenew || '')
        + (btnReturn || '')
        + (btnRequest || '')
        + '</td></tr>'
}

function showEmpty(table) {
    table.append('<tr><th colspan="7" class="text-center text-muted">' + msg(getLocale(), 'TABLE_EMPTY') + '</th></tr>')
}

$(document).ready(function () {
    loadBooks(function (data) {
        let table = $('#database-table');
        let instances = filterInstances(data.books);
        if (!instances.length) showEmpty(table);
        else for (let j in instances) {
            if (instances.hasOwnProperty(j)) table.append(buildRow(instances[j]))
        }

        $('.btn-action').on('click', onActionClick);
    })
});