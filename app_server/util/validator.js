'use strict';

/**
 * Checks whether an object has all the fields specified
 * @param object An object to check
 * @param fields An {@link Array} containing fields that must be checked
 * @return Array An array which contains all the missing fields.
 *  Can be empty if all the specified fields found.
 *  Can be a null pointer, if the <code>fields</code> param was invalid.
 */
function validateFields(object, fields) {
    if (Array.isArray(fields) && object && object !== null) {
        let missing = [];
        for (let i in fields) {
            if (fields.hasOwnProperty(i)) {
                if (!object.hasOwnProperty(fields[i])) {
                    missing.push(fields[i]);
                }
            }
        }
        return missing;
    } else {
        return fields;
    }
}

module.exports.validateFields = validateFields;