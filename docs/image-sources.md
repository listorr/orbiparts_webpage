# 📸 Guía de Fuentes de Imágenes Gratuitas para Aviación

## Sitios Recomendados (100% Gratuitos y Libres)

### 1. **Unsplash** ⭐ (Recomendado)
- URL: https://unsplash.com
- Licencia: Completamente libre, incluso para uso comercial
- Calidad: Excelente, alta resolución
- **Términos de búsqueda en inglés**:
  - `commercial aircraft`
  - `airplane maintenance`
  - `aviation hangar`
  - `jet engine turbine`
  - `airport cargo`
  - `aircraft cockpit`
  - `airport operations`
  - `aviation logistics`
  - `aircraft parts`
  - `Boeing 737`
  - `airplane mechanic`
  - `MRO facility`

### 2. **Pexels** ⭐ (Recomendado)
- URL: https://www.pexels.com
- Licencia: Libre para uso comercial sin atribución
- Calidad: Muy buena, alta resolución
- **Colecciones útiles**:
  - "Aviation" - https://www.pexels.com/search/aviation/
  - "Aircraft" - https://www.pexels.com/search/aircraft/
  - "Airplane" - https://www.pexels.com/search/airplane/
  - "Airport" - https://www.pexels.com/search/airport/

### 3. **Pixabay**
- URL: https://pixabay.com
- Licencia: Libre para uso comercial
- Calidad: Buena
- **Búsquedas recomendadas**:
  - `Flugzeug` (avión en alemán - muchas fotos europeas)
  - `aircraft maintenance`
  - `aviation`
  - `cargo plane`

### 4. **Wikimedia Commons**
- URL: https://commons.wikimedia.org
- Licencia: Varía (verificar cada imagen)
- Calidad: Variable pero muchas profesionales
- **Categorías útiles**:
  - "Commercial aircraft"
  - "Aircraft maintenance"
  - "Aviation museums"

### 5. **Flickr (Creative Commons)**
- URL: https://www.flickr.com/creativecommons/
- Licencia: Filtrar por "Commercial use allowed"
- Calidad: Excelente, muchos fotógrafos de aviación profesionales
- **Grupos recomendados**:
  - "Aviation Photography"
  - "Commercial Aviation"
  - "Aircraft Maintenance"

## 🎯 Términos de Búsqueda Específicos por Blog

### Top 10 Aircraft Parts Suppliers
```
- commercial aircraft warehouse
- aviation parts storage
- aircraft component inventory
- aerospace distribution center
```

### Legacy Aircraft
```
- vintage aircraft
- classic boeing 737
- retired airplane
- aircraft boneyard
- aviation museum aircraft
- legacy jet aircraft
```

### Miami Aviation Logistics
```
- miami international airport
- airport cargo operations
- aviation freight
- airport ramp operations
- cargo aircraft loading
```

### AOG Response
```
- aircraft emergency maintenance
- night aircraft repair
- airport ground crew
- urgent aircraft service
- aircraft mechanic working
```

### Sustainable Aviation
```
- aircraft recycling
- green aviation
- sustainable aircraft
- aircraft disassembly
- eco-friendly aviation
```

### Global Supply Chains
```
- global logistics network
- worldwide distribution
- international cargo
- supply chain aviation
- aviation freight worldwide
```

### Technology Trends
```
- aviation technology
- aircraft digital systems
- aviation AI
- aircraft automation
- predictive maintenance aviation
- digital cockpit
```

## 🛠️ Script Automático

He creado un script que descarga automáticamente imágenes:

```bash
# Instalar dependencia necesaria
npm install node-fetch

# Ejecutar el script
node tools/download-images.js
```

El script:
- ✅ Descarga automáticamente de Unsplash y Pexels
- ✅ Organiza las imágenes en carpetas por blog
- ✅ Usa búsquedas optimizadas para aviación
- ✅ Evita descargar duplicados
- ✅ Guarda en `media-staging/` listo para Supabase

## 📋 Proceso Manual Recomendado

Si prefieres seleccionar manualmente (recomendado para mejor calidad):

1. **Buscar en Unsplash primero**:
   ```
   https://unsplash.com/s/photos/commercial-aircraft
   ```

2. **Descargar imagen grande**:
   - Click derecho → "Save image as..."
   - O usar el botón "Download free"

3. **Nombrar correctamente**:
   ```
   future-of-legacy-aircraft/hero.jpg
   future-of-legacy-aircraft/hangar.jpg
   miami-aviation-logistics/hero.jpg
   ```

4. **Organizar en carpetas**:
   ```
   media-staging/
   ├── future-of-legacy-aircraft/
   │   ├── hero.jpg
   │   ├── hangar.jpg
   │   └── cockpit.jpg
   ├── miami-aviation-logistics/
   │   ├── hero.jpg
   │   └── ramp.jpg
   └── ...
   ```

## 🚀 Subir a Supabase

Una vez descargadas:

1. Ve a: https://supabase.com/dashboard/project/fjhynjjirvcyeahmlopq/storage/buckets

2. Abre el bucket `blog-media`

3. Arrastra las carpetas completas desde `media-staging/`

4. Verifica las URLs:
   ```
   https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/blog-media/future-of-legacy-aircraft/hero.jpg
   ```

5. Activa Supabase en `.env`:
   ```bash
   VITE_USE_SUPABASE_MEDIA=true
   ```

## ⚠️ Recomendaciones Importantes

1. **Calidad**: Usa imágenes mínimo 1920x1080px (Full HD)
2. **Relevancia**: La imagen debe estar relacionada con aviación comercial/partes
3. **Profesionalismo**: Evita imágenes amateur o de baja calidad
4. **Licencia**: Siempre verifica que permitan uso comercial
5. **Atribución**: Aunque no sea requerida, considera dar crédito al fotógrafo

## 🎨 APIs Alternativas (con clave)

Si quieres automatizar más profesionalmente:

### Unsplash API
```bash
# Registro gratuito: https://unsplash.com/developers
# 50 requests/hora gratis
```

### Pexels API
```bash
# Registro: https://www.pexels.com/api/
# 200 requests/hora gratis
```

### Pixabay API
```bash
# Registro: https://pixabay.com/api/docs/
# 5,000 requests/día gratis
```

## 📊 Estructura Final en Supabase

```
blog-media/
├── top-10-aircraft-parts-suppliers-2025/
│   └── seo-cover.jpg
├── future-of-legacy-aircraft/
│   ├── hero-boeing-737-classic.jpg
│   ├── hangar.jpg
│   ├── cockpit.jpg
│   ├── engineModule.jpg
│   ├── turbine.jpg
│   └── documentation.jpg
├── miami-aviation-logistics/
│   ├── hero-mia-cargo-apron.jpg
│   ├── ramp.jpg
│   ├── port.jpg
│   ├── customs.jpg
│   ├── warehouse.jpg
│   ├── it.jpg
│   ├── consolidation.jpg
│   └── energy.jpg
└── ... (otros blogs)
```
