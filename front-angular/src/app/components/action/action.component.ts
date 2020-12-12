import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  showPopup: Boolean = false;
  popupText: String =  "Błędne dane";

  constructor(public dialog: MatDialog) { 
    // this.amount = 0;
    // this.phrase = "";
    // this.showPopup = false;
    // this.popupText = "Błędne dane";
  }

  ngOnInit(): void {
    this.showPopup = false;
    this.popupText = "Błędne dane";
  }

  test: String = 'Ile';

  operations = [
       {
          "label": "Tworzenie pojedynczego rekordu",
          "isInput": true,
          "dropdown": [],
          "dropdownTitle": "",
          "phrase": ""
       },
       {
          "label": "Tworzenie wielu rekordów",
          "isInput": true,
          "dropdown": [10, 100], 
          "dropdownTitle": "Ile",
          "amount": 0,
          "phrase": ""
       },
       {
         "label": "Zastąpienie wielu rekordów nowymi wartościami",
         "isInput": true,
         "dropdown": [10, 100], 
         "dropdownTitle": "Ile",
         "amount": 0,
         "phrase": ""
       },
       {
         "label": "Wyszukanie rekordu",
         "isInput": false,
         "dropdown": [],
         "dropdownTitle": ""
       },
       {
         "label": "Usunięcie pojedynczego rekordu",
         "isInput": false,
         "dropdown": [],
         "dropdownTitle": ""
       },
       {
         "label": "Usunięcie wielu rekordów",
         "isInput": false,
         "dropdown": [10, 100], /*ile */
         "dropdownTitle": "Ile",
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
      // var max = this.props.items.length;
      var max = 1;
      var isCorrect = true;
      if([1, 2, 5].includes(index) && !amount){
        text += "Należy wybrać liczbę z listy. ";
        isCorrect = false;
      }
    
      if([2, 5].includes(index) && amount > max){
        text += "Wybrana liczba jest większa niż aktualna liczba wszstkich rekordów. ";
        isCorrect = false;
      }
    
      if([0, 1, 2].includes(index) && !phrase){
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
      // console.log("Submitted " + index);
      // console.log(this.operations[index].phrase);
      // console.log(this.operations[index].amount);
      var phrase = this.operations[index].phrase;
      var amount = this.operations[index].amount;
      if(!this.validate(index, phrase, amount))
        return;

    }
}