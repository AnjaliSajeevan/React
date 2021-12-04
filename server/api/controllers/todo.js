import * as todoService from '../services/todo.js';

const setResponse =(data,response)=>{
    response.status(200);
    response.json(data);
}

const errorhandler =(message,response)=>{
    response.status(500);
    response.json({error:message});
}

export const index = async(request,response) => {
    try{
    const todo = await todoService.search();
        setResponse(todo,response);
    }catch(e) {
        errorhandler(e.message,response);

    }
    

};

export const save = async(request,response) => {
    try{
        const todo = {...request.body}; //cloning it - spred object
        const newtodo = await todoService.create(todo);
        setResponse(newtodo,response);
    }catch(e){
        errorhandler(e.message,response);

    }
    
}

export const get = async (request,response) =>{
    try{
        const id = request.params.id;
        const todo= await todoService.get(id);
        setResponse(todo,response);
    }catch(e){
        errorhandler(e.message,response);

    }
};

export const update= async(request,response) => {
    try{
        const id = request.params.id; //cloning it - spred object
        const todo = {...request.body, id};
        const updatedtodo = await todoService.update(todo);
        setResponse(updatedtodo,response);
    }catch(e){
        errorhandler(e.message,response);

    }
};

export const remove = async (request,response) =>{
    try{
        const id = request.params.id;
        const todo= await todoService.remove(id);
        setResponse({message :`todo ${id} removed successfully`},response);
    }catch(e){
        errorhandler(e.message,response);

    }
};