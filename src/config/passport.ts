import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import passport from "passport"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { Users } from "../models/user"
import { UserPasswords } from "../models"

dotenv.config()

// Local Strategy (for login authentication)
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ where: { email } })
        if (!user) return done(null, false, { message: "Invalid credentials" })

        const userPassword = await UserPasswords.findOne({
          where: {
            userId: user.userId
          }
        })

        if (!userPassword) return done (null, false, { message: "User is not registered" })

        const isMatch = await bcrypt.compare(password, userPassword.password)
        if (!isMatch) return done(null, false, { message: "Invalid credentials" })

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
);

// JWT Strategy (for protected routes)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
}

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await Users.findByPk(jwtPayload.id)
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
)

export default passport;
