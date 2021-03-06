import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {formatDate} from "@angular/common";
import {ZcwAppService} from "../shared/zcw-app.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  model: BlogPost = {
    blogId: null,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    title: '',
    body: '',
    tag: '',
    status: 'pending'
  }

  constructor(private apiService: ZcwAppService) { }

  ngOnInit(): void {
  }

  public createBlogPost(): void{
    this.apiService.postBlogPost(this.model).subscribe(
      res => {
        this.model.blogId = res.blogId;
        location.assign("http://localhost:4200/blogs")
      },
      error => {
        alert("An error occurred while saving blog post")
      }
    )
  }

}
