import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'Todo Title is required'],
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.models.todo || mongoose.model('todo', schema)
