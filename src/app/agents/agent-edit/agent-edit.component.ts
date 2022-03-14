import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../agents.service';
import { Agent } from '../agent.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css'],
})
export class AgentEditComponent implements OnInit {
  id: number;
  editMode = false;
  agentForm: FormGroup;
  agent: Agent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agentsService: AgentsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newAgent = new Agent(
    //   this.agentForm.value['code'],
    //   this.agentForm.value['name'],
    //   this.agentForm.value['imagePath'],
    //   this.agentForm.value['itemLists']
    // );
    // if (this.editMode) {
    //   this.agentsService.updateAgent(this.id, newAgent);
    // } else {
    //   // this.agentsService.addAgent(newAgent)
    // }
    // this.agentForm.reset();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    // let agentCode = '';
    // let agentName = '';
    // let imagePath = '';

    // if (this.editMode) {
    //   const agent = this.agentsService.getAgent(this.id);
    //   agentCode = agent.code;
    //   agentName = agent.name;
    //   imagePath = agent.imagePath;
    // }
    // this.agentForm = new FormGroup({
    //   code: new FormControl(agentCode),
    //   name: new FormControl(agentName),
    //   imagePath: new FormControl(imagePath),
    // });
  }
}
