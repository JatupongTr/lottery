import { Category } from 'src/app/shared/category.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ListsService } from './lists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { List } from './list.model';

import { ActivatedRoute, Params } from '@angular/router';
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
    public route: ActivatedRoute,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.categoriesTwo = this.listsService.getCategoriesTwo();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
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

  onAddTwo() {

  }

  onSubmit() {
    console.log(this.agentForm);
  }

  private initForm() {
    let agentCode = '';
    let itemLists = new FormArray([]);
    const agent = this.agentsService.getAgent(this.id);
    agentCode = agent.code;
    itemLists.push(
      new FormGroup({
        list_no: new FormControl('null'),
        price: new FormControl('null'),
        discount: new FormControl('null'),
        netPrice: new FormControl('null'),
        category: new FormControl('null')
      })
    )

    this.agentForm = new FormGroup({
      code: new FormControl(agentCode),
      itemLists: itemLists
    });
  }
}
