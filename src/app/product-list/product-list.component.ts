import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  expensesList: any[] = [];
  filteredProductList: any[] = [];
  selectedYear = -1;
  username = '';

  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();

    this.productService.getAllProducts().subscribe((value) => {
      this.expensesList = value;
      this.filteredProductList = this.expensesList;
    });
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const yearFilter = queryParams.get('year');
      if (yearFilter) {
        this.filteredProductList = this.expensesList.filter(
          (item) => item.date.getFullYear() === +yearFilter
        );
        this.selectedYear = +yearFilter;
      } else {
        this.filteredProductList = [...this.expensesList];
      }
    });
  }

  selectYear(year: string) {
    if (year !== '-1') {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { year: year },
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  trackProductList(index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {}
}
