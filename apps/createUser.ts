import sha256 from "../components/sha256"
import User from "../models/User"
import { ConnectionOptions, createConnection } from "typeorm"
import * as path from "path"
const root: string = path.resolve(__dirname, "..")

const options: ConnectionOptions = {
  type: "sqlite",
  database: `${root}/data/line.sqlite`,
  entities: [ User ],
  logging: true,
  synchronize: true,
}


const createUser = async (body: any) => {
    console.log("entered")
    const connection = await createConnection(options)
    const userRepository = connection.getRepository(User)
    console.log("error")
    let code: number;
    let message: string;

    const { username, password } = body;

    if (typeof username === "string" && typeof password === "string"){
        // const timber = await userRepository.findOne({ username }).then((d)=>{
        //     console.log("asdf")
        // }).catch(e=>console.log("errorrrr"));
        const timber = await userRepository.find({where: [username]})
        console.log("found", timber)
        code = 200;
        message = "El usuario se creó correctamente";
        
        // const user = new User();
        // user.username = username;
        // const ciphertext = CryptoJS.AES.encrypt(password, 'secretwheelhub').toString();
        // user.password = ciphertext;
        // await userRepository.save(user)
        
    }
    else {
        code = 400
        message = "Nombre de usuario o contraseña inválidos"
    }
    
    console.log({code,
        message})
    return {
        code,
        message
    }
}

export default createUser;