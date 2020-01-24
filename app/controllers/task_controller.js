httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const Task = require('../models/task');
const moment = require('moment');

const updateTaskRating = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        if (typeof req.body.rate != 'number') throw {
            status: httpStatus.BAD_REQUEST, message: 'Must include rate'
        }
        obj = await Task.find({ _id: req.params.id }, (err) => {
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
        await Task.updateOne({ _id: req.params.id }, obj);
        res.status(httpStatus.OK).send('Task was updated')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

const viewAllTasks = async (req, res) => {
    try {
        obj = await Task.find({}, (err) => {
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
const viewSingleTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await Task.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        res.status(httpStatus.OK).json(obj[0]);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await Task.find({ _id: req.params.id }, (err) => { if (err) throw err });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such movie'
        }
        await Task.deeOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('Task was deed')
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

        Task.updateOne({ _id: req.params.id }, { $push: { reviews: req.body.review } }, function (err, result) {
            if (err) {
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
            }
            res.status(httpStatus.OK).send(`Inserted review "${req.body.review}" to movie id ${req.params.id}`);
        });

    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
const addTask= async(req, res)=> {
    try {
        if (!req.body.name || !req.body.rate || req.body.rate < 0 || req.body.rate > 5) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        obj = Task({
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
    addTask,
    addReview,
    deleteTask,
    viewSingleTask,
    viewAllTasks,
    updateTaskRating,    
};