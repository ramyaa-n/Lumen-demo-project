import express from 'express'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// Google Sign-In
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { sub: googleId, name, email, picture } = payload

    // Find or create user
    let user = await User.findOne({ googleId })

    if (!user) {
      user = new User({
        googleId,
        name,
        email,
        picture
      })
      await user.save()
    } else {
      // Update user info and last login
      user.name = name
      user.email = email
      user.picture = picture
      user.lastLogin = new Date()
      await user.save()
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(400).json({ message: 'Invalid Google token' })
  }
})

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
      role: req.user.role,
      createdAt: req.user.createdAt,
      lastLogin: req.user.lastLogin
    }
  })
})

// Logout (simple, without logs)
router.post('/logout', authenticateToken, async (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

export default router
