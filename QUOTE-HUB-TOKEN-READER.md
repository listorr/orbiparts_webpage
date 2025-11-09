# Quote Hub - Automatic Token Reading Implementation

## ⚠️ PROBLEMA ACTUAL

**Síntoma**: Después de hacer login en orbiparts.com, te redirige a quote.orbiparts.com pero **tienes que volver a hacer login**.

**Causa**: Quote Hub NO está leyendo los tokens que orbiparts.com pasa en el URL hash.

## 📋 Objetivo
Configurar el Quote Hub para leer automáticamente los tokens de autenticación que se pasan desde orbiparts.com/login en el URL hash.

## 🔧 Implementación

### Repositorio
```bash
git clone https://github.com/listorr/aero-quote-hub.git
cd aero-quote-hub
```

### Archivo a Modificar
**Ruta**: `src/hooks/useAuth/AuthProvider.tsx`

### Código a Agregar

Reemplaza el `useEffect` principal (líneas aproximadas 19-54) con esta versión mejorada:

```tsx
useEffect(() => {
  // Check for authentication tokens in URL hash from orbiparts.com login
  const handleAuthFromURL = async () => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      console.log('📍 Detected auth tokens in URL hash from orbiparts.com');
      try {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken && refreshToken) {
          console.log('🔑 Setting session from URL tokens...');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (!error && data.session) {
            console.log('✅ Session established from orbiparts.com login:', data.session.user?.email);
            setSession(data.session);
            setUser(data.session.user);
            setLoading(false);
            
            // Clean URL hash
            window.history.replaceState(null, '', window.location.pathname);
            return true;
          } else {
            console.error('❌ Error setting session from URL tokens:', error);
          }
        }
      } catch (error) {
        console.error('❌ Error processing URL tokens:', error);
      }
    }
    return false;
  };

  // Try to establish session from URL first
  handleAuthFromURL().then((tokenProcessed) => {
    if (tokenProcessed) {
      console.log('✅ Token from URL processed, skipping normal session check');
      return;
    }

    // Normal Supabase auth flow
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, authSession) => {
      console.log("Auth state changed:", event, authSession?.user?.email);
      setSession(authSession);
      setUser(authSession?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN") {
        // Only redirect automatically if we are on an auth-related route.
        const path = location.pathname;
        const isAuthRoute = path === "/auth" || path.startsWith("/auth/");
        if (isAuthRoute) {
          console.log("User signed in from auth route, redirecting to home");
          navigate("/", { replace: true });
        } else {
          console.log("User signed in, staying on current route:", path);
        }
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out, redirecting to auth");
        navigate("/auth", { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      console.log("Initial session check:", data.session?.user?.email);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  });
}, [navigate, location]);
```

## 🎯 Qué hace este código

### 1. Detecta tokens en el URL hash
- Cuando un usuario viene desde orbiparts.com/login, el URL será:
  ```
  https://quote.orbiparts.com#access_token=xxx&refresh_token=yyy
  ```

### 2. Establece la sesión automáticamente
- Lee los tokens del hash
- Llama a `supabase.auth.setSession()` para autenticar
- Actualiza el estado de usuario (`setUser`, `setSession`)

### 3. Limpia el URL
- Usa `window.history.replaceState()` para remover los tokens del URL
- El usuario ve solo `https://quote.orbiparts.com` (más limpio y seguro)

### 4. Logs detallados
- Emojis y mensajes claros para debugging:
  - 📍 Tokens detectados
  - 🔑 Estableciendo sesión
  - ✅ Sesión exitosa
  - ❌ Error (si ocurre)

## 🚀 Cómo Probar

### Paso 1: Implementar el código
```bash
cd /ruta/a/aero-quote-hub
# Edita src/hooks/useAuth/AuthProvider.tsx con el código de arriba
```

### Paso 2: Commit y desplegar
```bash
git add src/hooks/useAuth/AuthProvider.tsx
git commit -m "feat: add automatic token reading from orbiparts.com login"
git push origin main
```

### Paso 3: Esperar despliegue en Vercel
- Vercel detectará el push automáticamente
- Desplegará en quote.orbiparts.com
- Espera ~1-2 minutos

### Paso 4: Probar flujo completo
1. Abre https://orbiparts.com (no logueado)
2. Click en botón "Login" (azul con candado)
3. Ingresa credenciales: luis@orbiparts.com / (tu password)
4. Verifica que te redirija a https://quote.orbiparts.com
5. **IMPORTANTE**: Abre la consola del navegador (F12)
6. Busca estos mensajes:
   ```
   📍 Detected auth tokens in URL hash from orbiparts.com
   🔑 Setting session from URL tokens...
   ✅ Session established from orbiparts.com login: luis@orbiparts.com
   ```

### Paso 5: Verificar sesión persistente
- Navega por Quote Hub (debe estar logueado)
- Refresca la página (F5)
- Debería mantenerse logueado
- Cierra y vuelve a abrir el navegador
- Sesión debe persistir

## ✅ Resultado Esperado

**ANTES** (sin este código):
```
1. Login en orbiparts.com ✅
2. Redirect a quote.orbiparts.com ✅
3. Usuario NO logueado ❌ (tenía que volver a hacer login)
```

**DESPUÉS** (con este código):
```
1. Login en orbiparts.com ✅
2. Redirect a quote.orbiparts.com ✅
3. Usuario YA logueado automáticamente ✅
4. Puede usar Quote Hub inmediatamente ✅
```

## 🔐 Seguridad

### ✅ Buenas prácticas implementadas:
1. **Tokens en hash (no query string)**: El hash (#) no se envía al servidor
2. **Limpieza inmediata del URL**: Los tokens se borran del historial
3. **Supabase maneja el refresh**: Los tokens se renuevan automáticamente
4. **Sesión en localStorage**: Persiste entre recargas

### ⚠️ Notas importantes:
- Los tokens tienen vida útil limitada (1 hora típicamente)
- Supabase auto-renueva con el refresh_token
- Si expiran, el usuario tiene que volver a loguearse en orbiparts.com

## 📝 Archivos Modificados

```
aero-quote-hub/
└── src/
    └── hooks/
        └── useAuth/
            └── AuthProvider.tsx  ← MODIFICAR ESTE ARCHIVO
```

## 🎉 Una Vez Implementado

Tu flujo SSO estará completo:

```
orbiparts.com (Marketing)
        ↓ (Click "Login")
        ↓
orbiparts.com/login (Auth Page)
        ↓ (Login con Supabase)
        ↓ (Tokens: access + refresh)
        ↓
quote.orbiparts.com#access_token=xxx&refresh_token=yyy
        ↓ (AuthProvider lee tokens)
        ↓ (Establece sesión automáticamente)
        ↓
quote.orbiparts.com (Usuario logueado ✅)
```

## 🛟 Troubleshooting

### Si no funciona:

1. **Verifica consola del navegador**:
   - Debe ver mensajes con emojis (📍 🔑 ✅)
   - Si ves ❌, revisa el error específico

2. **Verifica que los tokens lleguen**:
   - En orbiparts.com/login, verifica que EmployeeLogin.jsx esté pasando tokens
   - El código actual debería estar así (línea ~110):
     ```javascript
     window.location.href = `https://quote.orbiparts.com#access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
     ```

3. **Verifica mismo proyecto Supabase**:
   - Ambos sitios deben usar: `pibbqroawdvfsouronmn.supabase.co`
   - Verifica en:
     - orbiparts: `src/lib/customSupabaseClient.js`
     - quote-hub: `src/integrations/supabase/client.ts`

4. **Verifica despliegue en Vercel**:
   - Ve a https://vercel.com/dashboard
   - Busca proyecto aero-quote-hub
   - Verifica que el último commit esté desplegado
   - Revisa logs si hay errores

5. **Clear cache y prueba**:
   ```
   Chrome: Ctrl+Shift+Delete → Clear browsing data → Cached images and files
   Firefox: Ctrl+Shift+Delete → Cache
   Safari: Develop → Empty Caches
   ```

## 📞 Soporte

Si tienes problemas:
1. Comparte screenshot de la consola del navegador
2. Indica en qué paso del flujo falla
3. Verifica logs en Vercel Dashboard

---

**Listo para implementar!** 🚀
