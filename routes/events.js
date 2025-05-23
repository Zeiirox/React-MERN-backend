/*
  Rutas de eventos
  host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getEventos,
  crearEventos,
  actualizarEventos,
  EliminarEventos,
} = require("../controllers/events");
const isDate = require("../helpers/isDate");

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos
  ],
  crearEventos
);

// Actualizar evento
router.put("/:id", actualizarEventos);

// Actualizar evento
router.delete("/:id", EliminarEventos);

module.exports = router;
