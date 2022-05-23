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
        dateBirth: Joi.string(),
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\.\-]+@([a-zA-Z0-9_\-]{4,8})\.([a-zA-Z]{2,3})$'))
                .required(),
        tel: Joi.string()
                .required(),
        password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9_\.\-\@]{8,30}$'))
                    .min(8)
                    .required(),
        confirmPassword: Joi.ref('password'),
        
    });

    

    return schema.validate(data);
};

const LoginValidation = data=>{
    const schema = Joi.object({
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\.\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                .required()
                .messages({
                        'string.empty': `Veuillez Remplir les Champs`,
                      }),
        password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9_\.\-\@]{8,30}$'))
                        .min(8)
                        .required()
                        .messages({
                                'string.empty': `Veuillez Remplir les Champs`,
                                'string.min': `le Mot de Passe doit inclue 8 caractéres`,
                              }),
    });
    return schema.validate(data);
};

module.exports = { RegisterValidation, LoginValidation }