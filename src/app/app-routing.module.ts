import { RewardCheckComponent } from './reward-check/reward-check.component';
import { AgentOrderComponent } from './agents/agent-order/agent-order.component';
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      { path: 'reward-check', component: RewardCheckComponent },
      { path: 'overviews', component: OverviewsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'agents/new', component: AgentCreateComponent },
      { path: 'agents/:id', component: AgentDetailComponent },
      { path: 'agents/edit/:agentId', component: AgentCreateComponent },
      { path: 'agents/lists/:agentId', component: AgentOrderComponent },
      { path: 'order/totals', component: AgentSummarizeComponent },
      { path: 'agents/lists/summarize/:agentId', component: AgentSummarizeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
