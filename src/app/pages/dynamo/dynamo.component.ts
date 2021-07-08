import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { onAuthUIStateChange, AuthState, CognitoUserInterface } from '@aws-amplify/ui-components'
import { APIService, CreateTodoInput } from 'src/app/API.service';

@Component({
  selector: "app-dynamo",
  templateUrl: "dynamo.component.html"
})
export class DynamoComponent implements OnInit, OnDestroy {
  
  todoList: any = new Array();
  constructor(private dynamoService: APIService) { }

  ngOnInit() {
    //this.createTodo("Task 2", "This is my second task");
    this.loadAllTodos();
  }

  createTodo(taskName:string, description:string){
    this.dynamoService.CreateTodo({name:taskName,description:description} as CreateTodoInput).then((data) =>{
      console.log("Dynamo db data =>",data);
    }).catch((error) =>{
      console.log("Error",error);
    });
  }


  loadAllTodos(){
    this.dynamoService.ListTodos().then((data) =>{
      console.log("Dynamo db data =>",data);
      this.todoList = data.items;
    }).catch((error) =>{
      console.log("Error",error);
    });
  }
  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}