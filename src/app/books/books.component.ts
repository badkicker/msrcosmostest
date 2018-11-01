import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  form: FormGroup;
  btnText = "Add";
  bookData:any;
  constructor(
    public masterSerObj: MasterService,
    public dialogRef: MatDialogRef<BooksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }

  ngOnInit() {
    this.form = new FormGroup({
      'bookname': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'authorname': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required])
    });
    if (this.data !== undefined) {
      if (this.data.btnText == "Update") {
        this.btnText = "Update";
        this.bookData= this.data.bookData;
        this.bindData();
      }
    }
  }

  bindData() {
    // this.form.
    this.form.controls.bookname.setValue(this.bookData.bookName);
    this.form.controls.authorname.setValue(this.bookData.author);
    this.form.controls.quantity.setValue(this.bookData.quantity);
  }
  onAdd() {
    if (this.form.valid) {
      const bookname = this.form.value.bookname.trim();
      const authorname = this.form.value.authorname.trim();
      const quantity = this.form.value.quantity.trim();

    
      if (this.btnText == "Add") {
        let options = {
          bookName: bookname,
          author: authorname,
          quantity: quantity
        }
        this.masterSerObj.postBook(options).subscribe(
          (data: any) => {
            var res: any = <any>data;
            console.log(data);
            if (res.status === 1) {
              var arr = res.data;
              console.log(arr);
              this.dialogRef.close();
            }
          },
          (error) => {
            console.log(error);
            if (error.status === 404) {
              alert('please try gain later');
            } else if (error.status > 0) {
              alert(error.error.messageText)
            }
          }
        )
      } else {
        let options = {
          bookId:this.bookData.bookId,
          bookName: bookname,
          author: authorname,
          quantity: quantity
        }
        this.masterSerObj.putBook(options).subscribe(
          (data: any) => {
            var res: any = <any>data;
            console.log(data);
            if (res.status === 1) {
              var arr = res.data;
              console.log(arr);
              this.dialogRef.close();
            }
          },
          (error) => {
            console.log(error);
            if (error.status === 404) {
              alert('please try gain later');
            } else if (error.status > 0) {
              alert(error.error.messageText)
            }
          }
        )
      }

    } else {
      alert("Please enter required details");
    }
  }
}
