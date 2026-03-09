# 🛠️ Herramientas de Scraping y Automatización

Este directorio contiene scripts automatizados para extraer y procesar datos de productos de aviación desde SkyMart.

## 📦 Contenido

```
tools/
├── skymart-scraper.js          # Script principal de web scraping
├── import-scraped-data.js      # Conversor de datos al formato marketplace
├── view-data.js                # Visualizador de datos scrapeados
├── package.json                # Dependencias y scripts npm
├── README.md                   # Este archivo
├── QUICK-START.md              # Guía rápida de inicio
└── README-SCRAPER.md           # Documentación detallada del scraper
```

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd tools
npm install
```

### 2. Prueba Rápida

**NO se requieren credenciales** - SkyMart permite acceso público

```bash
npm test  # Scrapea 2 productos de ejemplo
```

### 3. Ejecutar

```bash
# Pipeline completo (scraping + importación + visualización)
npm run full-pipeline

# O paso a paso:
npm run scrape    # 1. Scrapear productos
npm run view      # 2. Ver resumen de datos
npm run import    # 3. Importar al formato marketplace
```

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm test` | **Modo prueba**: scrapea 2 productos de ejemplo |
| `npm run scrape` | Scrapea todos los productos (Eastman, AeroShell, Castrol) |
| `npm run scrape:eastman` | Solo productos Eastman |
| `npm run scrape:aeroshell` | Solo productos AeroShell |
| `npm run scrape:castrol` | Solo productos Castrol |
| `npm run import` | Convierte datos scrapeados al formato marketplace |
| `npm run view` | Muestra estadísticas de los datos scrapeados |
| `npm run full-pipeline` | Ejecuta todo el proceso completo |
| `npm run test-pipeline` | Pipeline de prueba (2 productos + import + view) |

## 📊 Datos Extraídos

El scraper obtiene información completa de cada producto:

### Especificaciones Técnicas
- ✅ Part Number
- ✅ NSN (National Stock Number)
- ✅ Manufacturer
- ✅ Part Type
- ✅ Units
- ✅ Group Code
- ✅ Application

### Información Comercial
- ✅ Precio por unidad
- ✅ Shelf Life
- ✅ Limited Shelf Life
- ✅ Hazardous Material
- ✅ UN Number

### Inventario
- ✅ Condición (New/Used)
- ✅ Almacén (Miami, Indianapolis, San Antonio)
- ✅ Cantidad disponible
- ✅ Shelf-life restante (%)

### Documentación
- ✅ Safety Data Sheets (SDS)
- ✅ Datasheets técnicos
- ✅ Descarga automática de PDFs

### Productos Relacionados
- ✅ Alternativas/equivalentes
- ✅ Fabricantes alternativos
- ✅ Disponibilidad de alternativas

## 📂 Estructura de Salida

Los datos se guardan en `scraped-data/`:

```
scraped-data/
├── skymart-products.json              # Datos crudos de SkyMart
├── marketplace-products.json          # Formateado para marketplace
├── LubricantMarketplace-GENERATED.jsx # Componente React listo
└── datasheets/                        # PDFs descargados
    ├── 2380-QT_SDS.pdf
    ├── 2197-55GL_SAFETY_DATA_SHEET.pdf
    └── ...
```

## 🔧 Configuración Avanzada

### Ajustar cantidad de productos

En `skymart-scraper.js`:

```javascript
MAX_PRODUCTS: 100,  // Cambia a tu preferencia
```

### Velocidad de scraping

```javascript
DELAY: 2000,  // Milisegundos entre requests
```

### Modo visible (para debugging)

```javascript
HEADLESS: false,  // Ver el navegador en acción
```

## 📖 Documentación

- **[QUICK-START.md](./QUICK-START.md)** - Guía rápida para empezar
- **[README-SCRAPER.md](./README-SCRAPER.md)** - Documentación completa del scraper

## 🔄 Workflow Recomendado

1. **Test inicial**: Ejecuta `npm test` para probar con 2 productos
2. **Verificación**: Revisa los datos con `npm run view`
3. **Ajustes**: Modifica configuración si es necesario
4. **Producción**: Ejecuta completo con `npm run full-pipeline`
5. **Actualización**: Re-ejecuta semanalmente para precios actualizados

## ⚠️ Consideraciones Importantes

1. **Términos de Servicio**: Respeta los TOS de SkyMart
2. **Rate Limiting**: No ejecutes muy frecuentemente
3. **No requiere login**: SkyMart permite acceso público a los datos
4. **Validación**: Siempre verifica datos antes de publicar

## 🐛 Solución de Problemas

### Puppeteer no funciona

```bash
cd tools
rm -rf node_modules
npm install
```

### Error de login

**Ya no aplica** - SkyMart permite acceso público, no se requiere autenticación.

### No encuentra productos

- Los selectores CSS pueden haber cambiado
- Revisa la estructura HTML de SkyMart
- Ajusta los selectores en el código

## 📈 Próximas Mejoras

- [ ] Soporte para autenticación 2FA
- [ ] Scraping de imágenes de productos
- [ ] Notificaciones de cambios de precio
- [ ] Integración directa con Supabase
- [ ] Scraping incremental (solo productos nuevos)
- [ ] Dashboard web para visualizar datos

## 🤝 Contribuir

Si mejoras los scripts o encuentras bugs, documenta los cambios y actualiza este README.

---

**Creado para ORBIPARTS** 🛩️

