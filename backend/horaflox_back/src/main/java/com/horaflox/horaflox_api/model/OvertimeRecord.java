package com.horaflox.horaflox_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/*
Esta clase es el registro de horas extras realizadas por un empleado
o de alguien que quiera llevar un control de tiempo.

Se usa para almacenar los datos de las horas extras realizadas incluyendo
el número de horas, la fecha y una descripción opcional.
*/

//Entidad que representa un registro de horas
@Entity
public class OvertimeRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //Identificador del registro
    private BigDecimal hours; //Número de horas extras
    private LocalDate date; //Fecha del registro
    private String description; //Descripción opcional

    public OvertimeRecord() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BigDecimal getHours() {
        return hours;
    }

    public void setHours(BigDecimal hours) {
        this.hours = hours;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
