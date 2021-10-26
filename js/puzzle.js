var size = 4; // Esta variable determina el tamaño del puzzle.

window.addEventListener("load", function()
{
    var img = document.getElementById("imagenPuzzle");
    var contenido = document.getElementById("contenido");

    img.ondblclick = function()
    {
        // Mostramos la imagen en trozos en la tabla.
        var tabla = creaTablaPuzzle();
        contenido.append(tabla);
        img.style = "display: none";

        var arrayDeImagenes = [];
        
        let contador = 0;
        for (let i = 0; i < tabla.rows.length; i++)
        {
            for (let j = 0; j < tabla.rows[i].cells.length; j++)
            {
                arrayDeImagenes[contador] = tabla.rows[i].cells[j];
                contador++;
            }
        }
        
        organizacionAleatoriaTabla();

        function organizacionAleatoriaTabla()
        {
            veces = Math.floor(Math.random()*100);

            for(let i = 0; i < veces; i++)
            {
                celda1 = Math.floor(Math.random() * 15);
                celda2 = Math.floor(Math.random() * 15);
                intercambio(celda1,celda2);
            }
        }

        function intercambio(celda1,celda2)
        {
            cell1 = tabla.rows[Math.floor(celda1/size)].cells[Math.floor(celda1%size)];
            cell2 = tabla.rows[Math.floor(celda2/size)].cells[Math.floor(celda2%size)];

            celdaAuxiliar = cell1;
            cell1 = cell2;
            cell2 = celdaAuxiliar;

            tabla.rows[Math.floor(celda2/size)].cells[Math.floor(celda2%size)] = cell1;
            tabla.rows[Math.floor(celda1/size)].cells[Math.floor(celda1%size)] = cell2;
        }

        celdas = document.getElementsByTagName("td");

        for (let i = 0; i < celdas.length; i++)
        {
            celdas[i].onclick = function()
            {
                alert("Esta es la celda nº"+i);
            }
        }

    }

    function creaTablaPuzzle()
    {
        let contador = 0;
        var tabla = document.createElement("table");
        tabla.style.borderSpacing = "0px";
        tabla.style.borderCollapse = "collapse";
        tabla.style.padding = "0px";
        let img_width = parseInt(img.naturalWidth);
        let img_height = parseInt(img.naturalHeight);
        for(let i = 0; i < size; i++)
        {
            fila = document.createElement("tr");
            for (let j = 0; j < size; j++)
            {
                let celda = document.createElement("td");
                celda.setAttribute("indice",contador);
                celda.style.height = (img_height/size)+"px";
                celda.style.width = (img_width/size)+"px";
                let posiX = (img_width/size)*(contador%size);
                let posiY = (img_height/size)*parseInt(contador/size);
                celda.style.backgroundImage = "url(img/puzzle.jpg)";
                celda.style.backgroundRepeat = "no-repeat";
                celda.style.backgroundPositionX = -posiX+"px";
                celda.style.backgroundPositionY = -posiY+"px";
                fila.appendChild(celda);
                contador++;
            }
            tabla.appendChild(fila);
        }

        return tabla;
    }

// Sería lo suyo hacer una función de distancia al hueco una vez averigue cómo hacer eso.

})