import { Context } from "hono";
import TestimonyInterface from "../../interface/testimony_interface";
import prisma from "../../lib/prisma";
import { connect } from "bun";
import getUser from "../../utils/user";

const createTestimony = async(c:Context) =>{
    try{
        const body = <TestimonyInterface> await c.req.json()
        const user = await getUser(c)
        const createdTestimony = await prisma.testimonial.create({
            data : {
                name : body.name,
                orgName : body.orgName,
                role : body.role,
                testimony : body.testimony,
                imageUrl : body.imageUrl,
                user : {
                    connect : {
                        id : user.id
                    }
                }
            }
        })
        return c.json(createdTestimony, 200)
    }catch(err){
        return c.json({
            error : err
        },500)
    }
}

export default createTestimony