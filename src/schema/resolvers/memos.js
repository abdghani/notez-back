const Memo = require('../../models/Memo');
const CheckAuth  = require("../../util/check-auth")
const mongoose = require('mongoose');

module.exports = {
    Mutation: {
        async createMemo(_, { addMemo: {mdate, content, tags} }, context) {
            const user = await CheckAuth(context);
            const newMemo = new Memo({
                userSub: user.sub,
                content: content,
                tags: tags,
                createdAt: new Date(mdate)
            });
            return await newMemo.save();
        },
        async removeMemo(_, { id }, context){
            const user = await CheckAuth(context);
            var id =  mongoose.mongo.ObjectId(id);
            
            let memofetched = await Memo.findOne({_id: id})
            if(!memofetched){
                throw new UserInputError("Note not found", {errors:"Please provide a valid note id"});
            }else{
                if(user.sub != memofetched.userSub){
                    throw new UserInputError("Access Denied", {errors:"Notes not created by user"});
                }else{
                    memofetched.delete();
                    return 'Note deleted successfully'
                }
            }
        }
    },
    Query: {
        async fetchMemo(_, {fdate, tdate}, context){
            const user = await CheckAuth(context);
            return await Memo.find({
                userSub: user.sub,
                createdAt: {
                    $gte: new Date(fdate), 
                    $lt: new Date(tdate)
                }
            }).sort({createdAt:-1})
        }
    }
}