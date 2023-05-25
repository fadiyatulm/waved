import con from "../connection.js";
import bcrypt from "bcrypt";

//register
export const addUser = async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const users = {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword
        }
        con.query(`SELECT email FROM user WHERE email = '${users.email}'`, function(err, data, field){
            if(data?.length > 0){
                res.status(400).json({
                    status: "fail",
                    message: "Email sudah terdaftar."
                })
            }

            const createdAt = new Date().toISOString();
            const updatedAt = createdAt;
            if(data?.length == 0){
                con.query("INSERT INTO user SET?", {email: users.email, name: users.name, password: hashedPassword, createdAt: createdAt, updatedAt: updatedAt} , function(err, data){
                    res.status(201).json({
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

//get user
export const getUsers = async(req, res, next) => {
    con.query("SELECT * FROM user", function(err, data, fields){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            })
        }
    })
};

//getuser by id
export const getUsersById = function(req, res){
    con.query("SELECT * FROM user WHERE id = " + req.params.id , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "User tidak ditemukan"
                })
            }else{
                res.status(200).json({
                    status: "success",
                    data: data
                })
            }
        }    
    })
}

//edit user
export const editUserById = function(req, res){
    const email = req.body.email;
    const name = req.body.name;
    const id = req.params.id;
    const updatedAt = new Date().toISOString();

    con.query(`SELECT * FROM user WHERE id = ${id}`, function(err, data, next){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "User tidak ditemukan"
            })
        }
        else{
            con.query(`SELECT email FROM user WHERE email = '${email}'`, function(err, data, field){
                if(data?.length > 0){
                    res.status(400).json({
                        status: "fail",
                        message: "Email sudah terdaftar."
                    })
                }else{
                    con.query(`UPDATE user SET email = '${email}', name = '${name}', updatedAt = '${updatedAt}' WHERE id = ${id}` , function(err, data, field){
                        if(err){
                            res.status(500).json({
                                status: "fail"
                            })
                        }else{
                            res.status(200).json({
                                status: "success",
                                message: "berhasil diperbarui"
                            }) 
                        }
                    })
                }        
            })
        }
    })
}

//delete user
export const deleteUser = function(req, res){
    const id = req.params.id;

    con.query(`SELECT * FROM user WHERE id = ${id}`, function(err, data, next){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "User tidak ditemukan"
            })
        }else{
            con.query(`DELETE FROM user WHERE id = ${id}` , function(err, data, field){
                if(err){
                    res.status(500).json({
                        status: "fail"
                    })
                }else{
                    res.status(200).json({
                        status: "success",
                        message: "berhasil dihapus"
                    })
                }
            })
        };
    })
};
