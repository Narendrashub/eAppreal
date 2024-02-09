import http from 'http'
import app from './app/app.js'
const PORT=process.env.PORT


const server=http.createServer(app)
server.listen(PORT,(err)=>{
    console.log(`server is running on port ${PORT}`);
})