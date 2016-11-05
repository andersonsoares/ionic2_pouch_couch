import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos'

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public nav: NavController, public http: Http, public todoService: Todos) {}

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

  register(){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
    };

    this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        this.todoService.init(res.json());
        this.nav.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      });   
 
    }

}
