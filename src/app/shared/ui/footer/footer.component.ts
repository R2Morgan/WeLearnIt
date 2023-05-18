import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openChangelog(){
    let url = this.router.createUrlTree(['/changelog']);
    window.open(url.toString(), "_blank", 
    "resizable=no, width=1000, height=600");
  }

}
