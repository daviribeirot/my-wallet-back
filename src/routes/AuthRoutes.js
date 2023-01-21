import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import validateSchema from "../middlewares/validateSchema.js"
import { cadastroSchema, loginSchema } from '../schemas/UserSchemas.js'

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(cadastroSchema), signUp);
authRouter.post("/sign-in", validateSchema(loginSchema), signIn);

export default authRouter;