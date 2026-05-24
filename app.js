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
          <custom-input tipo="letras" ancho="100%" largo="45px" placeholder="Ej: Hola Mundo"></custom-input>
        </div>
        
        <div>
          <label style="font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 5px; display: block;">3. Alfanumérico (Sin especiales)</label>
          <custom-input tipo="sin-especiales" ancho="100%" largo="45px" placeholder="Ej: User2026"></custom-input>
        </div>
      </div>
    `
  },

  'date-range': {
    title: 'Date Range Picker',
    html: `<date-range color-tema="#3ee7b8" allow-past="false" allow-future="true"></date-range>`
  },

  'custom-modal-comp': {
    title: 'Sistema de Modal',
    html: `
      <div style="text-align: center; color: white;">
        <p style="margin-bottom: 20px;">Haz clic en el botón para invocar el componente desde este entorno.</p>
        <custom-modal id="demo-modal" type="confirm" btn-1="Aceptar" btn-2="Cancelar">
          <h3 style="color:#eab308; margin-top:0;">Acción Requerida</h3>
          <p>El componente modal está operando correctamente.</p>
        </custom-modal>
        <button onclick="document.getElementById('demo-modal').open()" style="padding: 10px 20px; background: #3ee7b8; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #0f172a;">Lanzar Componente</button>
      </div>
    `
  },

  'data-table': {
    title: 'Data Table Interactiva',
    html: `<custom-table id="demo-table" page-size="5"></custom-table>`,
    init: () => {
      const table = document.getElementById('demo-table');
      if (table) {
        // Configuramos las columnas y los datos del equipo
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
        data.init();
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