import {Router} from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "../db.js"; 
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import z from "zod";

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "ddd"

const userRouter = Router()

userRouter.post("/signup", async (req,res) => {
    const { name, email, password } = req.body;
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(5),
        name: z.string().min(3).max(100)
    })

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            message: "Incorrect format"
        })
    }

    console.log(email);
    try{
        const existingUser = await UserModel.findOne({ 
            email: email 
        });
        if (existingUser) {
            return res.status(409).send({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,5)
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        })

        res.send({
            message: "User created",
            success: true
        })
    }
    catch(e){
        res.status(500).send({
            message: "Error in creating user",
            success: false
        })
    }
})

userRouter.post("/signin", async (req,res) => {
    const { email, password } = req.body;
    console.log(email + password);
    try{
        const user = await UserModel.findOne({
            email: email
        })
        console.log(user?.name);
        if(!user){
            return res.status(401).send({
                message: "user not found",
                success: false
            })
        }
        const match = await bcrypt.compare(password,user.password);
        if(match){
            const token = jwt.sign({
                id: user._id
            },JWT_SECRET)

            res.send({
                message: "user logged in succesfully",
                token: token,
                success: true,
                userName: user.name
            })
        }
        else{
            return res.status(401).send({
                message: "incorrect password",
                success: false
            })
        }
    }
   
    catch(e){
       res.status(500).send({
            message: "Error in logging user",
            success: false
        })
    }
})

export default userRouter