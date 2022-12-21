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
  public show = true;
  constructor(private tasksService: TasksService) {}

  delete(task: Task) {
    this.tasksService.deleteTask(task);
    setTimeout(this.loadElements.bind(this, true), 100);
  }

  loadElementsOnSite() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  loadElements(reload: boolean = false) {
    this.tasksService.get(true).subscribe((data) => {
      this.tasks = data;
    });
    if (reload == true) {
      setTimeout(this.loadElementsOnSite.bind(this), 100);
    }
  }

  ngOnInit() {
    this.loadElements();
  }
}
