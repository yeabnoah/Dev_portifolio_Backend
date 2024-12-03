import { Context } from "hono";
import prisma from "../../lib/prisma";

const getSkills = async(c:Context) => {
    try{
        const userid = await c.req.param("userid")
        const skills = await prisma.skill.findMany({
            where : {
                userId : userid
            }
        })
        return c.json(skills, 200)
    }catch(err){
        return c.json({
            error : err
        },500)
    }
   
}

export default getSkills