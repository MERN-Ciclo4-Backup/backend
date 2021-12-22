import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    correo: {
      type: String,
      required: [true, "debe proporcionar el email"],
      unique: true,
      validate: {
        validator: (email) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        message: "el formato del email no es válido",
      },
    },
    password: {
      type: String,
      required: [true, "debe proporcionar la contraseña"],
    },
    identificacion: {
      type: String,
      required: [true, "debe proporcionar la identificacón del usuario"],
      unique: true,
    },
    nombre: {
      type: String,
      required: [true, "debe proporcionar el nombre del usuario"],
    },
    apellido: {
      type: String,
      required: [true, "debe proporcionar el apellido del usuario"],
    },
    foto: {
      type: String,
    },
    rol: {
      type: String,
      required: [true, "debe proporcionar un rol del usuario"],
      enum: ["ESTUDIANTE", "LIDER", "ADMINISTRADOR"],
    },
    estado: {
      type: String,
      default: "PENDIENTE",
      enum: ["PENDIENTE", "AUTORIZADO", "NO_AUTORIZADO"],
    },
  }
  // {
  //   toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  //   toObject: { virtuals: true }, // So `()` and other functions that use `toObject()` include virtuals
  // }
);
// userSchema.virtual("inscripciones", {
//   ref: "Inscription",
//   localField: "_id",
//   foreignField: "estudiante",
// });
// userSchema.virtual("avancesCreados", {
//   ref: "Advancement",
//   localField: "_id",
//   foreignField: "creadoPor",
// });
// userSchema.virtual("proyectosLiderados", {
//   ref: "Project",
//   localField: "_id",
//   foreignField: "lider",
// });
export const userModel = model("User", userSchema, "usuario");
