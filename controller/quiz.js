import con from "../connection.js";

export const getRandomQuestion = function(req, res){
    con.query(`SELECT * FROM question ORDER BY RAND() LIMIT 1`, function(err, data){
        if(err){
            return res.status(500).json({
                status: "fail"
            })
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    })
}

export const addScore = function (req, res) {
    const highscore = req.body.highscore;
    const email = req.body.email;

    con.query(`UPDATE user SET highscore = '${highscore}' WHERE email = '${email}'`, function(err, data){
        if(err){
            res.status(500).json({ status: "fail" })
        }else{
            res.status(200).json({ 
                status: "success", 
                message: "berhasil diperbarui", 
            }) 
        }
    })
}

export const getAllQuestion = function(req, res){
    con.query(`SELECT * FROM question`, function(err, data){
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
    con.query(`SELECT * FROM question WHERE idQuest = ` + req.params.idQuest , function(err, data){
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

// add question
export const addQuestion = function(req, res){
    const question = req.body.question;

    con.query("INSERT INTO question SET?", {question: question} , function(err, data){
        if(err){
            res.status(500).json({
            status: "fail"
            })
        }else{
            res.status(201).json({
                status: "success",
                message: "Pertanyaan berhasil diunggah"
            })    
        }
    })
}

// update question
export const editQuestById = function(req, res){
    const question = req.body.question;
    const idQuest = req.params.idQuest;

    con.query(`SELECT * FROM question WHERE idQuest = '${idQuest}'`, function(err, data){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Soal tidak ditemukan"
            })
        }
        else{
            con.query(`UPDATE question SET question = '${question}' WHERE idQuest = ${idQuest}` , function(err, data){
                if(err){
                    res.status(500).json({ status: "fail" })
                }else{
                    res.status(200).json({ status: "success", message: "berhasil diperbarui" }) 
                }
            })
        }
    })
}

//delete question
export const deleteQuestion = function(req, res){
    const idQuest = req.params.idQuest;

    con.query(`SELECT * FROM question WHERE idQuest = ${idQuest}`, function(err, data, next){
        if (data.length == 0){
            res.status(404).json({
                status: "fail",
                message: "Soal tidak ditemukan"
            })
        }else{
            con.query(`DELETE FROM question WHERE idQuest = ${idQuest}` , function(err, data, field){
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