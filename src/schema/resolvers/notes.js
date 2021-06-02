const { UserInputError } =  require('apollo-server');
const Note = require('../../models/Note');
const CheckAuth  = require("../../util/check-auth")
const mongoose = require('mongoose');
const { stat } = require('fs');

module.exports = {
    Mutation: {
        async createNote(_, { addNote: { title, content, has_header, header_image, header_content, tags }}, context){
            const user = await CheckAuth(context);
            const newNote = new Note({
                userSub: user.sub,
                title: title,
                content: content,
                archieved: false, 
                has_header: has_header,
                header_image: header_image,
                header_content: header_content,
                tags: tags,
                createdAt: new Date().toISOString()
            });
    
            return await newNote.save();
        },
        async reformNote(_, {updateNote: {id, title, content, has_header, header_image, header_content, tags}}){
            var id =  mongoose.mongo.ObjectId(id);
            let notefetched = await Note.findOne({_id: id})
            if(!notefetched){
                throw new UserInputError("Note not found", {errors:"Please provide a valid note id"});
            }else{
                notefetched.title = title;
                notefetched.content = content;
                notefetched.has_header = has_header;
                notefetched.header_image = header_image;
                notefetched.header_content = header_content;
                notefetched.tags = tags;

                return await notefetched.save()
            }
        },

        async archieveNote(_, { id, status }, context){
            const user = await CheckAuth(context);
            
            let notefetched = await Note.findOne({_id: id})
            if(!notefetched){
                throw new UserInputError("Note not found", {errors:"Please provide a valid note id"});
            }else{
                if(user.sub != notefetched.userSub){
                    throw new UserInputError("Access Denied", {errors:"Notes not created by user"});
                }else{
                    notefetched.archieved = status
                    return await notefetched.save()
                }
            }
        },

        async deleteNote(_, { id }, context){
            const user = await CheckAuth(context);
            let notefetched = await Note.findOne({_id: id})
            if(!notefetched){
                throw new UserInputError("Note not found", {errors:"Please provide a valid note id"});
            }else{
                if(user.sub != notefetched.userSub){
                    throw new UserInputError("Access Denied", {errors:"Notes not created by user"});
                }else{
                    notefetched.delete();
                    return 'Note deleted successfully'
                }
            }
        }
    },
    Query: {
        async fetchNotes (_, { archieved }, context){
            const user = await CheckAuth(context);
            return await Note.find({userSub: user.sub, archieved: archieved})
        },
        async fetchNote (_, {id}){
            var id =  mongoose.mongo.ObjectId(id);
            let notefetched = await Note.findOne({_id: id})
            if(!notefetched){
                throw new UserInputError("Note not found", {errors:"Please provide a valid note id"});
            }else{
                return notefetched
            }
        }
    }
}