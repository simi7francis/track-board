import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../app-component/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  productForm: FormGroup;
  name: string = '';
  password: string = '';
  error: boolean;
  data: any;
  constructor(protected formBuilder: FormBuilder,
    private _router: Router, private loginService: LoginServiceService) {
    this.productForm = formBuilder.group({
      userId: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  onSubmit() {
    console.log(this.productForm.value)
    this.data = this.productForm.value
    let req = {
      username: this.data['name'],
      password: this.data['password']
    }
    console.log(req)
    this.loginService.checkLoginCredentials(this.productForm.value).subscribe(
      (data: any) => {
        console.log("data", data)
        this._router.navigate(['first-component']);
      },
      // err => errorHandler(err)
    );

  }
  ngOnInit() {}
}
