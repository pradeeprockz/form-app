import { Component, OnInit } from '@angular/core';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
export interface ICommonData  {
  DataArr: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public gridSettings: GridSettings;
  public mode = false;
  public selectedConfig: any;
  public newConfig: any;
  dataJSON={} as ICommonData;
iCommonData: any;


  constructor() {
    this.gridSettings = {
      columnWidth: 140,
    } as GridSettings;
    //this.dataJSON = 
    this.dataJSON.DataArr =( [{
      "Province": "Quebec",
      "Party": "NDP",
      "Age": 22,
      "Name": "Liu, Laurin",
      "Gender": "Female"
    },]);

    [
      {
        "Province": "Quebec",
        "Party": "NDP",
        "Age": 22,
        "Name": "Liu, Laurin",
        "Gender": "Female"
      },
      {
        "Province": "Quebec",
        "Party": "Bloc Quebecois",
        "Age": 43,
        "Name": "Mourani, Maria",
        "Gender": "Female"
      },
      {
        "Province": "Quebec",
        "Party": "NDP",
        "Age": "",
        "Name": "Sellah, Djaouida",
        "Gender": "Female"
      },
      {
        "Province": "Quebec",
        "Party": "NDP",
        "Age": 72,
        "Name": "St-Denis, Lise",
        "Gender": "Female"
      },
      {
        "Province": "British Columbia",
        "Party": "Liberal",
        "Age": 71,
        "Name": "Fry, Hedy",
        "Gender": "Female"
      },
      
    ];
  }
  /**
   * Method to get pivot table configuration
   * @param e captures event from child component
   */
  public reportConfig(e: any): void {
    this.newConfig = e;
    console.log("config: "+this.newConfig);
  }
  getPivotData(): any {
    return this.dataJSON.DataArr;
  }

  ngOnInit(): void {
    console.log("beforeSelectConfig: ");
    this.selectedConfig = {
      rows: ['Province'],
      cols: ['Party'],
      vals: ['Name'],
      aggregatorName: 'Count',
      rendererName: 'Table',
    };
    console.log("afterSelectConfig: "+this.selectedConfig); 
    this.dataJSON.DataArr =( [{
      "Province": "Quebec",
      "Party": "NDP",
      "Age": 22,
      "Name": "Liu, Laurin",
      "Gender": "Female"
    },]);

  }




}
