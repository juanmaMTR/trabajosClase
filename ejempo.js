//Alex Preciado

'use strict'

//console.log("Cargado JS");

//Clase principal donde se llaman a los metodos que deben ejecutarse para mostrar la película :)
class Pelicula{
  constructor(){
    //console.log("Se ha creado la pelicula");
    this.titulo = "Tiroteo en Antonio Dominguez Town"
    this.pueblo = new Pueblo("Todo polvos, ", "chungo, polvos para lavar la ropa, polvos pica pica, polvo sobre los muebles y polvos matutinos")
    this.narrador = new Narrador();
    this.anselmo = new PersonajeBueno('Anselmo', this.narrador);
    this.rufina = new PersonajeBueno('Rufina', this.narrador);
    this.morgan = new PersonajeMalo('Morgan', this.narrador);
    this.arma = new Arma();

    this.iniciar();
  }
  iniciar(){
    document.write('<h1>'+this.titulo+'</h1>');
    document.write('<p>'+this.pueblo.nombre+' era un pueblo '+this.pueblo.descripcion+'.</p>');
    this.anselmo.hablar('Hola '+this.rufina.nombrePersonaje+'...');
    this.rufina.hablar('Hola '+this.anselmo.nombrePersonaje+'...');
    this.narrador.hablar('Ambos se miraron un instante y siguieron su camino...');
    this.morgan.hablar('Vaya pueblo mas... Polvoriento...');
    this.morgan.hablar('Eh tu, dame tu caballo y tu dinero!!!');
    while(!this.anselmo.muerto && !this.morgan.muerto){
      this.anselmo.disparar(this.morgan);
      this.morgan.disparar(this.anselmo);
    }
  }

}

//Datos del Pueblo, semejante a una estructura
class Pueblo{
  constructor(nombre,descripcion){
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

//Crea el texto del narrador
class Narrador{
  hablar(texto){
    document.write('<p>'+texto+'</p>');
  }
}

//Clase general que define los metodos de las acciones de los personajes
class Personaje{
  constructor(nombrePersonaje, narrador){
    this.nombrePersonaje = nombrePersonaje;
    this.arma = new Arma();
    this.narrador = narrador;
    this.muerto = false;
    this.recargado = false;
  }
  hablar(texto){
    document.write('<p><span class="personaje">'+this.nombrePersonaje+': </span>'+texto+'</p>');
  }
  disparar(nombreDisparado){
    if(!this.muerto){
      if(this.arma.balas>0){
        document.write('<p><span class="personaje">'+this.nombrePersonaje+': </span>PUM!!!</p>');
        this.aciertoFallo(nombreDisparado);
        this.arma.balas--;
      }else{
        document.write('<p><span class="personaje">'+this.nombrePersonaje+': </span>CLICK!!!</p>');
        if(!this.recargado){
          this.recargar();
        }
      }
    }
  }
  aciertoFallo(nombreDisparado){
    let dado=Math.floor(Math.random()*6)+1;
    if(dado<=3){
      nombreDisparado.hablar("Ay!!!");
      this.muerte(nombreDisparado);
    }
  }
  recargar(){
    let balasRecargadas=Math.floor(Math.random()*6)+1;
    while(this.arma.balas<this.arma.cargador){
      this.arma.balas++;
      balasRecargadas--;
    }
    this.recargado = true;
  }
  muerte(nombreDisparado){
    let dado=Math.floor(Math.random()*6)+1;
    if(dado<3){
      this.narrador.hablar('<p>'+nombreDisparado.nombrePersonaje+' ha muerto...</p>');
      nombreDisparado.muerto = true;
   }
  }
}

//Para aplicar estilos diferentes a los textos de los distintos personajes
class PersonajeBueno extends Personaje{
  hablar(texto){
    document.write('<p class="bueno"><span class="personaje">'+this.nombrePersonaje+': </span>'+texto+'</p>');
  }
}

class PersonajeMalo extends Personaje{
  hablar(texto){
    document.write('<p class="malo"><span class="personaje">'+this.nombrePersonaje+': </span>'+texto+'</p>');
  }
}

//Caracteristicas del arma, deberian estar aqui los metodos propios de esta pero "alguien" no ha explicado las superclases
class Arma{
  constructor(){
    this.cargador = 6;
    this.balas = 6;
  }
}

new Pelicula();
