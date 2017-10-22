//Variables globales:
var deck = []; //Array con las posiciones de las cartas
var flippedCards = 0;
var firstCard;
var aciertos = 0;
var timer;
var interval;
//Metodos:
$(document).ready(function(){
	//Funciones de estilo:
	$("input").focus(function(){
		$(this).css("background-color", "#cccccc");
	});
	$("input").blur(function(){
        $(this).css("background-color", "#ffffff");
    });
	
	//Función de inicio de juego:
	$("#play").click(function(){
		var N = $("#images").val();
		timer = $("#timer").val();
		$("#play").text("Reiniciar");
		//Removemos imagenes y valores de anteriores partidas:
		$( "img" ).remove();
		$( "br" ).remove();
		$( ".aciertos" ).remove();
		$( ".par" ).remove();
		$( ".time" ).remove();
		$( ".timer" ).remove();
		
		//Comprobamos que el tiempo esta en los parametros establecidos:
		if(timer < 10 || timer > 120){
			alert("Introduce un tiempo entre 10 y 120 segundos");
			return;
		}
		var x = 0;
		deck.length = 0;
		
		//Dibujamos las cartas y rellenamos el array de elementos, que estarán identificados por números:
		while ( x < N){
			//Usaremos el valor de la imagen como 0: parte trasera y 1: parte delantera
			var str = '<img id="' + x.toString() + '"src="images/back.png" alt="fondo" state value="0">'
			$("body").append(str);
			deck[deck.length]=x;
			x++;
		}
		x = 0;
		$("body").append('<br>');
		while ( x < N ){
			y = (Number(N) + Number(x));
			var str = '<img id="' + y.toString() + '"src="images/back.png" alt="fondo" state value="0">'
			$("body").append(str);
			deck[deck.length]=x;
			x++;
		}
		$("body").append('</br>');
		
		//Barajamos el deck de cartas (algoritmo Fisher-Yates):
		var indiceActual = deck.length;
		var valorTemporal; 
		var indiceAleatorio;
		while ( 0 != indiceActual ){
			indiceAleatorio = Math.floor(Math.random() * indiceActual);
			indiceActual -= 1;
			valorTemporal = deck[indiceActual];
			deck[indiceActual] = deck[indiceAleatorio];
			deck[indiceAleatorio] = valorTemporal;
		}
		aciertos = 0;
		$("body").append('<p class="par">Aciertos: <input type="text" class = "aciertos" value="0"  readonly></p>');
		//Activamos el reloj:
		$("body").append('<p class="time">Temporizador: <input type="text" class = "timer" value="' + timer.toString() + '" readonly></p>');
		timerControl(N);
	});

	//Función de volteo de carta:
	$('body').on('click','img',function(){
		if ($(this).attr('value').includes("1")){
			return;
		}
		$(this).attr("value", "1");
		var imgNumber = Number( $(this).attr('id') );
		var str = 'images/' + deck[imgNumber].toString() + '.png';
		//Animación de cambio de carta:
		$(this).hide();
		$(this).attr("src", str);
		$(this).show();
		//Sumamos contadores:
		flippedCards++;
		//Depende de las cartas levantadas realizaremos una acción u otra:
		if(flippedCards == 1){
			firstCard = $(this).attr('id');
		}
		var c1,c2;
		if(flippedCards == 2){
			c1 = deck[(Number(firstCard))];
			c2 = deck[Number($(this).attr('id'))];
			//Caso de las cartas son iguales:
			if(c1 == c2){
				aciertos++;
				$(".aciertos").attr('value',aciertos);
				flippedCards = 0;
				var imagenes = $("#images").val();
				if( imagenes == aciertos ) {
					setTimeout(function(){alert("Enhorabuena, has ganado la partida");},500);
					clearInterval(interval);
				}
			}
			//Caso de las cartas no son iguales:
			else{
				var id = $(this).attr('id');
				setTimeout(function(){flipBack(id,firstCard);},200);	
				flippedCards = 0;
				$(this).attr('value',"0");
				$("#"+firstCard).attr('value',"0");
			}
		}
	});
});
//Función para volver la carta a la parte trasera:
function flipBack(id,id2) {
	var str = 'images/back.png'
	$("#"+id).hide();
	$("#"+id).attr("src", str);
	$("#"+id).show();
	$("#"+id2).hide();
	$("#"+id2).attr("src", str);
	$("#"+id2).show();
}
//Función para controlar el temporizador:
function timerControl(cardNumber){
	interval = setInterval(function(){
		timer--;
		$(".timer").attr('value',timer);
		if(timer == -1 ){
			$(".timer").attr('value',0);
			clearInterval(interval);
			$(".timer").attr('value',0);
			var x = 0;
			while (x < cardNumber*2){
				$("#"+x).attr("value", "1");
				x++;
			}
			alert("Has perdido, prueba a intentarlo de nuevo");
		}
	}, 1000);

}