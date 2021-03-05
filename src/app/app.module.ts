import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './util/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material.module';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FilterComponent } from './filter/filter.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AuthInterceptorService } from 'src/auth/auth-interceptor.service';
import { AuthGuard } from './auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    ProductComponent,
    HeaderComponent,
    HomepageComponent,
    FilterComponent,
    ProductPopupComponent,
    CartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatInputModule,
    IvyCarouselModule,
    NgxSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
