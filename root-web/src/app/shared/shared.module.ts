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
import { ParallaxDirective } from './directives/parallax.directive';
import { ElementMoveDirective } from './directives/element-move.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab-group/tab/tab.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ModalComponent } from './components/modal/modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SkipEventBehaviourDirective } from './directives/skip-event-behaviour.directive';
import { OpacityDirective } from './directives/opacity.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { AnimatedCardComponent } from './components/animated-card/animated-card.component';
import { RotateXYDirective } from './directives/rotate-xy.directive';

@NgModule({
    declarations: [
        NavComponent,
        InputComponent,
        ButtonComponent,
        LogoComponent,
        RunningLineComponent,
        HeaderComponent,
        ParallaxDirective,
        ElementMoveDirective,
        LoginFormComponent,
        RegisterFormComponent,
        TabGroupComponent,
        TabComponent,
        BackdropComponent,
        ModalComponent,
        AuthModalComponent,
        SkipEventBehaviourDirective,
        OpacityDirective,
        AlertComponent,
        InfoCardComponent,
        AnimatedCardComponent,
        RotateXYDirective,
    ],
    imports: [CommonModule, BrowserAnimationsModule, RouterModule, ReactiveFormsModule],
    exports: [
        NavComponent,
        InputComponent,
        ButtonComponent,
        LogoComponent,
        RunningLineComponent,
        HeaderComponent,
        ParallaxDirective,
        ElementMoveDirective,
        LoginFormComponent,
        RegisterFormComponent,
        TabGroupComponent,
        TabComponent,
        BackdropComponent,
        ModalComponent,
        AuthModalComponent,
        SkipEventBehaviourDirective,
        OpacityDirective,
        AlertComponent,
        InfoCardComponent,
        AnimatedCardComponent,
        RotateXYDirective,
    ],
})
export class SharedModule {}
