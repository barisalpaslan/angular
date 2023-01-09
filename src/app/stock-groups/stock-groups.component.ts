import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, enableProdMode, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { map, Observable } from 'rxjs';
import { StockGroupService } from './../proxy/serender/definitions/stock-groups/stock-group.service';
import { StockGroupDto } from './../proxy/serender/definitions/stock-groups/models';
import { StockTypeLookupDto } from './../proxy/serender/definitions/stock-groups/models';


if(!/localhost/.test(document.location.host)){
  enableProdMode();
}

@Component({
  selector: 'app-stock-groups',
  templateUrl: './stock-groups.component.html',
  styleUrls: ['./stock-groups.component.scss'],
  providers : [ListService, StockGroupService]
})
export class StockGroupsComponent implements OnInit {

  @ViewChild('dxStockGroupInstance', {static:false}) dxStockGroup:DxDataGridComponent;

  loadstockgroupdatasource:any;

  loadstocktypelookupdatasource:any;
  loadstcreate:any;

  isModalOpen = false;
  form:FormGroup;
  selectedSg = {} as StockGroupDto;

  data:PagedResultDto<StockGroupDto>={
    items:[],
    totalCount : 0,
  };

  newSg;

  //counter
  @Output() countChange = new EventEmitter<number>();
  count = 0;

  //dxpopup
  popupVisible = false;
  positionOf: string;
  popupdelete = false;

  //scrolling or paging
  selectedOption: string = 'paging';
  props = [
    {text : "Paging" , value : "paging"},
    {text : "Infinite Scrolling", value : "infinite"}
  ]

  //paging
  readonly allowedPageSizes = [3, 6, 9];
  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  //right to left
  languages: string[] = ['Arabic (Right-to-Left direction)', 'English (Left-to-Right direction)'];
  rtlEnabled = false;
  placeholder = 'Search...';

  constructor(public service:StockGroupService, public readonly list:ListService,
    private fb: FormBuilder)
    {
    }

  ngOnInit(): void {
    this.loadStockGroups();
    this.loadStockTypes();

this.readGridOptions();
  }

  loadStockGroups(){
    this.loadstocktypelookupdatasource = this.service.loadStockGroup2();
  }

  loadStockTypes(){
    this.loadstcreate = this.service.loadStockType();
  }

  gridOptions = {
           allowedPageSizes : [3, 6, 9],
            displayModes : [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }],
            displayMode : 'full',
            showPageSizeSelector : true,
            showInfo : true,
            showNavButtons : true
         }

  saveGridOptions(){

   let serializedOptions = JSON.stringify(this.gridOptions);
   // Özellikleri local storage'a kaydetme
   localStorage.setItem("gridOptions", serializedOptions);

   }

   readGridOptions(){
    let serializedOptions = localStorage.getItem("gridOptions");

    if(serializedOptions){
    this.gridOptions = JSON.parse(serializedOptions);
    }else{
      this.gridOptions;
    }
   }

   changeGridOptions(option:string, value:any){
    this.gridOptions[option] = value;

    this.saveGridOptions();
   }


//   loadToLS(){
//     let gridOptions = {
//        allowedPageSizes : [3, 6, 9],
//         displayModes : [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }],
//         displayMode : 'full',
//         showPageSizeSelector : true,
//         showInfo : true,
//         showNavButtons : true
//      }

//     let items = [];
//     items.push(gridOptions);
//     localStorage.setItem("items",JSON.stringify("items"));

// }

//    loadFromLS(){
//     let items : any = [];

//     let value = localStorage.getItem(items);

//     if(value != null){
//       items = JSON.parse(value);
//     }

//     return items;
//    }

  //right to left
  selectLanguage(data) {
    this.rtlEnabled = data.value === this.languages[0];
    this.placeholder = this.rtlEnabled ? 'بحث' : 'Search...';
  }

  //counter
  updateCount(){
    this.count = this.dxStockGroup.instance.totalCount();
    this.countChange.emit(this.count);
   // console.log(this.count);
  }

  // paging or scrolling
  onOptionChange() {
    if (this.selectedOption === 'paging') {
      this.dxStockGroup.instance.option('paging', { enabled: true });
      this.dxStockGroup.instance.option('scrolling', { mode: 'standard' });
    } else {
      this.dxStockGroup.instance.option('paging', { enabled: false });
      this.dxStockGroup.instance.option('scrolling', { mode: 'infinite' });

    }
  }

  get isCompactMode() {
    return this.displayMode === 'compact';
  }

  //Dx Elementleri ile custom popup
  save(){

    this.popupVisible = false;
    this.newSg = this.selectedSg;

    const request = this.newSg.id
      ? this.service.update(this.newSg.id, this.newSg)
      : this.service.create(this.newSg);

    request.subscribe(()=>{

      this.form.reset();
      this.list.get();
      this.dxStockGroup.instance.refresh();
    })
  }

  buildForm(){
    this.form = this.fb.group({
      stockTypeId : [this.selectedSg.stockTypeId || '',Validators.required],
      code : [this.selectedSg.code || '',Validators.required],
      name : [this.selectedSg.name || '',Validators.required],
      parentId : [this.selectedSg.parentId || ''],
    })
    //this.loadStockTypes();
  }

  createStockGroup = () =>{
    this.buildForm();
    this.popupVisible = true;
  }

  editFormChanged(data){
    this.selectedSg.code = data.value;
  }

  editStockGroup = (event:any) => {

    //event.row.data.stockGroup.id
    this.service.get(event.row.data.stockGroup.id).subscribe((stockGroup) => {
            this.selectedSg = stockGroup;
            this.buildForm();
            this.popupVisible = true;
          });

          console.log(event.row.data.stockGroup.id);
  }

  getDeleteId = (event:any) =>{
    this.service.get(event.row.data.stockGroup.id).subscribe((stg)=>{
      this.selectedSg = stg;
      this.popupdelete = true;
    })
  }

  delete2(){
      this.service.delete(this.selectedSg.id).subscribe(() =>{
      this.list.get();
      this.dxStockGroup.instance.refresh();
      });
      this.popupdelete = false;
 }

  cancel(){
     this.popupdelete = false
  }
}
