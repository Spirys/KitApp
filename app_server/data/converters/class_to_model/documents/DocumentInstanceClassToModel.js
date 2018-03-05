'use strict';

const Patron = require('../users/PatronClassToModel');

module.exports = instance => {
    let inst = {
        _id: instance.innerId,
        status: instance.status
    };

    if (instance.taker) inst.taker = Patron(instance.taker); else inst.taker = undefined;
    if (instance.takeDue) inst.take_due = instance.takeDue; else inst.take_due = undefined;
    if (instance.dueBack) inst.due_back = instance.dueBack; else inst.due_back = undefined;

    return inst;
};