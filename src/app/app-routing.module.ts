import { AuthGuard } from './auth/auth.guard';
import { OverPricedComponent } from './over-priced/over-priced.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { CheckOrdersComponent } from './check-orders/check-orders.component';

import { AgentOrderComponent } from './agents/agent-order/agent-order.component';
import { AgentSummarizeComponent } from './agents/agent-summarize/agent-summarize.component';
import { OverviewsComponent } from './overviews/overviews.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
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
      { path: 'reward-check', component: RewardCheckComponent, canActivate: [AuthGuard] },
      { path: 'overviews', component: OverviewsComponent, canActivate: [AuthGuard] },
      { path: 'over-priced', component: OverPricedComponent, canActivate: [AuthGuard]},
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      { path: 'agents', component: AgentsComponent, canActivate: [AuthGuard] },
      { path: 'agents/new', component: AgentCreateComponent, canActivate: [AuthGuard] },
      { path: 'agents/:id', component: AgentDetailComponent, canActivate: [AuthGuard] },
      { path: 'agents/edit/:agentId', component: AgentCreateComponent, canActivate: [AuthGuard] },
      { path: 'agents/lists/:agentId', component: AgentOrderComponent, canActivate: [AuthGuard] },
      { path: 'order/totals', component: AgentSummarizeComponent, canActivate: [AuthGuard] },
      { path: 'order/check', component: CheckOrdersComponent , canActivate: [AuthGuard]},
      { path: 'order/details/:orderId', component: OrdersDetailComponent, canActivate: [AuthGuard] },
      { path: 'agents/lists/summarize/:agentId', component: AgentSummarizeComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
