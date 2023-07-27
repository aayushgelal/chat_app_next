import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const checkUser= async (req,rest,next) => {
    try{
        const {email} =req.body;
        if(!email){
            return res.json({msg:"Email is Required",status:false})
        }
       const data= await prisma.user.findUnique({
            where:{email:email}
        })
        return res.json({email:email,name:data.name})

       

    }
    catch(err){
        next(err)
    }
}
export const signup=async(req,res,next) =>{
    try{
        const{email,name,userId}=req.body;
        console.log(email,name)
        if(!email||!name){
            return res.sendStatus(400)
        }
        else{
             await prisma.user.create({data:{
                userId:userId,
                name:name,
                email:email
             }
            })
            return res.sendStatus(200)

        } 

    }
    catch(e){
        next(e)

    }
}