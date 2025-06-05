package com.horaflox.horaflox_api.controller;

import com.horaflox.horaflox_api.model.OvertimeRecord;
import com.horaflox.horaflox_api.service.OvertimeRecordServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/*
Controlador REST que gestiona las peticiones relacionadas con los registros de horas extras.

Proporciona endpoints para obtener, crear, actualizar y eliminar registros.
*/

@RestController
@RequestMapping("/horaflox")
public class OvertimeRecordController {

    @Autowired
    OvertimeRecordServiceImplementation overtimeRecordService;

    @GetMapping("/ver-horas") //Obtiene el registro de todas las horas extras.
    public List<OvertimeRecord> getHours() {
        return overtimeRecordService.getAllOvertimeRecords();
    }

    @PostMapping("/guardar-hora") //Guarda el registro de las horas introducidas.
    public ResponseEntity<OvertimeRecord> saveHours(@RequestBody OvertimeRecord overtimeRecord) {
        OvertimeRecord newHours = overtimeRecordService.save(overtimeRecord);
        return new ResponseEntity<>(newHours, HttpStatus.CREATED);
    }

    @GetMapping("/ver-hora/{id}") //Obtiene un registro concreto por su ID.
    public ResponseEntity<OvertimeRecord> getHourById(@PathVariable long id) {
        OvertimeRecord existingRecord = overtimeRecordService.getById(id);
        if (existingRecord == null) {
            return ResponseEntity.notFound().build(); //Si el registro no existe se devuelve un HTTP 404 Not Found.
        } else {
            return ResponseEntity.ok(existingRecord); //Si el registro existe se devuelve un HTTP 200 OK.
        }
    }

    @PutMapping("/actualizar-hora/{id}")  //Actualiza un registro de horas existente.
    public ResponseEntity<OvertimeRecord> update(@PathVariable long id, @RequestBody OvertimeRecord overtimeRecord) {
        OvertimeRecord existingRecord = overtimeRecordService.getById(id);

        if (existingRecord == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingRecord.setHours(overtimeRecord.getHours());
            existingRecord.setDate(overtimeRecord.getDate());
            existingRecord.setDescription(overtimeRecord.getDescription());

            OvertimeRecord overtimeRecord_update = overtimeRecordService.save(existingRecord);
            return ResponseEntity.ok(overtimeRecord_update);
        }
    }

    @DeleteMapping("/eliminar-hora/{id}") //Elimina un registro de horas por su ID.
    public ResponseEntity<HashMap<String, Boolean>> deleteHour(@PathVariable long id) {
        OvertimeRecord existingRecord = overtimeRecordService.getById(id);

        if (existingRecord == null) {
            return ResponseEntity.notFound().build();
        } else {
            overtimeRecordService.delete(id);
            HashMap<String, Boolean> statusTimeDeleted = new HashMap<>();
            statusTimeDeleted.put("Eliminado", true);
            return ResponseEntity.ok(statusTimeDeleted);
        }
    }

}
