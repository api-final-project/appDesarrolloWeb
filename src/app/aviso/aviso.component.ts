import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AvisoComponent>,) { }

  ngOnInit(): void {
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
