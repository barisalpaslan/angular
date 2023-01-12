import { PagedResultDto, ListService } from '@abp/ng.core';
import { Component, enableProdMode, EventEmitter, Input, OnInit,  Output,  ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { StockTypeService } from './../proxy/serender/definitions/stock-types/stock-type.service';
import { StockTypeDto } from './../proxy/serender/definitions/stock-types/models';
import { ContentReadyEvent } from 'devextreme/ui/data_grid';

if(!/localhost/.test(document.location.host)){
  enableProdMode();
}

@Component({
  selector: 'app-stock-types',
  templateUrl: './stock-types.component.html',
  styleUrls: ['./stock-types.component.scss'],
  providers : [ListService, StockTypeService]
})
export class StockTypesComponent implements OnInit {

  @ViewChild('dxStockTypeInstance', {static:false}) dxStockType:DxDataGridComponent;

  loadstocktypedatasource:any;

  //counter
  @Output() countChange = new EventEmitter<number>();
  count = 0;

  //scrolling or paging
  selectedOption: string = 'paging';
  props = [
    {text : "Paging" , value : "paging"},
    {text : "Infinite Scrolling", value : "infinite"}
  ]

  isModalOpen = false;
  form:FormGroup;
  selectedSt = {} as StockTypeDto;

  data:PagedResultDto<StockTypeDto>={
    items:[],
    totalCount : 0,
  };

  newSt;

  //dxpopup
  popupVisible = false;
  positionOf: string;
  popupdelete = false;

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

  constructor(public service:StockTypeService, public readonly list:ListService,
    private fb: FormBuilder) { }

  ngOnInit(){
    this.loadStockTypes();
  }

  //counter
  updateCount(){
    this.count = this.dxStockType.instance.totalCount();
    this.countChange.emit(this.count);
   // console.log(this.count);
  }

  //right to left
  selectLanguage(data) {
    this.rtlEnabled = data.value === this.languages[0];
    this.placeholder = this.rtlEnabled ? 'بحث' : 'Search...';
  }

  // paging or scrolling
  onOptionChange() {
    if (this.selectedOption === 'paging') {
      this.dxStockType.instance.option('paging', { enabled: true });
      this.dxStockType.instance.option('scrolling', { mode: 'standard' });
    } else {
      this.dxStockType.instance.option('paging', { enabled: false });
      this.dxStockType.instance.option('scrolling', { mode: 'infinite' });

    }
  }

//paging options
  get isCompactMode() {
    return this.displayMode === 'compact';
  }

  loadStockTypes(){
    this.loadstocktypedatasource = this.service.loadStockType();
  }

  //Dx Elementleri ile custom popup
  save2(){

    this.popupVisible = false;
    this.newSt = this.selectedSt;

    const request = this.newSt.id
      ? this.service.update(this.newSt.id, this.newSt)
      : this.service.create(this.newSt);

    request.subscribe(()=>{

      this.form.reset();
      this.list.get();
      this.dxStockType.instance.refresh();
    })
  }

  buildForm(){

    this.form = this.fb.group({
      code : [this.selectedSt.code || '',Validators.required],
      name : [this.selectedSt.name || '',Validators.required],
      allowMinusOpr : [this.selectedSt.allowMinusOpr || false],
    })
  }

  createStockType2 = () =>{
    this.buildForm();
    this.popupVisible = true;
  }

  editFormChanged(data){
    this.selectedSt.code = data.value;
  }

  editStockType2 = (event:any) => {
    this.service.get(event.row.data.id).subscribe((stockType) => {
            this.selectedSt = stockType;
            this.buildForm();
            this.popupVisible = true;
          });

  }

  getDeleteId = (event:any) =>{
    this.service.get(event.row.data.id).subscribe((st)=>{
      this.selectedSt = st;
      this.popupdelete = true;
    })
  }

  delete2(){
      this.service.delete(this.selectedSt.id).subscribe(() =>{
      this.list.get();
      this.dxStockType.instance.refresh();
      });
      this.popupdelete = false;
 }

  cancel(){
     this.popupdelete = false
  }

}
