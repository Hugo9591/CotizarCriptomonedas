# Cotizador de Criptomonedas

## Descripción
Página web para cotizar criptomonedas en distintas monedas como dólares, pesos mexicanos, libras y euros.

La información se obtiene en tiempo real desde la API CryptoCompare.
El usuario selecciona una moneda y una criptomoneda en dos <select>.
Al hacer clic en "Cotizar", se muestra un spinner de carga mientras se realiza la consulta.
Luego, se muestran datos como:
Precio actual en la moneda seleccionada.
Precio más alto y más bajo del día.
Variación en las últimas 24 horas (porcentaje).
Última actualización.
Se usa Skeleton y Normalize.css para estilos base, y un archivo app.css para personalización.
La lógica de la aplicación está en un archivo JavaScript que maneja la consulta y muestra los resultados.

## Características
- Selección de **moneda**: Dólar, Peso Mexicano, Libra, Euro.
- Selección de **criptomoneda**: Bitcoin y otras populares.
- Consulta en tiempo real con un **spinner de carga**.
- Muestra información detallada:
  - Precio actual en la moneda seleccionada.
  - Precio más alto y más bajo del día.
  - Variación en 24 horas (%).
  - Última actualización.

## Tecnologías utilizadas
- **HTML**: Estructura de la página.
- **CSS**
  - **Skeleton y Normalize.css** para estilos base.
  - **app.css** para personalización.
- **JavaScript**
  - Manejo de API con `fetch()`.
  - Manipulación del DOM para mostrar los resultados.

## Instalación y uso
1. Clona este repositorio:
   git clone https://github.com/Hugo9591/CotizarCriptomonedas.git
2. Abre el archivo index.html en tu navegador.
3. Selecciona una moneda y una criptomoneda, luego haz clic en "Cotizar".

API utilizada
Se usa la API de CryptoCompare para obtener información en tiempo real: https://min-api.cryptocompare.com
