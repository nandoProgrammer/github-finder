import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  formFilters!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit():void {
    this.createForm();
  }

  send():void {
    const { userName } = this.f.value;
    this.navigateByProfile(userName);
  }

  navigateByProfile(userName: string):void {
    this.router.navigate([`profile/${userName}`]);
  }

  createForm():void {
     this.formFilters = this.formBuilder.group({
       userName: [''],
     });
  }

  get f() {
    return this.formFilters;
  }
}
