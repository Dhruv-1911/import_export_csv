const mongoose = require("mongoose");

//create a Admin database
const userSchema = mongoose.Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    company_name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    county: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
    phone: { type: String, required: true, trim: true },

});

module.exports = mongoose.model('User', userSchema)

