# Deployment Manual a Hostinger

## Opción 1: Con el script deploy-manual.js

1. Edita `deploy-manual.js` y añade tu contraseña FTP
2. Ejecuta:
   ```bash
   npm run build
   node deploy-manual.js
   ```

## Opción 2: Con FileZilla (más fácil)

1. Descarga FileZilla: https://filezilla-project.org/
2. Conéctate con estas credenciales:
   - **Host**: 82.25.113.198
   - **Usuario**: u716620906.luist4
   - **Contraseña**: [tu contraseña de Hostinger]
   - **Puerto**: 21
   - **Protocolo**: FTP

3. Una vez conectado:
   - En el lado izquierdo, navega a la carpeta `dist/` de tu proyecto local
   - En el lado derecho, navega a `/public_html/` (o la carpeta raíz de tu sitio)
   - Selecciona TODOS los archivos de `dist/` y arrástralos al servidor
   - Espera a que termine la subida

4. Limpia el caché del navegador y visita https://orbiparts.com

## Verificar el problema con GitHub Actions

El problema es que GitHub Actions no está desplegando. Revisa:
https://github.com/listorr/orbiparts_webpage/actions

Si ves errores en rojo, puede ser:
- Contraseña FTP incorrecta en los Secrets
- Permisos del servidor
- Problemas de conexión

