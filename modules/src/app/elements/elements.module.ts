import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsHomeComponent } from './elements-home/elements-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { TimesDirective } from './times.directive';
import { SharedModule } from "../shared/shared.module";
import { SegmentComponent } from './segment/segment.component';
import { MatListModule } from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ElementsHomeComponent, PlaceholderComponent, TimesDirective, SegmentComponent],
  imports: [
    CommonModule,
    ElementsRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ElementsModule { }
