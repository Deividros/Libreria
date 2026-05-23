// app.js
const panels = document.querySelectorAll('.panel');
const modal = document.getElementById('component-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

// El registro central donde defines cómo se renderiza cada componente
const componentRegistry = {
  'custom-input': {
    title: 'Custom Input',
    html: `
      <div style="text-align: left; width: 100%;">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px;">
          ✓ Validaciones Regex | ✓ Límites de longitud | ✓ Manejo de errores
        </p>
        <!-- Aquí irá tu componente real: <custom-input></custom-input> -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <input type="text" placeholder="Escribe alfanuméricos..." style="padding: 10px; border-radius: 8px; border: 2px solid #ff4757; background: rgba(0,0,0,0.2); color: white;">
          <span style="color: #ff4757; font-size: 0.8rem; font-weight: bold;">⚠️ Error: Caracteres especiales no permitidos. (Max 15/20)</span>
        </div>
      </div>
    `
  },
  
  'custom-select': {
    title: 'Select Múltiple & Buscador',
    html: `
      <div style="text-align: left; width: 100%;">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px;">
          ✓ Buscador interno | ✓ Selección múltiple toggleable
        </p>
        <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
          <input type="text" placeholder="🔍 Buscar opciones..." style="width: 90%; padding: 8px; margin-bottom: 10px; border-radius: 4px; border: none;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label><input type="checkbox" checked> Opción 1 (Toggle)</label>
            <label><input type="checkbox"> Opción 2</label>
            <label><input type="checkbox" checked> Opción 3 (Toggle)</label>
          </div>
        </div>
      </div>
    `
  },

  'date-range': {
    title: 'Date Range Picker',
    html: `
      <div style="text-align: left; width: 100%;">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px;">
          ✓ Calendario visual | ✓ Validación de fechas | ✓ Hover state
        </p>
        <div style="display: flex; gap: 10px; justify-content: center; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
          <input type="date" style="padding: 8px; border-radius: 5px; border: none;" title="Fecha Inicio">
          <span style="color: white; align-self: center;">hasta</span>
          <input type="date" style="padding: 8px; border-radius: 5px; border: none; opacity: 0.5;" title="Fecha Fin (Validada)" disabled>
        </div>
      </div>
    `
  },

  'custom-modal-comp': {
    title: 'Sistema de Modal',
    html: `
      <div style="text-align: left; width: 100%;">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 15px;">
          ✓ Sistema de Slots | ✓ Colores custom | ✓ Botones configurables
        </p>
        <div style="background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.4); border-radius: 10px; padding: 20px; text-align: center;">
          <p style="color: #aaa; margin-bottom: 15px;">[ Slot: Contenido inyectable ]</p>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <button style="background: #555; color: white; border: none; padding: 8px 15px; border-radius: 5px;">Cancelar</button>
            <button style="background: #2ecc71; color: white; border: none; padding: 8px 15px; border-radius: 5px;">Acción Custom</button>
          </div>
        </div>
      </div>
    `
  },

  'data-table': {
    title: 'Data Table Interactiva',
    html: `
      <div style="text-align: left; width: 100%; overflow-x: auto;">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 10px;">
          ✓ Paginación | ✓ Ordenamiento | ✓ Búsqueda | ✓ Responsiva
        </p>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <input type="text" placeholder="Buscar en tabla..." style="padding: 5px; border-radius: 4px; border: none; width: 120px;">
          <span style="font-size: 0.8rem; align-self: center;">Pág 1 de 5 ⏭️</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
              <th style="padding: 8px; cursor: pointer;">ID ↕️</th>
              <th style="padding: 8px; cursor: pointer;">Nombre ↕️</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 8px;">001</td><td style="padding: 8px;">Dato de prueba A</td></tr>
            <tr><td style="padding: 8px;">002</td><td style="padding: 8px;">Dato de prueba B</td></tr>
          </tbody>
        </table>
      </div>
    `
  }
};

// Función para abrir el modal
panels.forEach(panel => {
  panel.addEventListener('click', () => {
    const componentId = panel.getAttribute('data-component');
    const data = componentRegistry[componentId];

    if (data) {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.html; // Inyecta el componente en el DOM
      modal.classList.remove('hidden'); // Muestra el modal
    }
  });
});

// Función para cerrar y limpiar
const closeModal = () => {
  modal.classList.add('hidden');
  // Limpiamos el HTML después de que termine la animación de opacidad (300ms)
  setTimeout(() => {
    modalBody.innerHTML = '';
  }, 300); 
};

closeModalBtn.addEventListener('click', closeModal);

// Cerrar el modal si haces clic en el fondo oscuro (fuera del recuadro del modal)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});