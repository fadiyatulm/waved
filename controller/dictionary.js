import con from "../connection.js";

//get dictionary
export const getAllDictionary = function(req, res){
    con.query("SELECT * FROM dictionary", function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data
            })
        }
    })
}

//get dictionary by id
export const getDictionarybyId = function(req, res, next){
    con.query("SELECT * FROM dictionary WHERE idDictionary = " + req.params.idDictionary , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Kata tidak ada dalam kamus"
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

//add dictionary
export const addDictionary = function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;

    con.query("INSERT INTO dictionary SET?", {name: name, image: image, description: description} , function(err, data){
        if(err){
            res.status(500).json({
            status: "fail"
            })
        }else{
            res.status(201).json({
                status: "success",
                message: "Kata berhasil diunggah dalam kamus"
            })    
        }
    })
}

//edit ditionary by id
export const editWordById = function(req, res){
    const name = req.body.name;
    const description = req.body.description;
    const idDictionary = req.params.idDictionary;

    con.query(`SELECT * FROM dictionary WHERE idDictionary = ${idDictionary}`, function(err, data){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Kata tidak ditemukan"
            })
        }
        else{
            con.query(`UPDATE dictionary SET name = '${name}', description = '${description}' WHERE idDictionary = ${idDictionary}` , function(err, data){
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

//delete dictionary