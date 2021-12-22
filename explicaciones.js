import connectDB from "./db/db";
import { Enum_EstadoUsuario, Enum_Rol, Enum_TipoObjetivo } from "./models/enums/enums";
import { userModel } from "./models/user";
import { projectModel } from "./models/project";
import { objectiveModel } from "./models/objective";
require('dotenv').config();
const stringConn = process.env.MONGO_URI;
// METODOLOGÍA ONE TO MANY #1
const crearProyectoConObjetivos1 = async () => {
  const usuarioInicial = await userModel.create({
    nombre: 'Daniel',
    apellido: 'Saldarriaga',
    correo: 'dsl@cc.com',
    identificacion: '1234',
    rol: Enum_Rol.Administrador,
    estado: Enum_EstadoUsuario.Autorizado,
  });

  const proyectoCreado = await projectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
  });

  const objetivoGeneral = await objectiveModel.create({
    descripcion: 'este es el objetivo general',
    tipo: Enum_TipoObjetivo.General,
    proyecto: proyectoCreado._id,
  });

  const objetivoEspecifico1 = await objectiveModel.create({
    descripcion: 'este es el objetivo especifico 1',
    tipo: Enum_TipoObjetivo.Especifico,
    proyecto: proyectoCreado._id,
  });

  const objetivoEspecifico2 = await objectiveModel.create({
    descripcion: 'este es el objetivo especifico 2',
    tipo: Enum_TipoObjetivo.Especifico,
    proyecto: proyectoCreado._id,
  });
};
const consultaProyectoConObjetivos1 = async () => {
  const proyecto = await projectModel.findOne({ _id: '618d52f71098bc9a121e95d5' });

  ('el proyecto que encontré fue', proyecto);

  const objetivos = await objectiveModel.find({ project: '618d52f71098bc9a121e95d5' });

  ('los objetivos del proyecto son: ', objetivos);

  const proyectoConObjetivos = { ...proyecto, objetivos };

  ('el proyecto con objetivos es: ', proyectoConObjetivos);
};

// METODOLOGIA ONE TO MANY #2
const crearProyectoConObjetivos2 = async () => {
  const usuarioInicial = await userModel.create({
    nombre: 'Daniel',
    apellido: 'Saldarriaga',
    correo: 'dsl@cc.com',
    identificacion: '1234',
    rol: Enum_Rol.Administrador,
    estado: Enum_EstadoUsuario.Autorizado,
  });

  const objetivoGeneral = await objectiveModel.create({
    descripcion: 'este es el objetivo general',
    tipo: Enum_TipoObjetivo.General,
  });

  const objetivoEspecifico1 = await objectiveModel.create({
    descripcion: 'este es el objetivo especifico 1',
    tipo: Enum_TipoObjetivo.Especifico,
  });

  const objetivoEspecifico2 = await objectiveModel.create({
    descripcion: 'este es el objetivo especifico 2',
    tipo: Enum_TipoObjetivo.Especifico,
  });

  const proyectoCreado = await projectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
    objetivos: [objetivoGeneral._id, objetivoEspecifico1._id, objetivoEspecifico2._id],
  });
};
const consultaProyectoConObjetivos2 = async () => {
  const proyecto = await projectModel.find({ id: '618d578f431abaa895d7696d' }).populate(
    'objetivos'
  );
};

// METODOLOGIA ONE TO MANY #3

const crearProyectoConObjetivos3 = async () => {
  const usuarioInicial = await userModel.create({
    nombre: 'Daniel',
    apellido: 'Saldarriaga',
    correo: 'dsl@cc.com',
    identificacion: '1234',
    rol: Enum_Rol.Administrador,
    estado: Enum_EstadoUsuario.Autorizado,
  });

  const proyectoCreado = await projectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
    objetivos: [
      { descripcion: 'Este es el objetivo general', tipo: Enum_TipoObjetivo.General },
      { descripcion: 'Este es el objetivo especifico 1', tipo: Enum_TipoObjetivo.Especifico },
      { descripcion: 'Este es el objetivo especifico 2', tipo: Enum_TipoObjetivo.Especifico },
    ],
  });
};
const consultaProyectoConObjetivos3 = async () => {
  const proyectoCreado = await projectModel.find({ id: '618d5b22e4e2a99bddab693e' });
  ('proyecto', proyectoCreado);
};

const start = async () => {
  try {
    await connectDB(stringConn);
    ("Connection with success");
    
  } catch (err) {
    (err);
  }
};
// const project = await projectModel.create({
    //   nombre: "Proyecto 2",
    //   presupuesto: 125,
    //   fechaInicio: Date.now(),
    //   fechaFin: new Date("2022/11/10"),
    //   lider: '61a36089195a35c0106d541f',
    // });
    // const project = await projectModel.find({ nombre: "Proyecto 1" });
    // (project);
    // const proyecto = await userModel.find({ _id: project[0].lider });
    // const proyecto = await projectModel.find({nombre: "Proyecto 2"}).populate('lider');
    // (proyecto);
    // const user = await userModel.create({
    //     correo: 'juansebas930329@gmail.com',
    //     identificacion: '12345678',
    //     nombre: 'Sebastian',
    //     apellido: 'Camacho',
    //     rol: 'Lider',
    // });
    // (user);
    // const user = await userModel.find({correo: 'juansebas930329@gmail.com'});

    //
    // const user = await userModel.create({
    //   correo: "licama@hotmail.com",
    //   apellido: "Camacho",
    //   nombre: "Lina Maria",
    //   identificacion: "123456123455",
    //   rol: Enum_Rol.Estudiante,
    // });
    // const user = await userModel.findOneAndUpdate(
    //   { identificacion: "12345" },
    //   {rol: Enum_Rol.Administrador},
    //   { new: true, runValidators: true }
    // );
    // const user = await userModel.findOneAndDelete({ identificacion: "123456" });
    // const user = await userModel.create({
    //   correo: "licamachoga@hotmail.com",
    //   apellido: "Camacho",
    //   nombre: "Lina Maria",
    //   identificacion: "123451255",
    //   rol: Enum_Rol.Estudiante,
    // });
    // (user);
start();
