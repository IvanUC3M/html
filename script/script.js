var deck;
var contador = 0;
var imagenes=21;
//Variables que irán cambiando según volteemos cartas:
var imgvolteadas;
var img1;
var img2;
var img1id;
var aciertos;
function timerCheck(){
	var x = document.getElementById("timer").value;
	var y = document.getElementById("images").value;
	if(x < 10 || x > 120){
		window.alert("Debes introducir un tiempo entre 10 y 120 segundos");
	}
	else{
		document.getElementById("play").innerHTML = "Reiniciar";
		var x = 0;
		deck = ["blue","blue","brown","brown","green","green"];
		while( x < 20){
			document.getElementById(x.toString()).style.display = "none";
			document.getElementById(x.toString()).src="images/back.png";
			x++
		}
		playGame(x,y);	
	}
}
//Función para preparar el juego:
function playGame(timer, N){
	var x = 3;
	imagenes=N;
	imgvolteadas=0;
	aciertos=0;
	//Vamos rellenando nuestro tablero de juego con las cartas según las imagenes que nos hayan dicho
	while( x < N ){
		switch(x){
		case 3:
			deck[deck.length]="grey";
			deck[deck.length]="grey";
			break;
		case 4:
			deck[deck.length]="orange";
			deck[deck.length]="orange";
			break;
		case 5:
			deck[deck.length]="pink";
			deck[deck.length]="pink";
			break;
		case 6:
			deck[deck.length]="purple";
			deck[deck.length]="purple";
			break;
		case 7:
			deck[deck.length]="red";
			deck[deck.length]="red";
			break;
		case 8:
			deck[deck.length]="white";
			deck[deck.length]="white";
			break;
		case 9:
			deck[deck.length]="yellow";
			deck[deck.length]="yellow";
			break;
	}
	x++;
	}
	//Barajamos el array para conseguir una distribución aleatoria de colores con el algoritmo Fisher-Yates
	var indiceActual = deck.length;
	var valorTemporal; 
	var indiceAleatorio;
	while (0 != indiceActual){
		indiceAleatorio = Math.floor(Math.random() * indiceActual);
		indiceActual -= 1;
		valorTemporal = deck[indiceActual];
		deck[indiceActual] = deck[indiceAleatorio];
		deck[indiceAleatorio] = valorTemporal;
	}	
	//Ahora ya tenemos posiciones aleatorias en las cartas*/
	x = 0;
	var y;
	while( x < N ){
		y = x+10;
		document.getElementById(y.toString()).style.display = "inline";
		document.getElementById(x.toString()).style.display = "inline";
		x++;
	}
}
function flipCard(id){
	var x = Number(id);
	if ( x > 9){
		x = x - (10-imagenes);
	}
	var source="images/" + deck[x] + ".png";
	document.getElementById(id).src=source;
	document.getElementById(id).onclick="return false;";
	if(imgvolteadas == 1){
		imgvolteadas++;
		img2 = deck[x];
	}
	if(imgvolteadas == 0){
		imgvolteadas++;
		img1 = deck[x];
		img1id = id;
	}
	if(imgvolteadas == 2){
		
		if (img1.includes(img2)){
			aciertos++;
			imgvolteadas=0;
		}
		else{
			setTimeout(function(){flipBack(id,img1id);},200);	
			imgvolteadas=0;
		}
	}
	if( aciertos == imagenes){
		setTimeout(winner, 500);
	}
}
function winner(){
	window.alert("¡Enhorabuena! Has ganado la partida");
}
function flipBack(id1,id2){
	document.getElementById(id1).src="images/back.png";
	document.getElementById(id2).src="images/back.png";
	document.getElementById(id1).onclick=function(){flipCard(id1);};
	document.getElementById(id2).onclick=function(){flipCard(id2);};
}