const jwt = require('jsonwebtoken')
const db = require('../db')

// middleware to check if user is logged in
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).json({ error: 'Not authorized' })
    } else {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedUser

      const foundUser = await db.query(
        `SELECT * FROM students WHERE name = $1`,
        [decodedUser.name]
      )
      if (!foundUser.rows[0]) {
        res.status(400).json({ error: 'User does not exist' })
      }

      next()
    }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { verifyToken }
