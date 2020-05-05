import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModsRoutingModule } from './mods-routing.module';
import { ModsHomeComponent } from './mods-home/mods-home.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModsHomeComponent, ModalComponent],
  imports: [CommonModule, ModsRoutingModule, SharedModule, MatDialogModule],
})
export class ModsModule {}
