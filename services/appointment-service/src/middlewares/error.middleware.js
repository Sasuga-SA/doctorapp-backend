export const notFound = (req, res, _next) =>
  res.status(404).json({ message: "Ruta no encontrada" });

export const errorHandler = (err, req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Error interno" });
};
