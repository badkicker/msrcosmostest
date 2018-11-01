import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  displayedColumns = ['firstname', 'lastname', 'email', 'mobile', 'signupdate', 'logindate'];

  userdataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public masterSerObj: MasterService,
    private router: Router

  ) { }

  ngOnInit() {
    if (this.masterSerObj.dashboardFlag) {
      this.masterSerObj.getUsers().subscribe(
        (res: any) => {
          console.log(res);
          this.userdataSource.data = res.data;
        },
        (err) => {
          alert(err.error.messageText);
        }
      );
    }
    else {
      this.userdataSource.data = this.masterSerObj.userData;
    }
  }

  ngAfterViewInit() {
    this.userdataSource.paginator = this.paginator;
    this.userdataSource.sort = this.sort;

  }

  onlogout() {
    localStorage.clear();
    this.masterSerObj.token = "";
    this.masterSerObj.userId = "";
    this.masterSerObj.userType = "";
    this.router.navigate(['../login']);
  }

}
