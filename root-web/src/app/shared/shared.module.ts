import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { LogoComponent } from './components/logo/logo.component';
import { RunningLineComponent } from './components/running-line/running-line.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NavComponent, InputComponent, ButtonComponent, LogoComponent, RunningLineComponent, HeaderComponent],
    imports: [CommonModule, BrowserAnimationsModule, RouterModule],
    exports: [NavComponent, InputComponent, ButtonComponent, LogoComponent, RunningLineComponent, HeaderComponent],
})
export class SharedModule {}
