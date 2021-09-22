const mongoose = require('../db/mongodb_connect')

const usersPerPage = 10;

let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    sex: {
        type: [String],
        required: true,
        enum: ['Male', 'Female']
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

userSchema.statics.getUsers =  async ()=> 
{
    let docs = await User.find()
                    
    return docs;
}

userSchema.statics.saveUser = async function(newUser){
    let user = new User(newUser);

    try{
        let doc = await user.save();

        return doc;
    }
    catch(e)
    {
        throw e;
    }
}

userSchema.statics.updateUser = async function(email, data)
{
    let doc = await User.findOneAndUpdate(
            { email },
            { $set: data },
            { new: true, useFindAndModify: false });
    return doc;
}

userSchema.statics.getUser = async email => {
    let doc = await User.findOne({email});

    return doc;
}

userSchema.statics.deleteUser = async email => 
{
    let doc = await User.remove({email});

    if(doc.deletedCount > 0)
        return 200;
    return 404;
}

let User = mongoose.model('user', userSchema);
module.exports = User;
