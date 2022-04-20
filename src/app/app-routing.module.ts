import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { CheckOrdersComponent } from './check-orders/check-orders.component';

import { AgentOrderComponent } from './agents/agent-order/agent-order.component';
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsComponent } from './agents/agents.component';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { AgentCreateComponent } from './agents/agent-create/agent-create.component';
import { RewardCheckComponent } from './reward-check/reward-check.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'menu',
    component: DashboardComponent,
    children: [
      { path: 'reward-check', component: RewardCheckComponent },
      { path: 'overviews', component: OverviewsComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'agents/new', component: AgentCreateComponent },
      { path: 'agents/:id', component: AgentDetailComponent },
      { path: 'agents/edit/:agentId', component: AgentCreateComponent },
      { path: 'agents/lists/:agentId', component: AgentOrderComponent },
      { path: 'order/totals', component: AgentSummarizeComponent },
      { path: 'order/check', component: CheckOrdersComponent },
      { path: 'order/details/:orderId', component: OrdersDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
