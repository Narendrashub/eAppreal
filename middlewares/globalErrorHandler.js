

export const globalErrorHandler=(error,req,res,next)=>{
let statusCode=error.status?error.status:500
res.status(statusCode).json({
    stack:error.stack,
    message:error.message
})

}