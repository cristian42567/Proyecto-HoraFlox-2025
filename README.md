# HoraFlox 🕒

**HoraFlox** es una aplicación web para el registro y gestión de horas extra trabajadas. Incluye un panel de visualización, un formulario para añadir y editar registros, y opciones para eliminar entradas. Es ideal como herramienta de control y seguimiento del tiempo trabajado fuera del horario habitual.

---

## 🗂 Estructura del proyecto

```
📁 Proyecto HoraFlox 2025
├── 🖥️ backend/     → API REST construida con Spring Boot
├── 🌐 frontend/    → Interfaz de usuario hecha con Angular (CLI 19.2.10)
└── 🗄️ database/    → Scripts SQL para crear la base de datos y tablas en MySQL
```

---

## ⚙️ Tecnologías utilizadas

### Frontend
- Angular 19.2.10
- HTML + CSS
- TypeScript

### Backend
- Spring Boot
- Spring Data JPA

### Base de datos
- MySQL 8

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/cristian42567/Proyecto-HoraFlox-2025.git
cd Proyecto-HoraFlox-2025
```

### 2. Base de datos

- Importa el archivo `horaflox_overtime_record.sql` en tu servidor MySQL.
- Asegúrate de tener un usuario y contraseña válidos con permisos.
- Configura tu archivo `application.properties.example` en el backend (el normal no está incluido por seguridad).

Ejemplo de `application.properties`:

```properties
spring.application.name=horaflox_api

spring.datasource.url=jdbc:mysql://localhost:3306/horaflox
spring.datasource.username=tuUsuario (poner tu usuario)
spring.datasource.password=tuContrasena (poner tu contraseña)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.show-sql=true
```

> ⚠️ Usa `application.properties.example` como referencia.

---

### 3. Ejecutar el backend

```bash
cd backend/horaflox_back
mvnw spring-boot:run
```

> El servidor se iniciará en: `http://localhost:8080`.

---

### 4. Ejecutar el frontend

```bash
cd frontend/horaflox_front
npm install
ng serve
```

> La aplicación estará disponible en: `http://localhost:4200`.

---

## ✨ Funcionalidades principales

- Visualización de todas las horas registradas
- Orden descendente por fecha (últimas horas primero)
- Suma total de horas visibles
- Añadir nuevas horas trabajadas
- Editar registros existentes
- Eliminar registros con confirmación

---

## 🧑‍💻 Autor

Cristian – [GitHub](https://github.com/cristian42567)

---
