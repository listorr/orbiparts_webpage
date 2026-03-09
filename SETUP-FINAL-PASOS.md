# 🚀 PASOS FINALES - Configuración del Sistema de Cotización

## ✅ LO QUE YA ESTÁ LISTO

El código ya está desplegado en producción con:
- ✅ Shopping cart funcional
- ✅ Botón flotante con contador
- ✅ Modal de solicitud de cotización
- ✅ Formulario completo con validación
- ✅ Templates de email HTML profesionales
- ✅ Integración con Supabase Edge Functions

## 🔧 CONFIGURACIÓN REQUERIDA (15 minutos)

### 1️⃣ Crear Cuenta en Resend (Servicio de Email)

**Tiempo: 5 minutos**

1. Ir a https://resend.com/
2. Crear cuenta gratuita (100 emails/día incluidos)
3. Verificar email

### 2️⃣ Verificar Dominio en Resend

**Tiempo: 3 minutos**

1. En Resend Dashboard → **Domains**
2. Click "Add Domain"
3. Agregar: `orbiparts.com`
4. Copiar registros DNS que te da Resend
5. Ir a tu proveedor DNS (Cloudflare, GoDaddy, etc.)
6. Agregar estos registros:

```
TXT    _resend    [valor que te da Resend]
CNAME  resend     [valor que te da Resend]
```

7. Esperar verificación (2-10 minutos)

### 3️⃣ Obtener API Key de Resend

**Tiempo: 1 minuto**

1. En Resend → **API Keys**
2. Click "Create API Key"
3. Nombre: `ORBIPARTS Production`
4. Copiar la key: `re_xxxxxxxxxxxxx`

### 4️⃣ Configurar Supabase Edge Function

**Tiempo: 5 minutos**

#### Opción A: Desde Supabase Dashboard (MÁS FÁCIL)

1. Ir a https://supabase.com/dashboard
2. Seleccionar tu proyecto ORBIPARTS
3. Ir a **Edge Functions**
4. Click "Deploy new function"
5. Nombre: `send-email`
6. Copiar el código de: `supabase/functions/send-email/index.ts`
7. Click "Deploy"
8. Ir a **Settings → Edge Functions → Secrets**
9. Agregar secret:
   - Nombre: `RESEND_API_KEY`
   - Valor: `re_xxxxxxxxxxxxx` (tu API key de Resend)
10. Click "Save"

#### Opción B: Desde CLI (Más técnico)

```bash
# 1. Instalar Supabase CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Vincular proyecto
supabase link --project-ref [tu-project-id]

# 4. Configurar API Key
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx

# 5. Deploy función
cd supabase/functions
supabase functions deploy send-email
```

### 5️⃣ Verificar Funcionamiento

**Tiempo: 2 minutos**

1. Ir a https://orbiparts.com/lubricants
2. Agregar productos al carrito (botón "Add to Quote")
3. Click en el carrito flotante (esquina inferior derecha)
4. Click "Request Quote"
5. Llenar formulario de prueba
6. Click "Send Quote Request"
7. Verificar que llegue email a `sales@orbiparts.com`

## 📧 EMAIL DE PRUEBA

Si quieres probar sin configurar todo, temporalmente puedes:

1. Abrir `src/components/QuoteRequestModal.jsx`
2. Buscar línea ~183 donde dice:
   ```javascript
   const { data, error } = await supabase.functions.invoke('send-email', {
   ```
3. Comentar ese bloque y agregar:
   ```javascript
   // MODO PRUEBA - Ver en consola
   console.log('📧 Email que se enviaría:', {
     to: 'sales@orbiparts.com',
     subject: `Quote Request from ${formData.company}`,
     cartItems,
     formData,
     emailHtml
   });
   
   // Simular éxito
   toast({
     title: "Quote Request Sent! ✅",
     description: "(MODO PRUEBA - Ver consola del navegador)",
   });
   ```

## 🎯 RESULTADO FINAL

Cuando un cliente:
1. Navega por `/lubricants`
2. Agrega productos con "Add to Quote"
3. Llena el formulario de cotización
4. Click "Send Quote Request"

**Recibirás un email profesional en `sales@orbiparts.com` con:**

- 📋 Datos del cliente (nombre, email, teléfono, empresa, posición, país, ciudad)
- 📦 Lista completa de productos solicitados con cantidades
- 💰 Total estimado (si hay precios)
- 💬 Comentarios adicionales del cliente
- 🎨 Diseño HTML profesional con colores ORBIPARTS
- ↩️ Reply-to configurado al email del cliente

## 🆘 TROUBLESHOOTING

### Email no llega

1. **Verificar logs de Supabase:**
   - Dashboard → Edge Functions → send-email → Logs
   - Buscar errores

2. **Verificar dominio verificado:**
   - Resend Dashboard → Domains
   - Debe estar en verde ✅

3. **Verificar API Key:**
   - Supabase → Settings → Edge Functions → Secrets
   - Debe existir `RESEND_API_KEY`

4. **Revisar spam:**
   - Primeros emails pueden ir a spam
   - Marcar como "No es spam"

### Error 401 en Resend

- API Key incorrecta o no configurada
- Regenerar en Resend y actualizar en Supabase

### Error 403 en Supabase

- Función no desplegada correctamente
- Re-deploy desde dashboard

## 💡 TIPS

### Cambiar Email Destino

En `QuoteRequestModal.jsx` línea 183:
```javascript
to: 'sales@orbiparts.com', // ← Cambiar aquí
```

### Agregar CC/BCC

En `supabase/functions/send-email/index.ts`:
```typescript
cc: ['manager@orbiparts.com'],
bcc: ['archive@orbiparts.com'],
```

### Personalizar Template

Editar variable `emailHtml` en `QuoteRequestModal.jsx` (líneas 76-168)

## 📊 COSTOS

- **Resend Free Tier:** 100 emails/día, 3,000 emails/mes - GRATIS
- **Resend Pro:** $20/mes = 50,000 emails
- **Supabase Edge Functions:** Incluidas en plan gratuito

## ✅ CHECKLIST FINAL

- [ ] Cuenta Resend creada
- [ ] Dominio orbiparts.com verificado en Resend
- [ ] API Key generada
- [ ] Edge Function desplegada en Supabase
- [ ] Secret RESEND_API_KEY configurado
- [ ] Email de prueba enviado exitosamente
- [ ] sales@orbiparts.com recibe emails correctamente

---

**¿Necesitas ayuda?** 
- Ver logs en Supabase Dashboard
- Documentación completa: `CART-QUOTE-SYSTEM-README.md`
- Contacto técnico: dev@orbiparts.com
