import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDashboardTable } from 'src/core/interfaces/table.interface';
import { UserData } from 'src/core/models/user.model';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
})
export class DashboardTableComponent implements OnInit, AfterViewInit {
  @Input() userTableData: UserData[] = [];

  public columnsToDisplay: string[] = [];
  public columns: IDashboardTable[] = [
    { name: 'fullName', nameToDisplay: 'Name' },
    { name: 'gender', nameToDisplay: 'Gender' },
    { name: 'email', nameToDisplay: 'Email' },
    { name: 'birthDate', nameToDisplay: 'Birth Date', columnType: 'date' },
    { name: 'address', nameToDisplay: 'Address' },
    { name: 'city', nameToDisplay: 'City' },
    { name: 'country', nameToDisplay: 'Country' },
    { name: 'hobbies', nameToDisplay: 'Hobbies' },
    { name: 'favoriteColor', nameToDisplay: 'Color' },
    { name: 'requiredSeats', nameToDisplay: 'Seats' },
    { name: 'motorType', nameToDisplay: 'Motor Type' },
  ];

  public dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.map((column) => column.name);
    this.dataSource = new MatTableDataSource<UserData>(this.userTableData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
