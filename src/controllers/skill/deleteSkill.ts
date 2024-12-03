import { Context } from "hono";
import getUser from "../../utils/user";
import prisma from "../../lib/prisma";

const deleteSkill = async( c:Context) => {
    try{
        const id = Number(await c.req.param("id"))
        const user = await getUser(c)
    
        const skillDeleted = await prisma.skill.delete({
            where : {
                userId : user.id,
                id : id
            }
        })
    
        return c.json(skillDeleted, 200)
    }catch(err){
        return c.json({
            error : err
        }, 500)
    }
}

export default deleteSkill