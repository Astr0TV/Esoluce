import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlSerializer } from '@angular/router';
import { ConnexionService } from '../service/connexion.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})  
export class HomeComponent implements OnInit {
  panelOpenState = false;
  newmessage: any;
  message: any;
  connexionnew: any
  date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  constructor(private route:Router,private connexionservice:ConnexionService,private http: HttpClient) { 
    
  } 

  goToPage(pageName: string): void {
    this.route.navigate([`${pageName}`]);
    localStorage.clear();
  }

  


  ngOnInit(): void {
    var test = JSON.parse(localStorage.getItem('userConnect') || '{}' ) 
    if (this.connexionservice.isConnected()) {
        this.route.navigateByUrl('accueil');
      
  } else {
    this.route.navigateByUrl('connexion');
  
  }
    this.http.get('http://localhost:8090/allmessage').subscribe({
      next: (data) => { this.newmessage = data; 
        console.log('this msg concernec les informations de'); 
        console.log(data) },
      error: (err) => {console.log(err); }
    });

        //recuperation de l'utilisateur connécté
        this.http.get('http://localhost:8090/user/'+ test.id).subscribe({
          next: (data) => { this.connexionnew = data; 
            console.log('this msg concernec les informations de'); 
            console.log(data) },
          error: (err) => {console.log(err); }
        });
  }

  reloadPage() {
   window.location.reload();
}

  envoyemessage(message:any){
    var test = JSON.parse(localStorage.getItem('userConnect') || '{}' ) 
      var newcandidat =  {
        "message": message,
        "date": this.date,
        "user": {
          "id": test.id,
          "nom": test.nom,
          "prenom": test.prenom,
          "email": test.email,
          "mdp": test.mdp,
        }
      };
  
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
  
      this.http.post('http://localhost:8090/message', JSON.stringify(newcandidat), { headers: headers })
      .subscribe({
        next:(data)=>{},
        error:(err)=>{console.log(err);}
        })
      
        }

}
