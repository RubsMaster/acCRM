// Este archivo exportará funciones que ayudan a construir consultas para Mongoose.

export const buildServicesFilter = (queryParams) => {
  const filter = {};

  if (queryParams.done) {
    filter.done = queryParams.done;
  }

  if (queryParams.client) {
    filter.client = queryParams.client;
  }

  if (queryParams.type) {
    filter.type = queryParams.type;
  }

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