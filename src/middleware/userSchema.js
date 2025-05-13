const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "any.required": "Username tidak boleh kosong",
    "string.empty": "Username tidak boleh kosong",
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 50 karakter",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email tidak boleh kosong",
    "string.empty": "Email tidak boleh kosong",
    "string.email": "Format email tidak valid",
  }),
  password: Joi.string().min(8).max(30).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$')).messages({
    "any.required": "Password tidak boleh kosong",
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 8 karakter",
    "string.max": "Password maksimal 30 karakter",
    "string.pattern.base": "Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus",
  }),
  name: Joi.string().required().messages({
    "any.required": "Nama tidak boleh kosong",
    "string.empty": "Nama tidak boleh kosong",
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "any.required": "Username tidak boleh kosong",
    "string.empty": "Username tidak boleh kosong",
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 50 karakter",
  }),
  password: Joi.string().min(8).max(30).required().messages({
    "any.required": "Password tidak boleh kosong",
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 8 karakter",
    "string.max": "Password maksimal 30 karakter",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};