import { advancementModel } from "../avance/avance.js";
import { inscriptionModel } from "../inscripcion/inscripcion.js";
import { userModel } from "../usuario/usuario.js";
import { projectModel } from "./proyecto.js";

export const projectResolvers = {
  Proyecto: {
    lider: async ({ lider }, args, context) => {
      const user = await userModel.findOne({ _id: lider });
      return user;
    },
    avances: async ({ _id }, args, context) => {
      const advancements = await advancementModel.find({ proyecto: _id });
      return advancements;
    },
    inscripciones: async ({ _id }, args, context) => {
      const inscripctions = await inscriptionModel.find({ proyecto: _id });
      return inscripctions;
    },
  },
  Query: {
    Proyectos: async (parent, { filter }, context) => {
      let filtrado = {};
      if (filter) {
        filtrado = filter;
      }
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          const projects = await projectModel.find({
            ...filtrado,
            lider: context.userData._id,
          });
          return projects;
        }
      }
      const projects = await projectModel.find(filtrado);
      return projects;
    },
    Proyecto: async (parent, { _id }) => {
      const proyecto = await projectModel.findOne({ _id });
      return proyecto;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyecto = await projectModel.create({ ...args });
      return proyecto;
    },
    eliminarProyecto: async (parent, { _id }) => {
      console.log("ENTRE A ELIMINAR PROYECTO");
      const proyecto = await projectModel.findOneAndDelete({ _id });
      const inscripciones = await inscriptionModel.deleteMany({
        proyecto: proyecto._id,
      });
      console.log(inscripciones);
      const avances = await advancementModel.deleteMany({
        proyecto: proyecto._id,
      });
      console.log(avances);
      return proyecto;
    },
    editarProyecto: async (parent, { _id, body }) => {
      const proyecto = await projectModel.findOneAndUpdate(
        { _id },
        { ...body },
        { runValidators: true, new: true }
      );
      return proyecto;
    },
    crearObjetivo: async (parent, { idProyecto, body }) => {
      const proyectoConObjetivo = await projectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...body },
          },
        },
        { runValidators: true, new: true }
      );
      return proyectoConObjetivo;
    },
    editarObjetivo: async (parent, { idProyecto, indexObjetivo, body }) => {
      const proyectoEditado = await projectModel.findByIdAndUpdate(
        idProyecto,
        {
          $set: {
            [`objetivos.${indexObjetivo}.descripcion`]: body.descripcion,
            [`objetivos.${indexObjetivo}.tipo`]: body.tipo,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
    },
    eliminarObjetivo: async (parent, { idProyecto, idObjetivo }) => {
      const proyectoObjetivo = await projectModel.findByIdAndUpdate(
        { _id: idProyecto },
        {
          $pull: {
            objetivos: {
              _id: idObjetivo,
            },
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
    },
  },
};
