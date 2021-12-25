const Joi = require('joi');


const RegisterValidation = data =>{
    const schema = Joi.object({
        lastname: Joi.string()
                .min(3)
                .required(),
        firstname: Joi.string()
                .min(3)
                .required(),
        gender: Joi.string()
                .alphanum()
                .required(),
        dateBirth: Joi.date(),
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                .required(),
        tel: Joi.string()
                .pattern(new RegExp('^(([\+]?[0-9]{1,3})?)([\-\.\s]?)(([0-9]{3})?)([\s.-]?)([0-9]{3})([\s.-]?)([0-9]{3,4})$'))
                .required(),
        password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                    .min(8)
                    .required(),
        confirmPassword: Joi.ref('password'),
        
    });

    

    return schema.validate(data);
};

const LoginValidation = data=>{
    const schema = Joi.object({
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                .required(),
        password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                        .min(8)
                        .required(),
    });
    return schema.validate(data);
};

module.exports = { RegisterValidation, LoginValidation }