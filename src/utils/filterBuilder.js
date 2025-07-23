// Este archivo exportará funciones que ayudan a construir consultas para Mongoose.

export const buildServicesFilter = (queryParams) => {
  const filter = {};

  // Filtro booleano por estado (done)
  if (queryParams.done) {
    filter.done = queryParams.done;
  }

  // Filtro por referencia (client)
  if (queryParams.client) {
    filter.client = queryParams.client;
  }

  // Filtro por valor de enum (type)
  if (queryParams.type) {
    filter.type = queryParams.type;
  }

  // Filtro por rango de fechas (date)
  if (queryParams.dateStart || queryParams.dateEnd) {
    filter.date = {};
    if (queryParams.dateStart) {
      filter.date.$gte = new Date(queryParams.dateStart);
    }
    if (queryParams.dateEnd) {
      const endDate = new Date(queryParams.dateEnd);
      endDate.setHours(23, 59, 59, 999);
      filter.date.$lte = endDate;
    }
  }

  // Filtro por rango de números (cost)
  if (queryParams.minCost || queryParams.maxCost) {
    filter.cost = {};
    if (queryParams.minCost) {
      filter.cost.$gte = Number(queryParams.minCost);
    }
    if (queryParams.maxCost) {
      filter.cost.$lte = Number(queryParams.maxCost);
    }
  }

  // Filtros por campos anidados (equipment)
  if (queryParams.gas) {
    filter['equipment.gas'] = queryParams.gas;
  }
  if (queryParams.compressor) {
    filter['equipment.compressor'] = queryParams.compressor;
  }

  return filter;
};