const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const db = require('../db')

// async signup function with bcrypt, set token in header
const signup = async (req, res) => {
  const { name, password, admin } = req.body

  const foundUser = await db.query(`SELECT * FROM students WHERE name = $1`, [
    name,
  ])
  if (foundUser.rows[0]) {
    res.status(400).json({ error: 'User already exists' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.query(
    `INSERT INTO students (name, password, admin) VALUES ($1, $2, $3) RETURNING *`,
    [name, hashedPassword, admin || false]
  )

  const token = jwt.sign(
    { name: user.rows[0].name, admin: user.rows[0].admin },
    process.env.JWT_SECRET
  )

  res.status(200).json({ token })
}

// async login function with jwt and bcrypt, set token in header
const login = async (req, res) => {
  const { name, password } = req.body

  const foundUser = await db.query(`SELECT * FROM students WHERE name = $1`, [
    name,
  ])

  if (!foundUser.rows[0]) {
    res.status(400).json({ error: 'User does not exist' })
  }

  const match = await bcrypt.compare(password, foundUser.rows[0].password)
  if (!match) {
    res.status(400).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { name: foundUser.rows[0].name, admin: foundUser.rows[0].admin },
    process.env.JWT_SECRET
  )

  res.status(200).json({ token })
}

const getUserInfo = async (req, res) => {
  res.send(req.user)
}

const approveSession = async (req, res) => {
  res.json({ success: 'valid token' })
}

module.exports = { login, signup, getUserInfo, approveSession }
