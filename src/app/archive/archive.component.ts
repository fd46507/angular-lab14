import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/tasks';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  tasks: Array<Task> = new Array<Task>();
  constructor(private tasksService: TasksService) {}

  loadElementsOnSite(data: Object[], reload: boolean = false) {
    if (reload == true) {
      let mainDiv = document.getElementById('newElements');
      mainDiv.replaceChildren();
    }
    this.tasks = data;
    for (let i = 0; i < this.tasks.length; i++) {
      let div = document.createElement('div');
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '1px';
      div.style.marginBottom = '25px';
      div.id = `${this.tasks[i].id}`;

      let p = document.createElement('p');
      p.innerText = this.tasks[i].title;
      p.style.margin = '10px';

      let button = document.createElement('button');
      button.type = 'button';
      button.innerText = 'usuń';
      button.style.position = 'absolute';
      button.style.right = '25px';
      button.style.marginTop = '-37px';
      button.id = `${this.tasks[i].id}`;
      button.addEventListener('click', this.delete.bind(this, this.tasks[i]));

      if (this.tasks[i].deadline != null) {
        let label = document.createElement('label');
        label.style.fontWeight = 'bold';
        label.style.margin = '10px';
        label.innerText = String(this.tasks[i].deadline);
        div.appendChild(label);
      } else {
        button.style.marginTop = '-29px';
      }

      div.appendChild(p);
      div.appendChild(button);

      let mainDiv = document.getElementById('newElements');
      mainDiv.appendChild(div);
    }
  }

  delete(task: Task) {
    this.tasksService.deleteTask(task);
    setTimeout(this.loadElements.bind(this, true), 100);
  }

  loadElements(reload: boolean = false) {
    this.tasksService.get(true).subscribe((data) => {
      this.loadElementsOnSite(data, reload);
    });
  }

  ngOnInit() {
    this.loadElements();
  }
}
