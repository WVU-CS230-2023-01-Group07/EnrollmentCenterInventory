"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchItemsLayoutComponent = void 0;
var core_1 = require("@angular/core");
var database_1 = require("firebase/database");
require("firebase/database");
var SearchItemsLayoutComponent = /** @class */ (function () {
    function SearchItemsLayoutComponent(firestore) {
        this.firestore = firestore;
        this.searchItem = '';
        this.db = (0, database_1.getDatabase)();
        this.productsRef = (0, database_1.ref)(this.db, '/Products');
    }
    SearchItemsLayoutComponent.prototype.linearSearch = function (productName) {
        // Get a database reference to our posts
        var db = (0, database_1.getDatabase)();
        var name = "example name";
        var productRef = (0, database_1.ref)(db, '/Products');
        var query = (0, database_1.orderByChild)('/Products');
        // Attach an asynchronous callback to read the data at our posts reference
        (0, database_1.onValue)(productRef, function (snapshot) {
            var data = snapshot.val();
            console.log(snapshot.val());
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.name);
        });
    };
    SearchItemsLayoutComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-search-items-layout',
            templateUrl: './search-items-layout.component.html',
            styleUrls: ['./search-items-layout.component.css']
        })
    ], SearchItemsLayoutComponent);
    return SearchItemsLayoutComponent;
}());
exports.SearchItemsLayoutComponent = SearchItemsLayoutComponent;
