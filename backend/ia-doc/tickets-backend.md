# Tickets de Desarrollo Backend - TradeBinder

## 📊 Resumen de Progreso

**Tickets Completados:** 3/15  
**En Progreso:** 0  
**Pendientes:** 12  

### Estado por Sprint:
- **Sprint 1 (Fundación):** ✅ 3/3 completados
- **Sprint 2 (Funcionalidad Core):** ⏳ 0/3 completados  
- **Sprint 3 (Comunicación y Confianza):** ⏳ 0/3 completados
- **Sprint 4 (Funcionalidades Adicionales):** ⏳ 0/3 completados
- **Sprint 5 (Finalización):** ⏳ 0/3 completados

---

## Ticket #1: Configuración Base del Proyecto ✅ COMPLETADO
**Prioridad:** Alta  
**Estimación:** 2-3 días  
**Tipo:** Infraestructura  
**Estado:** ✅ COMPLETADO

### Descripción
Configurar la estructura base del proyecto NestJS con todas las dependencias necesarias, configuración de base de datos y entorno de desarrollo.

### Tareas
- [x] Configurar TypeORM con PostgreSQL
- [x] Configurar variables de entorno (.env)
- [x] Configurar JWT y Passport
- [x] Configurar validación con class-validator
- [x] Configurar CORS y middleware de seguridad
- [x] Configurar logging y manejo de errores
- [x] Configurar scripts de migración y seeds
- [x] Configurar Docker para desarrollo

### Criterios de Aceptación
- [x] El proyecto se ejecuta correctamente con `npm run start:dev`
- [x] La conexión a PostgreSQL funciona
- [x] Las migraciones se ejecutan correctamente
- [x] El entorno Docker está configurado

---

## Ticket #2: Entidades y Modelo de Datos ✅ COMPLETADO
**Prioridad:** Alta  
**Estimación:** 3-4 días  
**Tipo:** Base de Datos  
**Estado:** ✅ COMPLETADO

### Descripción
Crear todas las entidades del modelo de datos según la especificación del proyecto.

### Tareas
- [x] Crear entidad `User` (id, email, username, password, location, created_at, updated_at)
- [x] Crear entidad `Card` (id, name, edition, condition, price, seller_id, created_at)
- [x] Crear entidad `Announcement` (id, card_id, seller_id, description, created_at, updated_at)
- [x] Crear entidad `Message` (id, sender_id, receiver_id, announcement_id, content, created_at)
- [x] Crear entidad `Review` (id, reviewer_id, reviewed_id, rating, comment, created_at)
- [x] Crear entidad `Favorite` (id, user_id, announcement_id, created_at)
- [x] Configurar relaciones entre entidades
- [x] Crear migraciones iniciales
- [x] Crear seeds de datos de prueba

### Criterios de Aceptación
- [x] Todas las entidades están correctamente definidas
- [x] Las relaciones funcionan correctamente
- [x] Las migraciones se ejecutan sin errores
- [x] Los seeds cargan datos de prueba

---

## Ticket #3: Sistema de Autenticación ✅ COMPLETADO
**Prioridad:** Alta  
**Estimación:** 4-5 días  
**Tipo:** Seguridad  
**Estado:** ✅ COMPLETADO

### Descripción
Implementar sistema completo de autenticación con JWT, registro, login y gestión de usuarios.

### Tareas
- [x] Crear módulo `AuthModule`
- [x] Implementar servicio `AuthService` con bcrypt
- [x] Crear controlador `AuthController`
- [x] Implementar endpoint `POST /auth/register`
- [x] Implementar endpoint `POST /auth/login`
- [x] Implementar endpoint `POST /auth/refresh`
- [x] Crear DTOs para registro y login
- [x] Crear JWT Strategy y Guards
- [x] Implementar middleware de autenticación
- [x] Crear endpoint protegido de ejemplo `/profile`

### Criterios de Aceptación
- [x] Los usuarios pueden registrarse con email único
- [x] Las contraseñas se hashean correctamente
- [x] El login genera JWT válido
- [x] Los endpoints protegidos requieren autenticación
- [x] El sistema de refresh token funciona
- [x] Los tests básicos pasan correctamente

---

## Ticket #4: Gestión de Usuarios
**Prioridad:** Media  
**Estimación:** 3-4 días  
**Tipo:** Funcionalidad

### Descripción
Implementar CRUD completo para gestión de usuarios y perfiles.

### Tareas
- [ ] Crear módulo `UsersModule`
- [ ] Implementar servicio `UsersService`
- [ ] Crear controlador `UsersController`
- [ ] Implementar endpoint `GET /users/profile` (propio perfil)
- [ ] Implementar endpoint `PUT /users/profile` (actualizar perfil)
- [ ] Implementar endpoint `GET /users/:id` (ver perfil público)
- [ ] Crear DTOs para actualización de perfil
- [ ] Implementar validación de datos
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden ver y actualizar su perfil
- [ ] Los perfiles públicos son visibles
- [ ] La validación de datos funciona correctamente
- [ ] Los tests pasan correctamente

---

## Ticket #5: Gestión de Cartas
**Prioridad:** Alta  
**Estimación:** 4-5 días  
**Tipo:** Funcionalidad Core

### Descripción
Implementar sistema completo para gestión de cartas de Magic: The Gathering.

### Tareas
- [ ] Crear módulo `CardsModule`
- [ ] Implementar servicio `CardsService`
- [ ] Crear controlador `CardsController`
- [ ] Implementar endpoint `POST /cards` (crear carta)
- [ ] Implementar endpoint `GET /cards` (listar cartas con filtros)
- [ ] Implementar endpoint `GET /cards/:id` (ver carta específica)
- [ ] Implementar endpoint `PUT /cards/:id` (actualizar carta)
- [ ] Implementar endpoint `DELETE /cards/:id` (eliminar carta)
- [ ] Implementar búsqueda por nombre, edición, condición
- [ ] Crear DTOs para creación y actualización
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden crear cartas
- [ ] La búsqueda y filtrado funcionan correctamente
- [ ] Solo el propietario puede modificar/eliminar sus cartas
- [ ] Los tests pasan correctamente

---

## Ticket #6: Sistema de Anuncios
**Prioridad:** Alta  
**Estimación:** 5-6 días  
**Tipo:** Funcionalidad Core

### Descripción
Implementar sistema completo de anuncios para la venta e intercambio de cartas.

### Tareas
- [ ] Crear módulo `AnnouncementsModule`
- [ ] Implementar servicio `AnnouncementsService`
- [ ] Crear controlador `AnnouncementsController`
- [ ] Implementar endpoint `POST /announcements` (crear anuncio)
- [ ] Implementar endpoint `GET /announcements` (listar con filtros)
- [ ] Implementar endpoint `GET /announcements/:id` (ver anuncio específico)
- [ ] Implementar endpoint `PUT /announcements/:id` (actualizar anuncio)
- [ ] Implementar endpoint `DELETE /announcements/:id` (eliminar anuncio)
- [ ] Implementar filtros por ubicación, precio, condición
- [ ] Implementar búsqueda geográfica básica
- [ ] Crear DTOs para creación y actualización
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden crear anuncios
- [ ] Los filtros y búsqueda funcionan correctamente
- [ ] Solo el propietario puede modificar/eliminar sus anuncios
- [ ] Los tests pasan correctamente

---

## Ticket #7: Sistema de Mensajería
**Prioridad:** Media  
**Estimación:** 4-5 días  
**Tipo:** Comunicación

### Descripción
Implementar sistema de mensajería interna entre usuarios.

### Tareas
- [ ] Crear módulo `MessagesModule`
- [ ] Implementar servicio `MessagesService`
- [ ] Crear controlador `MessagesController`
- [ ] Implementar endpoint `POST /messages` (enviar mensaje)
- [ ] Implementar endpoint `GET /messages` (listar conversaciones)
- [ ] Implementar endpoint `GET /messages/:announcementId` (mensajes de un anuncio)
- [ ] Implementar endpoint `PUT /messages/:id/read` (marcar como leído)
- [ ] Implementar sistema de notificaciones básico
- [ ] Crear DTOs para mensajes
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden enviar mensajes relacionados con anuncios
- [ ] Se pueden listar conversaciones
- [ ] Los mensajes se marcan como leídos
- [ ] Los tests pasan correctamente

---

## Ticket #8: Sistema de Favoritos
**Prioridad:** Baja  
**Estimación:** 2-3 días  
**Tipo:** Funcionalidad

### Descripción
Implementar sistema para que los usuarios puedan marcar anuncios como favoritos.

### Tareas
- [ ] Crear módulo `FavoritesModule`
- [ ] Implementar servicio `FavoritesService`
- [ ] Crear controlador `FavoritesController`
- [ ] Implementar endpoint `POST /favorites` (agregar a favoritos)
- [ ] Implementar endpoint `DELETE /favorites/:id` (quitar de favoritos)
- [ ] Implementar endpoint `GET /favorites` (listar favoritos)
- [ ] Crear DTOs para favoritos
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden agregar/quitar favoritos
- [ ] Se pueden listar los favoritos del usuario
- [ ] Los tests pasan correctamente

---

## Ticket #9: Sistema de Valoraciones
**Prioridad:** Media  
**Estimación:** 3-4 días  
**Tipo:** Confianza

### Descripción
Implementar sistema de valoraciones y reseñas entre usuarios.

### Tareas
- [ ] Crear módulo `ReviewsModule`
- [ ] Implementar servicio `ReviewsService`
- [ ] Crear controlador `ReviewsController`
- [ ] Implementar endpoint `POST /reviews` (crear valoración)
- [ ] Implementar endpoint `GET /reviews/:userId` (valoraciones de un usuario)
- [ ] Implementar endpoint `PUT /reviews/:id` (actualizar valoración)
- [ ] Implementar endpoint `DELETE /reviews/:id` (eliminar valoración)
- [ ] Calcular promedio de valoraciones por usuario
- [ ] Crear DTOs para valoraciones
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden valorar a otros usuarios
- [ ] Se calcula el promedio de valoraciones
- [ ] Solo se puede valorar después de una transacción
- [ ] Los tests pasan correctamente

---

## Ticket #10: Sistema de Reportes
**Prioridad:** Media  
**Estimación:** 2-3 días  
**Tipo:** Moderación

### Descripción
Implementar sistema para reportar anuncios o usuarios inapropiados.

### Tareas
- [ ] Crear módulo `ReportsModule`
- [ ] Implementar servicio `ReportsService`
- [ ] Crear controlador `ReportsController`
- [ ] Implementar endpoint `POST /reports` (crear reporte)
- [ ] Implementar endpoint `GET /reports` (listar reportes - admin)
- [ ] Implementar endpoint `PUT /reports/:id/status` (cambiar estado)
- [ ] Crear DTOs para reportes
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los usuarios pueden reportar contenido inapropiado
- [ ] Los administradores pueden gestionar reportes
- [ ] Los tests pasan correctamente

---

## Ticket #11: Panel de Administración
**Prioridad:** Baja  
**Estimación:** 4-5 días  
**Tipo:** Administración

### Descripción
Implementar endpoints básicos para administración de la plataforma.

### Tareas
- [ ] Crear módulo `AdminModule`
- [ ] Implementar servicio `AdminService`
- [ ] Crear controlador `AdminController`
- [ ] Implementar endpoint `GET /admin/users` (listar usuarios)
- [ ] Implementar endpoint `PUT /admin/users/:id/status` (activar/desactivar)
- [ ] Implementar endpoint `GET /admin/announcements` (listar anuncios)
- [ ] Implementar endpoint `DELETE /admin/announcements/:id` (eliminar anuncio)
- [ ] Implementar endpoint `GET /admin/stats` (estadísticas básicas)
- [ ] Crear guards de autorización para admin
- [ ] Crear tests unitarios

### Criterios de Aceptación
- [ ] Los administradores pueden gestionar usuarios
- [ ] Los administradores pueden moderar anuncios
- [ ] Se muestran estadísticas básicas
- [ ] Los tests pasan correctamente

---

## Ticket #12: Optimización y Performance
**Prioridad:** Media  
**Estimación:** 3-4 días  
**Tipo:** Optimización

### Descripción
Implementar optimizaciones de performance y caching.

### Tareas
- [ ] Implementar caching con Redis para consultas frecuentes
- [ ] Optimizar consultas de base de datos con índices
- [ ] Implementar paginación en todos los endpoints de listado
- [ ] Implementar rate limiting en endpoints sensibles
- [ ] Optimizar queries con eager loading
- [ ] Implementar compresión de respuestas
- [ ] Crear tests de performance

### Criterios de Aceptación
- [ ] Las consultas son más rápidas
- [ ] El caching funciona correctamente
- [ ] La paginación está implementada
- [ ] Los tests de performance pasan

---

## Ticket #13: Documentación de API
**Prioridad:** Media  
**Estimación:** 2-3 días  
**Tipo:** Documentación

### Descripción
Crear documentación completa de la API con Swagger/OpenAPI.

### Tareas
- [ ] Configurar Swagger en NestJS
- [ ] Documentar todos los endpoints
- [ ] Agregar ejemplos de request/response
- [ ] Documentar códigos de error
- [ ] Crear colección de Postman
- [ ] Generar documentación automática

### Criterios de Aceptación
- [ ] La documentación está disponible en `/api/docs`
- [ ] Todos los endpoints están documentados
- [ ] Los ejemplos funcionan correctamente
- [ ] La colección de Postman está disponible

---

## Ticket #14: Testing Completo
**Prioridad:** Alta  
**Estimación:** 4-5 días  
**Tipo:** Calidad

### Descripción
Implementar suite completa de tests para todo el backend.

### Tareas
- [ ] Tests unitarios para todos los servicios
- [ ] Tests de integración para controladores
- [ ] Tests E2E para flujos completos
- [ ] Tests de base de datos
- [ ] Configurar coverage mínimo del 80%
- [ ] Configurar CI/CD con tests automáticos
- [ ] Crear mocks y fixtures de prueba

### Criterios de Aceptación
- [ ] Coverage mínimo del 80%
- [ ] Todos los tests pasan
- [ ] Los tests E2E cubren flujos principales
- [ ] CI/CD ejecuta tests automáticamente

---

## Ticket #15: Seguridad y Validación
**Prioridad:** Alta  
**Estimación:** 3-4 días  
**Tipo:** Seguridad

### Descripción
Implementar medidas de seguridad adicionales y validación robusta.

### Tareas
- [ ] Implementar validación robusta con class-validator
- [ ] Configurar sanitización de inputs
- [ ] Implementar rate limiting por IP
- [ ] Configurar headers de seguridad
- [ ] Implementar validación de archivos subidos
- [ ] Configurar logging de seguridad
- [ ] Implementar protección contra ataques comunes

### Criterios de Aceptación
- [ ] Todas las entradas están validadas
- [ ] El rate limiting funciona
- [ ] Los headers de seguridad están configurados
- [ ] El logging de seguridad está activo

---

## Resumen de Prioridades

### Sprint 1 (Semanas 1-2)
- Ticket #1: Configuración Base
- Ticket #2: Entidades y Modelo de Datos
- Ticket #3: Sistema de Autenticación

### Sprint 2 (Semanas 3-4)
- Ticket #4: Gestión de Usuarios
- Ticket #5: Gestión de Cartas
- Ticket #6: Sistema de Anuncios

### Sprint 3 (Semanas 5-6)
- Ticket #7: Sistema de Mensajería
- Ticket #9: Sistema de Valoraciones
- Ticket #15: Seguridad y Validación

### Sprint 4 (Semanas 7-8)
- Ticket #8: Sistema de Favoritos
- Ticket #10: Sistema de Reportes
- Ticket #12: Optimización y Performance

### Sprint 5 (Semanas 9-10)
- Ticket #11: Panel de Administración
- Ticket #13: Documentación de API
- Ticket #14: Testing Completo

---

## Notas Técnicas

- **Tecnologías:** NestJS, TypeORM, PostgreSQL, JWT, bcrypt, class-validator
- **Patrones:** Repository Pattern, Service Layer, DTO Pattern
- **Testing:** Jest, Supertest
- **Documentación:** Swagger/OpenAPI
- **Seguridad:** JWT, bcrypt, CORS, Rate Limiting
- **Base de Datos:** PostgreSQL con migraciones y seeds
