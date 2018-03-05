'use strict';

const Instance = require('../../../../domain/models/documents/DocumentInstance');
const Patron = require('../user/PatronModelToClass');

module.exports = instance => {
    if (!instance) {
        return null;
    }

    let inst = new Instance(instance.status, instance.id, instance._id);

    if (instance.taker) inst.taker = Patron(instance.taker);
    if (instance.take_due) inst.takeDue = instance.take_due;
    if (instance.due_back) inst.dueBack = instance.due_back;

    return inst;
};