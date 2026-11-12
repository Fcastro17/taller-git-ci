import { readFileSync } from 'node:fs';

const API_TOKEN = process.env.API_TOKEN;

const productos = [];

export function buscarProducto(nombre) {
  const consulta = "SELECT * FROM productos WHERE nombre = ?";
  return ejecutar(consulta, [nombre]);
}

function ejecutar(consulta, parametros = []) {
  return { consulta, parametros, token: API_TOKEN };
}

export function agregarProducto(producto) {
  productos.push(producto);
  return producto;
}

export function vender(id, cantidad) {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return { ok: false, mensaje: "Cantidad inválida" };
  }
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return { ok: false, mensaje: "Producto no encontrado" };
  }
  if (producto.stock < cantidad) {
    return { ok: false, mensaje: "Stock insuficiente" };
  }
  producto.stock -= cantidad;
  return { ok: true, stock: producto.stock };
}

export function promedioStock() {
  if (productos.length === 0) {
    return 0;
  }
  const total = productos.reduce((suma, p) => suma + p.stock, 0);
  return total / productos.length;
}

export function cargarConfiguracion(ruta) {
  try {
    return JSON.parse(readFileSync(ruta, "utf8"));
  } catch {
    return {};
  }
}

export function procesarLote(lote) {
  const resultados = [];
  for (let i = 0; i < lote.length; i++) {
    resultados.push(lote[i].id);
  }
  return resultados;
}
