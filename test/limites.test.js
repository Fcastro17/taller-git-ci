import { test } from "bun:test";
import assert from "node:assert/strict";

import {
  buscarProducto,
  agregarProducto,
  vender,
  procesarLote,
} from "../src/inventario.js";

test("no concatena el nombre en la consulta", () => {
  const resultado = buscarProducto("x' OR '1'='1");
  assert.equal(resultado.consulta.includes("OR"), false);
});

test("rechaza una cantidad negativa", () => {
  agregarProducto({ id: 10, nombre: "Silla", stock: 5 });
  const resultado = vender(10, -3);
  assert.equal(resultado.ok, false);
  assert.equal(resultado.mensaje, "Cantidad inválida");
});

test("el promedio vacío es cero", async () => {
  const modulo = await import("../src/inventario.js?inventario=vacio");
  assert.equal(modulo.promedioStock(), 0);
});

test("procesa el lote completo", () => {
  const resultado = procesarLote([{ id: 1 }, { id: 2 }]);
  assert.deepEqual(resultado, [1, 2]);
});