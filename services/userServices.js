/************************************************************
 * @description
 * 
 * @file        :   userServices.js
 * @overview    :   To call userModel as request on service.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const userModel = require('../model/userModel')
/***********registration****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.registration = (data, callBack) => {
    userModel.registration(data, (err, result) => {
        if (err) {
            console.log("service error");
            return callBack(error)

        }
        else {
            console.log("In service", result);
            return callBack(null, result);
        }
    })
}

/***********login****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.login = (data, callBack) => {
    userModel.login(data, (err, result) => {
        if (err) {
            console.log("service error");
            return callBack(err)

        }
        else {
            return callBack(null, result);
        }

    })

}
/***********getUserEmail****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.getUserEmail = (data, callBack) => {
    userModel.findUserEmail(data, (err, result) => {

        if (err) {
            return callBack(err);
        } else {
            return callBack(null, result);
        }
    })
}
exports.redirect = (decoded, callBack) => {
    userModel.confirmUser(decoded, (err, result) => {
        if (err) {
            return callBack(err);
        } else {
            return callBack(null, result);
        }
    })
}
/***********resetPassword****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.resetPassword = (req, callBack) => {
    userModel.updatePassword(req, (err, result) => {
        if (err) {
            return callBack(err);
        }
        else {
            return callBack(null, result)
        }
    })
}
/***********getAllUser****************
 * @description:Passing the data to model to store the data in db.
 * @param:request and callback function.
 */
exports.getAllUser = (req, callBack) => {
    userModel.getAllUser(req, (err, result) => {
        if (err) {
            return callBack(err);
        } else {
            return callBack(null, result);
        }
    })
}