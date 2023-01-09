import { Injectable } from '@angular/core';
import { EnvironmentService, RestService } from '@abp/ng.core';
import { ToasterService, ConfirmationService } from '@abp/ng.theme.shared';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import DxDataGrid from 'devextreme/ui/data_grid';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DevxAspNetDataService {
  isError: boolean = false;
  resultForLookUp;
  sendRequest(
    url: string,
    method = 'GET',
    data: any = {},
    key?: any,
    component?: DxDataGrid
  ): Promise<any> {

    let dataObject: {};
    let result;
    switch (method) {
      case 'GET':
        break;
      case 'PUT':
        dataObject = {
          data: data,
          type: 'update',
          key: key,
        };
        result = this.restService.request<any, any>(
          {
            method: 'POST',
            url: url,
            body: dataObject,
            reportProgress: true,
          },
          { apiName: 'Default' }
        );

        break;
      case 'POST':
        dataObject = {
          data: data,
          type: 'insert',
        };
        result = this.restService.request<any, any>(
          {
            method: 'POST',
            url: url,
            body: dataObject,
          },
          { apiName: 'Default' }
        );
        break;
      case 'BATCH':
        result = this.restService.request<any, any>(
          {
            method: 'POST',
            url: url,
            body: data,
          },
          { apiName: 'Default' }
        );
        break;
      case 'DELETE':
        dataObject = {
          data: {},
          type: 'Remove',
          key: key,
        };
        result = this.restService.request<any, any>(
          {
            method: 'POST',
            url: url,
            body: dataObject,
          },
          { apiName: 'Default' }
        );

        break;
    }

    return result
      .toPromise()
      .then(() => {
        this.toastr.success('::KayitIslemiYapildi');
      })
      .catch((e) => {
        this.confirmation.clear();
        throw e.error.error.message;
      });
  }


  aspnetData = (apiEndPoint: string, id?: string) =>
    AspNetData.createStore({
      key: 'id',
      loadUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,

      loadParams: {
        id: (): string => {

          return id;
        },
      },
      insertUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,
      onBeforeSend: function (method, ajaxOptions) {

        ajaxOptions.xhrFields = { withCredentials: true };
        ajaxOptions.data.id = ajaxOptions.data.id();
        ajaxOptions.headers = {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        };
      },
      onAjaxError: (e: any) => {
        //debugger;
        var errorDetail = JSON.parse(e.error);

        this.confirmation.warn(errorDetail.error.message, 'U Y A R I', {
          hideCancelBtn: true,
        });
      },
    });

    aspnetDataWithParams = (apiEndPoint: string, filterParams) =>
    AspNetData.createStore({
      key: 'id',
      loadUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,
      loadParams:filterParams,
      insertUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
        ajaxOptions.headers = {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        };
      },
      onAjaxError: (e: any) => {
        //debugger;
        var errorDetail = JSON.parse(e.error);

        this.confirmation.warn(errorDetail.error.message, 'U Y A R I', {
          hideCancelBtn: true,
        });
      },
    });


    aspnetDataWithParamsWithoutKey = (apiEndPoint: string, filterParams) =>
    AspNetData.createStore({
      loadUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,
      loadParams:filterParams,
      insertUrl: this.config.getEnvironment().apis.default.url + apiEndPoint,
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
        ajaxOptions.headers = {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        };
      },
      onAjaxError: (e: any) => {
        //debugger;
        var errorDetail = JSON.parse(e.error);

        this.confirmation.warn(errorDetail.error.message, 'U Y A R I', {
          hideCancelBtn: true,
        });
      },
    });


  aspnetDataWithoutKey = (apiEndPoint: string, id?: string) =>
    AspNetData.createStore({
      loadUrl: this.config.getEnvironment().apis.default.url + apiEndPoint, //'/api/app/stoks/load-stok-with-devx',

      loadParams: {
        id: (): string => {
          return id;
        },
      }
      ,
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
        ajaxOptions.data.id = ajaxOptions.data.id();
        ajaxOptions.headers = {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        };
      },
      onAjaxError: function (e: any) {

        var errorDetail = JSON.parse(e.error);

        this.confirmation.warn(errorDetail.error.message, 'U Y A R I', {
          hideCancelBtn: true,
        });
      },
    });

  async processBatchRequest(
    changes: Array<{}>,
    component: DxDataGrid,
    apiEndPoint: string
  ): Promise<any> {
    await this.http
      .post(
        this.config.getEnvironment().apis.default.url + apiEndPoint, //'/api/app/stoks/batch' gibi,
        JSON.stringify(changes),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      )
      .toPromise()
      .then(() => {
        component.refresh(true);
        component.cancelEditData();
        this.toastr.success('İşlemleriniz yapılmıştır.');
      })
      .catch((error) => {
        //debugger
        this.confirmation.error(error.error.error.message, 'Error', {
          hideYesBtn: true,
          cancelText: 'Ok',
        });
        throw new Error();
      });
  }
  constructor(
    private http: HttpClient,
    private toastr: ToasterService,
    private confirmation: ConfirmationService,
    private config: EnvironmentService,
    private restService: RestService
  ) {}
}
