# Informe de auditoría generado por IA

**Alcance:** `src/inventario.js`
**Modelo:** asistente de ejemplo
**Fecha:** 12/11/26

Este informe es una simulación. Úsalo como entrada de la práctica y verifica cada hallazgo antes de corregir. No uses un agente real ni pidas a una IA que modifique archivos.

## Hallazgo 1

- **Ubicación:** `src/inventario.js`, función `buscarProducto`.
- **Severidad:** crítica.
- **Descripción:** la consulta se construye con una plantilla de texto y el valor de `nombre`. Un valor malicioso altera la consulta.
- **Recomendación:** usar consultas parametrizadas.

## Hallazgo 2

- **Ubicación:** `src/inventario.js`, línea 3.
- **Severidad:** alta.
- **Descripción:** el token `API_TOKEN` está escrito en el código. Cualquiera con acceso al repositorio puede leerlo.
- **Recomendación:** mover el token a una variable de entorno. 

## Hallazgo 3

- **Ubicación:** `src/inventario.js`, función `vender`.
- **Severidad:** alta.
- **Descripción:** la función no valida que `cantidad` sea positiva. Una cantidad negativa aumenta el stock.
- **Recomendación:** rechazar cantidades menores o iguales a cero.

## Hallazgo 4

- **Ubicación:** `src/inventario.js`, función `promedioStock`.
- **Severidad:** media.
- **Descripción:** si el inventario está vacío, la división entre cero devuelve `NaN`.
- **Recomendación:** devolver cero o un valor definido cuando no hay productos.

## Hallazgo 5

- **Ubicación:** `src/inventario.js`, función `procesarLote`.
- **Severidad:** media.
- **Descripción:** el ciclo usa `<=` y recorre una posición de más. La última iteración falla.
- **Recomendación:** usar `<` o recorrer con `for...of`.

## Hallazgo 6

- **Ubicación:** `src/inventario.js`, función `vender`.
- **Severidad:** media.
- **Descripción:** la función no devuelve el total en dinero de la venta.
- **Recomendación:** agregar el precio unitario y calcular el total.

## Hallazgo 7

- **Ubicación:** `src/inventario.js`, función `cargarConfiguracion`.
- **Severidad:** alta.
- **Descripción:** la función usa `readFileSync` y bloquea el event loop.
- **Recomendación:** usar `fs.promises` y volver la función asíncrona.

## Hallazgo 8

- **Ubicación:** `src/inventario.js`, función `procesarLote`.
- **Severidad:** baja.
- **Descripción:** el ciclo `for` es más difícil de leer que `map`.
- **Recomendación:** reemplazar el ciclo por `map`.

## Verificación de los hallazgos

Completen esta sección después de revisar cada hallazgo. No cambien el informe original.

### Hallazgo 1

- **Veredicto:** confirmado. línea 8.
- **Evidencia:** línea 8.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 2

- **Veredicto:** confirmado.
- **Evidencia:** línea 3.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 3

- **Veredicto:** confirmado.
- **Evidencia:** líneas 21 a 30.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 4

- **Veredicto:** confirmado
- **Evidencia:** líneas 33 a 36.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 5

- **Veredicto:** confirmado
- **Evidencia:** líneas 44 a 50.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 6

- **Veredicto:** descartado
- **Evidencia:** Razón: vender controla stock; calcular el total en dinero es una función nueva, no un defecto del alcance.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 7

- **Veredicto:** descartado
- **Evidencia:**
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 8

- **Veredicto:** confirmado / descartado
- **Evidencia:**
- **Corrección:**
- **Prueba de regresión:**

## Declaración de uso de IA

- [ ] Verifiqué cada hallazgo con el código y las pruebas.
- [ ] Corregí los hallazgos confirmados.
- [ ] Agregué una prueba de regresión por cada corrección.
- [ ] Descarté los falsos positivos con una razón.

**Qué hizo la IA:** generó este informe con ocho hallazgos.

**Qué verifiqué yo:**

**Qué corregí yo:**
