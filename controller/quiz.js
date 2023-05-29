import con from "../connection.js";

export const addCat = function(req, res){
    const name = req.body.name;

    con.query(`SELECT name FROM cat WHERE name = '${name}'`, function(err, data){
        if(data?.length > 0){
            res.status(400).json({
                status: "fail",
                message: "Kategori sudah tersedia"
            })
        }else{
            con.query("INSERT INTO cat SET?", {name: name} , function(err, data){
                if(err){
                    res.status(500).json({
                        status: "fail"
                    })
                }else{
                    res.status(201).json({
                        status: "success",
                        message: "Kategori berhasil dibuat"
                    })    
                }
            })
        }
    }) 
}

export const getAllCategories = function(req, res){
    con.query("SELECT * FROM cat", function(err, data){
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

export const getCatbyId = function(req, res){
    con.query("SELECT * FROM cat WHERE catId = " + req.params.catId , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Kategori tidak tersedia"
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

export const editCatById = function(req, res){
    const name = req.body.name;
    const catId = req.params.catId;

    con.query(`SELECT * FROM cat WHERE catId = ${catId}`, function(err, data){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Kategori tidak ditemukan"
            })
        }
        else{
            con.query(`UPDATE cat SET name = '${name}' WHERE catId = ${catId}` , function(err, data){
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

export const deleteCat = function(req, res){
    const catId = req.params.catId;

    con.query(`SELECT * FROM cat WHERE catId = ${catId}`, function(err, data, next){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Kategori tidak ditemukan"
            })
        }else{
            con.query(`DELETE FROM cat WHERE catId = ${catId}` , function(err, data, field){
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
        }
    })
}

export const getAllStage = function(req, res){
    con.query("SELECT * FROM stage", function(err, data){
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

export const getStagebyId = function(req, res){
    con.query("SELECT * FROM stage WHERE idStage = " + req.params.idStage , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Stage tidak tersedia"
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

export const getAllQuestion = function(req, res){
    con.query("SELECT * FROM question", function(err, data){
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

export const getQuestbyId = function(req, res, next){
    con.query("SELECT * FROM question WHERE idQuest = " + req.params.idQuest , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Soal tidak tersedia"
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

export const getQuestbyCat = function(req, res){
    con.query("SELECT * FROM question WHERE catId = " + req.params.catId , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Tidak ada soal di kategori ini"
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

export const getQuestbyStage = function(req, res){
    con.query("SELECT * FROM question WHERE idStage = " + req.params.idStage , function(err, data){
        if(err){
            res.status(500).json({
                status: "fail"
            })
        }else{
            if (data.length == 0){
                res.status(404).json({
                    status: "fail",
                    message: "Tidak ada soal di level ini"
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

// get random question

// add question
export const addQuestion = function(req, res){
    const question = req.body.question;
    const catId = req.body.catId;
    const idStage = req.body.idStage;

    con.query("INSERT INTO question SET?", {question: question, catId: catId, idStage: idStage} , function(err, data){
        if(err){
            res.status(500).json({
            status: "fail"
            })
        }else{
            res.status(201).json({
                status: "success",
                message: "Pertanyaan berhasil"
            })    
        }
    })
}

// delete question

// update question

// edit question