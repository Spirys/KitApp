'use strict';
const beautifier    = require('../../util/beautifier');
const config        = require('../../config/config');
const mongoose      = require('mongoose');

/**
 * Defining the basic model for all the document instances
 */
const instanceModel = {
    status: {
        type: String,
        required: true,
        enum: [config.statusAvailable, config.statusMaintenance, config.statusLoaned, config.statusReserved],
        default: config.statusMaintenance
    },
    due_back    : {type: Date, default: Date.now},
    taker       : {type: mongoose.Schema.ObjectId, ref: 'Patron', required: true}
};

/*
    Defining schemas
 */
const types = config.documentTypes;

/*
    Generating and exporting models dynamically
 */
for (let name in types) {
    module.exports[beautifier.toInstanceForm(name)] = buildModel(name);
}

/**
 * Builds an instance model from given model name
 * @param name a name of the model. Make sure it is present in database!
 */
function buildModel(name) {
    let instanceSchema = new mongoose.Schema(changeModel(name, {
        type: mongoose.Schema.ObjectId,
        ref: beautifier.capitalFirst(name),
        required: true
    }));

    beautifier.virtualId(instanceSchema);
    return mongoose.model(beautifier.toInstanceForm(name), instanceSchema);
}

/**
 * Creates the new model based on the predefined model, but with changed field
 * @param field what to change
 * @param value what to assign to the <code>field</code>
 * @returns {mongoose.Schema}
 */
function changeModel(field, value) {
    let newModel = instanceModel.create();
    newModel[field] = value;
    return newModel;
}