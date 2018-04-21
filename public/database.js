function returnBook(bookId, callback) {
    $.ajax({
        type: 'POST',
        url: `api/books/${bookId}/return`,
        data: {
            token: getCookie()
            //user:
        },
        success: callback
    });
}

function requestBook(bookId, callback) {
    $.ajax({
        type: 'POST',
        //url: `api/books/${bookId}`,
        data: {
            token: getCookie()
        },
        success: callback
    });
}
function giveOutBook(bookId, callback) {
    $.ajax({
        type: 'POST',
       //url: `api/books/${bookId}`,
        data: {
            token: getCookie()
        },
        success: callback
    });
}
