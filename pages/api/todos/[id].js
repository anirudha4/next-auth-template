import Todo from "models/Todo";
import dbConnect from "utils/db"

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;
    if(req.method === 'PUT') {
        await Todo.findByIdAndUpdate(id, req.body, { new: true });
        const todos = await Todo.find();
        res.status(200).json(todos)
    } else {
        const todo = await Todo.create({
            ...req.body
        })
        res.json(todo)
    }
}
