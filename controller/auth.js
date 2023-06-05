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
            message: "Password dan confirm Password tidak cocok"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        con.query(`SELECT email FROM user WHERE email = '${email}'`, function(err, data, field){
            if(data?.length > 0){
                return res.status(400).json({
                    status: "fail",
                    message: "Email sudah terdaftar."
                })
            }

            const createdAt = new Date().toISOString();
            const updatedAt = createdAt;
            if(data?.length == 0){
                con.query("INSERT INTO user SET?", {email: email, name: name, password: hashPassword, createdAt: createdAt, updatedAt: updatedAt} , function(err, data){
                    return res.status(201).json({
                        status: "success",
                        message: "akun berhasil dibuat"
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
    con.query(`SELECT * FROM user WHERE email = '${email}'`, async function(error, data) {
        if (data.length > 0) {
            const match = await bcrypt.compare(req.body.password, data[0].password);
            if(!match){
                return res.status(400).json({
                    message:"Password salah"
                });
            }
            const accessToken = jwt.sign({ id_user: data[0].id, email: data[0].email },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '30d'
                }
            );
            res.json({ accessToken });
        }else if (data.length == 0){
            res.status(400).json({
                status: "fail",
                message: "Email belum terdaftar."
            })
        }
    })
}