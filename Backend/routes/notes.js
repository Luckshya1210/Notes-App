const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1 :  Get all the notes::GET token from header.login reqd
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }
})


//ROUTE 2 :  Add a new note using post request notes::login reqd
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
        // const notes= await Notes.find({user:req.user.id});
        res.json(savednote)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }
})
//ROUTE 3 :  update an existing note using post request notes::login reqd
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note object
    try {

        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            //logged in person trying to acess other note
            return res.status(401).send("Not Authorized")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }


    // const note=Notes.findByIdAndUpdate()
})
//ROUTE 4 :  delete an existing note using delete request notes::login reqd
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        //allows deletion only if the user owns
        if (note.user.toString() !== req.user.id) {
            //logged in person trying to acess other note
            return res.status(401).send("Not Authorized")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });


        // const note=Notes.findByIdAndUpdate()

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router