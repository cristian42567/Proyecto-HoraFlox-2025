package com.horaflox.horaflox_api.service;

import com.horaflox.horaflox_api.model.OvertimeRecord;
import com.horaflox.horaflox_api.repository.OvertimeRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*
Implementación de la interfaz OvertimeRecordService.

Esta clase se encarga de la lógica para trabajar con los registros de horas extras, y se apoya en el repositorio
para guardar, obtener, o eliminar los datos de la base de datos.
*/

@Service
public class OvertimeRecordServiceImplementation implements OvertimeRecordService{

    @Autowired
    OvertimeRecordRepository overtimeRecordRepository;

    @Override
    public List<OvertimeRecord> getAllOvertimeRecords() {
        return overtimeRecordRepository.findAll(); //Devuelve los registros de las horas extras.
    }

    @Override
    public OvertimeRecord save(OvertimeRecord overtimeRecord) {
        return overtimeRecordRepository.save(overtimeRecord); //Guarda un nuevo registro o actualiza uno que ya existe.
    }

    @Override
    public OvertimeRecord getById(long id) {
        return overtimeRecordRepository.findById(id).orElse(null); //Busca un registro por ID o lo devuelve como nulo si no lo encuentra.
    }

    @Override
    public void delete(long id) {
        overtimeRecordRepository.deleteById(id); //Elimina un registro por su ID.
    }
}
