const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require:[true, 'Email Required'],
        unique: true
    },
    password:{
        type: String,
        require:[true, 'Password Required'],
        validate:{
            validator: function(v){
                return v.length >= 6;
            },
            message:'Password should contain at least 6 characters'
        }
    },
    PhoneNumber: String,
    imageURL: String,
    Role:{
        type: String,
        enum: ['Resturant Manager','Manager','Technician']
    },
    DetailsTech:{
        systemRating: String,
        speciality:{
            type: String,
            enum: ['AC','Electrician','Big Appliances','General']
        }
    },

    DetailsManager:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'resturant'
    }
}, {
});
module.exports = mongoose.model('UserSchema', UserSchema);