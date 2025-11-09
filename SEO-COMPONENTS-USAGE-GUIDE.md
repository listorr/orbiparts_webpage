# 🚀 Guía de Uso - Componentes SEO Multiidioma

## 📦 Componentes Creados

### 1. SEOHead Component
**Ubicación:** `src/components/SEOHead.jsx`

**Propósito:** Maneja meta tags dinámicos, hreflang tags, Open Graph y Twitter cards por idioma.

**Uso básico:**
```jsx
import SEOHead from '@/components/SEOHead';

// En cualquier página
function HomePage() {
  return (
    <>
      <SEOHead pageKey="home" />
      {/* Contenido de la página */}
    </>
  );
}
```

**Props disponibles:**
- `pageKey` - Clave de la página: 'home', 'about', 'services', 'products', 'industries', 'contact', 'stock'
- `customTitle` - Título personalizado (opcional)
- `customDescription` - Descripción personalizada (opcional)

**Ejemplo con customización:**
```jsx
<SEOHead 
  pageKey="blog"
  customTitle="Mi Post de Blog | ORBIPARTS"
  customDescription="Descripción personalizada del post..."
/>
```

### 2. SchemaOrg Component
**Ubicación:** `src/components/SchemaOrg.jsx`

**Propósito:** Añade structured data (JSON-LD) para mejor comprensión de Google.

**Uso:**
```jsx
import SchemaOrg from '@/components/SchemaOrg';

// Añadir UNA VEZ en App.jsx o en el layout principal
function App() {
  return (
    <>
      <SchemaOrg />
      {/* Resto de la aplicación */}
    </>
  );
}
```

**Schemas incluidos:**
- Organization (datos de la empresa)
- WebSite (información del sitio web)
- LocalBusiness (oficina de Miami)
- Service (servicios de aircraft parts trading)
- BreadcrumbList (navegación)

---

## 🎯 Implementación por Página

### Home Page (src/pages/Home.jsx)
```jsx
import SEOHead from '@/components/SEOHead';
import SchemaOrg from '@/components/SchemaOrg';

const Home = () => {
  return (
    <>
      <SEOHead pageKey="home" />
      <SchemaOrg />
      
      {/* Contenido existente */}
      <WelcomeMessage />
      <HeroImage />
      {/* ... */}
    </>
  );
};
```

### About Page (src/pages/About.jsx)
```jsx
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <>
      <SEOHead pageKey="about" />
      
      {/* Contenido existente */}
    </>
  );
};
```

### Services Page (src/pages/Services.jsx)
```jsx
import SEOHead from '@/components/SEOHead';

const Services = () => {
  return (
    <>
      <SEOHead pageKey="services" />
      
      {/* Contenido existente */}
    </>
  );
};
```

### Stock/Product Search (src/pages/ProductSearch.jsx)
```jsx
import SEOHead from '@/components/SEOHead';

const ProductSearch = () => {
  return (
    <>
      <SEOHead pageKey="stock" />
      
      {/* Contenido existente */}
    </>
  );
};
```

### Industries Page (src/pages/Industries.jsx)
```jsx
import SEOHead from '@/components/SEOHead';

const Industries = () => {
  return (
    <>
      <SEOHead pageKey="industries" />
      
      {/* Contenido existente */}
    </>
  );
};
```

### Contact Page (src/pages/Contact.jsx)
```jsx
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  return (
    <>
      <SEOHead pageKey="contact" />
      
      {/* Contenido existente */}
    </>
  );
};
```

---

## 📋 Checklist de Implementación

### ✅ Tareas Completadas

- [x] Instalado `react-helmet-async`
- [x] Creado `src/components/SEOHead.jsx`
- [x] Creado `src/components/SchemaOrg.jsx`
- [x] Envuelto App con `<HelmetProvider>` en `src/main.jsx`
- [x] Añadido hreflang tags en `index.html`
- [x] Creado `public/sitemap-de.xml`
- [x] Creado `public/sitemap-fr.xml`
- [x] Creado `public/sitemap-index.xml`

### 🔲 Tareas Pendientes (Manual)

- [ ] **Añadir SEOHead en cada página:**
  - [ ] Home.jsx
  - [ ] About.jsx
  - [ ] Services.jsx
  - [ ] ProductSearch.jsx (Stock)
  - [ ] Industries.jsx
  - [ ] Contact.jsx
  - [ ] ModernFleets.jsx
  - [ ] LegacyAircraft.jsx
  - [ ] AogSupport.jsx
  - [ ] GlobalReach.jsx
  - [ ] WhyOrbiparts.jsx
  - [ ] Blog.jsx

- [ ] **Añadir SchemaOrg UNA VEZ en:**
  - [ ] App.jsx o
  - [ ] Layout principal

- [ ] **Configurar Google Search Console:**
  - [ ] Añadir propiedad para cada idioma
  - [ ] Subir sitemap-index.xml
  - [ ] Verificar indexación

- [ ] **Actualizar robots.txt:**
  ```txt
  User-agent: *
  Allow: /
  
  Sitemap: https://orbiparts.com/sitemap-index.xml
  ```

---

## 🔍 Verificación y Testing

### 1. Verificar Meta Tags
```bash
# Inspeccionar en el navegador
1. Abrir DevTools (F12)
2. Ir a Elements > <head>
3. Buscar tags <meta>, <title>, <link rel="alternate">
4. Verificar que cambian al cambiar idioma
```

### 2. Verificar Hreflang Tags
```bash
# Usar herramienta online
https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/

# O verificar manualmente en <head>
<link rel="alternate" hreflang="de" href="...?lang=de"/>
```

### 3. Verificar Schema.org
```bash
# Google Rich Results Test
https://search.google.com/test/rich-results

# Schema Markup Validator
https://validator.schema.org/
```

### 4. Verificar Sitemaps
```bash
# Abrir directamente:
https://orbiparts.com/sitemap-index.xml
https://orbiparts.com/sitemap-de.xml
https://orbiparts.com/sitemap-fr.xml

# Validar XML:
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

---

## 📊 Monitoreo de Resultados

### Google Search Console (1-2 semanas después)

1. **Performance Report:**
   - Filtrar por país (Germany, France, Austria, Switzerland, Belgium)
   - Ver impresiones y clicks por idioma
   - Identificar queries en alemán/francés

2. **Coverage Report:**
   - Verificar que todas las URLs se indexen correctamente
   - Revisar errores de hreflang

3. **International Targeting:**
   - Verificar detección de idiomas
   - Ver distribución geográfica

### Google Analytics (Inmediato)

```javascript
// Ya implementado en i18n
// Monitorear eventos de cambio de idioma

// Segmentos recomendados:
- Usuarios DE: Idioma = de + Países DE/AT/CH
- Usuarios FR: Idioma = fr + Países FR/BE/CH
- Conversión por idioma
- Bounce rate por idioma
```

---

## 🎯 Keywords a Monitorear

### Alemán (DE)
```
"flugzeugteile kaufen" (480/mes)
"airbus ersatzteile" (320/mes)
"boeing teile" (290/mes)
"aog support deutschland" (170/mes)
"cfm56 triebwerk teile" (110/mes)
```

### Francés (FR)
```
"pièces d'avion acheter" (390/mes)
"pièces airbus" (260/mes)
"pièces boeing" (240/mes)
"support aog france" (150/mes)
"moteurs cfm56" (95/mes)
```

---

## 🔧 Troubleshooting

### Meta tags no cambian al cambiar idioma
**Solución:** Verificar que SEOHead está dentro del componente de página, no fuera.

### Hreflang tags duplicados
**Solución:** Los tags en index.html son estáticos. Los de SEOHead son dinámicos. Ambos son correctos.

### Sitemaps no se encuentran
**Solución:** Verificar que están en carpeta `public/`. Deben ser accesibles en `/sitemap-de.xml`

### Schema.org no valida
**Solución:** Usar https://validator.schema.org/ para ver errores específicos.

### Google no indexa versiones de idioma
**Solución:** 
1. Verificar hreflang tags
2. Subir sitemaps a Search Console
3. Esperar 1-2 semanas para indexación

---

## 📈 Resultados Esperados

### Corto Plazo (1-3 meses)
- ✅ Indexación de todas las páginas en DE/FR
- ✅ Primeras impresiones en Google.de y Google.fr
- ✅ 50-100 visitas orgánicas/mes desde mercados DE/FR

### Medio Plazo (3-6 meses)
- ✅ 200-400 visitas orgánicas/mes
- ✅ 5-10 keywords en top 10 por idioma
- ✅ 3-8 leads/mes desde mercados DE/FR

### Largo Plazo (6-12 meses)
- ✅ 500-1,000 visitas orgánicas/mes
- ✅ 15-25 keywords en top 10 por idioma
- ✅ 10-20 leads/mes desde mercados DE/FR
- ✅ ROI positivo de inversión multiidioma

---

## 🆘 Soporte Adicional

Si necesitas ayuda adicional:

1. **Documentación oficial:**
   - react-helmet-async: https://github.com/staylor/react-helmet-async
   - Schema.org: https://schema.org/docs/gs.html
   - Hreflang: https://developers.google.com/search/docs/advanced/crawling/localized-versions

2. **Herramientas útiles:**
   - Hreflang Generator: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
   - Schema Generator: https://technicalseo.com/tools/schema-markup-generator/
   - Sitemap Generator: https://www.xml-sitemaps.com/

---

**Última actualización:** 8 de noviembre de 2025  
**Versión:** 1.0
