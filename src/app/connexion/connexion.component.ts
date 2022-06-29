import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConnexionService } from '../service/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user: any
  msg: any

  constructor(private http: HttpClient, private route: Router, private connexionservice: ConnexionService) { }

  ngOnInit(): void {
    //Check if user's credentials allows him to connect

  }

  connexion(val: any): any {
    this.http.post('http://localhost:8090/connexion', val).subscribe({
      next: (data) => {
        this.user = data;
        if (this.user != null) {
      
            this.route.navigateByUrl('accueil');
          

        } else {
          this.msg = 'Identifiants incorrectes !! ';
          console.log('identifiants incorrectes ! ')
        }
      }, error: (err) => { console.log(err) }
    })
  }

}
