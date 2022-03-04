import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Agent } from '../agent.model';
import { AgentsService } from '../agents.service';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.css'],
})
export class AgentCreateComponent implements OnInit {
  agent: Agent;
  isLoading = false;

  private mode = 'create';
  private agentId: string;

  constructor(
    private agetnsService: AgentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('agentId')) {
        this.mode = 'edit';
        this.agentId = paramMap.get('agentId');
        this.agetnsService.getAgent(this.agentId).subscribe((agentData) => {
          this.agent = {
            id: agentData._id,
            code: agentData.code,
            name: agentData.name,
            imagePath: agentData.imagePath,
            itemLists: agentData.itemLists,
          };
        });
      } else {
        this.mode = 'create';
        this.agentId = null;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/menu/agents'], { relativeTo: this.route });
  }

  onSaveAgent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.agetnsService.addAgent(
        form.value.code,
        form.value.name,
        form.value.imagePath,
        form.value.itemLists
      );
    } else {
      this.agetnsService.updateAgent(
        this.agentId,
        form.value.code,
        form.value.name,
        form.value.imagePath,
        form.value.itemLists
      )
    }
    form.resetForm();
  }
}
