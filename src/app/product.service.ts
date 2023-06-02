import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../environments/environment';

const mockExpenses: any[] = [
  { cost: 100, date: new Date().toISOString(), title: 'New TV', id: uuidv4() },
  {
    cost: 150.2,
    date: new Date().toISOString(),
    title: 'New Sofa',
    id: 'e5b9c4ca-1bac-4a80-bfdd-971df21a1ae3',
  },
  {
    cost: 20,
    date: new Date().toISOString(),
    title: 'New hairdryer',
    id: uuidv4(),
  },
  {
    cost: 42,
    date: new Date('2021/01/02').toString(),
    title: 'New TV',
    id: uuidv4(),
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly backendUrl = environment.backendUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    console.log('backendUrl', this.backendUrl);
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
    return this.httpClient
      .get<any>(`${this.backendUrl}/products/${id}`)
      .pipe(
        map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        }))
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
