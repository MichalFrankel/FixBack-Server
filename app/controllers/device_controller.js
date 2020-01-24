httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const device = require('../models/device');
const moment = require('moment');

const updatedeviceRating = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        if (typeof req.body.rate != 'number') throw {
            status: httpStatus.BAD_REQUEST, message: 'Must include rate'
        }
        obj = await device.find({ _id: req.params.id }, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        obj = obj[0];
        if (req.body.rate) {

            obj.rate = req.body.rate;
        }
        await device.updateOne({ _id: req.params.id }, obj);
        res.status(httpStatus.OK).send('device was updated')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

const viewAlldevices = async (req, res) => {
    try {
        obj = await device.find({}, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
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
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        await device.deeOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('device was deed')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const addReview=async(req, res)=> {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        if (!req.body.review) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };

        device.updateOne({ _id: req.params.id }, { $push: { reviews: req.body.review } }, function (err, result) {
            if (err) {
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
            }
            res.status(httpStatus.OK).send(`Inserted review "${req.body.review}" to movie id ${req.params.id}`);
        });

    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
const adddevice= async(req, res)=> {
    try {
        if (!req.body.name || !req.body.rate || req.body.rate < 0 || req.body.rate > 5) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        obj = device({
            name: req.body.name,
            reviews: req.body.reviews || [],
            date: moment().format("DD-MM-YYYY"),
            rate: req.body.rate
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted review with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = {
    adddevice,
    addReview,
    deletedevice,
    viewSingledevice,
    viewAlldevices,
    updatedeviceRating,    
};