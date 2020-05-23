import { Component, OnInit, Input } from '@angular/core';
import { Script } from '../shared/Script';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ScriptService } from '../shared/script.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/Category';

@Component({
    selector: 'app-edit',
    templateUrl: './script-edit.component.html',
    styleUrls: ['./script-edit.component.css']
})
/** edit component*/
export class EditScriptComponent implements OnInit {
/** edit ctor */
  scripts: Script[];
  categories: Category[];
  script = <Script>{};
  tags: string[] = [];
  edit: boolean;

  constructor(
    private scriptService: ScriptService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private scriptScrvice: ScriptService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getScript();
    this.getCategory();
  }

  createTags(tagNew: string) {
    tagNew = tagNew.trim();
    if (tagNew !== "") {
      this.tags.push(tagNew);
    }
  }

  deleteTag(i: number) {
    this.tags.splice(i, 1);
  }

  async getScript() {
    const ScriptId = + this.route.snapshot.paramMap.get('ScriptId');
    this.scriptScrvice.getScript(ScriptId)
      .subscribe(script => {
      this.script = script;
      this.tags = script.tags;});
  }

  async getCategory() {
    this.categoryService.getCategories()
      .subscribe(categories => {
      this.categories = categories;
        categories.forEach(item => item.selected = item.id === this.script.categoryId ? 'selected' : null);
      })
  }

  goBack(): void {
    this.location.back();
  }

  upDate(newScript: Script) {
    newScript = <Script>{};
    newScript.scriptId = this.script.scriptId;
    newScript.name = this.script.name;
    newScript.body = this.script.body;
    newScript.tags = this.tags;
    newScript.categoryId = this.script.categoryId;
    console.log(newScript)
   /* this.scriptService.upDateScript(newScript)
      .subscribe(script => this.scripts.push(script))
    this.goBack();*/
  }
}
