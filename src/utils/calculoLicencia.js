import {pool as db} from '../database/database.js';

export const calcularLicencia =  (datos) => {
  const diasMes = 30;
  const porcentajeSalud = 0.07; // Porcentaje de salud (7%)

  //Obtener la remuneracion del trabajador
  const remuneracionImponible = obtenerRemuneracion(datos.idTrabajador)


  //Calcular los días de licencia
  let diasLicencia = datos.dias

  if (datos.es_extension == 1) {
    // Si es una extensión, sumar los días de licencia anteriores
    diasLicencia = calcularDiasLicencia(datos.licenciaRelacionada, diasLicencia);
  }
  
  
  const imponibleDiario = remuneracionImponible / diasMesActual;

  const montoAFP = calcularMontoAFP(diasLicencia, imponibleDiario, datos.afp);  

  const totalRecuperacionLicencias = montoLiquidoLicencia + montoAFP + montoFonasa + montoCCAF;

  return {
    diasLicencia,
    montoLiquidoLicencia: Math.round(montoLiquidoLicencia),
    montoAFP,
    montoFonasa,
    montoCCAF,
    totalRecuperacionLicencias: Math.round(totalRecuperacionLicencias)
  };
}

// Función para calcular los días de licencia relacionados con una licencia anterior.
const calcularDiasLicencia = async (licenciaRelacionada, diasLicencia) => {
  const query = "SELECT dias FROM licencias WHERE licencia_relacionada = ? AND dias > 0";
  const values = [licenciaRelacionada];
  
  const [result] = await db.query(query, values);

  const diasLicenciaAnterior = result.length > 0 ? result[0].dias : 0;

  return diasLicencia + diasLicenciaAnterior;

}

// Función para calcular el monto de la AFP.
const calcularMontoAFP = (diasPrevisionales, imponibleDiario, afp) => {
  const tasaAFP = obtenerTasaAFP(datos.afp, datos.fechaEmision);
  const montoAFP = imponibleDiario * diasPrevisionales * tasaAFP; 

  return Math.round(montoAFP);
}

const calcularSalud = (remuneracionImponible) => {
  return Math.round
}

// Función para obtener la remuneración imponible de un trabajador.
const obtenerRemuneracion = async (idTrabajador) => {
  const query = "SELECT remuneracion_imponible FROM trabajadores WHERE id = ?";
  const values = [idTrabajador];

  const [ result ] = await db.query(query, values);

  if (result.length > 0) {
    return parseFloat(result[0].remuneracion_imponible);
  }else{
    throw new Error("Remuneración no encontrada para el trabajador especificado");
  }
}

// Función para obtener la tasa de AFP según el ID y la fecha de emisión.
const obtenerTasaAFP = async (idAFP, fechaEmision) => {
  try {
    const mes = new Date(fechaEmision).getMonth() + 1;
    const anio = new Date(fechaEmision).getFullYear();

    const query = "SELECT tasa FROM afp WHERE id = ? AND MONTH(fecha_vigencia) = ? AND YEAR(fecha_vigencia) = ? LIMIT 1";
    const values = [idAFP, mes, anio];

    const [ result ] = await db.query(query, values)

    if (result.length > 0) {
      return parseFloat(result[0].tasa);
    } else {
      throw new Error("Tasa AFP no encontrada para el mes y año especificados");
    }

  } catch (error) {
    console.error("Error al obtener la tasa AFP:", error);
    throw new Error("No se pudo obtener la tasa AFP");
  }
}


// Función para calcular los días entre dos fechas.
const calcularDias = (fechaInicial, fechaFinal) => {
  const inicio = new Date(fechaInicial);
  const fin = new Date(fechaFinal);

  const diff = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;

  return diff > 0 ? diff : 0;
}