import express from "express";
import { verifyToken } from "./verifytoken.js";
import { addUser, Login } from "./controller/auth.js";
import { getUsers, deleteUser, getUsersById, editUserById} from "./controller/user.js";
import { addQuestion, deleteQuestion, editQuestById, getAllQuestion, getQuestbyId, getRandomQuestion } from "./controller/quiz.js";
import { getAllWord, getWordbyId, addWord, editWordById, deleteWord } from "./controller/dictionary.js";
    

const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).json({
        status: "success",
        message: "REST API berjalan"
    })
})

router.post('/register', addUser);
router.post('/login', Login);
router.get('/users', getUsers);
router.get('/users/(:id)', getUsersById);
router.put('/users/(:id)/update', editUserById);
router.delete('/users/(:id)/delete', deleteUser);

router.get('/question', getAllQuestion);
router.get('/question/(:idQuest)', getQuestbyId);
router.post('/question', addQuestion);
router.put('/question/(:idQuest)/update', editQuestById);
router.delete('/question/(:idQuest)/delete', deleteQuestion);
router.get('/questions/random', getRandomQuestion);

router.get('/dictionary', getAllWord);
router.get('/dictionary/(:idDictionary)', getWordbyId);
router.post('/dictionary', addWord);
router.put('/dictionary/(:idDictionary)/update', editWordById)
router.delete('/dictionary/(:idDictionary)/delete', deleteWord)


export default router;
