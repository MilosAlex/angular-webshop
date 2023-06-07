import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly backendUrl = environment.backendUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendUrl}/products`).pipe(
      map((data) => {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        }));
      })
    );
  }

  getProductById(id: string): Observable<any | undefined> {
    return this.httpClient.get<any>(`${this.backendUrl}/products/${id}`).pipe(
      map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
      }))
    );
  }

  getCartProducts(itemIds: string[]): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendUrl}/cart?items=${itemIds.join(",")}`).pipe(
      map((data) => {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        }));
      })
    );
  }

  editProduct(expenseItem: Pick<any, 'id' | 'title' | 'cost'>) {
    const body: any = {
      cost: expenseItem.cost,
      title: expenseItem?.title,
    };
    // TODO: Patch return value
    return this.httpClient
      .patch<any>(`${this.backendUrl}/expense-items/${expenseItem.id}`, body)
      .pipe(
        map((res) => {
          return {
            id: res.id,
            title: res.title,
            date: new Date(res.date),
            cost: res.cost,
          };
        })
      );
  }
  addExpenseItem(
    expenseItem: Pick<any, 'cost' | 'date' | 'title'>
  ): Observable<any> {
    const body: any = {
      cost: expenseItem.cost,
      date: expenseItem.date?.toDateString(),
      title: expenseItem?.title,
    };
    return this.httpClient
      .post<any>(`${this.backendUrl}/expense-items`, body)
      .pipe(
        map((res) => {
          return {
            id: res.id,
            title: res.title,
            date: new Date(res.date),
            cost: res.cost,
          };
        })
      );
  }

  private convertToContentItem(dto: any): any {
    return {
      id: dto.id,
      date: new Date(dto.date),
      cost: dto.cost,
      title: this.getExtraTitle(dto.title),
    };
  }
  ///Cannot read properties of undefined (reading 'getExtraTitle')
  // at convertToContentItem

  private getExtraTitle(title: string): string {
    return `Extra${title}`;
  }
}
