'use strict';

const Patron = require('../users/PatronClassToModel');

module.exports = instance => {
    let inst = {
        _id: instance.innerId,
        status: instance.status
    };

    inst.taker = (instance.taker) ? Patron(instance.taker) : undefined;
    inst.take_due = (instance.takeDue) ? instance.takeDue : undefined;
    inst.due_back = (instance.dueBack) ? instance.dueBack : undefined;

    return inst;
};