import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ban-users',
  templateUrl: './ban-users.component.html',
  styleUrls: ['./ban-users.component.css'],
})
export class BanUsersComponent implements OnInit {
  constructor(
    private _http: HttpService,
    private router: Router,
    private local: LocalService
  ) {}
  students: any;
  companies: any;
  trainingCenters: any;
  ngOnInit(): void {
    //////////////////// get all the users /////////////////////////////////
    this._http.httpGetStudents().subscribe((data) => {
      console.log('this is students ===>', (this.students = data));
    });
    this._http.httpGetCompanies().subscribe((data) => {
      console.log('this is comopanies ===>', (this.companies = data));
    });
    this._http.httpGetTrainingCenter().subscribe((data) => {
      console.log('this is training ===>', (this.trainingCenters = data));
    });
  }
  ////////////////// ban the user by its id /////////////////////////////
  banStudent(id) {
    var obj = {
      id: id,
    };
    // ban the user by its id
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban him',
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.httpbanstudent(obj).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire('banned!', 'this user is banned permently.', 'success');
      }
    });
  }
  banCompany(id) {
    console.log(id);
    var obj = {
      id: id,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban him',
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.httpbancompany(obj).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire('banned!', 'this user is banned permently.', 'success');
      }
    });
  }
  banCenter(id) {
    console.log(id);
    var obj = {
      id: id,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban him!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.httpbancenter(obj).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire('banned!', 'this user is banned permently.', 'success');
      }
    });
  }
  // DISCONNECT
  goback() {
    this.local.redirected = false;
    this.router.navigateByUrl('/admin/login');
  }
  // go to ban users interface
  ban() {
    this.router.navigateByUrl('/admin/ban');
  }
  // go to verification users interface
  verf() {
    this.router.navigateByUrl('/admin');
  }
  // go to memberships of training centers interface
  member() {
    this.router.navigateByUrl('/admin/update');
  }
  post() {
    this.router.navigateByUrl('/admin/delete');
  }
  feedback() {
    this.router.navigateByUrl('/AdminReport');
  }
  report() {
    this.router.navigateByUrl('/report/admin');
  }
  adTree() {
    this.router.navigateByUrl('/tree/admin');
  }
  coach() {
    this.router.navigateByUrl('/admin/addCoach');
  }
}
