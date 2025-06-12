import {pool as db} from '../database/database.js';

export function calcularDatosLicencia(formData) {
  const calcularDias = (inicio, fin) => {
    const fecha1 = new Date(inicio);
    const fecha2 = new Date(fin);
    const diff = Math.ceil((fecha2 - fecha1) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const diasLicencia = calcularDias(formData.inicioReposo, formData.terminoReposo);
  const valorPorDia = 30000;
  const montoLiquido = diasLicencia * valorPorDia;

  const remuneracionImponible = 1046900; // Considera obtenerlo del form en el futuro
  const diasPrevisionales = diasLicencia;
  const imponibleDiario = remuneracionImponible / 30;

  const tasasAFP = {
    Capital: 0.1144,
    Cuprum: 0.1144,
    Habitat: 0.1127,
    PlanVital: 0.1116,
    Provida: 0.1145,
    Modelo: 0.1058,
    Uno: 0.1049,
  };

  const afpTasa = tasasAFP[formData.afp] || 0;

  const montoAFP = imponibleDiario * diasPrevisionales * afpTasa;

  let montoFonasa = 0;
  let montoCCAFSalud = 0;

  if (formData.usaCCAF) {
    montoCCAFSalud = imponibleDiario * diasPrevisionales * 0.052;
    montoFonasa = imponibleDiario * diasPrevisionales * 0.018;
  } else {
    montoFonasa = imponibleDiario * diasPrevisionales * 0.07;
  }

  const montoCCAF = imponibleDiario * diasPrevisionales * 0.006;

  const montoRecuperado = [
    montoLiquido,
    montoAFP,
    montoFonasa,
    montoCCAFSalud,
    montoCCAF,
  ].reduce((a, b) => a + b, 0);

  const diferencia = montoLiquido - montoRecuperado;

  return {
    ...formData,
    diasLicencia,
    montoLiquido,
    montoAFP: Math.round(montoAFP),
    montoFonasa: Math.round(montoFonasa),
    montoCCAFSalud: Math.round(montoCCAFSalud),
    montoCCAF: Math.round(montoCCAF),
    montoRecuperado: Math.round(montoRecuperado),
    diferencia: Math.round(diferencia),
    remuneracionImponible,
    diasPrevisionales,
    estado: "Pagado",
    ingresoDevengado: montoLiquido,
    ingresoPagado: montoLiquido,
  };
}


// ValorDia y remuneracion imponible vienen de la base de datoss
// Imponible diario debe venir de la cantidad de dias del mes actual
// Si se calcula una licencia de meses anteriores, se debe cambiar la cantidad de dias del mes actual

 const tasasAFP = {
    Capital: 0.1144,
    Cuprum: 0.1144,
    Habitat: 0.1127,
    PlanVital: 0.1116,
    Provida: 0.1145,
    Modelo: 0.1058,
    Uno: 0.1049,
  };

export const calcularLicencia =  (datos) => {
  //Calcular los días del mes actual
  const fechaActual = new Date();
  const diasMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();

  //Obtener la remuneracion del trabajador
  const remuneracionLiquido = datos.remuneracionLiquida;
  const remuneracionImponible = obtenerRemuneracion(datos.idTrabajador)


  //Calcular los días de licencia
  const diasLicencia = calcularDias(datos.inicioReposo, datos.terminoReposo);

  
  // Calcular el valor liquido por día de la licencia
  const valorLiquidoPorDia = remuneracionLiquido / diasMesActual


  //Calcular el monto loquido de los dias con licencia
  const montoLiquidoLicencia = valorLiquidoPorDia * diasLicencia;

  const diasPrevisionales = diasLicencia;
  
  const imponibleDiario = remuneracionImponible / diasMesActual;

  const montoAFP = calcularMontoAFP(diasPrevisionales, imponibleDiario, datos.afp);

  const { montoFonasa, montoCCAF } = calcularSalud(diasPrevisionales, imponibleDiario, datos.usaCCAF);

  

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






const calcularMontoAFP = (diasPrevisionales, imponibleDiario, afp) => {
  const tasaAFP = obtenerTasaAFP(datos.afp, datos.fechaEmision);
  const montoAFP = imponibleDiario * diasPrevisionales * tasaAFP; 

  return Math.round(montoAFP);
}

const calcularSalud = (diasPrevisionales, imponibleDiario, usaCCAF) => {
  let porcentajeFonasa, porcentajeCCAF;

  if(usaCCAF){
    porcentajeFonasa = 0.018; // Tasa Fonasa
    porcentajeCCAF = 0.052; // Tasa CCAF Salud
  }else{
    porcentajeFonasa = 0.07; // Tasa Fonasa
    porcentajeCCAF = 0;
  }

  const montoFonasa = imponibleDiario * diasPrevisionales * porcentajeFonasa;
  const montoCCAF = imponibleDiario * diasPrevisionales * porcentajeCCAF;


  return {
    montoFonasa: Math.round(montoFonasa),
    montoCCAF: Math.round(montoCCAF)
  };
}

const obtenerRemuneracion = async (idTrabajador) => {
  const query = `SELECT remuneracion_imponible FROM trabajadores WHERE id = ?`;
  const values = [idTrabajador];

  const [ result ] = await db.query(query, values);

  if (result.length > 0) {
    return parseFloat(result[0].remuneracion_imponible);
  }else{
    throw new Error("Remuneración no encontrada para el trabajador especificado");
  }


}

const obtenerTasaAFP = async (idAFP, fechaEmision) => {
  try {
    const mes = new Date(fechaEmision).getMonth() + 1;
    const anio = new Date(fechaEmision).getFullYear();

    const query = `SELECT tasa FROM afp WHERE id = ? AND MONTH(fecha_vigencia) = ? AND YEAR(fecha_vigencia) = ? LIMIT 1`;
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


const calcularDias = (fechaInicial, fechaFinal) => {
  const inicio = new Date(fechaInicial);
  const fin = new Date(fechaFinal);

  const diff = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;

  return diff > 0 ? diff : 0;
}