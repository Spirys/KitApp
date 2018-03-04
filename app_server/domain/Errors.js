/*!
 * Error messages
 * Copyright(c) 2018 marsel Shaihin
 */

/**
 * Module exports the error messages
 * @type {{string}}
 * @public
 */

// Todo rearrange by alphabet
module.exports = {
    INSTANCES_NOT_ARRAY: 'Instances must be an array',
    NEW_INSTANCE_WRONG_TYPE: 'New instance must be of a DocumentInstance type',
    TITLE_INVALID: nonEmptyString('title'),
    IS_BESTSELLER_INVALID: 'Parameter `isBestseller` must be boolean value',
    KEYWORDS_NOT_ARRAY: 'Keywords must be an array',
    NAME_INVALID: nonEmptyString('name'),
    DESCRIPTION_INVALID: nonEmptyString('description'),
    PUBLISHER_INVALID: nonEmptyString('publisher'),
    INVALID_DATE: 'Date is invalid. It must correspond to format DD-MM-YYYY'
};

/**
 * Builds an error message using template
 * @param invalidValue what must be output as invalid
 * @return {string}
 * @private
 */

function nonEmptyString(invalidValue) {
    return 'Invalid ' + invalidValue + '. Must be a non-empty string'
}