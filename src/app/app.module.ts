import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
  
  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
