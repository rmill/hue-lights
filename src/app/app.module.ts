import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { LightListComponent } from './light-list/light-list.component';
import { LightViewComponent } from './light-view/light-view.component';
import { ColorConverterService } from './shared/services/color-converter.service';
import { HueService } from './shared/services/hue.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lights' },
  { path: 'lights', component: LightListComponent },
  { path: 'lights/:id', component: LightViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LightListComponent,
    LightViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // All material imports must be AFTER the browser module
    RouterModule.forRoot(appRoutes),
    ColorPickerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    ColorConverterService,
    HueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
