import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { RunningComponent } from './agents/agent-order/running/running.component';
import { TwoNumbersComponent } from './agents/agent-order/two-numbers/two-numbers.component';
import { ThreeNumbersComponent } from './agents/agent-order/three-numbers/three-numbers.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentListComponent } from './agents/agent-list/agent-list.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';

/* import { PrizesComponent } from './prizes/prizes.component';
import { AgentsService } from './agents/agents.service';
import { PrizesService } from './prizes/prizes.service';
 */
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { AgentCreateComponent } from './agents/agent-create/agent-create.component';
import { AgentOrderComponent } from './agents/agent-order/agent-order.component';
import { RewardCheckComponent } from './reward-check/reward-check.component';
import { ChartsModule } from 'ng2-charts';
import { CheckOrdersComponent } from './check-orders/check-orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { RewardCheckDialogComponent } from './reward-check-dialog/reward-check-dialog.component';
import { EditComponent } from './category/edit/edit.component';
import { OverPricedComponent } from './over-priced/over-priced.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    AuthComponent,
    RunningComponent,
    TwoNumbersComponent,
    ThreeNumbersComponent,
    AgentsComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentListComponent,
    OverviewsComponent,
    SettingsComponent,
    NotificationsComponent,
    LoadingSpinnerComponent,
    AgentSummarizeComponent,
    AgentCreateComponent,
    AgentOrderComponent,
    RewardCheckComponent,
    CheckOrdersComponent,
    OrdersDetailComponent,
    RewardCheckDialogComponent,
    EditComponent,
    OverPricedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxPrintModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
