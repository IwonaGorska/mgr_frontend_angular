import { Component, OnInit } from '@angular/core';
import { ItemsServiceService } from '../../services/items-service.service';

import { Observable } from 'rxjs';
import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  items: any;
  itemsSize = 0;

  interval: any;
  subscription: Subscription;

  constructor(private service: ItemsServiceService) {
   }

  ngOnInit(): void {
    // this.getAllItems(); // don't wait in the beginning

    this.subscription = timer(0, 3000).pipe(
      switchMap(() => this.service.getAll())
    ).subscribe(
      data => {
        // console.log('getAllItems successful ', data);
        this.items = data;
        this.itemsSize = this.items.length;
      },
      error => {
        console.log('getAllItems error :(', error);
      }
      );
    
  }

  getAllItems(){
    this.service.getAll()
    .subscribe(
      data => {
        console.log('getAllItems successful ', data);

        this.items = data;
        this.itemsSize = this.items.length;
        // console.log("Items length info = " + this.items.length);
        // this.items = JSON.parse(data);
      },
      error => {
        console.log('getAllItems error :(', error);
      }
    );
 }

 ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
