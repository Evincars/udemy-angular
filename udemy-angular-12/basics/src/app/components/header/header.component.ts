import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /*
  Before routing was used

  @Output() featureSelected = new EventEmitter<string>();*/

  private userSub!: Subscription;
  isUserLogged: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userSub.subscribe((res) => {
      if (!res || !res.token) {
        this.isUserLogged = false;
        return;
      }
      this.isUserLogged = true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  /*
  Before routing was used

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.signOut();
  }
}
