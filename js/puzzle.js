window.addEventListener("load", function()
{
    var img = document.getElementById("imagenPuzzle");
    var size = parseInt(img.getAttribute("size"));
    var contenido = document.getElementById("contenido");

    img.ondblclick = function()
    {
        // Mostramos la imagen en trozos en la tabla.
        var tabla = creaTablaPuzzle();
        contenido.append(tabla);
        img.style = "display: none";
        
        var arrayDeImagenes = tabla.getElementsByTagName("div");

        arrayDeImagenes = [].slice.call(arrayDeImagenes);

        var celdas = tabla.getElementsByTagName("td");

        var arrayDeImagenesAleatorias = arrayDeImagenes.sort(function(a,b) {
            return Math.random() - 0.5
        });

        for (let i = 0; i < celdas.length; i++)
        {
            celdas[i].appendChild(arrayDeImagenesAleatorias[i]);
        }

        for (let i = 0; i < celdas.length; i++)
        {
            celdas[i].onclick = function()
            {
                let hueco = tabla.getElementsByClassName("hueco")[0].parentElement;
                if (distanciaHueco(hueco,this,size) == 1)
                {
                    let auxiliar = hueco.innerHTML;
                    hueco.innerHTML = this.innerHTML;
                    this.innerHTML = auxiliar;
                }

                if(condicionVictoria(celdas))
                {
                    victoria(img,tabla);
                }
            }
        }

    }

    function condicionVictoria(celdas)
    {
        let resultado = true;
        for (let i = 0; i < celdas.length-1; i++)
        {
            if (celdas[i].getAttribute("indice") != celdas[i].firstElementChild.getAttribute("indice"))
            {
                return false;
            }
        }
        return resultado;
    }

    function victoria(img,tabla)
    {
        alert("Hemos ganao");
        img.style = "display: inline";
        tabla.style = "display: none";
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
                let divContenido = document.createElement("div");
                divContenido.setAttribute("indice",contador);
                divContenido.style.backgroundImage = "url(img/puzzle.jpg)";
                divContenido.style.backgroundRepeat = "no-repeat";
                divContenido.style.backgroundPositionX = -posiX+"px";
                divContenido.style.backgroundPositionY = -posiY+"px";
                divContenido.style.height = (img_height/size)+"px";
                divContenido.style.width = (img_width/size)+"px";
                if (i == size-1 && j == size-1)
                {
                    divContenido.className = "hueco";
                    divContenido.style.backgroundImage = "none";
                }
                celda.appendChild(divContenido);
                fila.appendChild(celda);
                contador++;
                
            }
            tabla.appendChild(fila);
        }

        return tabla;
    }

})

function distanciaHueco(celda1,celda2,size)
{
    x1 = Math.floor(celda1.getAttribute("indice")%size);
    x2 = Math.floor(celda2.getAttribute("indice")%size);
    y1 = Math.floor(celda1.getAttribute("indice")/size);
    y2 = Math.floor(celda2.getAttribute("indice")/size);

    console.log(celda1+" tiene coordenadas "+x1+" "+y1);
    console.log(celda2+" tiene coordenadas "+x2+" "+y2);

    distancia = ((x1-x2)**2)+((y1-y2)**2);
    console.log("Distancia es de "+distancia);

    return distancia;

}