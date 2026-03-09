# SkyMart Product Scraper 🛩️

Script automatizado para extraer información detallada de productos de lubricantes de aviación de SkyMart.

## 🎯 Características

- ✅ **Login automático** en SkyMart portal
- 📦 **Extrae productos** de Eastman, AeroShell y Castrol
- 📊 **Información completa**: NSN, precios, inventario, especificaciones
- 🔄 **Productos alternativos**: Detecta y extrae alternativas
- 📥 **Descarga datasheets**: PDFs y documentos técnicos
- 💾 **Exporta a JSON**: Formato estructurado para importar a tu marketplace

## 📋 Información Extraída

Para cada producto obtiene:

### Especificaciones
- Part Number
- National Stock Number (NSN)
- Manufacturer
- Part Type
- Units
- Group Code
- UN Number
- Application

### Inventario
- Condition (New/Used)
- Warehouse location
- Quantity available
- Shelf-life remaining (%)

### Comercial
- Unit Price
- Limited Shelf Life (Yes/No)
- Shelf Life (días)
- Hazardous Material (Yes/No)

### Documentos
- Safety Data Sheets (SDS)
- Technical datasheets
- Descarga automática de PDFs

### Alternativas
- Productos alternativos/equivalentes
- Manufacturer de alternativas
- Cantidad disponible
- URLs para consulta

## 🚀 Instalación

1. **Navega a la carpeta de herramientas:**
```bash
cd tools
```

2. **Instala las dependencias:**
```bash
npm install
```

Esto instalará Puppeteer (navegador automatizado).

## ⚙️ Configuración

**IMPORTANTE:** Antes de ejecutar, edita el archivo `skymart-scraper.js` y configura tus credenciales:

```javascript
const CONFIG = {
  // CAMBIA ESTAS CREDENCIALES
  USERNAME: 'tu_email@ejemplo.com',  // Tu email de SkyMart
  PASSWORD: 'tu_contraseña',         // Tu contraseña de SkyMart
  
  // Opciones de scraping
  HEADLESS: false,      // false = ver el navegador en acción
  DELAY: 2000,          // Tiempo entre requests (ms)
  MAX_PRODUCTS: 100,    // Máximo de productos por marca
};
```

## 🎬 Uso

### Scrapear todas las marcas:
```bash
npm run scrape
```

### Scrapear solo una marca:
```bash
npm run scrape:eastman
npm run scrape:aeroshell
npm run scrape:castrol
```

### Ejecución directa:
```bash
node skymart-scraper.js
```

## 📂 Resultados

Los datos se guardan en:

```
scraped-data/
├── skymart-products.json    # Todos los productos en JSON
└── datasheets/              # PDFs descargados
    ├── 2380-QT_SDS.pdf
    ├── 2197-55GL_SAFETY_DATA_SHEET.pdf
    └── ...
```

## 📊 Formato de Salida

El archivo JSON tiene esta estructura:

```json
{
  "eastman": [
    {
      "partNumber": "2197-55GL",
      "description": "TURBINE OIL (MIL-PRF-23699 HTS)",
      "nsn": "9150-01-439-2070",
      "manufacturer": "EASTMAN",
      "partType": "TURBINE ENGINE OIL",
      "units": "DRUM",
      "price": 5871.60,
      "limitedShelfLife": true,
      "shelfLifeDays": 1095,
      "hazardous": false,
      "inventory": [
        {
          "condition": "New",
          "warehouse": "MIAMI",
          "quantity": "1",
          "shelfLifeRemaining": "70%"
        }
      ],
      "datasheets": [
        {
          "name": "SAFETY DATA SHEET",
          "url": "https://...",
          "filename": "2197-55GL_SDS.pdf"
        }
      ],
      "alternates": [
        {
          "partNumber": "AEROSHELL500-QT",
          "manufacturer": "AEROSHELL",
          "qtyAvailable": 1475,
          "url": "https://portal.skymart.aero/shop/part/37935"
        }
      ]
    }
  ],
  "aeroshell": [...],
  "castrol": [...],
  "metadata": {
    "scrapedAt": "2026-03-08T17:58:00.000Z",
    "totalProducts": 250
  }
}
```

## 🔧 Personalización

### Cambiar la búsqueda:
```javascript
SEARCH_URLS: [
  'https://portal.skymart.aero/shop?query=eastman&type=lubricant',
  'https://portal.skymart.aero/shop?query=aeroshell&partType=grease',
  // Añade más URLs personalizadas
]
```

### Ajustar velocidad:
```javascript
DELAY: 3000,  // Más lento = más seguro
```

### Ver el navegador funcionando:
```javascript
HEADLESS: false,  // Útil para debug
```

## ⚠️ Recomendaciones

1. **Respeta los términos de servicio** de SkyMart
2. **No abuses del scraping** - usa delays razonables
3. **Ejecuta en horarios de bajo tráfico**
4. **Guarda copias de seguridad** de los datos
5. **Verifica la autenticación** antes de scrapear masivamente

## 🐛 Troubleshooting

### Error de login:
- Verifica que tus credenciales sean correctas
- Intenta con `HEADLESS: false` para ver qué pasa
- SkyMart puede tener CAPTCHA - resuélvelo manualmente

### No encuentra productos:
- Los selectores CSS pueden haber cambiado
- Revisa la estructura HTML de SkyMart
- Ajusta los selectores en el código

### PDFs no se descargan:
- Verifica permisos de escritura en `scraped-data/`
- Algunos PDFs pueden requerir autenticación adicional

## 📈 Próximos Pasos

Una vez tengas los datos:

1. **Importar al marketplace:**
```bash
node tools/import-scraped-data.js
```

2. **Subir datasheets a Supabase:**
```bash
node tools/upload-datasheets.js
```

3. **Generar imágenes de productos:**
```bash
node tools/generate-product-images.js
```

## 📝 Notas

- El scraping puede tardar **varios minutos** dependiendo de la cantidad de productos
- Los PDFs se descargan secuencialmente para evitar sobrecarga
- El script crea automáticamente las carpetas necesarias
- Incluye manejo de errores y reintentos

## 🆘 Soporte

Si encuentras problemas:
1. Revisa que Puppeteer se instaló correctamente
2. Verifica tu conexión a internet
3. Comprueba que puedes acceder a SkyMart manualmente
4. Revisa los logs en consola para más detalles

---

**¡Listo para scrapear! 🚀**
