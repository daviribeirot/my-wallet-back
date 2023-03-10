import bcrypt from "bcrypt"
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'

export async function signUp(req, res) {
  const { name, email, password } = req.body

  const hashedPassword = bcrypt.hashSync(password, 10)

  try {

    const findEmail = await db.collection("usuarios").findOne({ email: email });

    if (findEmail) {
        return res.status(409).send("Email já em uso!");
    }

    await db.collection("usuarios").insertOne({ name, email, password: hashedPassword })
    res.status(201).send("Usuário cadastrado com sucesso!")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body

  try {

    const userExists = await db.collection("usuarios").findOne({ email })

    if (!userExists) return res.status(400).send("Usuário ou senha incorretos")

    const passwordExists = bcrypt.compareSync(password, userExists.password)

    if (!passwordExists) return res.status(400).send("Usuário ou senha incorretos")

    const token = uuidV4();

    await db.collection("sessoes").insertOne({ name: userExists.name, idUsuario: userExists._id, token })
    const user = await db.collection("usuarios").findOne({email: userExists.email})
    const userBody = {name: user.name, email: user.email, idUsuario: userExists._id , token};

    return res.status(200).send(userBody)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function logout(req, res) {
  const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

 try {
    await db.collection("sessoes").deleteOne({ token });
        res.sendStatus(200);
 } catch (error) {
  res.status(500).send(error.message);
 }
}

