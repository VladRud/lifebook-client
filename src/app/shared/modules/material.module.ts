import { NgModule } from '@angular/core';

import {
  ObserveContentModule,
  OverlayModule,
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdTooltipModule,
  StyleModule,
  PlatformModule,
  MdGridListModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdTooltipModule,
  OverlayModule,
  StyleModule,
  PlatformModule,
  ObserveContentModule,
  MdGridListModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MaterialModule {
}
