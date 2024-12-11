// import mongoose and schema from mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

// create a new schema for reactions
const reactionsSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => new Date(createdAtVal).toLocaleString()
    }
}, {
    toJSON: { getters: true },
});

// create thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionsSchema]
}, {
    toJSON: { virtuals: true },
    id: false,
});

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
export default Thought;