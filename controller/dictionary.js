import con from "../connection.js";

//get dictionary
export const getAllWord = function(req, res){
    con.query(`SELECT * FROM dictionary`, function(err, data){
        if(err){
            return res.status(500).json({
                status: "fail"
            })
        }
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data
        })
    })
}


//get dictionary by id
export const getWordbyId = function(req, res, next){
    const idDictionary = req.params.idDictionary;
    con.query(`SELECT * FROM dictionary WHERE idDictionary = ?`, idDictionary, function(err, data){
        if(err){
            return res.status(500).json({
                status: "fail"
            })
        }if (data.length == 0){
            return res.status(404).json({
            status: "fail",
            message: "Can not find the word"
            })
        }
        return res.status(200).json({
        status: "success",
        data: data
        })
    })
}

//add dictionary
export const addWord = function(req, res){
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;

    con.query(`INSERT INTO dictionary SET name = '${name}', imgUrl = '${imgUrl}'`, function(err, data){
        if(!err){
            return res.status(201).json({
                status: "success",
                message: "Word uploaded"
            })
        }
        return res.status(500).json({
        status: "fail"
        })
    })
}

//edit ditionary by id
export const editWordById = function(req, res){
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const idDictionary = req.params.idDictionary;

    con.query(`SELECT * FROM dictionary WHERE idDictionary = ?`, idDictionary , function(err, data){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Can not find the word"
            })
        }
        else{
            con.query(`UPDATE dictionary SET name = '${name}', imgUrl = '${imgUrl}' WHERE idDictionary = ${idDictionary}` , function(err, data){
                res.status(200).json({ status: "success", message: "Update success" }) 
            })
        }
    })
}

//delete dictionary
export const deleteWord = function(req, res){
    const idDictionary = req.params.idDictionary;

    con.query(`SELECT * FROM dictionary WHERE idDictionary = ?`, idDictionary, function(err, data, next){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Can not find the word"
            })
        }else{
            con.query(`DELETE FROM dictionary WHERE idDictionary = ?`, idDictionary , function(err, data, field){
                if(err){
                    res.status(500).json({
                        status: "fail"
                    })
                }else{
                    res.status(200).json({
                        status: "success",
                        message: "success deleted the word"
                    })
                }
            })
        }
    })
}
