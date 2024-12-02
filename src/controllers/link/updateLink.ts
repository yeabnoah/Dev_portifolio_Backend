import { Context } from "hono";
import LinkInterface from "../../interface/link_interface";
import getUser from "../../utils/user";
import prisma from "../../lib/prisma";

const updateLink = async(c:Context) =>{
    try{
        const body =  await c.req.json()
        const user = await getUser(c)
        const id = Number(await c.req.param("id"))
    
        const infoData = await prisma.info.findUnique({
            where : {
                userId : user.id
            }
        })
    
        const updatedLink = await prisma.links.update({
            where : {
                id : id,
                infoId : infoData?.id
            },
            data : body
        })
    
        return c.json(updatedLink, 200)
    }catch(err){
        return c.json({
            error : err
        }, 500)
    }
}

export default updateLink

