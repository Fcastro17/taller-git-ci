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
- **Corrección:** se cambiaron los parametros de la funcion
- **Prueba de regresión:** no concatena el nombre en la consulta

### Hallazgo 2

- **Veredicto:** confirmado.
- **Evidencia:** línea 3.
- **Corrección:** se cambio el token fijo por una variable de entorno (process.env.API_TOKEN)
- **Prueba de regresión:** buscarProducto usa process.env.API_TOKEN

### Hallazgo 3

- **Veredicto:** confirmado.
- **Evidencia:** líneas 21 a 30.
- **Corrección:** se añadio un if a la funcion que verifica que el numero no sea < 0
- **Prueba de regresión:** rechaza una cantidad negativa

### Hallazgo 4

- **Veredicto:** confirmado
- **Evidencia:** líneas 33 a 36.
- **Corrección:** Ahora la funcion detecta cuando el valor es 0 y retorna 0
- **Prueba de regresión:** el promedio vacío es cero

### Hallazgo 5

- **Veredicto:** confirmado
- **Evidencia:** líneas 44 a 50.
- **Corrección:**
- **Prueba de regresión:**

### Hallazgo 6

- **Veredicto:** descartado
- **Evidencia:** vender controla stock; calcular el total en dinero es una función nueva, no un defecto del alcance.
- **Corrección:** no aplica
- **Prueba de regresión:** no aplica

### Hallazgo 7

- **Veredicto:** descartado
- **Evidencia:** la lectura ocurre una vez en cargarConfiguracion, no en la ruta de ventas. En este alcance no bloquea la operación.
- **Corrección:** no aplica
- **Prueba de regresión:** no aplica

### Hallazgo 8

- **Veredicto:** descartado
- **Evidencia:** es una preferencia de estilo; el ciclo funciona y no es un defecto.
- **Corrección:** no aplica
- **Prueba de regresión:** no aplica

## Declaración de uso de IA

- [ ] Verifiqué cada hallazgo con el código y las pruebas.
- [ ] Corregí los hallazgos confirmados.
- [ ] Agregué una prueba de regresión por cada corrección.
- [ ] Descarté los falsos positivos con una razón.

**Qué hizo la IA:** generó este informe con ocho hallazgos.

**Qué verifiqué yo:**

**Qué corregí yo:**
