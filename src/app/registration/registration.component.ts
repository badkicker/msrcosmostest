import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';



function onConfirmPasswordGiven(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    // console.log(pwd.value,cpwd.value)
    return { invalid: true };

  } else {
    return
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  btnSubmit = false;
  emailexist = false;
  passmatch = false;
  reg_form: FormGroup;
  passmismatch = false;
  checked = false;
  constructor(
    private fb: FormBuilder,
    public masterSerObj: MasterService,

    private router: Router,

  ) {
    if (this.masterSerObj.token !== '' && this.masterSerObj.token !== undefined) {
      if (this.masterSerObj.userType === 1) {
        this.router.navigate(['/dashboard']);
      } else if (this.masterSerObj.userType === 2) {
        this.router.navigate(['']);
      } 
    }
   }


  private matchValidator(pwd, cpwd) {

    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[pwd];
      let confirmPassword = group.controls[cpwd];

      if (password.value !== confirmPassword.value) {
        this.btnSubmit = false;
        return {
          mismatchedPasswords: true
        };
      }
    }

  }
  ngOnInit() {
    
    this.reg_form = this.fb.group({
      'firstname': new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      'lastname': new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      'mobile': new FormControl('', [Validators.minLength(10), Validators.pattern('^[1-9]+[0-9]*$')]),
      'email': new FormControl(null, [Validators.required, Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')], ),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),

      'type': new FormControl(null, [Validators.required]),
    }, { validator: this.matchValidator('password', 'confirmPassword') });
    // console.log(this.reg_form)
  }




  /* registration submit button */
  onRegister() {

    if (!this.reg_form.valid) {
      alert('Please provide required details');
      this.btnSubmit = true;
    } else {
      this.btnSubmit = false;
      if (this.reg_form.controls.password.value !== this.reg_form.controls.confirmPassword.value) {
        alert('Password & Confirm password not matching');
      } else if (!this.checked) {
        alert("Please accept terms & conditions");
      } else {

        var options = {
          "firstName": this.reg_form.controls.firstname.value.trim(),
          "lastName": this.reg_form.controls.lastname.value.trim(),
          "email": this.reg_form.controls.email.value.trim(),
          "contactNo": this.reg_form.controls.mobile.value.trim(),
          "password": this.reg_form.controls.password.value.trim(),
          "userType": this.reg_form.controls.type.value
        }

        this.masterSerObj.postRegistration(options).subscribe(
          (data: any) => {
            var res: any = <any>data;
            console.log(res);
            if (res.status === 1) {
              alert('Registration Successfull');
              this.router.navigate(['/login']);
            } else {
              alert('Registration failed please try after some time');
            }
          },
          (error) => {
            console.log(error)
            if (error.status === 404) {
              alert('Please try again later');
            } else {
              alert(error.error.messageText);
            }
          }
        );

      }
    }
  }
}
