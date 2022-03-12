import { environment } from './../environments/environment.prod';
import { ListsService } from './take-lists/lists.service';
import { LotteriesService } from './shared/lotteries.service';
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
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { TakeListsComponent } from './take-lists/take-lists.component';
import { RunningComponent } from './take-lists/running/running.component';
import { TwoNumbersComponent } from './take-lists/two-numbers/two-numbers.component';
import { ThreeNumbersComponent } from './take-lists/three-numbers/three-numbers.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentListComponent } from './agents/agent-list/agent-list.component';
import { AgentStartComponent } from './agents/agent-start/agent-start.component';
import { AgentItemComponent } from './agents/agent-list/agent-item/agent-item.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { PrizesComponent } from './prizes/prizes.component';
import { AgentsService } from './agents/agents.service';
import { PrizesService } from './prizes/prizes.service';
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { AgentCreateComponent } from './agents/agent-create/agent-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    AuthComponent,
    TakeListsComponent,
    RunningComponent,
    TwoNumbersComponent,
    ThreeNumbersComponent,
    AgentsComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentListComponent,
    AgentStartComponent,
    AgentItemComponent,
    OverviewsComponent,
    LoadingSpinnerComponent,
    PrizesComponent,
    AgentSummarizeComponent,
    AgentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
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
  ],
  providers: [AgentsService, PrizesService, LotteriesService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
