import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { TitleService } from 'src/services/title.service';
import { SonService } from 'src/services/sound.service';
import { NavbarService } from 'src/services/navbar.service';
import { NgForm } from '@angular/forms';
import { ModeService } from 'src/services/mode-ergo.service';




@Component({
  selector: 'app-membre-liste',
  templateUrl: './membre-liste.component.html',
  styleUrl: './membre-liste.component.scss'
})
export class MembreListeComponent implements OnInit {

  public membreListe: Membre[] = [];

  public displayForm: boolean = false;

  membreListeDisplayed: Membre[] = [];

  isDisabled: boolean = false;

  isNavVisible = false;

  search: string = '';

  src: string  = "../../../assets/img/no-photo.png";



  constructor(private router: Router, public membreService: MembreService, public titleService: TitleService, private sonService: SonService, private navbarService: NavbarService, private modeService: ModeService) {
   
    this.membreService.membres$.subscribe((membres: Membre[]) => {
      this.membreListe = membres;
      this.membreService.membres = this.membreListe;
      this.membreListeDisplayed = this.membreListe;
     
    });
    this.membreService.setMembre(null);
  
    
   
    this.titleService.title = 'Bienvenue';
    this.titleService.search = 'Rechercher un enfant';

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });

  }

  ngOnInit(): void {
    
  }
  

  onSelectMember(id: number) {
    console.log("Test");
    this.membreService.setMemberId(id);
    this.router.navigate(['/dashboard', id]);
  }

 

  toggleForm() {
    this.displayForm = !this.displayForm;
  }


  playSound() {
    this.sonService.playSound('./../../../../assets/img/good.mp3');
  }

  onKey(event: any) {
    this.membreListeDisplayed = this.membreListe.filter(membre => membre.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || membre.lastName.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  submitForm(form: NgForm): void {
    const firstNameMember = form.value.firstName;
    const lastNameMember = form.value.lastName;
    const ageMember = form.value.age;
    const descriptionMember = form.value.description;
    const imageMember = this.src;
    if (form.valid) {
      const newMember: Membre = {
        id: 1,
        firstName: firstNameMember,
        lastName: lastNameMember,
        age: ageMember,
        description: descriptionMember,
        image: imageMember || "" ,
      };

      this.membreService.addMembre(newMember);

      form.resetForm();
      this.toggleForm();
      this.src = "../../../assets/img/no-photo.png";
    } 
  }

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => (this.src = reader.result as string);
  }




}


