# 📋 Cómo obtener las URLs de productos Eastman manualmente

## Opción 1: Copiar desde el navegador (5 minutos)

1. Abre https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==
2. Asegúrate de que estén los 25 productos por página (ya configurado)
3. Para cada producto, haz click derecho en el **botón azul del part number** (ej: "2197-55GL")
4. Selecciona "Copiar dirección del enlace" o "Copy Link"
5. Pégalos aquí o en el archivo eastman-products.txt

## Opción 2: Desde la consola del navegador (2 minutos)

1. Abre https://portal.skymart.aero/shop/partSearch/ZWFzdG1hbg==
2. Presiona F12 para abrir DevTools
3. Ve a la pestaña "Console"
4. Pega este código y presiona Enter:

```javascript
// Extraer todas las URLs de productos Eastman
const urls = [];
document.querySelectorAll('a[href*="/shop/part/"]').forEach(a => {
  if (!urls.includes(a.href)) urls.push(a.href);
});
console.log('Total URLs:', urls.length);
urls.forEach((url, i) => console.log(`${i+1}. ${url}`));
copy(urls.join('\n'));
console.log('\n✅ URLs copiadas al portapapeles!');
```

5. Las URLs se copiarán automáticamente al portapapeles
6. Pégalas en el archivo `eastman-products.txt`

## Opción 3: Testing con las 5 URLs que ya tenemos

Si quieres probar el sistema primero con un grupo pequeño, podemos usar:
- https://portal.skymart.aero/shop/part/35914
- https://portal.skymart.aero/shop/part/79614
- https://portal.skymart.aero/shop/part/19310
- https://portal.skymart.aero/shop/part/26526
- https://portal.skymart.aero/shop/part/37935

Y luego añadir las demás cuando verifiquemos que funciona correctamente.

## Formato del archivo

El archivo `eastman-products.txt` debe tener este formato:

```
# URLs de productos Eastman
https://portal.skymart.aero/shop/part/35914
https://portal.skymart.aero/shop/part/79614
https://portal.skymart.aero/shop/part/19310
...
```

Una URL por línea, sin comas ni espacios extra.
