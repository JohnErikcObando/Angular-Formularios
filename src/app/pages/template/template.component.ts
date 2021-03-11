import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {


  usuario={
    nombre:'John Erikc',
    apellido:'Obando',
    email:'Jeobando11@hotmail.com'
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar( forma:NgForm){
    console.log('Submit disparado', forma);

    if(forma.invalid){
      
      Object.values(forma.controls).forEach(control =>{
        control.markAllAsTouched();        
      })
      return;
    }

    console.log(forma.value);   
  }

}
