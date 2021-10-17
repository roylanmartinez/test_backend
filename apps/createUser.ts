var CryptoJS = require("crypto-js");
import User from "../models/User"
import { createConnection } from "typeorm"
import * as path from "path"
const root: string = path.resolve(__dirname, "..")

const createUser = async (body: any) => {
    console.log("entered")
    
    const connection = await createConnection({
        type: "sqlite",
        database: `${root}/data/line.sqlite`,
        entities: [ User ],
        logging: true,
        synchronize: true,
    })

    const userRepository = connection.getRepository(User)
    console.log("error")
    let status: number;
    let message: string;

    const { username, password } = body;

    if (typeof username === "string" && typeof password === "string"){
        
        status = 200;
        message = "El usuario se creó correctamente";
        
        const user = new User();
        user.username = username;
        const ciphertext = CryptoJS.AES.encrypt(password, 'secretwheelhub').toString();
        user.password = ciphertext;
        await userRepository.save(user)
        const justCreateUser = await userRepository.findOne({ username });
        console.log(justCreateUser)
    }
    else {
        status = 400
        message = "Nombre de usuario o contraseña inválidos"
    }
    
    await connection.close();
    return {
        status,
        message
    }
}

export default createUser;