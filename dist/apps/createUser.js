"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const typeorm_1 = require("typeorm");
const path = __importStar(require("path"));
const root = path.resolve(__dirname, "..");
const options = {
    type: "sqlite",
    database: `${root}/data/line.sqlite`,
    entities: [User_1.default],
    logging: true,
    synchronize: true,
};
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered");
    const connection = yield (0, typeorm_1.createConnection)(options);
    const userRepository = connection.getRepository(User_1.default);
    console.log("error");
    let code;
    let message;
    const { username, password } = body;
    if (typeof username === "string" && typeof password === "string") {
        // const timber = await userRepository.findOne({ username }).then((d)=>{
        //     console.log("asdf")
        // }).catch(e=>console.log("errorrrr"));
        const timber = yield userRepository.find({ where: [username] });
        console.log("found", timber);
        code = 200;
        message = "El usuario se creó correctamente";
        // const user = new User();
        // user.username = username;
        // const ciphertext = CryptoJS.AES.encrypt(password, 'secretwheelhub').toString();
        // user.password = ciphertext;
        // await userRepository.save(user)
    }
    else {
        code = 400;
        message = "Nombre de usuario o contraseña inválidos";
    }
    console.log({ code,
        message });
    return {
        code,
        message
    };
});
exports.default = createUser;
//# sourceMappingURL=createUser.js.map