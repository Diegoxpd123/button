/**
 * YOURWEB CTA – Custom Element (un solo .js para Wix Custom Element / GitHub)
 * Uso en Wix: Añadir Custom Element → Server URL = URL de este .js → Tag name: yourweb-cta
 * Atributos: label (texto del botón), href (enlace al hacer clic)
 *
 * Implementado como clase ES6, igual que el ejemplo de Unicorn.
 */
(function () {
  var STYLES = [
    // Host transparente, sin márgenes ni fondo extra: solo el botón cuenta
    ":host{display:inline-block;--primary:74 88% 44%;--glow:74 88% 44%;background:transparent;padding:0;margin:0;border-radius:0;box-sizing:border-box;}",
    ".btn{all:unset;position:relative;display:inline-block;padding:14px 52px;background:transparent;color:hsl(var(--primary));text-transform:uppercase;font-size:24px;letter-spacing:.18em;border-radius:100px;cursor:pointer;overflow:hidden;font-family:system-ui,-apple-system,sans-serif}",
    ".btn::after{content:'';position:absolute;inset:0;border-radius:inherit;padding:3px;background:conic-gradient(from 0deg,hsl(var(--glow)),hsl(74 88% 55%),transparent 120deg,transparent 240deg,hsl(var(--glow)));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;animation:spin 2.5s linear infinite;pointer-events:none;z-index:0}",
    ".btn::before{content:'';position:absolute;inset:3px;border-radius:inherit;background:radial-gradient(circle at top left,hsl(74 88% 44%/.12),transparent 50%),radial-gradient(circle at bottom right,hsl(74 88% 55%/.1),transparent 50%),hsl(240 8% 4%);z-index:1;pointer-events:none}",
    ".btn .inner{position:absolute;inset:3px;border-radius:inherit;background:radial-gradient(120px circle at var(--mouse-x,50%) var(--mouse-y,50%),hsl(var(--primary)/.35),transparent 55%);opacity:0;z-index:2;transition:opacity .25s;pointer-events:none}",
    ".btn span{position:relative;z-index:3}",
    ".btn:hover .inner{opacity:1}",
    "@keyframes spin{to{transform:rotate(360deg)}}"
  ].join("");

  class YourWebCta extends HTMLElement {
    static get observedAttributes() {
      return ["label", "href"];
    }

    constructor() {
      super();
      this._btn = null;
      this._inner = null;
      this.attachShadow({ mode: "open" });

      var style = document.createElement("style");
      style.textContent = STYLES;
      this.shadowRoot.appendChild(style);

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.innerHTML = '<div class="inner" aria-hidden="true"></div><span></span>';
      this.shadowRoot.appendChild(btn);

      this._btn = btn;
      this._inner = btn.querySelector(".inner");
    }

    connectedCallback() {
      this._updateContent();
      this._bindEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue && (name === "label" || name === "href")) {
        this._updateContent();
      }
    }

    _updateContent() {
      var label = this.getAttribute("label") || "YOURWEB";
      var href = this.getAttribute("href") || "#";

      if (this._btn) {
        var span = this._btn.querySelector("span");
        if (span) span.textContent = label;

        this._btn.onclick = function () {
          if (href && href !== "#") {
            try {
              if (window.top && window.top.location) {
                window.top.location.href = href;
              } else {
                window.location.href = href;
              }
            } catch (e) {
              window.location.href = href;
            }
          }
        };
      }
    }

    _bindEvents() {
      var btn = this._btn;
      var inner = this._inner;
      if (!btn || !inner) return;

      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        inner.style.setProperty("--mouse-x", x + "%");
        inner.style.setProperty("--mouse-y", y + "%");
      });
    }
  }

  customElements.define("yourweb-cta", YourWebCta);
})();
