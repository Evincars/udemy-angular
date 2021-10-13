import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService, // Dependency Injection for classes
    @Inject(PLATFORM_ID) private platformId: any // Dependency Injection for hard-coded values
  ) {}

  ngOnInit(): void {

    // SSR (Servier Side Rendering)
    // SSR won't work on static server (like Firebase), it must run on NodeJS server

    // such APIs are not available on server-side (rendering on server)
    // hence we need to check if the platform is web server or not
    // This code will be executed in browser again, but not executed on server
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoSignIn();
    }
  }

  /*
  Before routing was used
  
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
  */
}
