import cors from 'cors';

export const corsMiddleware = () => cors({
        // origin: (origin, callback) => {
        //     const ACCEPTED_ORGINS = [
        //     '*'
        //     ]
        //     if (ACCEPTED_ORGINS.includes(*)) {
        //         return callback(null, true)
        //     }
        //     if (!origin) {
        //         return callback(null, true)
        //     }
        //     return callback(new Error('Not allowed by CORS'))
        // }
})

