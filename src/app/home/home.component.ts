import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Добро пожаловать в приложение!</h1>
      <p>Это тестовое задание по Angular 19+</p>
      <a routerLink="/menu" class="nav-link">Перейти к меню →</a>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        text-align: center;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #1976d2;
      }
      .nav-link {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #1976d2;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      .nav-link:hover {
        background-color: #1565c0;
      }
    `,
  ],
})
export class HomeComponent {}
