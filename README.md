# TALLER DE GIT, INTEGRACIÓN CONTINUA Y AUDITORÍA ASISTIDA POR IA

<img src="unefa.png" alt="UNEFA" width="150" align="left" />

**Universidad Nacional Experimental Politécnica**\
**de la Fuerza Armada Nacional Bolivariana - UNEFA**\
**Ingeniería de Sistemas - 7mo semestre**\
**Asignatura:** Implantación de Sistemas\
**Docente:** Ing. Luis Fernando Reyes\
**Ponderación:** 10%\
**Modalidad:** `práctica guiada` Cada paso indica qué hacer, qué comando ejecutar, qué resultado esperar y qué registrar.

<br clear="all" />

---

**Al terminar deben tener:**

- Un fork de `luiseyer/taller-git-ci` con el código inicial.
- Una rama `taller/auditoria` con tres commits descriptivos.
- Un pipeline en verde con lint, pruebas y artefacto.
- Un informe `AUDITORIA-IA.md` con ocho hallazgos verificados, cinco de ellos corregidos.
- La rama `main` actualizada con la fusión y una etiqueta `v0.2.0`.

## Qué contiene

- `src/inventario.js`: módulo de inventario.
- `test/inventario.test.js`: pruebas del módulo.
- `.github/workflows/ci.yml`: workflow inicial.
- `AUDITORIA-IA.md`: informe de ejemplo generado por IA.

## Antes de empezar

- Requisitos: Bun 1.4.4 o superior, Git, VSCode y una cuenta de GitHub por pareja.
- Trabajen en parejas, con una sola máquina y una sola cuenta de GitHub por pareja.
- Instalen Bun con `powershell -c "irm bun.sh/install.ps1|iex"`
- Verifiquen Bun 1.4.4 o superior con `bun --version`.
- Verifiquen Git con `git --version`.
- Abran VSCode.
- Inicien sesión en GitHub desde el icono **Accounts**.
- Usen la terminal integrada de VSCode. **Terminal** > **New Terminal**

## Paso 0: configurar Git

Reemplacen `Nombre Apellido` y `correo@ejemplo.com` por los datos de su cuenta de GitHub.

```bash
git config --global user.name "Nombre Apellido"
git config --global user.email "correo@ejemplo.com"
git config --global init.defaultBranch main
```

Verificar:

```bash
git config --global --list
```

**Verificar:** aparecen `user.name`, `user.email` e `init.defaultBranch=main`.

## Paso 1: hacer fork y clonar

En GitHub, abran `https://github.com/luiseyer/taller-git-ci` y usen **Fork** > **Create fork**.

En VSCode, abran la paleta de comandos con `Ctrl+Shift+P`, elijan **Git: Clone**, peguen la URL del fork con la extensión `.git` y seleccionen una carpeta. Cuando termine, abran la carpeta clonada.

Abran la terminal e instalen las dependencias:

```bash
bun install
```

Verifiquen el repositorio remoto y el estado:

```bash
git remote -v
git status
```

**Qué verificar:** `origin` apunta al fork creado y `git status` muestra la rama `main` limpia. Si `bun.lock` aparece sin seguimiento, se agrega en el primer commit del Paso 4.

## Paso 2: revisar el código base

Ejecutar las comprobaciones:

```bash
bun run lint
bun test
```

**Resultado esperado:**

- `bun test`: 4 pruebas pasan.
- `bun run lint`: 2 errores.
  - `eqeqeq` en `src/inventario.js`, línea 22, por `==`.
  - `no-empty` en `src/inventario.js`, línea 41, por el `catch` vacío.

Estos dos errores se corrigen en el Paso 7.

## Paso 3: crear una rama para trabajar

```bash
git switch -c taller/auditoria
```

Todos los cambios del taller se hacen en esta rama.

## Paso 4: completar el pipeline

Abran `.github/workflows/ci.yml`. Reemplacen todo el contenido por este workflow completo:

```yaml
name: CI

on:
  push:
    branches: [main, taller/auditoria]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.4.4
      - name: Instalar dependencias
        run: bun install --frozen-lockfile
      - name: Ejecutar linter
        run: bun run lint
      - name: Ejecutar pruebas
        run: bun test --coverage > cobertura.txt 2>&1
      - name: Guardar evidencia
        uses: actions/upload-artifact@v7
        with:
          name: evidencia-ci
          path: |
            AUDITORIA-IA.md
            cobertura.txt
```

**Qué hace cada parte:**

- `name` es el nombre del workflow. Aparece en la pestaña **Actions**.
- `on` define los eventos que disparan el workflow. Aquí se ejecuta con cada `push` a `main` o a `taller/auditoria`.
- `jobs` agrupa los trabajos. `build` es el identificador del trabajo.
- `runs-on` elige la máquina donde se ejecuta el trabajo. `ubuntu-latest` es una máquina Linux de GitHub.
- `steps` contiene los pasos de cada trabajo, en orden.
- `uses` llama a una acción ya existente. `actions/checkout@v7` descarga el repositorio y `oven-sh/setup-bun@v2` instala Bun.
- `with` pasa parámetros a una acción. `bun-version: 1.4.4` fija la versión de Bun; `name` y `path` indican el nombre del artefacto y los archivos que guarda.
- `run` ejecuta un comando en la terminal del trabajo: `bun install`, `bun run lint` y `bun test`.
- `bun test --coverage > cobertura.txt 2>&1` ejecuta las pruebas y guarda el reporte de cobertura en `cobertura.txt`. El `2>&1` incluye la salida de error, donde Bun escribe el reporte.
- `upload-artifact` guarda `AUDITORIA-IA.md` y `cobertura.txt` como evidencia descargable.

Confirmen y suban los cambios:

```bash
git add .github/workflows/ci.yml bun.lock
git commit -m "ci: agregar lint, pruebas y artefacto"
git push -u origin taller/auditoria
```

Abran la pestaña **Actions** del repositorio y revisen la ejecución de la rama `taller/auditoria`.

**Resultado esperado:** la ejecución se dispara y falla en el paso `Lint`. El log muestra los dos errores del Paso 2. El artefacto todavía no se guarda porque el workflow se detiene en el lint.

**Para la puesta en común:** identifiquen el paso que falló, el archivo y la línea del primer error.

## Paso 5: leer el informe de IA

Abran el archivo `AUDITORIA-IA.md`. Contiene ocho hallazgos. Este informe es una hipótesis. Cada hallazgo se verifica con el código y las pruebas.

## Paso 6: verificar los hallazgos

Verifiquen los ocho hallazgos de `AUDITORIA-IA.md` con la siguiente lista. Para cada uno, ejecuten el comando y comparen el resultado con el esperado. Anoten el veredicto en la sección **Verificación de los hallazgos** al final de `AUDITORIA-IA.md`.

### Hallazgo 1: inyección en la consulta

```bash
bun --input-type=module -e "import { buscarProducto } from './src/inventario.js'; const c = String.fromCharCode(39); console.log(buscarProducto('x' + c + ' OR ' + c + '1' + c + '=' + c + '1').consulta)"
```

**Resultado esperado:** la consulta incluye `x' OR '1'='1`. **Veredicto:** confirmado. **Evidencia:** línea 8.

### Hallazgo 2: token fijo

```bash
git grep -n "tok_live" -- src/inventario.js
```

**Resultado esperado:** `src/inventario.js:3:const API_TOKEN = 'tok_live_7f3a9c2e';`. **Veredicto:** confirmado. **Evidencia:** línea 3.

### Hallazgo 3: cantidad negativa

```bash
bun --input-type=module -e "import { agregarProducto, vender } from './src/inventario.js'; agregarProducto({ id: 1, stock: 5 }); console.log(vender(1, -3))"
```

**Resultado esperado:** `{ ok: true, stock: 8 }`. La cantidad negativa aumenta el stock. **Veredicto:** confirmado. **Evidencia:** líneas 21 a 30.

### Hallazgo 4: división entre cero

```bash
bun --input-type=module -e "import { promedioStock } from './src/inventario.js'; console.log(promedioStock())"
```

**Resultado esperado:** `NaN`. **Veredicto:** confirmado. **Evidencia:** líneas 33 a 36.

### Hallazgo 5: recorrido con una posición de más

```bash
bun --input-type=module -e "import { procesarLote } from './src/inventario.js'; procesarLote([{ id: 9 }])"
```

**Resultado esperado:** un `TypeError` al intentar leer `id` de `undefined`. **Veredicto:** confirmado. **Evidencia:** líneas 44 a 50.

### Hallazgo 6: falta el total en dinero

```bash
bun --input-type=module -e "import { agregarProducto, vender } from './src/inventario.js'; agregarProducto({ id: 2, stock: 5, precio: 10 }); console.log(vender(2, 1))"
```

**Resultado esperado:** `{ ok: true, stock: 4 }`. No hay campo `total`. **Veredicto:** descartado. **Razón:** `vender` controla stock; calcular el total en dinero es una función nueva, no un defecto del alcance.

### Hallazgo 7: `readFileSync` bloquea el event loop

```bash
git grep -n "readFileSync" -- src/inventario.js
```

**Resultado esperado:** `src/inventario.js:1:import { readFileSync } from 'node:fs';` y `src/inventario.js:40:    return JSON.parse(readFileSync(ruta, 'utf8'));`. **Veredicto:** descartado. **Razón:** la lectura ocurre una vez en `cargarConfiguracion`, no en la ruta de ventas. En este alcance no bloquea la operación.

### Hallazgo 8: cambiar `for` por `map`

```bash
git grep -n "for (let i" -- src/inventario.js
```

**Resultado esperado:** `src/inventario.js:46:  for (let i = 0; i <= lote.length; i++) {`. **Veredicto:** descartado. **Razón:** es una preferencia de estilo; el ciclo funciona y no es un defecto.

**Ubicación en el informe:** los hallazgos 1 a 5 se verifican como confirmados. Los hallazgos 6 a 8 se verifican como descartados.

## Paso 7: corregir y agregar pruebas

Apliquen estas correcciones en `src/inventario.js`. Copien y peguen cada bloque. Para cada función, seleccionen desde su primera línea hasta la llave de cierre y reemplacen con la versión corregida. No cambien el resto del archivo.

### 1. Inyección en la consulta

Reemplacen `buscarProducto` y `ejecutar` por:

```js
export function buscarProducto(nombre) {
  const consulta = "SELECT * FROM productos WHERE nombre = ?";
  return ejecutar(consulta, [nombre]);
}

function ejecutar(consulta, parametros = []) {
  return { consulta, parametros, token: API_TOKEN };
}
```

### 2. Cantidad negativa y comparación débil

Reemplacen `vender` por:

```js
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
```

### 3. División entre cero

Reemplacen `promedioStock` por:

```js
export function promedioStock() {
  if (productos.length === 0) {
    return 0;
  }
  const total = productos.reduce((suma, p) => suma + p.stock, 0);
  return total / productos.length;
}
```

### 4. Recorrido con una posición de más

Reemplacen `procesarLote` por:

```js
export function procesarLote(lote) {
  const resultados = [];
  for (let i = 0; i < lote.length; i++) {
    resultados.push(lote[i].id);
  }
  return resultados;
}
```

### 5. Bloque `catch` vacío

Reemplacen `cargarConfiguracion` por:

```js
export function cargarConfiguracion(ruta) {
  try {
    return JSON.parse(readFileSync(ruta, "utf8"));
  } catch {
    return {};
  }
}
```

Esta corrección elimina el error `no-empty` del lint.

### 6. Token fijo

Reemplacen la línea 3 de `src/inventario.js` por:

```js
const API_TOKEN = process.env.API_TOKEN;
```

La variable se lee del entorno cuando se ejecuta el programa. El valor del token deja de estar escrito en el archivo.

### Pruebas de regresión

Creen `test/limites.test.js` con este contenido:

```js
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
```

**Nota:** el módulo se importa con un identificador distinto para obtener un inventario vacío. Así la prueba no depende de las pruebas anteriores.

Creen `test/token.test.js` con este contenido:

```js
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
```

**Nota:** `?token=entorno` fuerza una instancia nueva del módulo después de asignar la variable de entorno.

Ejecuten las pruebas:

```bash
bun test
```

**Resultado esperado:** 9 pruebas pasan: las 4 base, las 4 de límites y la del token.

## Paso 8: completar `AUDITORIA-IA.md`

No reescriban el informe. Al final de `AUDITORIA-IA.md` está la sección **Verificación de los hallazgos**. Completen los campos de cada hallazgo:

- **Veredicto:** confirmado o descartado.
- **Evidencia:** comando, resultado o línea que lo demuestra.
- **Corrección:** qué cambiaron. En los descartados, escriban `No aplica`.
- **Prueba de regresión:** nombre de la prueba. En los descartados, escriban `No aplica`.

En el hallazgo 2, la corrección es `process.env.API_TOKEN` y la prueba es `test/token.test.js`. En los hallazgos 6, 7 y 8, escriban la razón por la que no son defectos. En la declaración final, marquen las casillas y expliquen qué hizo la IA, qué verificaron y qué corrigieron.

**Verificar:** cada hallazgo confirmado tiene evidencia y corrección. Los tres falsos positivos tienen una razón escrita. La declaración está completa.

## Paso 9: confirmar y subir los cambios

```bash
git add src/inventario.js AUDITORIA-IA.md
git commit -m "fix: corregir consulta, cantidad, promedio y recorrido"
git add test/limites.test.js test/token.test.js
git commit -m "test: agregar pruebas de límites y token"
git push
```

**Verificar:** la rama `taller/auditoria` tiene tres commits: el del workflow, el de las correcciones y el de las pruebas. El pipeline queda en verde y el artefacto `evidencia-ci` se descarga.

## Paso 10: fusionar y etiquetar

Fusionen la rama en `main` desde la terminal:

```bash
git switch main
git merge taller/auditoria
git push origin main
git tag -a v0.2.0 -m "Taller de Git, CI y auditoría"
git push origin v0.2.0
```

**Verificar:** `main` contiene los tres commits, el pipeline de `main` queda en verde y la etiqueta `v0.2.0` existe en GitHub.

## Paso 11: entregar

Entregar al docente:

- el enlace del fork;
- el nombre de la pareja.

## Fuentes

- Git Documentation: https://git-scm.com/doc
- GitHub Actions: https://docs.github.com/en/actions
- Bun Installation: https://bun.com/docs/cli/test
- Bun Test Runner: https://bun.com/docs/installation
- ESLint: https://eslint.org/docs/latest
