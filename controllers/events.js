const { response, request } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find().populate("user", "name");

    res.status(201).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al obtener los eventos",
    });
  }
};

const crearEventos = async (req = request, res = response) => {
  try {
    const evento = new Evento(req.body);
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "No se pudo crear el evento",
    });
  }
};

const actualizarEventos = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req;
  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene permisos para editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(201).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const EliminarEventos = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req;
  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene permisos para eliminar este evento",
      });
    }

    await Evento.deleteOne();

    res.status(201).json({
      ok: true,
      msg: "Evento borrado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  actualizarEventos,
  crearEventos,
  EliminarEventos,
  getEventos,
};
