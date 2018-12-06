import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LightListComponent } from './light-list/light-list.component';
import { LightViewComponent } from './light-view/light-view.component';
import { HueService } from './shared/service/hue.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lights' },
  { path: 'lights', component: LightListComponent },
  { path: 'lights/???', component: LightViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LightListComponent,
    LightViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
