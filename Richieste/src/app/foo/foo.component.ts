import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from '../models/foo.model';

@Component({
  selector: 'app-foo',
  imports: [CommonModule],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent implements OnInit
{
  //Oggetti classe Foo
  fooData! : Foo[];
  oFoo! : Observable<Foo[]>;


  //Get e post prima lezione
  http: HttpClient;
  data!: Object;
  loading!: boolean;
  o! :Observable<Object>;
  dati_post: Object =  JSON.stringify({
        body: 'bar',
        title: 'foo',
        userId: 1
       })
  messaggio!: string 
  constructor(http: HttpClient) 
  {
    this.http = http;
  }

  //GET
  makeRequest(): void {
    //Notifichiamo che stiamo attendendo dei dati
    this.loading = true; 
    //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
    //risposta
    this.o.subscribe(this.getData);
  }
  getData = (d : Object) => //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
  {
    this.data = d; //Notifico l’oggetto ricevuto dal server
    this.loading = false;
    console.log(this.data)
    this.messaggio = "Get Eseguita corretamente!"  // Notifico che ho ricevuto i dati
  }

  //POST
  makePost(): void {
   this.loading = true;
   this.o = this.http.post('https://jsonplaceholder.typicode.com/posts', this.dati_post)
   this.o.subscribe(this.postData)
  }
  postData = (d: object) =>
  {
    this.data = d;
    this.loading = false;
    console.log("Dati Mandati")
    this.messaggio = "Post eseguita corretamente!"
  }

  makeTypedRequest() : void
 {
   //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
   this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
   this.oFoo.subscribe(data => {this.fooData = data;});
   this.messaggio = "Oggetti ricevuti!"
 }

 ngOnInit() {}


}
