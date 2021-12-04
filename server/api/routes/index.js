import todoRouter from './todo.js'


export default(app) => {
    app.use('/',todoRouter);
}