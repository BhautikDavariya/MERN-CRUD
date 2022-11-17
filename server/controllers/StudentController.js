const mongoose = require('mongoose')
const student = require('../models/studentSchema')
const STUDENT = mongoose.model('student')

exports.student = {
    /*cloneDeep: (array) => {
        return JSON.parse(JSON.stringify(array))
    },*/
    get_by_id: async (req, res) => {
        try {
            const data = await STUDENT.find({ _id: req.query._id })
            if (data[0] == null) {
                res.json({ alert: "record not found" })
            }
            else {
                res.json(data);
            }
        } catch (error) {
            return res.send(error)
        }

    },
    get: async (req, res) => {
    let { page, size, sort, per_page, isRow } = req.query;
    const pageNumber = parseInt(page);
    const result = {}
    let limit = parseInt(per_page);
    const totalPosts = await STUDENT.countDocuments().exec();
    let startIndex = pageNumber * 10 - 10;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPosts = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await STUDENT.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await STUDENT.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec()
      result.rowsPerPage = limit;



       
        //  // If the page is not applied in query.
        //  if (!page) {
  
        //     // Make the Default value one.
        //     page = 1;
        // }
  
        // if (!size) {
        //     size = 10;
        // }
        //        //  We have to make it integer because
        // // query parameter passed is string
        // const limit = parseInt(size);


        const totalStudentList = await STUDENT.find({})
        // const studentList = await STUDENT.find({}).limit(limit)
        return res.json({
            isSuccess: true,
            data: result,
        })
    },
    add: async (req, res) => {
        try {
            if (req.body.password == req.body.confirmpassword) {
                const findStudent = await STUDENT.findOne({email: req.body.email})
                if(!findStudent){
                    const isCreated = await STUDENT.create(req.body);
                    if (!isCreated) {
                        return res.json({
                            isSuccess: false,
                            message: "Failed to add student"
                        })
                    }
                    return res.json({
                        isSuccess: true,
                        message: "Student addedd successfully"
                    })
                } else {
                    return res.json({
                        error: true,
                        isSuccess: false,
                        message: "Student Alredy Created"
                    })
                }
            }
            else {
                return res.json({ alert: "password and confirm password should be same" });
            }
        }
        catch (error) {
            res.json(error.message)
        }
    },

    update: async (req, res) => {
        /*try {
            if (req.body.password == req.body.confirmpassword) {
                const result = await STUDENT.findById(req.body._id);
                Object.assign(result,req.body);
                result.save();
                res.json({data:result});
            }
            else{
                res.json({alert:"password and confirm password should be same"})
            }
        } catch (err) {
            res.status(400).json({alert:"alert"});
        }*/
        try {
            let studentData = await STUDENT.findOne({ _id: req.body._id })
            if (!studentData) {
                return res.json({
                    isSuccess: false,
                    message: "No data found"
                })
            }
            if (req.body.password == req.body.confirmpassword) {
                const filter = { _id: req.body._id };
                const update = req.body;
                const created = await STUDENT.updateOne(filter, update, { runValidators: true });
                if (!created) {
                    return res.json({ message: "file not updated" })
                }
                else {
                    return res.json({
                        message: "file updated",
                    })
                }
            }
            else {
                res.json({ alert: "password Should be same as confirm password" });
            }
        } catch (error) {
            return res.json({ alert: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deleted = await STUDENT.deleteOne({ _id: req.query._id })
            if (deleted.deletedCount == 0) {
                return res.json({
                    isSuccess: false,
                    message: "record not found"
                })
            }
            return res.json({
                isSuccess: true,
                message: "Student deleted successfully"
            })
        } catch (error) {
            res.json(error)
        }
    }
}
