# 🚀 Guía Rápida: Scrapear Productos de SkyMart

## ⚡ Inicio Rápido

### 1️⃣ Instalación (solo primera vez)

```bash
cd tools
npm install
```

### 2️⃣ Prueba Rápida (RECOMENDADO para empezar)

```bash
npm test
```

Esto scrapea **solo 2 productos de ejemplo** para verificar que todo funciona.

### 3️⃣ Scraping Completo

```bash
npm run scrape
```

Esto:
- ✅ Busca productos de Eastman, AeroShell y Castrol
- ✅ Extrae toda la información (specs, precios, inventario)
- ✅ Descarga PDFs de datasheets
- ✅ Obtiene productos alternativos
- ✅ Guarda todo en `scraped-data/skymart-products.json`

**NOTA:** ✨ No se requiere usuario ni contraseña - SkyMart permite acceso público

### 4️⃣ Importar al Marketplace

```bash
npm run import
```

Esto:
- ✅ Convierte los datos al formato del marketplace
- ✅ Genera imágenes apropiadas para cada tipo
- ✅ Calcula ratings y productos destacados
- ✅ Crea `scraped-data/marketplace-products.json`
- ✅ Genera componente React listo para usar

### 5️⃣ Pipeline Completo (Todo de una vez)

```bash
npm run full-pipeline
```

Ejecuta scraping + importación + estadísticas automáticamente.

### 5️⃣ (bis) Pipeline de Prueba

```bash
npm run test-pipeline
```

Prueba todo el flujo con solo 2 productos.

---

## 📊 Resultados

Después de ejecutar encontrarás:

```
scraped-data/
├── skymart-products.json              # Datos crudos de SkyMart
├── marketplace-products.json          # Datos formateados para marketplace
├── LubricantMarketplace-GENERATED.jsx # Componente React listo
└── datasheets/                        # PDFs descargados
    ├── 2380-QT_SDS.pdf
    ├── 2197-55GL_SAFETY_DATA_SHEET.pdf
    └── ...
```

---

## 🎯 Usar los Productos en el Marketplace

### Opción A: Copiar el array completo

1. Abre `scraped-data/marketplace-products.json`
2. Copia todo el contenido
3. Pégalo en tu componente `LubricantMarketplace.jsx`

### Opción B: Usar el componente generado

```javascript
// En LubricantMarketplace.jsx
import scrapedProducts from '../scraped-data/LubricantMarketplace-GENERATED';

// Combinar con productos existentes
const products = [
  ...scrapedProducts,
  // ... tus productos manuales
];
```

---

## ⚙️ Opciones Avanzadas

### Scrapear solo una marca:

```bash
npm run scrape:eastman
npm run scrape:aeroshell
npm run scrape:castrol
```

### Modo prueba (solo 2 productos):

```bash
npm test
npm run test-pipeline    # Incluye importación
```

### Ver el navegador en acción:

Edita `skymart-scraper.js`:

```javascript
HEADLESS: false,  // Cambia de true a false
```

### Ajustar cantidad de productos:

```javascript
MAX_PRODUCTS: 50,  // Cambia de 100 a tu preferencia
```

### Aumentar/Reducir velocidad:

```javascript
DELAY: 3000,  // Más alto = más lento pero más seguro
```

---

## 🔍 Información Extraída

Para cada producto obtendrás:

### 📋 Especificaciones
- Part Number
- NSN (National Stock Number)
- Manufacturer
- Part Type (Turbine Oil, Grease, etc.)
- Units (Drum, Quart, Can, etc.)
- Group Code
- UN Number
- Application

### 💰 Comercial
- Precio por unidad
- Shelf Life (días)
- Limited Shelf Life (Yes/No)
- Hazardous Material (Yes/No)

### 📦 Inventario
- Condición (New/Used)
- Almacén (Miami, Indianapolis, etc.)
- Cantidad disponible
- Shelf-life restante (%)

### 📄 Documentos
- Safety Data Sheets (SDS)
- Datasheets técnicos
- PDFs descargados localmente

### 🔄 Productos Alternativos
- Part numbers equivalentes
- Fabricantes alternativos
- Cantidad disponible de cada alternativa
- Links directos

---

## 📈 Ejemplo de Salida

```json
{
  "id": 1,
  "name": "TURBINE OIL (MIL-PRF-23699 HTS)",
  "shortName": "Eastman 2197-55GL",
  "manufacturer": "EASTMAN",
  "nsn": "9150-01-439-2070",
  "partNumber": "2197-55GL",
  "partType": "TURBINE ENGINE OIL",
  "units": "DRUM",
  "price": 5871.60,
  "inStock": true,
  "limitedShelfLife": true,
  "shelfLifeDays": 1095,
  "hazardous": false,
  "leadTime": null,
  "warehouse": "MIAMI",
  "rating": 4.8,
  "featured": true,
  "datasheets": [
    {
      "name": "SAFETY DATA SHEET",
      "filename": "2197-55GL_SDS.pdf"
    }
  ],
  "alternates": [
    {
      "partNumber": "AEROSHELL500-QT",
      "manufacturer": "AEROSHELL",
      "qtyAvailable": 1475
    }
  ]
}
```

---

## ⚠️ Importante

1. **Respeta los términos de servicio** de SkyMart
2. **No ejecutes muy frecuentemente** - usa delays
3. **Empieza con modo test** - `npm test` antes de scrapear todo
4. **Revisa los datos** antes de publicar en producción
5. **No se requiere login** - acceso público disponible

---

## 🐛 Solución de Problemas

### ❌ Error de login
→ **Ya no se necesita** - SkyMart permite acceso público

### ❌ No encuentra productos
→ Los selectores CSS pueden haber cambiado, ajusta en el código

### ❌ PDFs no se descargan
→ Verifica permisos de escritura en `scraped-data/`

### ❌ Puppeteer no funciona
→ Reinstala: `cd tools && rm -rf node_modules && npm install`

---

## 📞 Workflow Recomendado

1. **Primera vez**: Ejecuta `npm test` (solo 2 productos)
2. **Verifica**: Revisa que los datos sean correctos con `npm run view`
3. **Ajusta**: Modifica configuración si es necesario
4. **Producción**: Ejecuta `npm run full-pipeline` completo
5. **Actualiza**: Re-ejecuta semanalmente para mantener precios actualizados

---

**¡Listo para scrapear! 🎉**

```bash
cd tools
npm install
npm test              # Primero prueba con 2 productos
npm run full-pipeline # Luego ejecuta completo
```
