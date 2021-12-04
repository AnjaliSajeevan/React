import app from './api/app.js';


const port = 3002;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.get('/todos', (req, res) => {
//   res.send('<h1>Contatcs!</h1>')
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});