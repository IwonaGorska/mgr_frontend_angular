import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ItemsServiceService } from '../../services/items-service.service'
import { TestsServiceService } from '../../services/tests-service.service'
// import { Item } from '../../models/item.model'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  showPopup: Boolean = false;
  popupText: String =  "Błędne dane";
  // items: Object = {};
  // items: Item[];
  // items: {};
  items: any;
  // service = new ItemsServiceService(http);

  constructor(public dialog: MatDialog, private service: ItemsServiceService, private tService: TestsServiceService) { 
    // this.amount = 0;
    // this.phrase = "";
    // this.showPopup = false;
    // this.popupText = "Błędne dane";
    this.beginTest();
  }

  ngOnInit(): void {
    this.showPopup = false;
    this.popupText = "Błędne dane";
    this.getAllItems();
  }

  beginTest(){
    window.onload = function () {
       console.log('start onload');
       let time = window.performance.timing;
       let pageloadtime = time.loadEventStart - time.navigationStart;
       console.log('pageloadtime = ', pageloadtime);

       this.sendTestResult(4, pageloadtime);

      //  if (!performance.memory) {
      //     console.log("performance.memory() is not available.");
      //     return;
      //  }
      //  console.log('performance.memory.usedJSHeapSize = ', performance.memory.usedJSHeapSize); 
     }
 }

  operations = [
      //  {
      //     "label": "Tworzenie pojedynczego rekordu",
      //     "isInput": true,
      //     "dropdown": [],
      //     "dropdownTitle": "",
      //     "phrase": ""
      //  },
       {
          "label": "Tworzenie rekordów",
          "isInput": true,
          "dropdown": [1, 10, 100, 1000], 
          "dropdownTitle": "Powtórzenia",
          "amount": 0,
          "phrase": ""
       },
       {
         "label": "Zastąpienie rekordów nowymi wartościami",
         "isInput": true,
         "dropdown": [1, 10, 100, 1000], 
         "dropdownTitle": "Powtórzenia",
         "amount": 0,
         "phrase": ""
       },
      //  {
      //    "label": "Wyszukanie rekordu",
      //    "isInput": false,
      //    "dropdown": [],
      //    "dropdownTitle": ""
      //  },
      {
        "label": "Wyszukanie rekordów",
        "isInput": false,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0,
        "phrase": ""
      },
      //  {
      //    "label": "Usunięcie pojedynczego rekordu",
      //    "isInput": false,
      //    "dropdown": [],
      //    "dropdownTitle": ""
      //  },
       {
         "label": "Usunięcie rekordów",
         "isInput": false,
         "dropdown": [1, 10, 100, 1000],
         "dropdownTitle": "Powtórzenia",
         "amount": 0
       }
    ];

    togglePopup(text) {
      this.showPopup = !this.showPopup;
      this.popupText = text;
      this.dialog.open(PopupComponent, {
        data: {
          text: text
        }
      });
    }

    validate(index, phrase, amount) {
      var text = "";
      this.getAllItems();//update the  items object so everywhere we have access to current state in database
      //I need to know during the validation, just now, the current items list
      //subscription will wait maybe 1 sec and then things can change, cause error
      var max = Object.keys(this.items).length;
      // console.log(max);
      //var max = 1;
      var isCorrect = true;
      // if([1, 2, 5].includes(index) && !amount){
      //   text += "Należy wybrać liczbę z listy. ";
      //   isCorrect = false;
      // }
    
      // if([2, 5].includes(index) && amount > max){
      //   text += "Wybrana liczba jest większa niż aktualna liczba wszystkich rekordów. ";
      //   isCorrect = false;
      // }
    
      // if([0, 1, 2].includes(index) && !phrase){
      //   text += "Pole tekstowe nie może być puste. ";
      //   isCorrect = false;
      // }
      //or without this first condition
  if([0, 1, 2, 3].includes(index) && amount === 0){ 
    text += "Należy wybrać liczbę z listy. ";
    isCorrect = false;
  }

  if([1, 3].includes(index) && amount > max){
    text += "Wybrana liczba jest większa niż aktualna liczba wszstkich rekordów. ";
    isCorrect = false;
  }

  if([2].includes(index) && max == 0){
    text += "Aktualna liczba wszstkich rekordów jest równa 0. ";
    isCorrect = false;
  }

  if([0, 1].includes(index) && !phrase){
    text += "Pole tekstowe nie może być puste. ";
    isCorrect = false;
  }
    
      if(!isCorrect){
        this.togglePopup(text);
      }
    
      return isCorrect;
    }

    submit(index){
      event.preventDefault();
      var phrase = this.operations[index].phrase;
      var amount = this.operations[index].amount;
      if(!this.validate(index, phrase, amount))
        return;
      
        switch(index){
          // case 0: this.createSingleItem(phrase); break;
          case 0: this.createItems(phrase, amount); break;
          case 1: this.updateItems(phrase, amount); break;
          // case 3: this.searchForItem(); break;
          case 2: this.searchForItems(amount); break;
          // case 5: this.deleteSingleItem(); break;
          case 3: this.deleteItems(amount); break;
          default: console.log("Uncorrect operation number");
        }
    }

    getAllItems(){
      this.service.getAll()
      .subscribe(
        data => {
          // console.log('getAllItems successful ', data);
          this.items = data;
        },
        error => {
          console.log('getAllItems error :(', error);
        }
      );
   }

    // createSingleItem(phrase){
    //   console.log("Create single item");
    //     var postObject = {
    //         name: phrase
    //     }
    //     this.service.create(postObject)
    //     .subscribe(
    //       (data: any) => {
    //         console.log('createSingleItem successful ', data);
    //       },
    //       error => {
    //         console.log('createSingleItem error :(', error);
    //       }
    //     );
    // }
      
    createItems(phrase, amount){
      console.log("Create many items");
      let t0 = performance.now();
      for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
        var postObject = {
          name: phrase
        }
        this.service.create(postObject)
        .subscribe(
          data => {
            // console.log('createManyItems successful ', data);
          },
          error => {
            console.log('createManyItems error :(', error);
          }
        );
      }
      let t1 = performance.now();
      console.log("Performance create item: ", (t1 - t0)/amount, 'milliseconds');

      this.sendTestResult(1, (t1 - t0)/amount);

    }
    
    updateItems(phrase, amount){
      //to obliczenie, że co 10 np. to rób tutaj i stąd uderzaj w endpoint jak na pojedynczy, tylko ze w petli
      // bo testujesz wydajnosc frontu, a jak zrobisz inaczej, to od serwera bd dokladnie wszystko zalezalo
      //i tu to amount to bedzie konkretne id do zaktualizowania
      //wyliczysz sobie, bo liczbe wszystkich rekordow w bazie bd przechowywala tez
      //z tego zapytania GET tez skorzystaj i bd trzeba je tu trzymac na froncie w arrayu i id z nich pobierac do 
      //kolejnych requestow uzytku
      console.log("Update many items");
      let t0 = performance.now();
      var postObject = {
        name: phrase
      }
      for(let i = 0; i < amount; i++){
        var id = this.items[i].item_id;
        this.service.update(id, postObject)
        .subscribe(
          data => {
            // console.log('updateManyItems successful ', data);
          },
          error => {
            console.log('updateManyItems error :(', error);
          }
        );
      }
      let t1 = performance.now();
      console.log("Performance update item: ", (t1 - t0)/amount, 'milliseconds');

      this.sendTestResult(2, (t1 - t0)/amount);
    }
      
    // searchForItem(){
    //   //wylosuj id
    //   var id = this.drawId();
    //   //zrob request z tym id
    //   this.service.get(id)
    //   .subscribe(
    //     data => {
    //       console.log("Found item = " + JSON.stringify(data));
    //     },
    //     error => {
    //       console.log('searchForItem error :(', error);
    //     }
    //   );
    // }

    searchForItems(amount){
      console.log("Search for items");
      let t0 = performance.now();
      for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
        let id = this.drawId();
        this.service.get(id)
        .subscribe(
          data => {
            // console.log("Found item = " + JSON.stringify(data));
          },
          error => {
            console.log('searchForItem error :(', error);
          }
        );
      }
      let t1 = performance.now();
      console.log("Performance search for item: ", (t1 - t0)/amount, 'milliseconds');
    
      this.sendTestResult(3, (t1 - t0)/amount);
    }
    
    // deleteSingleItem(){
    //   console.log("Delete single item");
    //   //wylosuj id
    //   var id = this.drawId();
    //   //zrob request z tym id
    //   this.service.delete(id)
    //   .subscribe(
    //     data => {
    //       console.log(JSON.stringify(data));
    //     },
    //     error => {
    //       console.log('deleteSingleItem error :(', error);
    //     }
    //   );
    // }
    
    deleteItems(amount){
      console.log("Delete many items");
      let t0 = performance.now();
      for(let i = 0; i < amount; i++){
        var id = this.items[i].item_id;
        this.service.delete(id)
        .subscribe(
          data => {
            // console.log(JSON.stringify(data));
          },
          error => {
            console.log('deleteManyItems error :(', error);
          }
        );
      }
      let t1 = performance.now();
      console.log("Performance delete item: ", (t1 - t0)/amount, 'milliseconds');

      this.sendTestResult(3, (t1 - t0)/amount);
    }

    drawId(){
      //choose random index in range of items array size
      // var max = this.items.length;
      var max = Object.keys(this.items).length;
      var randomNr = Math.floor(Math.random() * max);
      //fetch item_id of this chosen item
      var id = this.items[randomNr].item_id;
      console.log("Draw id = " + id);
      return id;
    }

    sendTestResult(feature, result){
      //UWAGA - TA FUNKCJA POWINNA BYC WYSLANA DOPIERO JAK UPLYNIE 
      //TEN CZAS, NIE OD RAZU LINIOWO...
      var tObject = {
        framework: 2,
        feature: feature,
        score: result
      }
      // console.log(JSON.stringify(tObject));
      this.tService.create(tObject)
        .subscribe(
          data => {
          },
          error => {
            console.log('Performance test send result error :(', error);
          }
        );
    }
}