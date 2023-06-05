import con from "../connection.js";
import * as dotenv from 'dotenv';
dotenv.config();

//get user
export const getUsers = function(req, res) {
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
