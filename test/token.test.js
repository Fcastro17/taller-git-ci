import { test } from "bun:test";
import assert from "node:assert/strict";

test("buscarProducto usa process.env.API_TOKEN", async () => {
  const anterior = process.env.API_TOKEN;
  process.env.API_TOKEN = "token-de-prueba";

  try {
    const { buscarProducto } =
      await import("../src/inventario.js?token=entorno");
    assert.equal(buscarProducto("Teclado").token, "token-de-prueba");
  } finally {
    if (anterior === undefined) {
      delete process.env.API_TOKEN;
    } else {
      process.env.API_TOKEN = anterior;
    }
  }
});