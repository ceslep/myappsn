const context = self;

context.onmessage = function (msg) {
  // Realiza aquí las tareas necesarias en segundo plano
  // Puedes comunicarte con la aplicación principal a través de eventos de mensaje

  // Ejemplo: envía un mensaje de respuesta a la aplicación principal
  const response = { result: 'Tarea en segundo plano completada' };
  context.postMessage(response);
};
