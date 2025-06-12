import {pool as db} from '../database/database.js';

export const guardarLicenciaEnDB = async (licencia) => {
  const {
    rutTrabajador, nombreTrabajador, fechaNacimientoTrabajador,
    rutHijo, nombreHijo, fechaNacimientoHijo,
    tipoLicencia, otroTipoLicencia, recuperacionLaboral, inicioTramiteInvalidez, trayecto, fechaConcepcion,
    fechaEmision, dias, inicioReposo, terminoReposo, tipoReposo, jornada, lugarReposo, direccionReposo,
    rutProfesional, nombreProfesional, especialidad, otraEspecialidad, direccionProfesional, telefonoProfesional,
    esExtension, licenciaRelacionada, mutual, institucionMutual, fechaCompin,
    motivoResolucion, observaciones
  } = licencia;

  const result = await db.query(`
  INSERT INTO licencias (
    rut_trabajador,
    tipo_licencia,
    fecha_emision,
    dias,
    inicio_reposo,
    termino_reposo,
    es_extencion,
    licenca_relacionada,
    rut_profesional,
    institucion_mutual_id,
    trayecto,
    tipo_reposo,
    jornada,
    lugar_reposo,
    direccion_reposo,
    estado
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendiente');
`, [
  licencia.rutTrabajador,
  licencia.tipoLicencia,
  licencia.fechaEmision,
  licencia.dias,
  licencia.inicioReposo,
  licencia.terminoReposo,
  licencia.esExtension === 'SI',
  licencia.licenciaRelacionada,
  licencia.rutProfesional,
  licencia.institucionMutual,
  licencia.trayecto === 'SI',
  licencia.tipoReposo,
  licencia.jornada,
  licencia.lugarReposo,
  licencia.direccionReposo
]);



if(result.affectedRows === 0) {
    throw new Error('No se pudo guardar la licencia médica en la base de datos.');
  }

return true;


};

export const obtenerLicenciasPendientes = async () => {
  const result = await db.query(`
    SELECT id, rutTrabajador, nombreTrabajador, fechaEmision, estado
    FROM licencias
    WHERE estado = 'pendiente'
    ORDER BY fechaEmision DESC;
  `);

  return result.rows;
};

export const actualizarEstadoLicencia = async (id, estado) => {
  const result = await db.query(`
    UPDATE licencias
    SET estado = $1
    WHERE id = $2
    RETURNING *;
  `, [estado, id]);

  return result.rows[0];
};


/* const result = await db.query(`
    INSERT INTO licencias (
      rutTrabajador, nombreTrabajador, fechaNacimientoTrabajador,
      rutHijo, nombreHijo, fechaNacimientoHijo,
      tipoLicencia, otroTipoLicencia, recuperacionLaboral, inicioTramiteInvalidez, trayecto, fechaConcepcion,
      fechaEmision, dias, inicioReposo, terminoReposo, tipoReposo, jornada, lugarReposo, direccionReposo,
      rutProfesional, nombreProfesional, especialidad, otraEspecialidad, direccionProfesional, telefonoProfesional,
      esExtension, licenciaRelacionada, mutual, institucionMutual, fechaCompin,
      motivoResolucion, observaciones, estado
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,
      $13,$14,$15,$16,$17,$18,$19,$20,
      $21,$22,$23,$24,$25,$26,
      $27,$28,$29,$30,$31,$32,$33, 'pendiente'
    ) RETURNING *;
  ` */