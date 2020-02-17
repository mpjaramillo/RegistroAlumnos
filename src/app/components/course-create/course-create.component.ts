import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})

export class CourseCreateComponent implements OnInit {
  submitted = false;
  courseForm: FormGroup;
  CourseProfile:any = ['Técnica', 'Administrativa', 'Biológica', 'Sociohumanística']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      area: ['', [Validators.required]],
      hours: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.courseForm.get('area').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.courseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.courseForm.valid) {
      return false;
    } else {
      this.apiService.createCourse(this.courseForm.value).subscribe(
        (res) => {
          console.log('Course successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
