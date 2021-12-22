import bcrypt from "bcrypt";
import { userModel } from "../../models/usuario/usuario.js";
import { generateToken } from "../../utils/tokenUtils.js";

export const authResolvers = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await userModel.create({
        ...args,
        password: hashedPassword,
      });
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    },
    login: async (parent, args) => {
      const usuarioEncontrado = await userModel.findOne({
        correo: args.correo,
      });
      if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
        const token = generateToken({
          _id: usuarioEncontrado._id,
          nombre: usuarioEncontrado.nombre,
          apellido: usuarioEncontrado.apellido,
          identificacion: usuarioEncontrado.identificacion,
          correo: usuarioEncontrado.correo,
          rol: usuarioEncontrado.rol,
          foto: usuarioEncontrado.foto,
        });
        console.log("este es el token: ");
        console.log(token);
        return {
          token,
        };
      }
    },
    refreshToken: async (parent, args, context) => {
      if (!context.userData) {
        return {
          error: "token no valido",
        };
      } else {
        return {
          token: generateToken({
            ...context.userData,
          }),
        };
      }
    },
  },
};
