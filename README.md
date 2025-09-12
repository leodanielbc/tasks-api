# Tasks API

Este proyecto implementa una API para gestionar usuarios y tareas utilizando Firebase Functions, Express y Firestore.

## Endpoints disponibles

- **POST /users**  
  Crear un nuevo usuario.  
  Request body:
  ```json
  {
    "email": "leo@gmail.com"
  }
  ```

- **POST /users/login**  
  Iniciar sesión con un usuario existente.  
  Si el usuario no existe, devuelve un estado `not_found`.  
  Request body:
  ```json
  {
    "email": "leo1@gmail.com"
  }
  ```

- **POST /tasks**  
  Crear una nueva tarea.  
  Requiere autenticación (`Authorization: Bearer <token>`).  
  Request body:
  ```json
  {
      "title": "Tarea1",
      "description": "Configurar CI CD",
      "userId": "gUdv9Y6uJ0bA9758Rb5n"
  }
  ```

- **GET /tasks**  
  Listar todas las tareas del usuario autenticado.

- **PUT /tasks/:id**  
  Actualizar una tarea existente.  
  Requiere autenticación.  
  Request body:
  ```json
  {
      "title": "Tarea1 actualizada",
      "description": "Configurar CI CD con Github Actions",
      "completed": true
  }
  ```

- **DELETE /tasks/:id**  
  Eliminar una tarea existente.  
  Requiere autenticación.

## Autenticación

Todas las rutas de tareas requieren un **JWT** válido en la cabecera:

```
Authorization: Bearer <TOKEN_USER>
```

Ejemplo de token generado en login:
```
@TOKEN_USER=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Scripts disponibles

En `package.json`:

- `npm run build`: Compila TypeScript.  
- `npm run build:watch`: Compila en modo watch.  
- `npm run serve`: Ejecuta Firebase emulator con funciones.  
- `npm run shell`: Abre shell de funciones.  
- `npm run start`: Ejecuta con ts-node.  
- `npm run deploy`: Despliega en Firebase.  
- `npm run logs`: Muestra logs de Firebase Functions.  
- `npm run dev`: Ejecuta con nodemon y ts-node.  
- `npm run test`: Corre pruebas con Jest.  
- `npm run test:watch`: Corre pruebas en modo watch.

## CI/CD con GitHub Actions

El flujo definido en `.github/workflows/firebase.yml`:

1. Se ejecuta en cada push o pull request a `main`.  
2. Configura Node.js 20.  
3. Instala dependencias en la carpeta `functions`.  
4. Corre pruebas (`npm run test`).  
5. Compila TypeScript (`npm run build`).  
6. Instala Firebase CLI.  
7. Despliega a Firebase (`npm run deploy`) usando el secreto `FIREBASE_TOKEN`.

## Despliegue

### Local
1. Instalar dependencias:
   ```
   npm install
   ```
2. Iniciar en desarrollo:
   ```
   npm run dev
   ```
3. O con emulador de Firebase:
   ```
   npm run serve
   ```

### Producción
1. Asegurarse de tener configurado el **FIREBASE_TOKEN**.
2. Ejecutar:
   ```
   npm run deploy
   ```