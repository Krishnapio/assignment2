import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, FormArray, Validators} from '@angular/forms';


@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {
  activatorcard!: FormGroup;
  sum=0;
  count=1;
  addbutton=true;

  constructor() { }

  ngOnInit(): void {
    this.activatorcard = new FormGroup({
      'date': new FormControl('',Validators.required),
      'type': new FormControl('',Validators.required),
      'number': new FormControl('',Validators.required),
      'item_number': new FormArray([
        new FormControl(null)
      ]),
      'item_weight': new FormArray([
        new FormControl(null),
      ])
  })
  }
  
  get item_number () {
    return this.activatorcard.get('item_number') as FormArray;
  }

  get item_weight () {
    return this.activatorcard.get('item_weight') as FormArray;
  }

  removeitem(i:number){
    this.item_number.removeAt(i);
    this.item_weight.removeAt(i);
    this.count = this.count-1;
    this.addbutton =true;
  }

  additem(){
    const control = new FormControl(null);
    (<FormArray>this.activatorcard.get('item_number')).push(control);
    (<FormArray>this.activatorcard.get('item_weight')).push(control);
    this.count = this.count+1;
    console.log("count" + this.count);
    if(this.count > 8){
      this.addbutton=false;
    }
  }

  onSubmit(){
    this.sum=this.item_weight.value.reduce((pre: any, cur: any) => pre + cur, 0);
    console.log(this.sum);
  }
}
