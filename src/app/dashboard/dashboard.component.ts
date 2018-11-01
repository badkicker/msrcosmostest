import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';
import { BooksComponent } from '../books/books.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['bookName', 'author', 'quantity','pubDate', 'action'];
  booksdataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);;
  userdataSource: MatTableDataSource<Array<any>>= new MatTableDataSource([]);;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public masterObj: MasterService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.booksdataSource.data = [];
    this.masterObj.dashboardFlag = true;
    this.getBooks();
  }

  ngAfterViewInit() {
    this.booksdataSource.paginator = this.paginator;
    this.booksdataSource.sort = this.sort;

  }

  getBooks(){
   
    this.masterObj.getBooks().subscribe(
      (res:any)=> {
        if(res.status ==1){
          this.booksdataSource.data = res.data;
        }
      },
      (err)=> {
        alert(err.error.message);
      }
    );
  }
  addBook() {
    let dialogRef = this.dialog.open(BooksComponent, {
      width: '400px',
      data: { btnText: 'Add', bookData: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }
  onUpdate(row,i){
    let dialogRef = this.dialog.open(BooksComponent, {
      width: '400px',
      data: { btnText: 'Update', bookData: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }
  onDelete(row,i){
    // deletebook
console.log(row);
    this.masterObj.deletebook(row).subscribe(
      res=> {
        console.log(res);
        this.getBooks();
      },
      err=> {
        console.log(err);
        alert(err.error.messageText);
      }
    )
  }
  onlogout() {
    localStorage.clear();
    this.masterObj.token = "";
    this.masterObj.userId = "";
    this.masterObj.userType = "";
    this.masterObj.dashboardFlag= false;
    this.router.navigate(['../login']);
  }
}
