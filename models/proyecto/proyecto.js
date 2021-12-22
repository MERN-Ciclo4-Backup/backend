import mongoose from "mongoose";
import { userModel } from "../usuario/usuario.js";

const { Schema, model } = mongoose;
const projectSchema = new Schema(
  {
    nombre: {
      type: String,
      require: [true, "debe proporcionar el nombre del proyecto"],
    },
    presupuesto: {
      type: Number,
      required: [true, "debe proporcionar el presupuesto del proyecto"],
    },
    fechaInicio: {
      type: Date,
      required: [true, "debe proporcionar la fecha de inicio del projecto"],
    },
    fechaFin: {
      type: Date,
      required: [true, "debe proporcionar la fecha fin del projecto"],
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO"],
      default: "INACTIVO",
    },
    fase: {
      type: String,
      enum: ["INICIADO", "DESARROLLO", "TERMINADO", "NULO"],
      default: "NULO",
    },
    lider: {
      type: Schema.Types.ObjectId,
      required: [true, "debe proporcionar un lider"],
      ref: userModel,
    },
    objetivos: [
      {
        descripcion: {
          type: String,
          required: [true, "debe proporcionar la descripcion del objetivo"],
        },
        tipo: {
          type: String,
          enum: ["GENERAL", "ESPECIFICO"],
          required: [true, "debe proporcionar el tipo de objetivo"],
        },
      },
    ],
  },
  // {
  //   toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  //   toObject: { virtuals: true }, // So `()` and other functions that use `toObject()` include virtuals
  // }
);
// projectSchema.virtual("avances", {
//   ref: "Advancement",
//   localField: "_id", // Llave primaria
//   foreignField: "proyecto", // Llave foranea
// });
// projectSchema.virtual("inscripciones", {
//   ref: "Inscription",
//   localField: "_id",
//   foreignField: "proyecto",
// });
export const projectModel = model("Project", projectSchema, "proyecto");
