import { Component, OnInit } from '@angular/core';
import { Task } from './tasks';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  title?: string;
  deadline?: Date;
  retrievedData: any;
  tasks: Array<Task> = new Array<Task>();
  isChecked: boolean;

  constructor(private tasksService: TasksService) {}

  addBtnClick() {
    if (this.title == null) {
      return;
    }
    let newTask: Task = new Task();
    newTask.title = this.title;
    newTask.deadline = this.deadline;
    newTask.completed = false;
    newTask.archived = false;
    this.tasksService.post(newTask).subscribe((response) => {
      console.log(response);
    });
    setTimeout(this.loadElements.bind(this, true), 50);
    this.title = null;
    this.deadline = null;
  }

  onChange(event) {
    console.log(event.checked);
  }

  archiveCompleted() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].completed) {
        this.tasks[i].archived = true;
        this.tasksService.put(this.tasks[i]);
      }
    }
    setTimeout(this.loadElements.bind(this, true), 50);
  }

  private switchTaskChanged(task: Task) {
    if (task.completed == true) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    this.tasksService.put(task);
    setTimeout(this.loadElements.bind(this, true), 50);
  }

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

      let input = document.createElement('input');
      input.type = 'checkbox';
      input.style.position = 'absolute';
      input.style.right = '25px';
      input.style.marginTop = '-37px';
      input.id = `${this.tasks[i].id}`;
      input.addEventListener(
        'click',
        this.switchTaskChanged.bind(
          this,
          this.tasks.find((task) => task.id === parseInt(input.id))
        )
      );
      if (this.tasks[i].completed == true) {
        div.style.backgroundColor = '#ADADAD';
        input.checked = true;
      } else {
        input.checked = false;
        div.style.backgroundColor = 'white';
      }

      if (this.tasks[i].deadline != null) {
        let label = document.createElement('label');
        label.style.fontWeight = 'bold';
        label.style.margin = '10px';
        label.innerText = String(this.tasks[i].deadline);
        div.appendChild(label);
      } else {
        input.style.marginTop = '-25px';
      }

      div.appendChild(p);
      div.appendChild(input);

      let mainDiv = document.getElementById('newElements');
      mainDiv.appendChild(div);
    }
  }

  loadElements(reload: boolean = false) {
    this.tasksService.get().subscribe((data) => {
      this.loadElementsOnSite(data, reload);
    });
  }

  ngOnInit() {
    this.loadElements();
  }
}
