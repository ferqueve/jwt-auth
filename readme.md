# 🔐 JWT Tokens Demo - Jóvenes a Programar

Una aplicación web educativa que demuestra el uso completo de JSON Web Tokens (JWT) para autenticación y autorización. Desarrollada para el aprendizaje práctico de estudiantes de desarrollo web.

## 👨‍🏫 Información Académica

**Docente:** Fernando D. Quevedo  
**Institución:** Jóvenes a Programar  
**Materia:** Desarrollo Web  
**Tema:** Autenticación JWT y APIs  

## 📋 Descripción del Proyecto

Este proyecto es una demostración interactiva que permite a los estudiantes analizar y comprender el flujo completo de autenticación con JWT tokens, desde la generación hasta el uso en peticiones autenticadas.

### 🎯 Objetivos de Aprendizaje

- Comprender cómo se genera un token JWT durante el login
- Identificar el almacenamiento seguro de tokens en localStorage
- Analizar el uso de tokens en headers de autorización
- Diferenciar entre peticiones autenticadas y no autenticadas
- Estudiar la estructura de un token JWT (Header, Payload, Signature)

## ✨ Características Principales

### 🔑 **Autenticación Completa**
- Sistema de login simulado con credenciales de prueba
- Generación real de tokens JWT con estructura estándar
- Manejo de estados de autenticación (logueado/no logueado)
- Función de logout con limpieza de datos

### 🎫 **Análisis de Tokens JWT**
- Visualización del token completo generado
- Decodificación y muestra de las tres partes del JWT:
  - **Header** (algoritmo y tipo)
  - **Payload** (datos del usuario y permisos)
  - **Signature** (verificación de integridad)

### 🧪 **Pruebas de API**
- Peticiones autenticadas con token válido
- Peticiones no autenticadas que fallan
- Simulación de diferentes endpoints (`/profile`, `/admin-data`)
- Respuestas realistas con códigos de estado HTTP

### 📚 **Código Educativo**
- Ejemplos de código comentados paso a paso
- Destacado de elementos clave para análisis
- Implementación completa de funciones de autenticación

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño moderno con efectos visuales
- **JavaScript ES6+** - Lógica de autenticación y manejo de APIs
- **localStorage** - Persistencia de tokens y sesiones
- **Fetch API** - Simulación de peticiones HTTP

## 📁 Estructura del Proyecto

```
jwt-tokens-demo/
│
├── index.html          # Estructura principal de la aplicación
├── styles.css          # Estilos y diseño responsive
├── script.js           # Lógica de autenticación JWT
└── README.md           # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor - funciona localmente

### Pasos de Instalación

1. **Descargar los archivos**
   ```bash
   # Si tienes git instalado
   git clone [URL-del-repositorio]
   cd jwt-tokens-demo
   
   # O descargar manualmente los archivos
   ```

2. **Abrir la aplicación**
   - Hacer doble clic en `index.html`
   - O usar un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   ```

3. **Acceder a la aplicación**
   - Navegador: `http://localhost:8000`
   - O directamente abriendo el archivo HTML

## 🔐 Credenciales de Prueba

Para probar la aplicación, utiliza estas credenciales:

- **Email:** `admin@jovenes.com`
- **Contraseña:** `123456`

## 📖 Elementos Clave para Analizar

### 1. 📡 **Llamada a API de Autenticación**
```javascript
// Localizar en script.js líneas 45-55
const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
```

### 2. 💾 **Almacenamiento del Token**
```javascript
// Localizar en script.js líneas 70-72
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(user));
```

### 3. 🔐 **Uso del Token en Peticiones**
```javascript
// Localizar en script.js líneas 85-95
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
```

### 4. 🎫 **Estructura del JWT**
- **Header:** Contiene el algoritmo (HS256) y tipo (JWT)
- **Payload:** Datos del usuario, roles, y tiempo de expiración
- **Signature:** Verificación criptográfica de integridad

## 🎮 Flujo de Uso para Estudiantes

1. **Analizar el código de login** en `script.js`
2. **Iniciar sesión** con las credenciales de prueba
3. **Observar la generación** del token JWT
4. **Examinar las tres partes** del token decodificado
5. **Probar peticiones autenticadas** vs no autenticadas
6. **Estudiar las respuestas** de la API simulada
7. **Experimentar con logout** y limpieza de datos

## 🔍 Puntos de Análisis Importantes

### Seguridad
- ¿Por qué se usa `Bearer` en el header de Authorization?
- ¿Cómo se verifica la validez de un token?
- ¿Qué sucede cuando un token expira?

### Almacenamiento
- ¿Por qué usar localStorage vs cookies?
- ¿Cuáles son las ventajas y desventajas?
- ¿Cómo manejar la persistencia de sesiones?

### API Design
- ¿Qué códigos de estado HTTP se usan y por qué?
- ¿Cómo diferenciar entre errores de autenticación y autorización?
- ¿Qué información incluir en las respuestas de error?

## 🎓 Ejercicios Sugeridos

1. **Modificar el tiempo de expiración** del token
2. **Agregar nuevos endpoints** protegidos
3. **Implementar roles de usuario** (admin, estudiante, profesor)
4. **Crear un sistema de refresh tokens**
5. **Añadir validación del lado cliente**

## 🤝 Contribuir al Proyecto

Si eres estudiante y quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mejora-estudiante`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora-estudiante`)
5. Abre un Pull Request

## 📞 Contacto Académico

**Docente:** Fernando D. Quevedo  
**Institución:** Jóvenes a Programar  
**Email:** [consultar en clase]  

Para dudas sobre el proyecto o conceptos de JWT, consultar durante las horas de clase o tutorías.

## 📄 Licencia

Este proyecto es de uso educativo para los estudiantes de Jóvenes a Programar. 

## 🙏 Agradecimientos

- A **Fernando D. Quevedo** por la guía en desarrollo web moderno
- A **Jóvenes a Programar** por fomentar el aprendizaje práctico
- A la comunidad de desarrolladores por compartir conocimiento sobre JWT

## 📚 Recursos Adicionales

### Documentación Oficial
- [JWT.io](https://jwt.io/) - Debugger y documentación de JWT
- [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) - Fetch API
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - Especificación oficial de JWT

### Lecturas Recomendadas
- "Understanding JWT Tokens" - Auth0 Blog
- "JWT Authentication Best Practices" - OWASP
- "localStorage vs Cookies" - Web Security Guide

---

⭐ **¡No olvides estudiar el código línea por línea para entender cada concepto!**

💻 **Desarrollado para el aprendizaje práctico de autenticación web moderna**