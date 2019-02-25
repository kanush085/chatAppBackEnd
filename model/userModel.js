const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let saltRounds = 15;

const UserSchema = mongoose.Schema({
    firstname: {
        type: String, require: [true, "firstname require"]
    },
    lastname: {
        type: String, require: [true, "lastname require"]
    },
    email: {
        type: String, require: [true, "email require"]

    },
    password: {
        type: String, require: [true, "password require"]
    }
},
    {
        timestamps: true
    });
function userModel() { }

var user = mongoose.model('user', UserSchema);
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
userModel.prototype.registration = (body, callBack) => {
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            console.log("Error is registration");
            callBack(err)

        }
        else if (data.length > 0) {
            console.log("data.length" + data);
            console.log("Email already exists");
            callBack("user already present");
        }
        else {
            const newUser = new user({
                "firstname": body.firstname,
                "lastname": body.lastname,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    callBack(err)

                }
                else {
                    console.log("Register Successfully");
                    callBack(null, result)
                }
            });
        }
    });

}

userModel.prototype.login = (body, callBack) => {
    user.findOne({ "email": body.email }, (err, data) => {
        if (err) {
            callBack(err)
        }
        else if (data != null) {
            bcrypt.compare(body.password, data.password).then(function (res) {
                if (res) {
                    console.log("Login Successfully");
                    callBack(null, res);

                }
                else {
                    console.log("Incorrect Password");
                    callBack("Incorrect Password");

                }
            });

        } else {
            console.log("Invalid User");
            callBack("Invalid User");

        }
    });
}

userModel.prototype.findUserEmail = (data, callBack) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callBack(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callBack(null, result);

            }
            else {
                callBack("Incorrect Email")
            }
        }
    });
}

userModel.prototype.getAllUser = (data, callBack) => {
    user.find({}, (err, result) => {
        if (err) {
            callBack(err);
        }
        else {
            callBack(null, result)
        }
    });
}
module.exports = new userModel;