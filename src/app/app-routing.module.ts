import { PrizesComponent } from './prizes/prizes.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentStartComponent } from './agents/agent-start/agent-start.component';
import { AgentsComponent } from './agents/agents.component';
import { TakeListsComponent } from './take-lists/take-lists.component';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';

const routes: Routes = [

  // {
  //   path: 'agents',
  //   component: AgentsComponent,
  //   children: [
  //     { path: '', component: AgentStartComponent },
  //     { path: 'new', component: AgentEditComponent },
  //     { path: ':id', component: AgentDetailComponent },
  //     { path: ':id/edit', component: AgentEditComponent },
  //   ],
  // },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'menu',
    component: DashboardComponent,
    children: [
      { path: 'prize', component: PrizesComponent },
      { path: 'overviews', component: OverviewsComponent },
      { path: 'agents/new', component: AgentEditComponent },
      { path: 'agents/:id', component: AgentDetailComponent },
      { path: 'agents/:id/edit', component: AgentEditComponent },
      { path: 'agents/:id/lists', component: TakeListsComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
