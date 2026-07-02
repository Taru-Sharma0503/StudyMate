const express=require('express');
const router=express.Router();
const notesController=require('../controllers/notes.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const upload=require('../middlewares/multer.middleware');

router.use(authMiddleware.isLoggedIn);

router.get('/get-notes',notesController.getNotes);
router.post('/create-note',upload.single('file'),notesController.createNote);
router.patch('/update-note/:id',upload.single('file'),notesController.updateNote);
router.delete('/delete-note/:id',notesController.deleteNote);

module.exports=router;