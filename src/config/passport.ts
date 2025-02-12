import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import dotenv from 'dotenv'
import { Users } from '../models/user'

dotenv.config()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
}

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await Users.findByPk(jwtPayload.userId)
            if (user) return done(null, user)
            return done(null, false)
        } catch (error) {
            return done(error, false)
        }
    })
)

export default passport
