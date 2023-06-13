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
router.get('/users', verifyToken, getUsers);
router.get('/users/(:id)', verifyToken, getUsersById);
router.put('/users/(:id)/update', verifyToken, editUserById);
router.delete('/users/(:id)/delete', verifyToken, deleteUser);

router.get('/question', verifyToken, getAllQuestion);
router.get('/question/(:idQuest)', verifyToken, getQuestbyId);
router.post('/question', verifyToken, addQuestion);
router.put('/question/(:idQuest)/update', verifyToken, editQuestById);
router.delete('/question/(:idQuest)/delete', verifyToken, deleteQuestion);
router.get('/questions/random', verifyToken, getRandomQuestion);

router.get('/dictionary', verifyToken, getAllWord);
router.get('/dictionary/(:idDictionary)', verifyToken, getWordbyId);
router.post('/dictionary', verifyToken, addWord);
router.put('/dictionary/(:idDictionary)/update', verifyToken, editWordById)
router.delete('/dictionary/(:idDictionary)/delete', verifyToken, deleteWord)


export default router;
