import { test } from 'bun:test';
import assert from 'node:assert/strict';

import {
  agregarProducto,
  vender,
  promedioStock,
} from '../src/inventario.js';

test('agrega un producto', () => {
  const producto = agregarProducto({ id: 1, nombre: 'Teclado', stock: 10 });
  assert.equal(producto.nombre, 'Teclado');
});

test('vende una unidad', () => {
  agregarProducto({ id: 2, nombre: 'Mouse', stock: 5 });
  const resultado = vender(2, 1);
  assert.equal(resultado.ok, true);
  assert.equal(resultado.stock, 4);
});

test('rechaza una venta sin stock', () => {
  agregarProducto({ id: 3, nombre: 'Monitor', stock: 1 });
  const resultado = vender(3, 2);
  assert.equal(resultado.ok, false);
});

test('calcula el promedio de stock', () => {
  agregarProducto({ id: 4, nombre: 'Cable', stock: 4 });
  const promedio = promedioStock();
  assert.equal(typeof promedio, 'number');
});
