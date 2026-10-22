# Visor 3D Web (GLB / Mobile Ready)

Visor web ligero y responsivo diseñado para previsualizar modelos 3D en formato `.glb` tanto en navegadores de escritorio como en dispositivos móviles (Android / iOS con soporte táctil completo).

## ✨ Características

- 📱 **100% Mobile Ready**: Optimizado para gestos táctiles (1 dedo rota en 360°, 2 dedos zoom y pan).
- 🔄 **Carga Dinámica**: Lee automáticamente cualquier archivo `.glb` que se agregue a la carpeta y crea un botón de acceso directo.
- ⚡ **Ligero y Rápido**: Utiliza `@google/model-viewer` con renderizado PBR, sombras dinámicas y exposición balanceada.
- 🚀 **Servidor Node.js Nativo**: Sin dependencias de terceros para ejecutar el servidor local (`node:http`, `node:fs`).

## 📦 Modelos Incluidos

- `white_mesh.glb`
- `meshy-model.glb`
- `meshy-model_1.glb`

## 🛠️ Ejecución Local

```bash
# Iniciar servidor
node server.mjs
```

Abre en tu navegador:
`http://localhost:8080`
