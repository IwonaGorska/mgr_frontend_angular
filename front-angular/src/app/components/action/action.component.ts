import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ItemsServiceService } from '../../services/items-service.service'
import { TestsServiceService } from '../../services/tests-service.service'

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  showPopup: boolean = false;
  popupText: String =  "Błędne dane";
  imgSource: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-TG2bBh544dNz4bjTR11_4gtX66BHtXKMg&usqp=CAU';
  isImgLoaded: Boolean = false;
  // items: Object = {};
  // items: Item[];
  // items: {};
  items: any;

  constructor(public dialog: MatDialog, private service: ItemsServiceService, private tService: TestsServiceService) { 

    this.beginTest(this);
  }

  ngOnInit(): void {
    this.showPopup = false;
    this.popupText = "Błędne dane";
    this.getAllItems();
  }

  beginTest(thisObject){ //need to pass this object because window makes it different
    //or use arrow function to not loose 'this' scope
    window.onload =  () => {
      console.log('start onload');
      let time = window.performance.timing;
      let pageloadtime = time.loadEventStart - time.navigationStart;
      console.log('pageloadtime = ', pageloadtime);
      this.sendTestResult(5, pageloadtime, 1);
    }
    // window.onload = function () {
    //    console.log('start onload');
    //    let time = window.performance.timing;
    //    let pageloadtime = time.loadEventStart - time.navigationStart;
    //    console.log('pageloadtime = ', pageloadtime);
    //    thisObject.sendTestResult(4, pageloadtime);

    //   //  if (!performance.memory) {
    //   //     console.log("performance.memory() is not available.");
    //   //     return;
    //   //  }
    //   //  console.log('performance.memory.usedJSHeapSize = ', performance.memory.usedJSHeapSize); 
    //  }
 }

  operations = [
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
      {
        "label": "Wyszukanie rekordów",
        "isInput": false,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0,
        "phrase": ""
      },
      {
        "label": "Usunięcie rekordów",
        "isInput": false,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0
      },
      {
        "label": "Czytanie lokalizacji urządzenia",
        "isInput": false,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0
      },
      {
        "label": "Tworzenie Push Notification",
        "isInput": true,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0
      },
      {
        "label": "Umieszczanie danych w Local Storage",
        "isInput": true,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0
      },
      {
        "label": "Czytanie danych z Local Storage",
        "isInput": true,
        "dropdown": [1, 10, 100, 1000],
        "dropdownTitle": "Powtórzenia",
        "amount": 0
      },
      {
        "label": "Ładowanie obrazu",
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
      var isCorrect = true;
      
      if(amount === 0){ 
        text += "Należy wybrać liczbę z listy. ";
        isCorrect = false;
      }

      if([1, 2, 3].includes(index) && amount > max){
        text += "Wybrana liczba jest większa niż aktualna liczba wszstkich rekordów. ";
        isCorrect = false;
      }

      if(this.operations[index].isInput && !phrase){
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
          case 0: this.createItems(phrase, amount); break;
          case 1: this.updateItems(phrase, amount); break;
          case 2: this.searchForItems(amount); break;
          case 3: this.deleteItems(amount); break;

          case 4: this.getLocation(amount); break;
          case 5: this.pushNotification(phrase, amount); break;
          case 6: this.setLocalStorage(phrase, amount); break;
          case 7: this.searchLocalStorage(phrase, amount); break;
          case 8: this.addTheImage(amount); break;
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

      this.sendTestResult(1, (t1 - t0)/amount, amount);

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

      this.sendTestResult(2, (t1 - t0)/amount, amount);
    }

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
    
      this.sendTestResult(3, (t1 - t0)/amount, amount);
    }
    
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

      this.sendTestResult(4, (t1 - t0)/amount, amount);
    }

    drawId(){
      //choose random index in range of items array size
      // var max = this.items.length;
      var max = Object.keys(this.items).length;
      var randomNr = Math.floor(Math.random() * max);
      //fetch item_id of this chosen item
      var id = this.items[randomNr].item_id;
      // console.log("Draw id = " + id);
      return id;
    }

    success(position) {
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
    }
    
    error() {
      console.log('Error while getting location');
    }
    
    getLocation(amount){
      if(!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        let t0 = performance.now();
        for(let i = 0; i < amount; i++){
          navigator.geolocation.getCurrentPosition(this.success, this.error);
        }
        // console.log('Locating…');
        let t1 = performance.now();
        this.sendTestResult(7, (t1 - t0)/amount, amount);//what if there was an error..
        console.log("Performance location: ", (t1 - t0)/amount, 'milliseconds');
      }
    }
    
    pushNotification(phrase, amount){
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
    
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        let t0 = performance.now();
        for(let i = 0; i < amount; i++){
          new Notification(phrase);
        }
        let t1 = performance.now();
        this.sendTestResult(8, (t1 - t0)/amount, amount);
        console.log("Performance notification: ", (t1 - t0)/amount, 'milliseconds');
        // var notification = new Notification(phrase);
      }
    
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            let t0 = performance.now();
            for(let i = 0; i < amount; i++){
              new Notification(phrase);
            }
            let t1 = performance.now();
            this.sendTestResult(8, (t1 - t0)/amount, amount);
            console.log("Performance notification: ", (t1 - t0)/amount, 'milliseconds');
          }
        });
      }
    }
    
    setLocalStorage(phrase, amount){
      let t0 = performance.now();
      for(let i = 0; i < amount; i++){
        localStorage.setItem(phrase, phrase);
      }
      let t1 = performance.now();
      this.sendTestResult(9, (t1 - t0)/amount, amount);
      console.log("Performance set storage: ", (t1 - t0)/amount, 'milliseconds');
    }
    
    searchLocalStorage(phrase, amount){
      let t0 = performance.now();
      // console.log(localStorage.getItem(phrase));
      for(let i = 0; i < amount; i++){
        localStorage.getItem(phrase);
      }
      let t1 = performance.now();
      this.sendTestResult(10, (t1 - t0)/amount, amount);
      console.log("Performance get storage: ", (t1 - t0)/amount, 'milliseconds');
      console.log(localStorage.getItem(phrase));
    }

    addTheImage(amount) { 
      let t0 = performance.now();
      for(let i = 0; i < amount; i++){
        document.getElementById("imageTest").textContent = ''; //removing children from element to not collect many imgs
        let img = document.createElement('img');
        img.src = this.imgSource;
        document.getElementById("imageTest").appendChild(img);
      }
      let t1 = performance.now();
      this.sendTestResult(11, (t1 - t0)/amount, amount);
      console.log("Performance load image: ", (t1 - t0)/amount, 'milliseconds');
      this.isImgLoaded = true;
    }

    sendTestResult(feature, result, avg_of){
      //UWAGA - TA FUNKCJA POWINNA BYC WYSLANA DOPIERO JAK UPLYNIE 
      //TEN CZAS, NIE OD RAZU LINIOWO...
      var tObject = {
        framework: 2,
        feature: feature,
        score: result,
        avg_of: avg_of
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