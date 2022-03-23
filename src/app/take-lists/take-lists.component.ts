import { Category } from 'src/app/shared/category.model';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';

import { ListsService } from './lists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { List } from './list.model';

import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { Agent } from '../agents/agent.model';
import { AgentsService } from '../agents/agents.service';

@Component({
  selector: 'app-take-lists',
  templateUrl: './take-lists.component.html',
  styleUrls: ['./take-lists.component.css'],
})
export class TakeListsComponent implements OnInit, OnDestroy {
  selectNumbersType: string = 'two-numbers';
  p: number = 1;
  lists: List[];
  categoriesTwo: Category[];
  id: number;
  agent: Agent;
  agentForm: FormGroup;

  private agentId: string;

  private listChangeSub: Subscription;

  constructor(
    private listsService: ListsService,
    private route: ActivatedRoute,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('agentId')) {
        this.agentId = paramMap.get('agentId');
        this.agentsService.getAgent(this.agentId).subscribe((agentData) => {
          this.agent = {
            id: agentData._id,
            code: agentData.code,
            name: agentData.name,
            imagePath: agentData.imagePath
          };
          console.log(this.agent)
        });
      }
    });
    this.lists = this.listsService.getLists();
    this.listChangeSub = this.listsService.listsUpdated.subscribe(
      (lists: List[]) => {
        this.lists = lists;
      }
    );
  }

  ngOnDestroy(): void {
    this.listChangeSub.unsubscribe();
  }

  onSelect(select: string) {
    this.selectNumbersType = select;
  }

  onRemove(list: List) {
    this.listsService.removeList(list);
  }

  onSaveList(form: NgForm) {
    // const lists = this.listsService.getLists();
    // this.agentsService.addLists(
    //   this.agentId,
    //   form.value.code,
    //   form.value.name,
    //   form.value.imagePath,
    //   this.agent.itemLists
    //  );
    //  console.log(this.agent)
  }

  // onSubmit() {
  //   this.agentsService.addLists(this.id);
  //   console.log(this.agentForm.value);
  //   // this.router.navigate(['summarize'], {relativeTo: this.route})
  // }

}
