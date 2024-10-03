const validator = require('../helpers/validate.js');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // Failed
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        else {
            next();
        }
    });
};

module.exports = {
    saveContact
};