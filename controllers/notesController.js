const User = require('../models/User')
const Note = require('../models/Note')
//keeps from having to use so many try catch blocks
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllNotes = asyncHandler(async (req, res) => {
    
})

const createNewNote = asyncHandler(async (req, res) => {

})

const updateNote = asyncHandler(async (req, res) => {

})

const deleteNote = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}