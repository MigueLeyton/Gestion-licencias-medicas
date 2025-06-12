// services/validacionesLicencia.js

const rutRegex = /^\d{7,8}-[\dkK]$/;

const esFechaValida = (fecha) => {
  if (typeof fecha !== "string") return false;
  const isoFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoFormat.test(fecha)) return false;
  const d = new Date(fecha);
  return !isNaN(d.getTime());
};

const esCampoObligatorio = (valor) => !valor?.trim();
const esRutValido = (rut) => rutRegex.test(rut?.trim() || "");

export const validarLicencia = (form) => {
  const errores = [];

  // Datos del trabajador
  if (esCampoObligatorio(form.rutTrabajador)) errores.push("Debe ingresar el RUT del trabajador.");
  else if (!esRutValido(form.rutTrabajador)) errores.push("El RUT del trabajador no tiene un formato válido.");

  if (esCampoObligatorio(form.nombreTrabajador)) errores.push("Debe ingresar el nombre del trabajador.");

  if (!esFechaValida(form.fechaNacimientoTrabajador)) errores.push("La fecha de nacimiento del trabajador no es válida.");

  // Tipo de licencia
  if (esCampoObligatorio(form.tipoLicencia)) errores.push("Debe seleccionar un tipo de licencia.");

  if (form.tipoLicencia === "OTRO" && esCampoObligatorio(form.otroTipoLicencia)) {
    errores.push('Debe especificar el tipo de licencia cuando selecciona "OTRO".');
  }

  if (!esFechaValida(form.fechaEmision)) errores.push("La fecha de emisión no es válida.");

  const dias = Number(form.dias);
  if (!dias || isNaN(dias) || dias <= 0) {
    errores.push("Debe ingresar un número válido de días.");
  }

  if (!esFechaValida(form.inicioReposo)) errores.push("La fecha de inicio de reposo no es válida.");
  if (!esFechaValida(form.terminoReposo)) errores.push("La fecha de término de reposo no es válida.");

  if (esFechaValida(form.inicioReposo) && esFechaValida(form.terminoReposo)) {
    const inicio = new Date(form.inicioReposo);
    const termino = new Date(form.terminoReposo);
    if (termino < inicio) errores.push("La fecha de término de reposo no puede ser anterior a la de inicio.");
  }

  // Datos del hijo
  if (["LICENCIA MATERNAL PRE Y POST NATAL", "ENFERMEDAD GRAVE NIÑO MENOR DE 1 AÑO"].includes(form.tipoLicencia)) {
    if (esCampoObligatorio(form.rutHijo)) errores.push("Debe ingresar el RUT del hijo.");
    else if (!esRutValido(form.rutHijo)) errores.push("El RUT del hijo no tiene un formato válido.");

    if (esCampoObligatorio(form.nombreHijo)) errores.push("Debe ingresar el nombre del hijo.");
    if (!esFechaValida(form.fechaNacimientoHijo)) errores.push("La fecha de nacimiento del hijo no es válida.");
  }

  // Reposo
  if (esCampoObligatorio(form.tipoReposo)) errores.push("Debe seleccionar un tipo de reposo.");
  if (esCampoObligatorio(form.jornada)) errores.push("Debe seleccionar una jornada.");
  if (esCampoObligatorio(form.lugarReposo)) errores.push("Debe seleccionar un lugar de reposo.");
  if (esCampoObligatorio(form.direccionReposo)) errores.push("Debe ingresar la dirección del reposo.");

  // Profesional
  if (esCampoObligatorio(form.rutProfesional)) errores.push("Debe ingresar el RUT del profesional.");
  else if (!esRutValido(form.rutProfesional)) errores.push("El RUT del profesional no tiene un formato válido.");

  if (esCampoObligatorio(form.nombreProfesional)) errores.push("Debe ingresar el nombre del profesional.");
  if (esCampoObligatorio(form.especialidad)) errores.push("Debe seleccionar una especialidad.");
  if (form.especialidad === "otro" && esCampoObligatorio(form.otraEspecialidad)) {
    errores.push("Debe especificar la especialidad.");
  }
  if (esCampoObligatorio(form.direccionProfesional)) errores.push("Debe ingresar la dirección del profesional.");

  if (form.telefonoProfesional && !/^\d{7,}$/.test(form.telefonoProfesional.trim())) {
    errores.push("El teléfono del profesional debe tener al menos 7 dígitos.");
  }

  // Extensión
  if (form.esExtension) {
    if (esCampoObligatorio(form.licenciaRelacionada)) errores.push("Debe ingresar el número de licencia relacionada.");
    if (esCampoObligatorio(form.mutual)) errores.push("Debe ingresar la mutual.");
    if (esCampoObligatorio(form.institucionMutual)) errores.push("Debe ingresar la institución mutual.");
    if (!esFechaValida(form.fechaCompin)) errores.push("La fecha de recepción del Compin no es válida.");
  }

  return errores;
};
