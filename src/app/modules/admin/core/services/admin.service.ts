import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationQuery } from '../Interfaces/PaginationQuery';
import { ApiResponse, BusinessOwner, PaginatedResponse } from '../Interfaces/ibusiness-owner';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _HttpClient:HttpClient) { }
  apiUrl='/api/Admin';
  private readonly adminProductApiUrl = '/api/AdminProduct';

  /**
   * GET /api/AdminProduct/products/pending
   * Response: ApiResponse with PaginatedResponse in data; items in data.data.
   */
  getPendingProducts(
    pageIndex: number,
    pageSize: number
  ): Observable<ApiResponse<PaginatedResponse<unknown>>> {
    const params = new HttpParams()
      .set('pageIndex', String(pageIndex))
      .set('pageSize', String(pageSize));
    return this._HttpClient.get<ApiResponse<PaginatedResponse<unknown>>>(
      `${this.adminProductApiUrl}/products/pending`,
      { params }
    );
  }

  /** POST /api/AdminProduct/products/approve */
  approveProduct(productId: number, notes: string): Observable<ApiResponse<null>> {
    return this._HttpClient.post<ApiResponse<null>>(`${this.adminProductApiUrl}/products/approve`, {
      productId,
      notes: notes ?? ''
    });
  }

  /** POST /api/AdminProduct/products/reject */
  rejectProduct(productId: number, reason: string): Observable<ApiResponse<null>> {
    return this._HttpClient.post<ApiResponse<null>>(`${this.adminProductApiUrl}/products/reject`, {
      productId,
      reason
    });
  }

  getPendingBusinessOwner(params?:PaginationQuery)
  :Observable<ApiResponse<PaginatedResponse<BusinessOwner>>>{
      let httpPram=new HttpParams();
      if (params){
        httpPram.set('pageIndex',params.pageIndex);
        httpPram.set('pageSize',params.pageSize);
      }
    return this._HttpClient.get<ApiResponse<PaginatedResponse<BusinessOwner>>>(`${this.apiUrl}/business-owners/pending` , {params:httpPram})
  }

  ApproveOwner(profileId:number|undefined,notes:string ):Observable<ApiResponse<null>>{
    return this._HttpClient.post<ApiResponse<null>>(`${this.apiUrl}/business-owners/approve`,{profileId, notes});
  }

  rejectOwner(
    profileId: number | undefined,
    rejectionReason: string
  ): Observable<ApiResponse<null>> {
    return this._HttpClient.post<ApiResponse<null>>(`${this.apiUrl}/business-owners/reject`, {
      profileId,
      rejectionReason
    });
  }
}
