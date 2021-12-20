import { projectModel } from "../proyecto/proyecto.js";
import { userModel } from "../usuario/usuario.js";
import { inscriptionModel } from "./inscripcion.js";

export const inscriptionResolver = {
  Inscripcion: {
    proyecto: async ({ proyecto }, args, context) => {
      console.log(proyecto);
      const project = await projectModel.findOne({ _id: proyecto });
      return project;
    },
    estudiante: async ({ estudiante }, args, context) => {
      const user = await userModel.findOne({ _id: estudiante });
      return user;
    },
  },
  Query: {
    Inscripciones: async (parent, { filter }, context) => {
      let filtrado = {};
      let inscripciones = [];
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          if (filter) {
            filtrado = {...filter, estudiante: context.userData._id};
          }
          inscripciones = await inscriptionModel.find(filtrado);
        }
      }
      return inscripciones;
    },
    Inscripcion: async (parent, { _id }) => {
      const inscripcion = await inscriptionModel.findOne({ _id });
      return inscripcion;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcion = await inscriptionModel.create({ ...args });
      return inscripcion;
    },
    eliminarInscripcion: async (parent, { _id }) => {
      const inscripcion = await inscriptionModel.findOneAndDelete({
        _id,
      });
      return inscripcion;
    },
    editarInscripcion: async (parent, { _id, body }) => {
      const inscripcion = await inscriptionModel.findOneAndUpdate(
        { _id },
        { ...body },
        { runValidators: true, new: true }
      );
      return inscripcion;
    },
  },
};
