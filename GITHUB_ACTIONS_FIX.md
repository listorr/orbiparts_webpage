# 🔧 Guía para Arreglar GitHub Actions Deployment

## Paso 1: Verificar GitHub Secrets

Ve a tu repositorio en GitHub y verifica que estos secrets estén configurados:

🔗 https://github.com/listorr/orbiparts_webpage/settings/secrets/actions

**Secrets requeridos:**
- `HOSTINGER_FTP_SERVER` = `82.25.113.198`
- `HOSTINGER_FTP_USERNAME` = `u716620906.luist4`
- `HOSTINGER_FTP_PASSWORD` = (tu contraseña de Hostinger)
- `HOSTINGER_FTP_TARGET_DIR` = `/public_html/` o `/`

## Paso 2: Si los Secrets NO están configurados:

1. Ve a: https://github.com/listorr/orbiparts_webpage/settings/secrets/actions
2. Click en "New repository secret"
3. Añade cada uno de los secrets de arriba

## Paso 3: Verificar el último workflow

1. Ve a: https://github.com/listorr/orbiparts_webpage/actions
2. Click en el último workflow que se ejecutó
3. Busca errores en rojo
4. Si dice "FTP connection failed" o similar, revisa las credenciales

## Paso 4: Forzar un nuevo deployment

Ejecuta estos comandos:

```bash
cd "/Users/luistorrentenaveira/Downloads/horizons-export-2ef424c8-0ac1-4054-84ba-36e23eef1963 (7)"
git commit --allow-empty -m "chore: force deployment"
git push origin main
```

Luego espera 2-3 minutos y verifica: https://orbiparts.com

## Paso 5: Si sigue sin funcionar

**Opción A:** Usar el deployment manual que creamos antes
**Opción B:** Contactar con soporte de Hostinger para verificar:
- ¿Está habilitado el acceso FTP?
- ¿Las credenciales son correctas?
- ¿Hay restricciones de IP?

## Verificación rápida actual:

```bash
# Ver qué versión está en producción
curl -s https://orbiparts.com | grep -o 'index-[a-f0-9]*.js'

# Ver qué versión debería estar (tu build local)
ls -la dist/assets/index-*.js
```

Si los hashes son diferentes, el deployment no se está ejecutando.
