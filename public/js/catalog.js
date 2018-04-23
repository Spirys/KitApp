function getCookie() {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + '_sessionId' + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function loadBooks() {
    function callback(data) {
        var books = data.books,
            documentsView = $('#documents');

        for (var i = 0; i < books.length; i++) {
            documentsView.append(buildBook(books[i]))
        }

        function buildAnimation(card) {
            return function() {
                card.attr('style', 'visibility:visible');
                card.addClass('fadeInUp');
            }
        }

        $('.card').each(function (index, element) {
            setTimeout(buildAnimation($(this)), index * 500)
        });

        // Set listeners
        $('.btn-action').on('click', onActionClick);
        $('.btn-details').on('click', onDetailsClick);

        $('#loader').hide();
    }

    $.get('api/books/all', {token: getCookie()}, callback);
}

function buildBook(book) {
    var authorsData = book.authors;
    var authors = '';
    for (var author of authorsData) {
        authors += '<h4 id="author">' + author.first_name + ' ' + author.last_name + '</h4>'
    }

    var availableBoolean = !!book['Available'],
        available = availableBoolean ? '#available' : '#not_available';

    return '<div class="card animated" style="visibility: hidden" data-id="' + book.id + '"><div class="card-body"><div class="row"><div class="col-lg-2">'
        + '<div id="doc-image" class="image has-shadow"><img src="' + book.image + '" alt="' + book.title + '" class="img-fluid"></div></div>'
        + '<div class="col-lg-8 m-auto"><h2>' + book.title + '</h2>' + authors + '<small>' + book.description + '</small>'
        + '<br/><button type="button" style="margin:2px" class="btn btn-sm bg-blue">#book</button>'
        + '<button type="button" style="margin:2px" class="btn btn-sm ' + (availableBoolean ? 'bg-green' : 'bg-red') + '">' + available + '</button>'
        + (book.bestseller ? '<button type="button" style="margin:2px" class="btn btn-sm bg-orange">#bestseller</button>' : '') + '</div>'
        + '<div class="right-col col-lg-2 m-auto"><button type="button" class="btn-details btn btn-secondary book-btn">DETAILS</button>'
        + ((book.action && book.action !== 'NO_ACTION') ? '<button type="button" class="btn-action btn btn-info book-btn" data-action="' + book.action + '">' + book.action_msg + '</button></div></div></div></div>' : '');
}

function onActionClick() {
    var button = $(this);
    var bookId = button.parents('.card').attr('data-id');

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
    var id = $(this).parents('.card').attr('data-id');

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
            $(this).html(data.notification);
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

    loadBooks();

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

function searchBook(){
    $.ajax({
        type: 'GET' ,
        url: api/books/search,
        data:{  //TODO: change to a query
             title:,
             author:,
             //type:
        },
        
           }); 
}
