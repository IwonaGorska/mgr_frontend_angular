import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  operations = [
       {
          "label": "Tworzenie pojedynczego rekordu",
          "isInput": true,
          "dropdown": [],
          "dropdownTitle": ""
       },
       {
          "label": "Tworzenie wielu rekordów",
          "isInput": true,
          "dropdown": [10, 100], 
          "dropdownTitle": "Ile"
       },
       {
         "label": "Zastąpienie wielu rekordów nowymi wartościami",
         "isInput": true,
         "dropdown": [10, 100], 
         "dropdownTitle": "Ile"
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
         "dropdownTitle": "Ile"
       }
    ];

  

}
