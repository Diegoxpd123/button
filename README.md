# Button – YOURWEB CTA

Botón CTA con borde animado y brillo que sigue al mouse (color #A6D40D). Incluye versión para **embed** y para **Wix Custom Element**.

## Archivos

| Archivo | Uso |
|--------|-----|
| **yourweb-cta.js** | Custom Element (Web Component). Usar como **Server URL** en Wix. |
| **cta-embed-gaurav.html** | Código para pegar en un elemento Embed/HTML en Wix. |

---

## Uso en Wix como Custom Element

### 1. Activar GitHub Pages (para servir el .js por HTTPS)

1. En el repo: **Settings** → **Pages**.
2. En **Source** elige **Deploy from a branch**.
3. **Branch**: `main`, carpeta **/ (root)**. Guardar.
4. En 1–2 minutos la URL base será:  
   `https://diegoxpd123.github.io/button/`  
   El script quedará en:  
   **`https://diegoxpd123.github.io/button/yourweb-cta.js`**

### 2. Añadir el Custom Element en Wix Studio

1. En el editor: **Añadir** (+) → **Embed** → **Custom Element**.
2. Arrastra el Custom Element a la página y selecciónalo.
3. **Elegir fuente** (o **Choose Source**):
   - **Server URL**: pega  
     `https://diegoxpd123.github.io/button/yourweb-cta.js`
   - **Tag name**: escribe exactamente **`yourweb-cta`** (con guión).
4. Guarda.

### 3. Pasar datos (texto y enlace)

- En el panel del elemento: **Set Attribute** / **Atributos**:
  - **label** = texto del botón (ej. `YOURWEB`).
  - **href** = URL al hacer clic (ej. `https://tudominio.com`).
- O desde **Velo** (código de página):

```javascript
$w.onReady(function () {
  $w('#customElement1').setAttribute('label', 'YOURWEB');
  $w('#customElement1').setAttribute('href', 'https://tudominio.com');
});
```

Sustituye `#customElement1` por el ID que tenga tu Custom Element en Wix.

---

## Uso como embed (HTML)

Copia el contenido de **cta-embed-gaurav.html** y pégalo en un elemento **Embed** o **Código personalizado** en Wix. Cambia a mano la URL en `onclick` y el texto `YOURWEB` si quieres.
