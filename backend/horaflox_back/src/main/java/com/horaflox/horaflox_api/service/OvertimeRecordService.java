package com.horaflox.horaflox_api.service;

import com.horaflox.horaflox_api.model.OvertimeRecord;

import java.util.List;

/*
Interfaz que define los métodos del servicio para gestionar los registros de horas extras.

Proporrciona operaciones básicas como obtener todos los registos, guardar uno nuevo,
buscar por ID y eliminar un registro.
*/

public interface OvertimeRecordService {

    public List<OvertimeRecord> getAllOvertimeRecords();//Obtiene los registros de horas extras.

    public OvertimeRecord save (OvertimeRecord overtimeRecord); //Guarda un nuevo registro de horas extras.

    public OvertimeRecord getById(long id); //Busca un registro por su ID.

    public void delete(long id); //Elimina un registro por su ID.

}
