class CustomInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._errorMsg = '';
    }

    // Leemos las reglas de la rúbrica 
    static get observedAttributes() { 
        return ['ancho', 'largo', 'min', 'max', 'tipo', 'placeholder']; 
    }
    
    connectedCallback() { 
        this.render(); 
        this._attachEvents(); 
    }
    
    attributeChangedCallback(name, oldValue, newValue) { 
        if (oldValue !== newValue && this.shadowRoot.querySelector('input')) {
            this.render(); 
            this._attachEvents(); 
        }
    }

    _validate(value) {
        const min = parseInt(this.getAttribute('min')) || 0;
        const max = parseInt(this.getAttribute('max')) || Infinity;
        const tipo = this.getAttribute('tipo') || 'todo';
        
        let isValid = true;
        this._errorMsg = '';

        if (value.length > 0) {
            // 1. Validación de Tipo (Prioridad para el feedback visual)
            if (tipo === 'numeros' && !/^[0-9]+$/.test(value)) { 
                this._errorMsg = 'Error: Solo se admiten números.'; 
                isValid = false; 
            } 
            else if (tipo === 'letras' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { 
                this._errorMsg = 'Error: Solo se admiten letras.'; 
                isValid = false; 
            } 
            else if (tipo === 'sin-especiales' && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { 
                this._errorMsg = 'Error: No se admiten caracteres especiales.'; 
                isValid = false; 
            }
            // 2. Validación de Longitud (Solo si el tipo es correcto)
            else if (value.length < min) { 
                this._errorMsg = `Se requieren al menos ${min} caracteres.`; 
                isValid = false; 
            } 
            else if (value.length > max) { 
                this._errorMsg = `Límite excedido (Máximo ${max}).`; 
                isValid = false; 
            }
        } else if (min > 0) {
            // 3. Validación de campo vacío si se exige un mínimo
            this._errorMsg = `Campo obligatorio. Mínimo ${min} caracteres.`; 
            isValid = false;
        }

        this._updateUI(isValid);
    }

    _updateUI(isValid) {
        const input = this.shadowRoot.querySelector('input');
        const errorSpan = this.shadowRoot.querySelector('.error-msg');
        
        if (!isValid) {
            input.classList.add('invalid');
            errorSpan.textContent = this._errorMsg;
            errorSpan.classList.add('visible');
        } else {
            input.classList.remove('invalid');
            errorSpan.classList.remove('visible');
        }
    }

    _attachEvents() {
        const input = this.shadowRoot.querySelector('input');
        if (!input) return;
        
        const max = this.getAttribute('max');
        if (max) input.setAttribute('maxlength', max);

        // Eliminamos los .replace() para permitir que el texto se valide correctamente
        input.addEventListener('input', (e) => {
            this._validate(e.target.value);
            
            this.dispatchEvent(new CustomEvent('valor-cambiado', { 
                detail: { valor: e.target.value, valido: this._errorMsg === '' },
                bubbles: true, composed: true 
            }));
        });
    }

    render() {
        const ancho = this.getAttribute('ancho') || '100%';
        const largo = this.getAttribute('largo') || '45px';
        const placeholder = this.getAttribute('placeholder') || 'Escriba aquí...';

        this.shadowRoot.innerHTML = `
            <style>
                :host { width: ${ancho}; display: block; }
                input { height: ${largo}; }
            </style>
            <link rel="stylesheet" href="${new URL('./style.css', import.meta.url).href}">
            
            <div class="input-wrapper">
                <input type="text" placeholder="${placeholder}">
                <div class="error-msg">Mensaje de error</div>
            </div>
        `;
    }
}

// Retenemos el nombre original del componente en el registro global
customElements.define('custom-input', CustomInput);

if (document.body.children.length === 0) {
    const style = document.createElement('style');
    style.textContent = 'body{background:linear-gradient(135deg,#0f172a,#1e293b);display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;color:white;font-family:system-ui,sans-serif}.sandbox{background:rgba(255,255,255,0.03);padding:40px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);width:100%;max-width:500px;display:flex;flex-direction:column;gap:25px}.label{font-size:13px;color:#cbd5e1;margin-bottom:8px;display:block;font-weight:500}';
    document.head.appendChild(style);
    const sandbox = document.createElement('div');
    sandbox.className = 'sandbox';
    // Actualizamos las etiquetas de prueba para coincidir con el nombre custom-input
    sandbox.innerHTML = '<h3 style="color:#3ee7b8;margin-top:0;text-align:center;font-weight:600;">Custom Input</h3>'
        + '<div><span class="label">1. Solo N&uacute;meros (M&iacute;n 3, M&aacute;x 8)</span><custom-input tipo="numeros" min="3" max="8" ancho="100%" largo="45px" placeholder="Ej: 123456"></custom-input></div>'
        + '<div><span class="label">2. Solo Letras</span><custom-input tipo="letras" ancho="100%" largo="45px" placeholder="Ej: Hola Mundo"></custom-input></div>'
        + '<div><span class="label">3. Letras y N&uacute;meros (Sin especiales)</span><custom-input tipo="sin-especiales" ancho="100%" largo="45px" placeholder="Ej: User2026"></custom-input></div>'
        + '<div><span class="label">4. Todo (Admite especiales)</span><custom-input tipo="todo" ancho="100%" largo="45px" placeholder="Ej: hola@mundo.com!"></custom-input></div>';
    document.body.appendChild(sandbox);
}

export default CustomInput;