import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Agent } from '../agents/agent.model';
import { AgentsService } from '../agents/agents.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private agentsServcie: AgentsService) {}
}
