import { NgModule } from '@angular/core';
import {MatTabsModule, MatButtonModule, MatRippleModule,
  MatGridListModule, MatIconModule, MatDividerModule, MatCardModule,
  MatFormFieldModule, MatFormFieldControl, MatInputModule, MatButtonToggleModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule } from '@angular/material';


@NgModule({
  imports: [
    MatTabsModule, MatButtonModule,
  ],
  exports: [
    MatTabsModule, MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule, MatButtonToggleModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
  ]
})
export class MaterialModule { }
