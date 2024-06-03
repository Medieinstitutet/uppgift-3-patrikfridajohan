import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../mysql';

// Passport.js configuration
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Check if user with provided email exists
        const [rows, fields] = await pool.query('SELECT * FROM data_users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        
        // Check if password is correct
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        // Return user object if authentication succeeds
        return done(null, user);
    } catch (error) {
        console.error('Error authenticating user:', error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    // Serialize user ID to store in session
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        // Deserialize user from user ID stored in session
        const [rows, fields] = await pool.query('SELECT * FROM data_users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return done(null, false);
        }
        const user = rows[0];
        return done(null, user);
    } catch (error) {
        console.error('Error deserializing user:', error);
        return done(error);
    }
});

// Export Passport.js middleware
export const passportMiddleware = passport.initialize();
export const passportSessionMiddleware = passport.session();


export async function createSession(userId: string): Promise<{ id: string }> {
    // Generate a session ID
    const sessionId = Math.random().toString(36).substring(2);

    // Return the session ID
    return { id: sessionId };
}
