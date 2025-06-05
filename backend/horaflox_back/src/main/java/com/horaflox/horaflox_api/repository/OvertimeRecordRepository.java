package com.horaflox.horaflox_api.repository;

import com.horaflox.horaflox_api.model.OvertimeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
Repositorio de acceso a datos para la entidad OvertimeRecord.

Extiende JpaRepository por lo que proporciona operaciones CRUD estándar
sin implementar ningún método adicional.
*/

@Repository
public interface OvertimeRecordRepository extends JpaRepository<OvertimeRecord, Long> {
}
