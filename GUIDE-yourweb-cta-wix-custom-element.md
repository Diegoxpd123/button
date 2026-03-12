# Guía base – YOURWEB CTA como Custom Element en Wix

Esta guía resume el flujo completo para crear y reutilizar un botón como **Custom Element** en Wix, usando un repositorio de GitHub y un único archivo `.js`.

---

## 1. Idea general

- **Objetivo**: tener un botón CTA con animaciones avanzadas (borde que gira, glow que sigue al mouse) reutilizable en cualquier sitio Wix como Custom Element.
- **Estrategia**:
  - Todo el código (HTML, CSS y JS) se empaqueta en **un solo archivo JS** (`yourweb-cta.js`).
  - Ese JS define un **Web Component** con `customElements.define('yourweb-cta', YourWebCta)`.
  - Wix carga ese JS desde una URL externa (GitHub/jsDelivr) y lo muestra como Custom Element.

---

## 2. Estructura del repositorio

Repositorio: `Diegoxpd123/button`

Archivos clave:

- `yourweb-cta.js` → Custom Element completo (lo que Wix carga).
- `cta-embed-gaurav.html` → Versión original para usar en un `<iframe>` / embed HTML.
- `README.md` → Instrucciones básicas de uso.
- `GUIDE-yourweb-cta-wix-custom-element.md` → Esta guía.

---

## 3. Cómo se construyó `yourweb-cta.js`

### 3.1. Partir de un HTML de prueba

Archivo base: `cta-embed-gaurav.html` (botón con:

- `button.btn`
- `.btn::after` borde con `conic-gradient` y `@keyframes spin`
- `.inner` para glow que sigue el mouse
- JS que escucha `mousemove` y actualiza `--mouse-x` / `--mouse-y`

### 3.2. Convertirlo a Custom Element (Web Component)

Pasos conceptuales:

1. Crear una constante `STYLES` con todas las reglas CSS concatenadas en un string.
2. Crear una clase `YourWebCta extends HTMLElement`.
3. En el `constructor`:
   - `this.attachShadow({ mode: 'open' });`
   - Inyectar `<style>` con `STYLES` dentro del `shadowRoot`.
   - Crear `<button class="btn">` con el mismo HTML que en el embed (`<div class="inner"></div><span></span>`).
4. Implementar `static get observedAttributes()` para poder reaccionar a:
   - `label` → texto del botón.
   - `href` → URL al hacer clic.
5. Implementar:
   - `connectedCallback()` → llama a `_updateContent()` y `_bindEvents()`.
   - `attributeChangedCallback()` → cuando cambian `label` o `href`, vuelve a llamar `_updateContent()`.
6. `_updateContent()`:
   - Lee `this.getAttribute('label') || 'YOURWEB'`.
   - Lee `this.getAttribute('href') || '#'`.
   - Actualiza el texto del `<span>` y el `onclick` del botón (con `window.top.location.href` si es posible).
7. `_bindEvents()`:
   - Añade el listener `mousemove` al botón para recalcular `--mouse-x` y `--mouse-y`.

### 3.3. Estilo del host

Se controla con la regla de CSS:

```css
:host {
  display: inline-block;
  --primary: 74 88% 44%;
  --glow: 74 88% 44%;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  box-sizing: border-box;
}
```

Esto hace que el Custom Element:

- Sea **transparente**.
- No tenga márgenes ni padding extra: ocupa solo el tamaño del botón.

---

## 4. Publicación del JS

### 4.1. Subir a GitHub

1. Crear carpeta local `button`.
2. Copiar dentro:
   - `yourweb-cta.js`
   - `cta-embed-gaurav.html`
   - `README.md` y esta guía.
3. Inicializar git:

```bash
git init
git add .
git commit -m "Add YOURWEB CTA custom element"
git branch -M main
git remote add origin https://github.com/Diegoxpd123/button.git
git push -u origin main
```

### 4.2. Servir el archivo con jsDelivr

Para evitar problemas de caché de GitHub Pages y seguir el estilo del ejemplo Unicorn:

- URL recomendada para Wix:

```text
https://cdn.jsdelivr.net/gh/Diegoxpd123/button@main/yourweb-cta.js
```

Si se hace un cambio en `yourweb-cta.js`, basta con:

```bash
git add yourweb-cta.js
git commit -m "Cambios en el botón"
git push
```

y jsDelivr servirá la nueva versión (puede requerir refrescar con Ctrl+F5).

---

## 5. Configurar el Custom Element en Wix

### 5.1. Añadir el elemento

1. En Wix Studio / Editor:
   - **Add** → **Embed** → **Custom Element**.
   - Arrastrar el Custom Element a la página.
2. Seleccionar el elemento → **Choose Source**:
   - **Server URL**: `https://cdn.jsdelivr.net/gh/Diegoxpd123/button@main/yourweb-cta.js`
   - **Tag name**: `yourweb-cta`

### 5.2. Pasar parámetros (label y href)

Dos opciones:

**A. Desde el editor (sin código)**

1. Seleccionar el Custom Element.
2. Clic en **Set Attributes**.
3. Añadir:
   - `label` → `YOURWEB` (o lo que se quiera).
   - `href` → `https://tudominio.com/ruta`.

**B. Desde Velo (código de página)**

```javascript
$w.onReady(function () {
  $w('#customElement1').setAttribute('label', 'YOURWEB');
  $w('#customElement1').setAttribute('href', 'https://tudominio.com');
});
```

> Cambiar `#customElement1` por el ID real del Custom Element.

---

## 6. Buenas prácticas para futuros botones

Cuando se quiera crear otro botón/CTA como Custom Element:

1. Diseñar primero el botón en HTML/CSS/JS “normal” (como `cta-embed-gaurav.html`).
2. Copiar la misma estructura de este archivo:
   - Constante `STYLES`.
   - Clase `MiNuevoBoton extends HTMLElement`.
   - Métodos `connectedCallback`, `attributeChangedCallback`, `_updateContent`, `_bindEvents`.
3. Definir un **nuevo tag** único:

```javascript
customElements.define('mi-nuevo-boton', MiNuevoBoton);
```

4. Publicar el `.js` en el mismo repo o en otro, con jsDelivr:

```text
https://cdn.jsdelivr.net/gh/USUARIO/REPO@main/mi-nuevo-boton.js
```

5. En Wix:
   - Server URL = URL del nuevo `.js`.
   - Tag name = el nuevo nombre (`mi-nuevo-boton`).
   - Atributos según lo definido (`label`, `href`, colores, etc.).

Con esta guía se puede repetir el patrón para cualquier otro componente animado reutilizable en Wix.

