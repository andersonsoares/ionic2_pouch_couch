import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

  // templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  // constructor(public navCtrl: NavController) {}
  username: string;
  password: string;
 
  constructor(public nav: NavController, public http: Http, public todoService: Todos) {
 
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        username: this.username,
        password: this.password
    };

    this.http.post('http://192.168.1.102:3000/auth/login', JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        console.log(res.json())
        this.todoService.init(res.json());
        this.nav.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      });
  }

  launchSignup(){
    this.nav.push(SignupPage); 
  }

}
