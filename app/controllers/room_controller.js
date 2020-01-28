httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const Room = require('../models/room');
const moment = require('moment');



const viewAllRooms = async (req, res) => {
    try {
        obj = await Room.find({}, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such Room'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
const viewSingleRoom = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await Room.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such room'
        }
        res.status(httpStatus.OK).json(obj[0]);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const deleteRoom = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid task id number'
        }
        obj = await Room.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such task'
        }
        await Room.deleteOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('Room was deleted')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
    

const addRoom= async(req, res)=> {
    try {
        if (!req.body.name) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        obj = Room({
            name: req.body.name,
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted room with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = {
    addRoom,
    deleteRoom,
    viewSingleRoom,
    viewAllRooms,
};