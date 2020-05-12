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
  script: Script;
  edit: boolean;

  constructor(
    private scriptService: ScriptService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private scriptScrvice: ScriptService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getScript();
  }

  getScript(): void {
    const ScriptId = + this.route.snapshot.paramMap.get('ScriptId');
    this.scriptScrvice.getScript(ScriptId)
      .subscribe(script => { this.script = script; console.log(script) }) 
  }

  getCategory(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories)
  }

  delete(script: Script): void {

    console.log("DELETE", script.id)
    this.scriptService.deleteVersion(script.id)
      .subscribe(data => this.getScript());

    console.log("DELETE2", script.id)
  }

  goBack(): void {
    this.location.back();
  }

  upDate(newScript: Script, update: NgForm) {
    newScript = <Script>{};
    newScript.scriptId = this.script.scriptId;
    newScript.name = update.value.name;
    if (newScript.name == "") {
      newScript.name = this.script.name;
    }
    newScript.body = update.value.body;
    if (newScript.body == "") {
      newScript.body = this.script.body;
    }
    newScript.author = update.value.author;
    if (newScript.author == "") {
      newScript.author = this.script.author;
    }
    newScript.tags = [update.value.tag]
    newScript.categoryId = Number(update.value.categoryId);
    if (newScript.categoryId == 0) {
      newScript.categoryId = this.script.categoryId;
    }
    console.log(newScript);
    this.scriptService.upDateScript(newScript)
      .subscribe(script => this.scripts.push(script))
  }
}
