export const EvnConfiguration = () => {
    return {
        env: process.env.NODE_ENV || 'dev',
        mongodb: process.env.MONGODB,
        port: Number(process.env.PORT) || 3002,
        default_limit: Number(process.env.DEFAULT_LIMIT) || 7,
    }
}

// export const EvnConfiguration1 = () => ({})