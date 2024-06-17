import passport from "passport";
import { DataSource } from "typeorm";
import { UserRepository } from "./models/repositories/UserRepositorio";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

interface Payload {
    id: number;
}

export const configurarPassport = (dataSource: DataSource) => {
    const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "segredo"
    };

    passport.use(new Strategy(options, async (payload: Payload, done) => {
        try {
            const userRepository = dataSource.getCustomRepository(UserRepository) as UserRepository;
            const user = await userRepository.findOne({ where: { id: payload.id } });
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            console.error("Erro ao validar usuário:", error);
            return done(error, false);
        }
    }));
};

export const autenticado = passport.authenticate("jwt", { session: false });
