import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Todos } from '../../providers/todos'
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;

  constructor(public nav: NavController, public todoService: Todos, public alertCtrl: AlertController) {
    console.log("home.ts constructor");
  }

  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      console.log('home.ts ionViewDidLoad: ' + JSON.stringify(data));
      this.todos = data;
    });
  }

  logout(){
    console.log('home.ts logout()');
    this.todoService.logout();
    console.log('home.ts apagando todos');
    this.todos = null;
    console.log('home.ts chamando LoginPage');
    this.nav.setRoot(LoginPage);
  }

  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }

  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
                _id: todo._id,
                _rev: todo._rev,
                title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

}
