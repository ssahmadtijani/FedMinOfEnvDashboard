import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Users } from '../models/user'
import passport from '../config/passport'
import { UsersAttr } from '../interface/users.interface'

dotenv.config()

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userName, email, phoneNumber, password, departmentId } = req.body
  
      const existingUser = await Users.findOne({ where: { email } })
      if (existingUser) {
        res.status(400).json({ message: "Email already exists" })
        return
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
      await Users.create({
        email,
        userName,
        phoneNumber,
        password: hashedPassword,
        departmentId,
      })
  
      res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
      next(error)
    }
  }

  const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: any, user: UsersAttr, info: { message: any }) => {
      if (err) {
        return res.status(500).json({ message: 'Authentication failed', error: err })
      }
      if (!user) {
        return res.status(401).json({ message: info.message || 'Invalid credentials' })
      }
  
      const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      })

      res.json({ message: 'Login successful', token })
    })(req, res, next)
  }
  

export default { signup, login }