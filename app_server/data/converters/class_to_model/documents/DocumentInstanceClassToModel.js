'use strict';

const Patron = require('../users/PatronClassToModel');

module.exports = instance => {
    let inst = {
        _id: instance.innerId,
        status: instance.status
    };

    if (instance.taker) inst.taker = Patron(instance.taker);
    if (instance.takeDue) inst.take_due = instance.takeDue;
    if (instance.dueBack) inst.due_back = instance.dueBack;

    return inst;
};