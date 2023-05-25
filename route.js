import express from "express";
// import {auth} from "./auth/auth.js";
import { getUsers, addUser, deleteUser, getUsersById, editUserById } from "./controller/user.js";
import { getAllCategories, 
    getCatbyId, addCat, editCatById, deleteCat, getAllStage, getStagebyId, getAllQuestion, getQuestbyId } from "./controller/quiz.js";

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

export default router;
