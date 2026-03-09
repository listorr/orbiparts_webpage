# 📚 Guía de Uso - Batch Scraper

## 🎯 Objetivo
El **Batch Scraper** permite scrapear múltiples productos de SkyMart de forma automática, extrayendo toda la información incluyendo productos alternativos/homólogos y descargando todos los PDFs.

---

## 📋 Preparación

### 1️⃣ Crear archivo con lista de URLs

Crea un archivo de texto (ej: `eastman-products.txt`) con las URLs de los productos, **una por línea**:

```txt
https://portal.skymart.aero/shop/part/37935
https://portal.skymart.aero/shop/part/12345
https://portal.skymart.aero/shop/part/67890
https://portal.skymart.aero/shop/part/54321
```

**Consejos:**
- Puedes usar `#` para comentarios
- Las líneas vacías se ignoran
- Solo URLs que comiencen con `http` serán procesadas

### 2️⃣ Ejemplo de archivos organizados por fabricante

```
tools/
├── eastman-products.txt        # URLs de productos Eastman
├── aeroshell-products.txt      # URLs de productos AeroShell
├── castrol-products.txt        # URLs de productos Castrol
└── mobil-products.txt          # URLs de productos Mobil
```

---

## 🚀 Ejecución

### Opción 1: Usar archivo de URLs (RECOMENDADO)

```bash
cd tools
node skymart-batch-scraper.js eastman-products.txt
```

### Opción 2: URLs directas en la línea de comandos

```bash
node skymart-batch-scraper.js \
  https://portal.skymart.aero/shop/part/37935 \
  https://portal.skymart.aero/shop/part/12345 \
  https://portal.skymart.aero/shop/part/67890
```

---

## 📊 Datos Extraídos

Para cada producto, el scraper extrae:

### ✅ Información Básica
- Part Number
- Descripción
- Precio
- Fabricante
- URL del producto

### ✅ Especificaciones Técnicas
- NSN (National Stock Number)
- Part Type
- Units
- Group Code
- Shelf Life
- Hazardous Material status
- Y todas las demás especificaciones disponibles

### ✅ Inventario
- Condición (New, Overhauled, etc.)
- Almacén (Indianapolis, Miami, San Antonio, etc.)
- Cantidad disponible
- Cantidad en orden
- Shelf-life restante

### ✅ Archivos Descargados
- **PDFs:** Safety Data Sheets, especificaciones técnicas, certificados
- **Imágenes:** Foto del producto en alta resolución

### ✅ Productos Alternativos/Homólogos
- Part Numbers equivalentes
- Fabricantes alternativos
- Descripciones de productos compatibles

---

## 📁 Estructura de Salida

```
scraped-data/
├── pdfs/
│   ├── 2380-QT_1.pdf
│   ├── 2380-QT_2.pdf
│   ├── PRODUCT123_1.pdf
│   └── ...
├── images/
│   ├── 2380-QT.png
│   ├── PRODUCT123.png
│   └── ...
├── product_2380-QT_2026-03-08T18-30-00-000Z.json
├── product_PRODUCT123_2026-03-08T18-30-00-000Z.json
├── batch_summary_2026-03-08T18-30-00-000Z.json
└── BATCH_REPORT_2026-03-08T18-30-00-000Z.md
```

### Archivos generados:

1. **`product_[PART-NUMBER]_[TIMESTAMP].json`**
   - Datos completos de cada producto en formato JSON
   - Incluye todas las especificaciones, inventario, PDFs descargados, etc.

2. **`batch_summary_[TIMESTAMP].json`**
   - Resumen de todos los productos scrapeados
   - Estadísticas de éxito/fallo
   - Array con todos los productos

3. **`BATCH_REPORT_[TIMESTAMP].md`**
   - Reporte legible en Markdown
   - Tablas con especificaciones, inventario, alternativas
   - Lista de PDFs descargados

4. **`pdfs/[PART-NUMBER]_[N].pdf`**
   - Todos los PDFs descargados
   - Nombrados con el part number del producto

5. **`images/[PART-NUMBER].png`**
   - Imágenes de productos

---

## 📊 Ejemplo de Salida en Consola

```
🚀 Iniciando scraping de 3 productos...
📁 Directorio de salida: /scraped-data
📄 PDFs se guardarán en: /scraped-data/pdfs
🖼️  Imágenes se guardarán en: /scraped-data/images

================================================================================
[1/3] Procesando...
📦 Scrapeando: https://portal.skymart.aero/shop/part/37935
================================================================================
   Part Number: 2380-QT
   Description: TURBINE OIL (MIL-PRF-23699G-STD)
   Price: $29.09 per Quart
   ✓ Especificaciones extraídas: 13
   ✓ Inventario extraído: 3 ubicaciones
   📄 PDFs encontrados: 4
      Descargando: 2380-QT_1.pdf...
      ✓ 2380-QT_1.pdf - 292 KB
      Descargando: 2380-QT_2.pdf...
      ✓ 2380-QT_2.pdf - 286 KB
      Descargando: 2380-QT_3.pdf...
      ✓ 2380-QT_3.pdf - 357 KB
      Descargando: 2380-QT_4.pdf...
      ✓ 2380-QT_4.pdf - 330 KB
   🖼️  Descargando imagen...
      ✓ 2380-QT.png - 45 KB
   🔄 Expandiendo productos alternativos...
   ✓ Productos alternativos: 8
   ✓ Guardado en: product_2380-QT_2026-03-08T18-30-00-000Z.json
   ⏳ Esperando 2000ms antes del siguiente producto...

[2/3] Procesando...
...

================================================================================
✅ SCRAPING COMPLETADO
================================================================================
📊 Productos exitosos: 3/3
❌ Productos fallidos: 0
📄 Total PDFs descargados: 12
🖼️  Total imágenes descargadas: 3
📁 Resumen guardado en: batch_summary_2026-03-08T18-30-00-000Z.json
📋 Reporte guardado en: BATCH_REPORT_2026-03-08T18-30-00-000Z.md
================================================================================
```

---

## ⚙️ Configuración Avanzada

Puedes modificar la configuración en `skymart-batch-scraper.js`:

```javascript
const CONFIG = {
  HEADLESS: true,          // true = sin ventana, false = con ventana visible
  DELAY: 2000,             // Milisegundos entre productos (2000 = 2 segundos)
  OUTPUT_DIR: '../scraped-data',
  PDFS_DIR: '../scraped-data/pdfs',
  IMAGES_DIR: '../scraped-data/images',
};
```

---

## 🔍 Verificar Resultados

### Ver resumen rápido:
```bash
cat scraped-data/BATCH_REPORT_*.md
```

### Ver datos JSON de un producto:
```bash
cat scraped-data/product_2380-QT_*.json | jq .
```

### Listar PDFs descargados:
```bash
ls -lh scraped-data/pdfs/
```

### Ver estadísticas:
```bash
node view-data.js
```

---

## 💡 Consejos y Buenas Prácticas

### ✅ Recomendaciones:

1. **Empieza con pocos productos** (5-10) para probar
2. **Usa archivos separados por fabricante** para mejor organización
3. **Revisa el reporte .md** para verificar que todo se extrajo correctamente
4. **Guarda los archivos .json** - son la fuente de datos para el marketplace
5. **Haz backup** de la carpeta `scraped-data` regularmente

### ⚠️ Limitaciones:

- El scraper espera 2 segundos entre productos (configurable)
- Algunos productos pueden no tener todos los datos disponibles
- Los productos alternativos solo se extraen si el botón existe y es clickeable
- PDFs muy grandes (>50MB) pueden fallar - se registrará en el log

### 🐛 Resolución de Problemas:

**Si un producto falla:**
- Verifica que la URL sea correcta
- Comprueba que el producto existe en SkyMart
- Revisa el log para ver el error específico
- El scraper continuará con los demás productos

**Si no se descargan PDFs:**
- Algunos productos no tienen PDFs disponibles
- Verifica tu conexión a internet
- Los PDFs se guardan solo si la descarga es exitosa

**Si no se extraen alternativas:**
- No todos los productos tienen alternativas listadas
- Algunos requieren autenticación para ver alternativas
- El botón puede tener un selector diferente

---

## 📝 Siguiente Paso: Importar a Marketplace

Una vez que hayas scrapeado todos los productos:

```bash
node import-scraped-data.js
```

Esto convertirá todos los datos scrapeados al formato del marketplace y generará el componente React listo para usar.

---

## 🎯 Ejemplo Completo

```bash
# 1. Crear archivo con URLs
echo "https://portal.skymart.aero/shop/part/37935" > eastman-products.txt
echo "https://portal.skymart.aero/shop/part/12345" >> eastman-products.txt
echo "https://portal.skymart.aero/shop/part/67890" >> eastman-products.txt

# 2. Ejecutar scraper
cd tools
node skymart-batch-scraper.js eastman-products.txt

# 3. Ver resultados
cat ../scraped-data/BATCH_REPORT_*.md

# 4. Listar PDFs
ls -lh ../scraped-data/pdfs/

# 5. Importar al marketplace
node import-scraped-data.js
```

---

## 📞 Soporte

Si encuentras problemas o necesitas ayuda, revisa:
- Los logs en la consola
- El archivo `BATCH_REPORT_*.md` para detalles
- Los archivos JSON individuales de cada producto
