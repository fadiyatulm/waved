import con from "../connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

//register
export const addUser = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confPassword = req.body.confPassword;

    if(password !== confPassword){
        return res.status(400).json({
            status: "fail",
            message: "Password and Confirm Password don't match!"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        con.query(`SELECT email FROM user WHERE email = ?`, email, function(err, data, field){
            if(data?.length > 0){
                return res.status(400).json({
                    status: "fail",
                    message: "Email has been registered!"
                })
            }

            const createdAt = new Date().toISOString();
            const updatedAt = createdAt;
            if(data?.length == 0){
                con.query("INSERT INTO user SET?", {email: email, name: name, password: hashPassword, createdAt: createdAt, updatedAt: updatedAt} , function(err, data){
                    return res.status(201).json({
                        status: "success",
                        message: "Account created!"
                    })    
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "fail"
        })
    }
}

export const Login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query(`SELECT * FROM user WHERE email = ?`, email, async function(error, data) {
        if (data.length > 0) {
            const comparePwd = await bcrypt.compare(password, data[0].password);
            if(!comparePwd){
                return res.status(400).json({
                    message:"Wrong Password!"
                })
            }
            const accessToken = jwt.sign({userId: data[0].id, email: data[0].email},
                process.env.ACCESS_TOKEN, {
                    expiresIn: '20d'
            })
            
            res.status(200).json({ 
                message: "Login success",
                accessToken });

        }else if (data.length == 0){
            res.status(400).json({
                status: "fail",
                message: "Email hasn't been registered!"
            })
        }
    })
}