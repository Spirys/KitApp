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
        for (let field in fields){
            if (fields.hasOwnProperty(field)){
                if (!object.hasOwnProperty(field)) {
                    missing.push(field);
                }
            }
        }
        return missing;
    } else {
        return null;
    }
}

module.exports.validateFields = validateFields;