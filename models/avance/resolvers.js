import { projectModel } from "../proyecto/proyecto.js";
import { userModel } from "../usuario/usuario.js";
import { advancementModel } from "./avance.js";

export const advancementResolvers = {
  Avance: {
    proyecto: async ({ proyecto }, args) => {
      const project = await projectModel.findOne({ _id: proyecto });
      return project;
    },
    creadoPor: async ({ creadoPor }, args) => {
      const user = await userModel.findOne({ _id: creadoPor });
      return user;
    },
  },
  Query: {
    Avances: async (parent, { filter }, context) => {
      let filtrado = {};
      if (filter) {
        filtrado = filter;
      }
      const avances = await advancementModel.find(filtrado);
      return avances;
    },
    Avance: async (parent, { _id }) => {
      const avances = await advancementModel.findOne({ _id });
      return avances;
    },
  },
  Mutation: {
    crearAvance: async (parent, args) => {
      const avance = await advancementModel.create({ ...args });
      const avances = await advancementModel.find({
        proyecto: avance.proyecto,
      });
      if (avances.length === 1) {
        const proyectoModificado = await projectModel.findOneAndUpdate(
          { _id: avance.proyecto },
          { fase: "DESARROLLO" },
          { runValidators: true, new: true }
        );
      }
      return avance;
    },
    eliminarAvance: async (parent, { _id }) => {
      const avance = await advancementModel.findOneAndDelete({ _id });
      return avance;
    },
    editarAvance: async (parent, { _id, body }) => {
      const avance = await advancementModel.findOneAndUpdate(
        { _id },
        { ...body },
        {
          runValidators: true,
          new: true,
        }
      );
      return avance;
    },
  },
};
