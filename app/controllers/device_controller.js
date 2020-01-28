httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const device = require('../models/device');
const moment = require('moment');


const viewSingledevice = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await device.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        res.status(httpStatus.OK).json(obj[0]);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const deletedevice = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await device.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such device'
        }
        await device.deleteOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('device was deleted')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

   

const adddevice= async(req, res)=> {
    try {
        if (!req.body.name || !req.body.GTIN ) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        obj = device({
            name: req.body.name,
            GTIN: req.body.GTIN
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted review with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = {
    adddevice,
    deletedevice,
    viewSingledevice,
};