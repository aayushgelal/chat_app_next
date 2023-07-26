export const checkUser=(req,rest,next) => {
    try{
        const {email} =req.body;
        if(!validator.isEmail(email)){

        }

    }
    catch(err){
        next(err)
    }
}