const userModel = require('../model/userModel')

exports.registration = (data, callBack) => {
    userModel.registration(data, (err, result) => {
        if (err) {
            console.log("service error");
            callBack(error)

        }
        else {
            console.log("In service", result);
            callBack(null, result);
        }
    })
}
exports.login = (data, callBack) => {
    userModel.login(data, (err, result) => {
        if (err) {
            console.log("service error");
            callBack(error)

        }
        else {
            callBack(null, result);
        }

    })

}
exports.getUserEmail = (data, callBack) => {
    userModel.findUserEmail(data, (err, result) => {

        if (err) {
            callback(err);
        } else {
            callBack(null, result);
        }
    })
}

exports.getAllUser = (data, callBack) => {
    userModel.getAllUser(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callBack(null, result);
        }
    })
}