/**
 * Librería para imágenes prototipo en JavaScript
 * de la clase "puzzle".
 * Contiene todo lo necesario para que una imagen
 * pueda descomponerse en piezas y jugar con ella
 * como si de un puzzle se tratase.
 */

//HTMLImageElement.prototype.

// Pues estoy confuso... ¿ahora resulta que se hace con objetos? Esto es muy confuso. Lo bueno es que mi solución funciona.

class Puzzle {

    constructor(_imagen, _columnas = 3, _filas = 3)
    {
        this.imagen = _imagen;
        this.columnas = _columnas;
        this.filas = _filas;
    }

    // Y a partir de aquí funciones, creación de tablas, etcétera y demás historias.

    

}

window.addEventListener("load", function()
{
    var imagenes = document.querySelectorAll("img.puzzle");

    for (let i = 0; i < imagenes.length; i++)
    {
        // Poner condicionales para columnas y filas para si están o no están o dejan de estar
        var columnas = imagenes[i].getAttribute("cols");
        var filas = imagenes[i].getAttribute("rows");
        imagenes[i].puzzle(imagenes[i], columnas, filas);
    }
})