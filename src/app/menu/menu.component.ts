import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem, MenuCategory } from './menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <!-- Заголовок с информацией -->
      <div class="header">
        <h2>Раздел: {{ selectedCategoriesDisplay() }}</h2>
        <p>Выбрано пунктов: {{ selectedCount() }}</p>
        <p>Общее значение: {{ totalValue() }}</p>
        <a routerLink="/" class="back-link">← На главную</a>
      </div>

      <!-- Меню со списком элементов -->
      <div class="menu">
        <div *ngFor="let category of categories()" class="category">
          <h3>{{ category.name }}</h3>
          <div class="items">
            <label *ngFor="let item of category.items" class="menu-item">
              <input type="checkbox" [(ngModel)]="item.selected" (change)="updateStats()" />
              <span class="item-name">{{ item.name }}</span>
              <span class="item-value">{{ item.value }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .header {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #1976d2;
      }
      .header h2 {
        margin: 0 0 10px 0;
        color: #333;
      }
      .header p {
        margin: 5px 0;
        color: #666;
      }
      .back-link {
        display: inline-block;
        margin-top: 10px;
        color: #1976d2;
        text-decoration: none;
      }
      .back-link:hover {
        text-decoration: underline;
      }
      .category {
        margin-bottom: 30px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        background-color: white;
      }
      .category h3 {
        margin: 0 0 15px 0;
        color: #1976d2;
        font-size: 1.2em;
      }
      .items {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .menu-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
        border-radius: 4px;
      }
      .menu-item:hover {
        background-color: #f0f0f0;
      }
      input[type='checkbox'] {
        margin-right: 10px;
        cursor: pointer;
      }
      .item-name {
        flex: 1;
        font-weight: 500;
      }
      .item-value {
        color: #666;
        font-size: 0.9em;
      }
    `,
  ],
})
export class MenuComponent {
  // Статические данные меню (JSON)
  private menuData = signal<MenuCategory[]>([
    {
      name: 'Тип 1',
      items: [
        { id: 1, name: 'Версия 1 - Вид', value: 20, category: 'Тип 1', selected: false },
        { id: 2, name: 'Версия 1 - Версия', value: 30, category: 'Тип 1', selected: false },
      ],
    },
    {
      name: 'Тип 2',
      items: [
        { id: 3, name: 'Версия 2 - Вид', value: 30, category: 'Тип 2', selected: false },
        { id: 4, name: 'Версия 3 - Вид', value: 45, category: 'Тип 2', selected: false },
        { id: 5, name: 'Версия 4 - Вид', value: 50, category: 'Тип 2', selected: false },
      ],
    },
  ]);

  categories = this.menuData;

  // Вычисляемые значения
  selectedCount = computed(() => {
    return this.categories()
      .flatMap((cat) => cat.items)
      .filter((item) => item.selected).length;
  });

  totalValue = computed(() => {
    return this.categories()
      .flatMap((cat) => cat.items)
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.value, 0);
  });

  selectedCategoriesDisplay = computed(() => {
    const selectedItems = this.categories()
      .flatMap((cat) => cat.items)
      .filter((item) => item.selected);

    if (selectedItems.length === 0) {
      return 'Ничего не выбрано';
    }

    const categories = [...new Set(selectedItems.map((item) => item.category))];
    return categories.join(', ');
  });

  updateStats() {
    // Триггерим перерасчет computed сигналов
    this.categories.set([...this.categories()]);
  }
}
