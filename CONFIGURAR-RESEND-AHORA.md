# ⚡ CONFIGURAR RESEND - 5 MINUTOS

Ya tienes cuenta de Resend y dominio verificado. Solo faltan estos pasos:

## 1️⃣ OBTENER API KEY DE RESEND

1. Ve a: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Nombre: `ORBIPARTS Production`
4. Permission: **Full Access** (o "Sending access" mínimo)
5. Click **Create**
6. **COPIAR la API Key** (empieza con `re_`)
   - ⚠️ Solo se muestra UNA VEZ
   - Ejemplo: `re_123abc456def789ghi`

---

## 2️⃣ CONFIGURAR EN SUPABASE

### Opción A: Desde Dashboard (MÁS FÁCIL) ✅

1. Ve a: https://supabase.com/dashboard/project/[tu-proyecto]/functions

2. Click en **"Edge Functions"** en el menú lateral

3. Click **"Deploy new function"**
   - Nombre: `send-email`
   - Región: Closest to users (ej: us-east-1)

4. Pegar este código:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  subject: string
  html: string
  replyTo?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, replyTo }: EmailRequest = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ORBIPARTS Sales <noreply@orbiparts.com>',
        to: [to],
        subject: subject,
        html: html,
        reply_to: replyTo || 'sales@orbiparts.com',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

5. Click **"Deploy function"**

6. Ir a: **Settings → Secrets** (o "Edge Function secrets")

7. Click **"Add new secret"**
   - Name: `RESEND_API_KEY`
   - Value: `re_tu_api_key_aqui` (pegar la que copiaste)
   
8. Click **"Save"**

---

### Opción B: Desde CLI (Más Técnico)

```bash
# 1. Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# 2. Login a Supabase
supabase login

# 3. Link tu proyecto
supabase link --project-ref your-project-ref

# 4. Configurar la API Key
supabase secrets set RESEND_API_KEY=re_tu_api_key_aqui

# 5. Deploy la función
cd supabase/functions
supabase functions deploy send-email
```

---

## 3️⃣ PROBAR QUE FUNCIONA

1. Ve a: https://orbiparts.com/lubricants

2. Agrega productos al carrito:
   - Click "Add to Quote" en 2-3 productos diferentes

3. Click en el carrito flotante (esquina inferior derecha)

4. Click **"Request Quote"**

5. Llenar formulario:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Empresa: Test Company
   - Todo lo demás opcional

6. Click **"Send Quote Request"**

7. Verificar:
   - ✅ Debe aparecer toast verde "Quote Request Sent!"
   - ✅ Revisar `sales@orbiparts.com` para el email

---

## 🐛 SI HAY PROBLEMAS

### Error: "Failed to send email"

1. **Ver logs de Supabase:**
   - Dashboard → Edge Functions → send-email → Logs
   - Buscar el error exacto

2. **Verificar API Key:**
   - Settings → Secrets
   - Debe existir `RESEND_API_KEY`
   - Valor correcto (empieza con `re_`)

3. **Verificar dominio en Resend:**
   - https://resend.com/domains
   - `orbiparts.com` debe estar verificado ✅

### Email no llega a sales@orbiparts.com

- Revisar carpeta de SPAM
- Verificar que `sales@orbiparts.com` existe
- Ver Activity Log en Resend: https://resend.com/emails

### Error 401 Unauthorized

- API Key incorrecta o expirada
- Regenerar en Resend
- Actualizar en Supabase Secrets

---

## 📧 CAMBIAR EMAIL DESTINO (Opcional)

Si quieres cambiar el destinatario, edita `src/components/QuoteRequestModal.jsx`:

```javascript
// Línea ~183
const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    to: 'ventas@orbiparts.com', // ← Cambiar aquí
    // ...
  }
});
```

---

## ✅ CHECKLIST FINAL

- [ ] API Key de Resend obtenida
- [ ] Edge Function `send-email` desplegada en Supabase
- [ ] Secret `RESEND_API_KEY` configurado
- [ ] Prueba enviada desde /lubricants
- [ ] Email recibido en sales@orbiparts.com

---

**¿Todo listo?** El sistema está 100% operativo! 🚀

**Siguiente paso:** Hacer una compra de prueba real y verificar el email.
