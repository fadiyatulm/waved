import express from "express";
// import {auth} from "./auth/auth.js";
import { getUsers, addUser, deleteUser, getUsersById, editUserById} from "./controller/user.js";
import { addQuestion, getAllCategories, getCatbyId, addCat, editCatById, deleteCat, getAllStage, getStagebyId, getAllQuestion, getQuestbyId, getQuestbyCat, getQuestbyStage} from "./controller/quiz.js";
import { getAllDictionary, getDictionarybyId, addDictionary, editWordById } from "./controller/dictionary.js";
    

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/(:id)', getUsersById);
router.post('/register', addUser);
// router.post('/login', login);
router.put('/users/edit/(:id)', editUserById);
router.delete('/users/delete/(:id)', deleteUser);

router.get('/categories', getAllCategories);
router.get('/categories/(:catId)', getCatbyId);
router.post('/categories', addCat);
router.put('/categories/update/(:catId)', editCatById);
router.delete('/categories/delete/(:catId)', deleteCat);

router.get('/stage', getAllStage);
router.get('/stage/(:idStage)', getStagebyId);

router.get('/question', getAllQuestion);
router.get('/question/(:idQuest)', getQuestbyId);
router.get('/question/categories/(:catId)', getQuestbyCat);
router.get('/question/stage/(:idStage)', getQuestbyStage);
router.post('/question', addQuestion);

router.get('/dictionary', getAllDictionary);
router.get('/dictionary/(:idDictionary)', getDictionarybyId);
router.post('/dictionary', addDictionary);
router.put('/dictionary/update/(:idDictionary)', editWordById);


export default router;
