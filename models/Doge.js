const mongoose = require('../db/mongodb_connect');
const User = require('../models/User');

const dogesPerPage = 5;

let dogeSchema = mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    size: {
        type: [String],
        required: true,
        enum: ['Small', 'Medium', 'Big']
    },
    sex: {
        type: [String],
        required: true,
        enum: ['Male', 'Female']
    },
    age: {
        type: Number,
        required: true,
    },
    personality: {
        type: String, 
        required: false
    },
    needs: {
        type: String, 
        required: false
    },
    information: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true
    }
})

dogeSchema.statics.getDoges =  async (params)=> 
{
    let { page, name, breed, size, personality, owner } = params;
    let filters = {};
    
    if(name)
        filters.name = { '$regex': name, $options: 'i' };
    if(breed)
        filters.breed = { '$regex': breed, $options: 'i' };
    if(size)
        filters.size = { '$regex': size, $options: 'i' };
    if(personality)
        filters.personality = { '$regex': personality, $options: 'i' };
    if(owner)
        filters.owner = { '$regex': owner, $options: 'i' };

    let n = await Doge.find(filters).count();
    let docs = await Doge
        .find(filters)
        .skip(dogesPerPage * page - dogesPerPage)
        .limit(dogesPerPage)

    docs.push({ "n" : n });

    return docs;
}

dogeSchema.statics.saveDoge = async function(newDoge)
{
    let doge = new Doge(newDoge);
    let dbOwner = await User.findOne({ email: doge.owner });

    if(!dbOwner)
        return 404;

    try{
        let doc = await doge.save();

        return doc;
    }
    catch(e)
    {
        throw e;
    }
}

dogeSchema.statics.updateDoge = async function(uid, data)
{
    let doc = await Doge.findOneAndUpdate(
            { uid },
            { $set: data },
            { new: true, useFindAndModify: false });
    return doc;
}

dogeSchema.statics.getDoge = async uid => {
    let doc = await Doge.findOne({uid});

    return doc;
}

dogeSchema.statics.deleteDoge = async uid => 
{
    let doc = await Doge.remove({uid});

    if(doc.deletedCount > 0)
        return 200;
    return 404;
}

let Doge = mongoose.model('doge', dogeSchema);
module.exports = Doge;
