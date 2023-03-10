import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IChart } from 'src/core/interfaces/chart.interface';
import { UserData } from 'src/core/models/user.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _isDestroyed$ = new Subject();
  private localStorageData: any[] = [];
  public userTableData: UserData[] = [];
  public amounOfSeatsData: IChart[] = [];
  public hobbiesData: IChart[] = [];
  public engineData: IChart[] = [];
  public visitorsData: IChart[] = [];
  public citiesData: IChart[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.runSubcripton();
    this.getAmounOfSeatsData();
    this.getHobbiesData();
    this.getEngineData();
    this.getVisitorsData();
    this.citiesData = this.countCities();
  }

  private transformData(data: Storage): void {
    for (let i = 0; i < data.length; i++) {
      const key: string | null = data.key(i);
      if (key && key.includes('key_')) {
        const local: string | null = data.getItem(key);
        if (local) {
          const userData: UserData = JSON.parse(local);
          const transformFormatDate: UserData = {
            ...userData,
            ['birthDate']: new Date(userData.birthDate)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .toString(),
          };
          this.userTableData.push(transformFormatDate);
          this.localStorageData.push(userData);
        }
      }
    }
  }

  private runSubcripton(): void {
    this.localStorageService
      .getData()
      .pipe(takeUntil(this._isDestroyed$))
      .subscribe((data: Storage) => {
        this.transformData(data);
      });
  }

  private getAmounOfSeatsData(): void {
    this.localStorageData.forEach((item: UserData) => {
      this.amounOfSeatsData.push({
        name: item.requiredSeats.toString(),
        value: this.countOfAge(item.birthDate),
      });
    });
  }

  private countOfAge(birthDate: string): number {
    let age: number = 0;
    const today = new Date();
    const birthdate = new Date(birthDate);
    const yearsDiff = today.getFullYear() - birthdate.getFullYear();
    if (
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() == birthdate.getMonth() &&
        today.getDate() < birthdate.getDate())
    ) {
      age = yearsDiff - 1;
    } else {
      age = yearsDiff;
    }
    return age;
  }

  private getHobbiesData(): void {
    const hobbiesData: number = this.localStorageData
      .flatMap((obj) => obj.hobbies)
      .reduce((counts: { [hobby: string]: number }, hobby: string) => {
        counts[hobby] = (counts[hobby] || 0) + 1;
        return counts;
      }, {});

    Object.entries(hobbiesData).forEach(([name, value]) => {
      this.hobbiesData.push({ name, value });
    });
  }

  private getEngineData(): void {
    this.engineData = this.localStorageData.reduce(
      (acc: IChart[], user: UserData) => {
        const { gender, motorType } = user;
        if (gender && motorType) {
          const name = `${
            gender.charAt(0).toUpperCase() + gender.substring(1)
          } ${motorType.charAt(0).toUpperCase() + motorType.substring(1)}`;

          const existing = acc.find((item: IChart) => item.name === name);
          if (existing) {
            existing.value++;
          } else {
            acc.push({ name, value: 1 });
          }
        }
        return acc;
      },
      []
    );
  }

  private getVisitorsData(): void {
    this.visitorsData = [
      {
        name: 'Visitors',
        value: Number(localStorage.getItem('numberOfVisitors')),
      },
      {
        name: 'Customers',
        value: this.localStorageData.length,
      },
    ];
  }

  countCities(): { name: string; value: number }[] {
    const counts: { [key: string]: number } = {};
    for (let i = 0; i < this.localStorageData.length; i++) {
      const city = this.localStorageData[i].city;
      counts[city] = counts[city] ? counts[city] + 1 : 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next(true);
    this._isDestroyed$.complete();
  }
}
