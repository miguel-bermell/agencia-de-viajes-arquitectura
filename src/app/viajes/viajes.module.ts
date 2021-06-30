import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViajesRoutingModule } from './viajes-routing.module';
import { ViajesEditComponent } from './viajes-edit/viajes-edit.component';
import { ViajesCardListComponent } from './viajes-list/viajes-card-list/viajes-card-list.component';
import { ViajesFilterComponent } from './viajes-list/viajes-filter/viajes-filter.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';
import { ViajesTableListComponent } from './viajes-list/viajes-table-list/viajes-table-list.component';
import { TipoDeViajePipe } from './tipo-de-viaje.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ViajesListComponent,
    ViajesCardListComponent,
    ViajesTableListComponent,
    ViajesFilterComponent,
    ViajesEditComponent,
    TipoDeViajePipe,
  ],
  imports: [ViajesRoutingModule, SharedModule],
})
export class ViajesModule {}
