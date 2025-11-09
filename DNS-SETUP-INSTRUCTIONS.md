# Configuración DNS para orbiparts.com

## Problema actual
- Tu dominio `orbiparts.com` apunta a: `147.79.119.87` y `147.79.116.252`
- Tu servidor FTP/web está en: `82.25.113.198`
- Los archivos están subidos correctamente pero el dominio no los ve porque apunta al servidor equivocado

## Solución: Actualizar registros DNS

### ⚠️ PASO PREVIO CRÍTICO: Desactivar CDN de Hostinger

**El error "Cannot add A/AAAA record when CDN is enabled" significa que debes desactivar el CDN primero:**

1. Entra a hPanel → **Dominios** → `orbiparts.com`
2. Busca la sección **CDN** o **Cloudflare CDN** (puede estar en una pestaña aparte como "Seguridad" o "Rendimiento")
3. **Desactiva/Deshabilita el CDN completamente**
4. Espera 2-3 minutos a que Hostinger aplique el cambio
5. **AHORA SÍ** podrás cambiar los registros DNS a continuación

### Opción A: Si gestionas DNS en Hostinger (hPanel)

1. Entra a hPanel → **Dominios** → `orbiparts.com` → **Zona DNS**
2. Busca el registro **ALIAS** que apunta a `orbiparts.com.cdn.hstgr.net`
3. **Elimínalo** o **Edítalo** para convertirlo en:
   - Tipo: `A`
   - Nombre: `@` (o déjalo en blanco)
   - Apunta a: `82.25.113.198`
   - TTL: `14400` (4 horas) o `300` (5 minutos para pruebas)

4. Si tuviste que eliminar el ALIAS, **crea un nuevo registro A**:
   - Click en "Añadir registro"
   - Tipo: `A`
   - Nombre: `@`
   - Valor/IP: `82.25.113.198`
   - TTL: `14400`

5. Verifica/añade también el registro para `www`:
   - Opción 1 (CNAME recomendado):
     - Tipo: `CNAME`
     - Nombre: `www`
     - Apunta a: `orbiparts.com`
   - Opción 2 (A record):
     - Tipo: `A`
     - Nombre: `www`
     - Apunta a: `82.25.113.198`

6. **Guarda cambios**

### Opción B: Si gestionas DNS en otro proveedor (GoDaddy, Namecheap, Cloudflare, etc.)

1. Entra al panel de tu proveedor de dominio
2. Busca la sección **DNS Management** o **Zone Editor**
3. Localiza o crea estos registros:

```
Tipo    Nombre    Valor/Destino        TTL
A       @         82.25.113.198        14400
A       www       82.25.113.198        14400
A       ftp       82.25.113.198        14400 (ya existe)
```

4. **Elimina o desactiva** cualquier registro A que apunte a `147.79.119.87` o `147.79.116.252` si no los necesitas

5. Guarda cambios y espera propagación

## Verificación

### 1. Comprobar propagación DNS (espera 5-60 minutos tras el cambio)

```bash
# Debe devolver: 82.25.113.198
dig +short orbiparts.com A

# También para www
dig +short www.orbiparts.com A
```

### 2. Probar acceso al CSS

```bash
# Debe devolver: HTTP/2 200
curl -I https://orbiparts.com/assets/index-66f019bf.css
```

### 3. Acceder al sitio

Abre en navegador (modo incógnito para evitar caché):
- https://orbiparts.com
- https://www.orbiparts.com

Deberías ver tu aplicación React funcionando.

## Si sigue apareciendo contenido antiguo tras propagación DNS

1. **Limpiar caché del navegador**:
   - Chrome/Edge: Ctrl+Shift+Delete (Cmd+Shift+Delete en Mac)
   - O usa modo incógnito

2. **Purgar caché de Hostinger** (si está activo):
   - hPanel → Hosting → Sitio web → **Performance** → Clear Cache
   - O busca "Purge CDN" / "Clear Cache"

3. **Esperar expiración natural**:
   - El header `age: 39` indica CDN activo
   - Puede tardar hasta 1 hora en refrescar

## Notas importantes

- **Propagación DNS**: Puede tardar desde 5 minutos hasta 48 horas (típicamente < 1 hora)
- **Certificado SSL**: Si cambias la IP, Hostinger regenerará el certificado automáticamente en ~15 minutos
- **GitHub Actions**: Una vez el DNS esté correcto, todos los futuros deploys funcionarán automáticamente

## Comandos útiles para diagnóstico

```bash
# Ver todos los registros DNS actuales
dig orbiparts.com ANY

# Comprobar desde diferentes DNS servers
dig @8.8.8.8 orbiparts.com A    # Google DNS
dig @1.1.1.1 orbiparts.com A    # Cloudflare DNS

# Traceroute para ver la ruta
traceroute orbiparts.com

# Probar acceso directo por IP (bypass DNS)
curl -I http://82.25.113.198/
```

## Estado actual de archivos en el servidor

✅ Subidos correctamente a `/public_html/` en `82.25.113.198`:
- `index.html`
- `assets/index-66f019bf.css`
- `assets/index-9dc24b07.js`
- `.htaccess` (con DirectoryIndex y rewrite rules)
- Sitemaps, robots.txt, imágenes

🔴 El dominio aún apunta al servidor viejo → **Requiere cambio de DNS**

---

**Próximo paso**: Haz el cambio de DNS y avísame cuando propaguen. Verificaremos juntos que todo funcione.
