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
  // readonly allowedPageSizes = [3, 6, 9];
  // readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
  // displayMode = 'full';
  // showPageSizeSelector = true;
  // showInfo = true;
  // showNavButtons = true;

  //right to left
  languages: string[] = ['Arabic (Right-to-Left direction)', 'English (Left-to-Right direction)'];
  rtlEnabled = false;
  placeholder = 'Search...';


  //paging özellikleri
  displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }]



  gridOptions = {
    displayMode : 'full',
    allowedPageSizes: [3,6,9],
    showPageSizeSelector : true,
    showInfo : true,
    showNavButtons : true
 }


  constructor(public service:StockGroupService, public readonly list:ListService,
    private fb: FormBuilder)
    {
    }

  ngOnInit(): void {
    this.loadStockGroups();
    this.loadStockTypes();

    this.readGridOptions();
    //this.readStore();

  }

  loadStockGroups(){
    this.loadstocktypelookupdatasource = this.service.loadStockGroup2();
  }

  loadStockTypes(){
    this.loadstcreate = this.service.loadStockType();
  }

  saveGridOptions(){
   let serializedOptions = JSON.stringify(this.gridOptions);
   localStorage.setItem("gridOptions", serializedOptions);
   }

   readGridOptions(){
    let serializedOptions = localStorage.getItem("gridOptions");

    if(serializedOptions!=null){
        this.gridOptions = JSON.parse(serializedOptions);
        //tablo refresh..
        this.dxStockGroup.instance.refresh();
    }else{
        this.gridOptions;
    }
   }

   changeGridOptions(option:string, value:any){
     this.gridOptions[option] = value;
     this.saveGridOptions();
   }

  //  storesize(){
  //   debugger;
  //   const size = JSON.stringify(this.allowedPageSizes);
  //   localStorage.setItem("allowedPageSizes",size);
  //  }

  //  changeStore(option:string, value:any){
  //   debugger;
  //   this.allowedPageSizes[option] = value;
  //   this.storesize();
  //  }

  //  readStore(){
  //   debugger;
  //   const store = localStorage.getItem("allowedPageSizes");
  //   this.allowedPageSizes = JSON.parse(store);
  //   console.log(this.allowedPageSizes);
  //  }


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
    return this.gridOptions.displayMode === 'compact';
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
