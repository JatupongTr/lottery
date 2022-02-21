import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AgentsService } from '../agents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Agent } from '../agent.model';

@Component({
  selector: 'app-agent-add-lists',
  templateUrl: './agent-add-lists.component.html',
  styleUrls: ['./agent-add-lists.component.css'],
})
export class AgentAddListsComponent implements OnInit {
  id: number;
  twoCategories = ['2 ตัวบน', '2 ตัวล่าง'];
  runningCategories = ['วิ่งบน', 'วิ่งล่าง'];
  threeCategories = [
    '3 ตัวบน',
    '3 ตัวโต๊ด',
    '3 ตัวหน้า',
    '3 ตัวท้าย',
    '3 ตัวล่าง',
  ];

  itemListForm: FormGroup;
  selectType: string = 'two-numbers';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
    });
  }

  onSelect(select: string) {
    this.selectType = select;
  }

  onAddTwoNumbers() {
    (<FormArray>this.itemListForm.get('itemLists')).push(
      new FormGroup({
        'two-numbers': new FormGroup({
          'list_no_two': new FormControl(null),
          'category_two': new FormControl(null),
          'price_two': new FormControl(0),
          'discount_two': new FormControl(0),
        })
      })
    )
  }

  onSubmit() {
    this.router.navigate(['summarize'], {relativeTo: this.route})
  }

  private initForm() {
    let agentCode = '';
    let agentItemLists = new FormArray([]);
    const agent = this.agentsService.getAgent(this.id);
    agentCode = agent.code;
    if (agent['itemLists']) {
      for (let itemList of agent.itemLists) {
        agentItemLists.push(
          new FormGroup({
            'two-numbers': new FormGroup({
              'list_no_two': new FormControl(itemList.list_no),
              'category_two': new FormControl(itemList.category),
              'price_two': new FormControl(itemList.price),
              'discount_two': new FormControl(itemList.discount)
            })
          })
        )
      }
    }

    this.itemListForm = new FormGroup({
      code: new FormControl(agentCode, Validators.required),
      itemLists: agentItemLists,
    });
  }
}
