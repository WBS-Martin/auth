const db = require('../db')

const getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(data.rows)
    }
  })
}

const deleteOneStudent = (req, res) => {
  db.query(
    'DELETE FROM students WHERE name = $1',
    [req.params.name],
    (err, data) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.sendStatus(204)
      }
    }
  )
}

module.exports = { getAllStudents, deleteOneStudent }
