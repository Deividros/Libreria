// app.js
const panels = document.querySelectorAll('.panel');
const modal = document.getElementById('component-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

const componentRegistry = {
  'custom-input': {
    title: 'Custom Input',
    html: `
      <div style="text-align: left; width: 100%; display: flex; flex-direction: column; gap: 15px;">
        <p style="color: #cbd5e1; font-size: 0.9rem; margin-bottom: 5px;">
          Prueba las distintas validaciones del componente:
        </p>
        
        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">1. Solo Números (Min 3, Max 8)</label>
          <custom-input tipo="numeros" min="3" max="8" ancho="100%" largo="45px" placeholder="Ej: 123456"></custom-input>
        </div>
        
        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">2. Solo Letras</label>
          <custom-input tipo="letras" ancho="100%" largo="45px" placeholder="Ej: Angel Torres"></custom-input>
        </div>
        
        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">3. Alfanumérico (Sin especiales)</label>
          <custom-input tipo="sin-especiales" ancho="100%" largo="45px" placeholder="Ej: User2026"></custom-input>
        </div>

        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">4. Todo (Admite especiales)</label>
          <custom-input tipo="todo" ancho="100%" largo="45px" placeholder="Ej: hola@mundo.com!"></custom-input>
        </div>

        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">5. Solo Caracteres Especiales</label>
          <custom-input tipo="especiales" ancho="100%" largo="45px" placeholder="Ej: @#$%-*!"></custom-input>
        </div>
      </div>
    `
  },

  'custom-select': {
    title: 'Select Dinámico',
    html: `<custom-select id="demo-select" enable-search="true" multiple="true" placeholder="Selecciona productos..."></custom-select>`,
    init: () => {
      const select = document.getElementById('demo-select');
      if (select) {
        select.opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Teclado Redragon', 'Monitor 24"'];
      }
    }
  },

  'date-range': {
    title: 'Date Range Picker',
    html: `<date-range color-tema="#3ee7b8" allow-past="false" allow-future="true"></date-range>`
  },

  'custom-modal-comp': {
    title: 'Sistema de Modales',
    html: `
      <div style="text-align: center; color: white; display: flex; flex-direction: column; gap: 18px; align-items: center; width: 100%;">
        <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 5px;">
          Haz clic en cualquiera de las opciones para desplegar cada tipo de modal con sus efectos visuales, iconos vectoriales y transiciones en alta definición:
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; max-width: 440px;">
          <button onclick="document.getElementById('modal-render-info').open()" style="padding: 14px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 10px; cursor: pointer; font-weight: 600; color: #60a5fa; transition: all 0.2s; font-size: 14px;" onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.15)'">🔷 Modal Info</button>
          
          <button onclick="document.getElementById('modal-render-error').open()" style="padding: 14px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 10px; cursor: pointer; font-weight: 600; color: #f87171; transition: all 0.2s; font-size: 14px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.25)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.15)'">🔺 Modal Error</button>
          
          <button onclick="document.getElementById('modal-render-confirm').open()" style="padding: 14px; background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 10px; cursor: pointer; font-weight: 600; color: #facc15; transition: all 0.2s; font-size: 14px;" onmouseover="this.style.background='rgba(234, 179, 8, 0.25)'" onmouseout="this.style.background='rgba(234, 179, 8, 0.15)'">⚠️ Confirmación</button>
          
          <button onclick="document.getElementById('modal-render-custom').open()" style="padding: 14px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 10px; cursor: pointer; font-weight: 600; color: #a78bfa; transition: all 0.2s; font-size: 14px;" onmouseover="this.style.background='rgba(139, 92, 246, 0.25)'" onmouseout="this.style.background='rgba(139, 92, 246, 0.15)'">✨ Personalizado</button>
        </div>

        <custom-modal id="modal-render-info" type="info" btn-1="Entendido" bg-color="rgba(15, 23, 42, 0.9)">
          <h3 style="color: #3b82f6; margin: 0 0 10px 0; font-size: 18px;">Notificación de Éxito</h3>
          <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6;">Los componentes compartidos se han integrado correctamente en la rama principal del repositorio de desarrollo.</p>
        </custom-modal>

        <custom-modal id="modal-render-error" type="error" btn-1="Reintentar" btn-2="Cancelar" bg-color="rgba(15, 23, 42, 0.9)">
          <h3 style="color: #ef4444; margin: 0 0 10px 0; font-size: 18px;">Fallo de Compilación</h3>
          <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6;">Se detectaron caracteres no permitidos durante el análisis en tiempo real de las expresiones regulares.</p>
        </custom-modal>

        <custom-modal id="modal-render-confirm" type="confirm" btn-1="Sí, Continuar" btn-2="Cancelar" bg-color="rgba(15, 23, 42, 0.9)">
          <h3 style="color: #eab308; margin: 0 0 10px 0; font-size: 18px;">¿Confirmar Cambios?</h3>
          <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6;">Estás a punto de sincronizar las modificaciones globales en los estilos del panel interactivo de la galería.</p>
        </custom-modal>

        <custom-modal id="modal-render-custom" type="custom" header-image="components/select-dinamico/fondo 2.jpg" color="#3ee7b8" btn-1="Guardar Ajustes" btn-2="Cerrar" bg-color="rgba(10, 15, 30, 0.94)">
          <h3 style="color: #3ee7b8; margin: 0 0 8px 0; font-size: 19px; text-align: center;">Fondo de Pantalla Activo</h3>
          <p style="color: #cbd5e1; margin: 0 0 15px 0; font-size: 14px; text-align: center; line-height: 1.5;">El entorno visual neumórfico y de cristal emula perfectamente la configuración cargada en el directorio.</p>
          <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); text-align: left;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: bold; display: block; margin-bottom: 4px;">EQUIPO DE DESARROLLO:</span>
            <span style="font-size: 13px; color: #f8fafc; display: block;">• Yox (Arquitectura Frontend)</span>
            <span style="font-size: 13px; color: #f8fafc; display: block;">• David (Controladores de Estado)</span>
            <span style="font-size: 13px; color: #f8fafc; display: block;">• Ángel (Validaciones del Core)</span>
          </div>
        </custom-modal>
      </div>
    `
  },

  'data-table': {
    title: 'Data Table Interactiva',
    html: `<custom-table id="demo-table" page-size="5"></custom-table>`,
    init: () => {
      const table = document.getElementById('demo-table');
      if (table) {
        table.columns = [
          { key: 'id', label: 'ID', type: 'number' },
          { key: 'nombre', label: 'Nombre', type: 'string' },
          { key: 'rol', label: 'Rol', type: 'string' }
        ];
        table.data = [
          { id: 1, nombre: 'Yox', rol: 'Frontend' },
          { id: 2, nombre: 'David', rol: 'Backend' },
          { id: 3, nombre: 'Ángel', rol: 'Full Stack' }
        ];
      }
    }
  }
};

// Función para abrir el modal
panels.forEach(panel => {
  panel.addEventListener('click', () => {
    const componentId = panel.getAttribute('data-component');
    const data = componentRegistry[componentId];

    if (data) {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.html; 
      modal.classList.remove('hidden'); 
      
      // Si el componente requiere inyectar datos JS, ejecutamos su función de inicialización
      if (data.init) {
        // Un pequeño timeout asegura que el componente ya está renderizado en el DOM
        setTimeout(() => data.init(), 50);
      }
    }
  });
});

// Función para cerrar y limpiar
const closeModal = () => {
  modal.classList.add('hidden');
  setTimeout(() => {
    modalBody.innerHTML = '';
  }, 300); 
};

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});