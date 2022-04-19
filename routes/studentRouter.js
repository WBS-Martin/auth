const express = require('express')
const router = express.Router()
const {
  getAllStudents,
  deleteOneStudent,
} = require('../controllers/studentController')

router.get('/', getAllStudents)
router.delete('/:name', deleteOneStudent)

module.exports = router
