const Todo = require('../../models/Todo');
const CheckAuth = require("../../util/check-auth")
const mongoose = require('mongoose');


module.exports = {
    Mutation: {
        async createTodo(_, { createTodoInput: { content, tdate } }, context) {

            const user = await CheckAuth(context);
            const newTodo = new Todo({
                userSub: user.sub,
                content: content,
                status: false,
                updatedAt: new Date(tdate),
                createdAt: new Date(tdate)
            });

            return await newTodo.save();
        },
        async updateTodo(_, { updateTodoInput: { id, status, updatedAt } }, context) {
            var id = mongoose.mongo.ObjectId(id);
            let todofetched = await Todo.findOne({ _id: id })
            todofetched.status = status;
            todofetched.updatedAt = new Date(updatedAt);
            return await todofetched.save()
        }
    },
    Query: {
        async fetchTodo(_, __, context) {
            const user = await CheckAuth(context);
            // tdate = new Date(Date.parse(tdate));
            // let fromDate = new Date(tdate.getFullYear(), tdate.getMonth(), tdate.getDate(), 0,0,0);
            // let toDate = new Date(fromDate);
            // toDate.setDate(fromDate.getDate() + 1);
            return await Todo.find({
                userSub: user.sub
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            })
        }
    }
}