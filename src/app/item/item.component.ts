import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ItemModel} from '../interfaces/ItemModel';
import {API_Response} from '../interfaces/API_Response';
import {API_Delete} from '../interfaces/API_Delete';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: [],
  providers: [DataService]
})
export class ItemComponent implements OnInit {

  items;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.dataService.getItems().subscribe((data: API_Response) => {
      this.items = data.msg;
    });
  }

  addItem(frm) {
    const newItem: ItemModel = {
      name: frm.value.name,
      in_stock: true
    };
    this.dataService.addItem(newItem).subscribe((data: API_Response) => {
      console.log(data);
      this.getItems();
    });
  }

  updateItem(item) {
    item.in_stock = !item.in_stock;
    this.dataService.updateItem(item).subscribe((res) => {
      this.getItems();
    });
  }

  deleteItem(id) {
    this.dataService.deleteItem(id).subscribe((data: API_Delete) => {
      // tslint:disable-next-line:triple-equals
      if (data.msg.n == 1) {
        for (let i = 0; i < this.items.length; i++) {
          // tslint:disable-next-line:triple-equals
          if (id == this.items[i]._id) {
            this.items.splice(i, 1);
          }
        }
      }
    });
  }
}
