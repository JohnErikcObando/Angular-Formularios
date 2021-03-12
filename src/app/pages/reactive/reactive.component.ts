import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb:FormBuilder) { 
    this.crearFormulario();
    this.cargarDataFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }

  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNovalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNovalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNovalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNovalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){
    this.forma= this.fb.group({
        nombre:['', [Validators.required, Validators.minLength(5)] ],
        apellido:['', [Validators.required, Validators.minLength(5)]],
        correo:['',[ Validators.pattern('[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-z]{2,3}$'), Validators.required]],
        direccion: this.fb.group({
          distrito:['', Validators.required],
          ciudad: ['', Validators.required]
        }),
        pasatiempos: this.fb.array([
         
        ])
    });
  }


  cargarDataFormulario(){
    // this.forma.setValue({
      this.forma.reset({
      nombre: "John Erikc",
      apellido: "Obando Ramirez",
      correo: "jeobando11@hotmail.com",
      direccion: {
        distrito: "colombia",
        ciudad: "buga"
      }
    });

    ['Comer', 'Domir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor))); //llenar array pasatiempo

  }


  agregarPasatiempo(){
    // this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required))
    this.pasatiempos.push(this.fb.control('', ))
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }


  guardar(){
      console.log(this.forma);

      if(this.forma.invalid){
      
        return Object.values(this.forma.controls).forEach(control =>{
          
          if (control instanceof FormGroup){
            Object.values(control.controls).forEach(control => control.markAllAsTouched())
          }else{
            control.markAllAsTouched();        
          }
        });
        
      }
    
      //posteo de informacion
      // this.forma.reset();

  }

}
