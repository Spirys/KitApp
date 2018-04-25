let statuses = {
    AVAILABLE: 'Available',
    LOANED: 'Loaned',
    MAINTENANCE: 'Maintenance',
    REFERENCE: 'Reference',
    RESERVED: 'Reserved'
};

let actions = {
    RENEW: 'DOC_RENEW',
    RETURN: 'DOC_RETURN',
    GIVE_OUT: 'DOC_GIVE',
    OUTSTANDING: 'DOC_OUTSTANDING'
};

function msg (locale, msg) {
    switch (locale) {
        case 'ru':
        case 'RU':
            switch (msg) {
                case 'TABLE_EMPTY': return 'Нет записей';
                case 'RESERVED_TILL': return 'Бронь до ';
                case 'LOANED_TILL': return 'Взят до ';
                case 'LOANED_FINE': return 'Просрочен. Штраф: ';
                case actions.GIVE_OUT: return 'Выдать';
                case actions.RENEW: return 'Продлить';
                case actions.RETURN: return 'Возврат';
                case actions.OUTSTANDING: return 'Запросить';
                default: return ''
            }
        case 'en':
        case 'EN':
            switch (msg) {
                case 'TABLE_EMPTY': return 'No entries';
                case 'RESERVED_TILL': return 'Reserved till ';
                case 'LOANED_TILL': return 'Loaned till ';
                case 'LOANED_FINE': return 'Exceeded. Fine: ';
                case actions.GIVE_OUT: return 'Give out';
                case actions.RENEW: return 'Renew';
                case actions.RETURN: return 'Return';
                case actions.OUTSTANDING: return 'Request';
                default: return ''
            }
        default: return 'unknown language';
    }
}