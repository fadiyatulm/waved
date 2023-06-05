import express from "express";
import { verifyToken } from "./verifytoken.js";
import { addUser, Login } from "./controller/auth.js";
import { getUsers, deleteUser, getUsersById, editUserById} from "./controller/user.js";
import { addQuestion, getAllQuestion, getQuestbyId, getRandomQuestion } from "./controller/quiz.js";
import { getAllWord, getWordbyId, addWord } from "./controller/dictionary.js";
    

const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).json({
        status: "success",
        message: "REST API berjalan"
    })
})
router.get('/users', verifyToken, getUsers);
router.get('/users/(:id)', verifyToken, getUsersById);
router.post('/register', addUser);
router.post('/login', Login);
router.put('/users/(:id)/update', verifyToken, editUserById);
router.delete('/users/(:id)/delete', verifyToken, deleteUser);

router.get('/question', verifyToken, getAllQuestion);
router.get('/question/(:idQuest)', verifyToken, getQuestbyId);
router.get('/question/random', verifyToken, getRandomQuestion);
router.post('/question', verifyToken, addQuestion);

router.get('/dictionary', verifyToken, getAllWord);
router.get('/dictionary/(:idDictionary)', verifyToken, getWordbyId);
router.post('/dictionary', verifyToken, addWord);


export default router;
