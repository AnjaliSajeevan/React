import Todo from "../models/todo.js";
/**
 * Search the todos
 * @param {*} params 
 * @returns 
 */
export const search=(params ={}) => {
    const promise = Todo.find(params).exec();
    return promise;
};

export const create = (todo) => {
    const newtodo = new Todo(todo);

    return newtodo.save();
}

export const get = (id) => {
    const promise = Todo.findById(id).exec();
    return promise;
}

export const update = (todo) =>{
    todo._id = todo.id;
    const promise = Todo.findByIdAndUpdate(todo.id, todo , { new:true }).exec();
    return promise;
}

export const remove = (id) =>{
    const promise = Todo.findByIdAndDelete(id).exec();
    return promise;
}