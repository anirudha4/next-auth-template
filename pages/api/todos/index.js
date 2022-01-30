import Todo from "models/Todo";
import dbConnect from "utils/db"

export default async function handler(req, res) {
    await dbConnect();
    if(req.method === 'GET') {
        const todos = await Todo.find().lean();
        res.status(200).json(todos)
    } else {
        const todo = await Todo.create({
            ...req.body
        })
        res.json(todo)
    }
}
