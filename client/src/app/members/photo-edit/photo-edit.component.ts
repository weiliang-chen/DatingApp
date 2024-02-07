import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrl: './photo-edit.component.css'
})
export class PhotoEditComponent implements OnInit{
  
  @Input() member : Member | undefined; //pass down from parent
  

  constructor() { }

  ngOnInit(): void {

  }

}
