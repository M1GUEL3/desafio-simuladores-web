document.addEventListener("DOMContentLoaded", () => {
    
    // ASIGNACIÓN DE EVENTOS
    document.getElementById("btn-calor").addEventListener("click", calcularLeyCalor);
    document.getElementById("btn-combinaciones").addEventListener("click", calcularCombinacionesSorteo);

    // ==========================================
    // EJERCICIO 1: LEY DE ENFRIAMIENTO
    // ==========================================
    function calcularLeyCalor() {
        const t0 = parseFloat(document.getElementById("t0").value);
        const ts = parseFloat(document.getElementById("ts").value);
        const k = parseFloat(document.getElementById("k").value);
        const t = parseFloat(document.getElementById("t-tiempo").value);
        const containerResultado = document.getElementById("resultado-calor");

        if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(t)) {
            mostrarMensaje(containerResultado, "Por favor, completa todos los campos con valores numéricos válidos.", true);
            return;
        }

        const exponente = -k * t;
        const temperaturaFinal = ts + (t0 - ts) * Math.exp(exponente);
        
        const resultadoRedondeado = Math.round(temperaturaFinal);

        mostrarMensaje(containerResultado, `Temperatura Final Calculada (T): ${resultadoRedondeado}°C`);
    }

    // ==========================================
    // EJERCICIO 2: COMBINACIONES COMPLEJAS
    // ==========================================
    function calcularCombinacionesSorteo() {
        const n1 = parseInt(document.getElementById("n1").value);
        const r1 = parseInt(document.getElementById("r1").value);
        const n2 = parseInt(document.getElementById("n2").value);
        const r2 = parseInt(document.getElementById("r2").value);
        const containerResultado = document.getElementById("resultado-combinaciones");

        if (isNaN(n1) || isNaN(r1) || isNaN(n2) || isNaN(r2)) {
            mostrarMensaje(containerResultado, "Todos los campos de combinaciones son obligatorios.", true);
            return;
        }

        // Validación mandatoria del documento: evitar incompatibilidades r > n 
        if (r1 > n1 || r2 > n2) {
            mostrarMensaje(containerResultado, "Error: El número de elementos a elegir (r) no puede ser mayor que el total de elementos (n).", true);
            return;
        }

        if (n1 < 0 || r1 < 0 || n2 < 0 || r2 < 0) {
            mostrarMensaje(containerResultado, "Los valores no pueden ser negativos.", true);
            return;
        }

        if (n1 > 170 || n2 > 170) {
            mostrarMensaje(containerResultado, "Por favor introduce valores de 'n' menores o iguales a 170 para evitar desbordamientos.", true);
            return;
        }

        const combinacionGrupo1 = obtenerCombinacion(n1, r1);
        const combinacionGrupo2 = obtenerCombinacion(n2, r2);
        const totalCombinaciones = combinacionGrupo1 * combinacionGrupo2;

        const resultadoFormateado = totalCombinaciones.toLocaleString();

        mostrarMensaje(containerResultado, `Total de combinaciones posibles: ${resultadoFormateado}`);
    }

    // Función iterativa/recursiva de factorial propia sin librerías externas [cite: 27]
    function calcularFactorial(numero) {
        if (numero === 0 || numero === 1) {
            return 1;
        }
        return numero * calcularFactorial(numero - 1);
    }

    function obtenerCombinacion(n, r) {
        return calcularFactorial(n) / (calcularFactorial(r) * calcularFactorial(n - r));
    }

    function mostrarMensaje(elemento, mensaje, esError = false) {
        elemento.textContent = mensaje;
        elemento.classList.remove("hidden", "error-box");
        
        if (esError) {
            elemento.classList.add("error-box");
        }
    }
});