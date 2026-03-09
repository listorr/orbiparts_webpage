# 🛒 Sistema de Carrito y Solicitud de Cotización - ORBIPARTS

## 📋 Descripción

Sistema completo de carrito de compras y solicitud de cotización para el marketplace de lubricantes de ORBIPARTS. Los clientes pueden:

- ✅ Agregar múltiples productos al carrito
- ✅ Modificar cantidades
- ✅ Enviar solicitud de cotización con sus datos de contacto
- ✅ Email automático enviado a `sales@orbiparts.com`

## 🏗️ Arquitectura

### Frontend Components

1. **CartContext** (`src/contexts/CartContext.jsx`)
   - Gestiona el estado global del carrito
   - Persistencia en localStorage
   - Funciones: addToCart, removeFromCart, updateQuantity, clearCart

2. **FloatingCart** (`src/components/FloatingCart.jsx`)
   - Botón flotante con contador de items
   - Panel lateral con resumen del carrito
   - Controles de cantidad (+/-)
   - Botón para solicitar cotización

3. **QuoteRequestModal** (`src/components/QuoteRequestModal.jsx`)
   - Formulario con datos del cliente y empresa
   - Validación de campos requeridos
   - Resumen de productos seleccionados
   - Envío de email automático

### Backend

4. **Supabase Edge Function** (`supabase/functions/send-email/index.ts`)
   - Función serverless para envío de emails
   - Integración con Resend API
   - Templates HTML profesionales

## 🚀 Setup e Instalación

### 1. Configurar Resend (Servicio de Email)

1. Crear cuenta en [Resend](https://resend.com/)
2. Obtener API Key
3. Verificar dominio `orbiparts.com` en Resend

### 2. Desplegar Supabase Edge Function

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login a Supabase
supabase login

# Vincular proyecto
supabase link --project-ref your-project-id

# Configurar secretos
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Desplegar función
supabase functions deploy send-email
```

### 3. Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Verificar Integración

El sistema ya está integrado en:
- ✅ `src/main.jsx` - CartProvider wrapper
- ✅ `src/pages/LubricantMarketplace.jsx` - Botones "Add to Quote"
- ✅ Componente FloatingCart agregado

## 📧 Email Template

El email enviado incluye:

- **Información del Cliente**
  - Nombre completo
  - Email
  - Teléfono
  - Empresa
  - Posición
  - País y ciudad

- **Lista de Productos**
  - Nombre del producto
  - Part Number/NSN
  - Cantidad solicitada
  - Unidad de medida
  - Precio unitario (si disponible)

- **Total Estimado** (si hay precios)

- **Comentarios Adicionales** (opcional)

## 🧪 Testing

### Test Local

1. Ir a `/lubricants`
2. Agregar productos al carrito (botón "Add to Quote")
3. Ver carrito flotante en esquina inferior derecha
4. Click en "Request Quote"
5. Llenar formulario
6. Verificar email en `sales@orbiparts.com`

### Test de Email (Mock)

Si no tienes Resend configurado, puedes usar un endpoint de prueba:

```javascript
// En QuoteRequestModal.jsx, reemplazar temporalmente:
const { data, error } = await supabase.functions.invoke('send-email', {
  // ...
});

// Por:
console.log('Email que se enviaría:', {
  to: 'sales@orbiparts.com',
  subject: `Quote Request from ${formData.company}`,
  formData,
  cartItems
});
```

## 🎨 Customización

### Cambiar Destinatario del Email

En `QuoteRequestModal.jsx`, línea ~183:

```javascript
const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    to: 'sales@orbiparts.com', // ← Cambiar aquí
    // ...
  }
});
```

### Modificar Template de Email

En `QuoteRequestModal.jsx`, variable `emailHtml` (líneas ~76-168)

### Ajustar Campos del Formulario

En `QuoteRequestModal.jsx`, sección de inputs (líneas ~234-340)

## 📱 Características

### Responsive Design
- ✅ Mobile-first approach
- ✅ Drawer lateral en móvil
- ✅ Panel fijo en desktop

### UX/UI
- ✅ Animaciones con Framer Motion
- ✅ Toasts de confirmación
- ✅ Loading states
- ✅ Validación de formularios
- ✅ Contador animado en badge
- ✅ Persistencia del carrito (localStorage)

### Funcionalidades
- ✅ Agregar/quitar productos
- ✅ Modificar cantidades
- ✅ Limpiar carrito
- ✅ Cálculo automático de totales
- ✅ Email con HTML profesional
- ✅ Reply-to configurado al email del cliente

## 🔐 Seguridad

- ✅ Validación de formularios en frontend
- ✅ API Keys protegidas en Supabase Secrets
- ✅ CORS headers configurados
- ✅ Rate limiting en Supabase (incluido)

## 📊 Métricas y Analytics

Para trackear conversiones, puedes agregar:

```javascript
// En QuoteRequestModal.jsx, después de envío exitoso:
if (typeof gtag !== 'undefined') {
  gtag('event', 'quote_request', {
    'event_category': 'engagement',
    'event_label': 'lubricants_marketplace',
    'value': total
  });
}
```

## 🐛 Troubleshooting

### Email no se envía

1. Verificar que RESEND_API_KEY esté configurado:
   ```bash
   supabase secrets list
   ```

2. Ver logs de la función:
   ```bash
   supabase functions logs send-email
   ```

3. Verificar dominio verificado en Resend

### Carrito se vacía al recargar

- El carrito usa localStorage, verificar que no esté deshabilitado
- Verificar console por errores de serialización JSON

### Botón flotante no aparece

- Asegurarse que `<FloatingCart />` esté en LubricantMarketplace.jsx
- Verificar que CartProvider esté en main.jsx
- Debe haber items en el carrito para que aparezca

## 🚀 Deploy a Producción

```bash
# Build del proyecto
npm run build

# Deploy Supabase Functions
supabase functions deploy send-email --project-ref your-project-id

# Configurar secretos de producción
supabase secrets set RESEND_API_KEY=re_production_key --project-ref your-project-id
```

## 📞 Soporte

Para preguntas sobre la implementación:
- **Email:** dev@orbiparts.com
- **Slack:** #dev-marketplace

---

**Version:** 1.0.0  
**Last Updated:** Marzo 2026  
**Maintainer:** ORBIPARTS Dev Team
