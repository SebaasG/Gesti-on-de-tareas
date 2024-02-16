import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORGINS = [
            'http://127.0.0.1:5500',
            'http://127.0.0.1:55001'
        ]
        if (ACCEPTED_ORGINS.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
})

