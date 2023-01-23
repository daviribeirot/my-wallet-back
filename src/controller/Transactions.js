import db from '../config/database.js'
import dayjs from 'dayjs'

export async function listTransactions(req, res) {
  const sessionExists = res.locals.user;

  try {
    const data = await db.collection("transactions").find({idUsuario: sessionExists.idUsuario }).toArray();
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Há algo de errado com o servidor");
  }
}

export async function makeTransactions(req, res) {
  const transaction = req.body;
  const sessionExists = res.locals.user;

  try {
    const data = await db.collection("transactions").insertOne(
      { value: transaction.value, 
        description: transaction.description, 
        type: transaction.type, 
        date: dayjs().format("DD/MM"),
        idUsuario: sessionExists.idUsuario });
    console.log(data);
    res.send(data);

  } catch (err) {
    console.log(err);
    res.status(500).send("Há algo de errado com o servidor!");
  }
}
