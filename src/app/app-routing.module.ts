import { TakeListsComponent } from './take-lists/take-lists.component';
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { PrizesComponent } from './prizes/prizes.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { AgentCreateComponent } from './agents/agent-create/agent-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'menu',
    component: DashboardComponent,
    children: [
      { path: 'prize', component: PrizesComponent },
      { path: 'overviews', component: OverviewsComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'agents/new', component: AgentCreateComponent },
      { path: 'agents/:id', component: AgentDetailComponent },
      { path: 'agents/edit/:agentId', component: AgentCreateComponent },
      { path: 'agents/:id/lists', component: TakeListsComponent },
      { path: 'agents/:id/lists/summarize', component: AgentSummarizeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
