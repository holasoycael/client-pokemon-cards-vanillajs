/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@discordjs/collection/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@discordjs/collection/dist/index.js ***!
  \**********************************************************/
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collection = void 0;
/**
 * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
 * an ID, for significantly improved performance and ease-of-use.
 * @extends {Map}
 * @property {number} size - The amount of elements in this collection.
 */
class Collection extends Map {
    constructor(entries) {
        super(entries);
        /**
         * Cached array for the `array()` method - will be reset to `null` whenever `set()` or `delete()` are called
         * @name Collection#_array
         * @type {?Array}
         * @private
         */
        Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
        /**
         * Cached array for the `keyArray()` method - will be reset to `null` whenever `set()` or `delete()` are called
         * @name Collection#_keyArray
         * @type {?Array}
         * @private
         */
        Object.defineProperty(this, '_keyArray', { value: null, writable: true, configurable: true });
    }
    /**
     * Identical to [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).
     * Gets an element with the specified key, and returns its value, or `undefined` if the element does not exist.
     * @param {*} key - The key to get from this collection
     * @returns {* | undefined}
     */
    get(key) {
        return super.get(key);
    }
    /**
     * Identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set).
     * Sets a new element in the collection with the specified key and value.
     * @param {*} key - The key of the element to add
     * @param {*} value - The value of the element to add
     * @returns {Collection}
     */
    set(key, value) {
        this._array = null;
        this._keyArray = null;
        return super.set(key, value);
    }
    /**
     * Identical to [Map.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has).
     * Checks if an element exists in the collection.
     * @param {*} key - The key of the element to check for
     * @returns {boolean} `true` if the element exists, `false` if it does not exist.
     */
    has(key) {
        return super.has(key);
    }
    /**
     * Identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete).
     * Deletes an element from the collection.
     * @param {*} key - The key to delete from the collection
     * @returns {boolean} `true` if the element was removed, `false` if the element does not exist.
     */
    delete(key) {
        this._array = null;
        this._keyArray = null;
        return super.delete(key);
    }
    /**
     * Identical to [Map.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear).
     * Removes all elements from the collection.
     * @returns {undefined}
     */
    clear() {
        return super.clear();
    }
    /**
     * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.values()]` or
     * `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    array() {
        if (!this._array || this._array.length !== this.size)
            this._array = [...this.values()];
        return this._array;
    }
    /**
     * Creates an ordered array of the keys of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.keys()]` or
     * `Array.from(collection.keys())` instead.
     * @returns {Array}
     */
    keyArray() {
        if (!this._keyArray || this._keyArray.length !== this.size)
            this._keyArray = [...this.keys()];
        return this._keyArray;
    }
    first(amount) {
        if (typeof amount === 'undefined')
            return this.values().next().value;
        if (amount < 0)
            return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, () => iter.next().value);
    }
    firstKey(amount) {
        if (typeof amount === 'undefined')
            return this.keys().next().value;
        if (amount < 0)
            return this.lastKey(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.keys();
        return Array.from({ length: amount }, () => iter.next().value);
    }
    last(amount) {
        const arr = this.array();
        if (typeof amount === 'undefined')
            return arr[arr.length - 1];
        if (amount < 0)
            return this.first(amount * -1);
        if (!amount)
            return [];
        return arr.slice(-amount);
    }
    lastKey(amount) {
        const arr = this.keyArray();
        if (typeof amount === 'undefined')
            return arr[arr.length - 1];
        if (amount < 0)
            return this.firstKey(amount * -1);
        if (!amount)
            return [];
        return arr.slice(-amount);
    }
    random(amount) {
        let arr = this.array();
        if (typeof amount === 'undefined')
            return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount)
            return [];
        arr = arr.slice();
        return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    randomKey(amount) {
        let arr = this.keyArray();
        if (typeof amount === 'undefined')
            return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount)
            return [];
        arr = arr.slice();
        return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    find(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return val;
        }
        return undefined;
    }
    findKey(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return key;
        }
        return undefined;
    }
    sweep(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        const previousSize = this.size;
        for (const [key, val] of this) {
            if (fn(val, key, this))
                this.delete(key);
        }
        return previousSize - this.size;
    }
    filter(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        const results = new this.constructor[Symbol.species]();
        for (const [key, val] of this) {
            if (fn(val, key, this))
                results.set(key, val);
        }
        return results;
    }
    partition(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        // TODO: consider removing the <K, V> from the constructors after TS 3.7.0 is released, as it infers it
        const results = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (const [key, val] of this) {
            if (fn(val, key, this)) {
                results[0].set(key, val);
            }
            else {
                results[1].set(key, val);
            }
        }
        return results;
    }
    flatMap(fn, thisArg) {
        const collections = this.map(fn, thisArg);
        return new this.constructor[Symbol.species]().concat(...collections);
    }
    map(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, () => {
            const [key, value] = iter.next().value;
            return fn(value, key, this);
        });
    }
    mapValues(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        const coll = new this.constructor[Symbol.species]();
        for (const [key, val] of this)
            coll.set(key, fn(val, key, this));
        return coll;
    }
    some(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return true;
        }
        return false;
    }
    every(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (!fn(val, key, this))
                return false;
        }
        return true;
    }
    /**
     * Applies a function to produce a single value. Identical in behavior to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param {Function} fn Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
     * and `collection`
     * @param {*} [initialValue] Starting value for the accumulator
     * @returns {*}
     * @example collection.reduce((acc, guild) => acc + guild.memberCount, 0);
     */
    reduce(fn, initialValue) {
        let accumulator;
        if (typeof initialValue !== 'undefined') {
            accumulator = initialValue;
            for (const [key, val] of this)
                accumulator = fn(accumulator, val, key, this);
            return accumulator;
        }
        let first = true;
        for (const [key, val] of this) {
            if (first) {
                accumulator = val;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, val, key, this);
        }
        // No items iterated.
        if (first) {
            throw new TypeError('Reduce of empty collection with no initial value');
        }
        return accumulator;
    }
    each(fn, thisArg) {
        this.forEach(fn, thisArg);
        return this;
    }
    tap(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        fn(this);
        return this;
    }
    /**
     * Creates an identical shallow copy of this collection.
     * @returns {Collection}
     * @example const newColl = someColl.clone();
     */
    clone() {
        return new this.constructor[Symbol.species](this);
    }
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     * @param {...Collection} collections Collections to merge
     * @returns {Collection}
     * @example const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     */
    concat(...collections) {
        const newColl = this.clone();
        for (const coll of collections) {
            for (const [key, val] of coll)
                newColl.set(key, val);
        }
        return newColl;
    }
    /**
     * Checks if this collection shares identical items with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {Collection} collection Collection to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    equals(collection) {
        if (!collection)
            return false;
        if (this === collection)
            return true;
        if (this.size !== collection.size)
            return false;
        for (const [key, value] of this) {
            if (!collection.has(key) || value !== collection.get(key)) {
                return false;
            }
        }
        return true;
    }
    /**
     * The sort method sorts the items of a collection in place and returns it.
     * The sort is not necessarily stable in Node 10 or older.
     * The default sort order is according to string Unicode code points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * If omitted, the collection is sorted according to each character's Unicode code point value,
     * according to the string conversion of each element.
     * @returns {Collection}
     * @example collection.sort((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
     */
    sort(compareFunction = (x, y) => Number(x > y) || Number(x === y) - 1) {
        const entries = [...this.entries()];
        entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));
        // Perform clean-up
        super.clear();
        this._array = null;
        this._keyArray = null;
        // Set the new entries
        for (const [k, v] of entries) {
            super.set(k, v);
        }
        return this;
    }
    /**
     * The intersect method returns a new structure containing items where the keys are present in both original structures.
     * @param {Collection} other The other Collection to filter against
     * @returns {Collection}
     */
    intersect(other) {
        return other.filter((_, k) => this.has(k));
    }
    /**
     * The difference method returns a new structure containing items where the key is present in one of the original structures but not the other.
     * @param {Collection} other The other Collection to filter against
     * @returns {Collection}
     */
    difference(other) {
        return other.filter((_, k) => !this.has(k)).concat(this.filter((_, k) => !other.has(k)));
    }
    /**
     * The sorted method sorts the items of a collection and returns it.
     * The sort is not necessarily stable in Node 10 or older.
     * The default sort order is according to string Unicode code points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * If omitted, the collection is sorted according to each character's Unicode code point value,
     * according to the string conversion of each element.
     * @returns {Collection}
     * @example collection.sorted((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
     */
    sorted(compareFunction = (x, y) => Number(x > y) || Number(x === y) - 1) {
        return new this.constructor[Symbol.species]([...this.entries()])
            .sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
    }
}
exports.Collection = Collection;
Collection.default = Collection;
module.exports = Collection;
exports["default"] = Collection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQWlCLFNBQVEsR0FBUztJQU12QyxZQUFtQixPQUErQztRQUNqRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFZjs7Ozs7V0FLRztRQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUzRjs7Ozs7V0FLRztRQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxHQUFHLENBQUMsR0FBTTtRQUNoQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsS0FBUTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEdBQUcsQ0FBQyxHQUFNO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsR0FBTTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FB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Y2UgQ29sbGVjdGlvbkNvbnN0cnVjdG9yIHtcblx0bmV3KCk6IENvbGxlY3Rpb248dW5rbm93biwgdW5rbm93bj47XG5cdG5ldzxLLCBWPihlbnRyaWVzPzogUmVhZG9ubHlBcnJheTxyZWFkb25seSBbSywgVl0+IHwgbnVsbCk6IENvbGxlY3Rpb248SywgVj47XG5cdG5ldzxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8cmVhZG9ubHkgW0ssIFZdPik6IENvbGxlY3Rpb248SywgVj47XG5cdHJlYWRvbmx5IHByb3RvdHlwZTogQ29sbGVjdGlvbjx1bmtub3duLCB1bmtub3duPjtcblx0cmVhZG9ubHkgW1N5bWJvbC5zcGVjaWVzXTogQ29sbGVjdGlvbkNvbnN0cnVjdG9yO1xufVxuXG4vKipcbiAqIEEgTWFwIHdpdGggYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMuIFRoaXMgaXMgdXNlZCB0aHJvdWdob3V0IGRpc2NvcmQuanMgcmF0aGVyIHRoYW4gQXJyYXlzIGZvciBhbnl0aGluZyB0aGF0IGhhc1xuICogYW4gSUQsIGZvciBzaWduaWZpY2FudGx5IGltcHJvdmVkIHBlcmZvcm1hbmNlIGFuZCBlYXNlLW9mLXVzZS5cbiAqIEBleHRlbmRzIHtNYXB9XG4gKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSAtIFRoZSBhbW91bnQgb2YgZWxlbWVudHMgaW4gdGhpcyBjb2xsZWN0aW9uLlxuICovXG5jbGFzcyBDb2xsZWN0aW9uPEssIFY+IGV4dGVuZHMgTWFwPEssIFY+IHtcblx0cHJpdmF0ZSBfYXJyYXkhOiBWW10gfCBudWxsO1xuXHRwcml2YXRlIF9rZXlBcnJheSE6IEtbXSB8IG51bGw7XG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdDogdHlwZW9mIENvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuXHRwdWJsaWMgWydjb25zdHJ1Y3RvciddOiB0eXBlb2YgQ29sbGVjdGlvbjtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IoZW50cmllcz86IFJlYWRvbmx5QXJyYXk8cmVhZG9ubHkgW0ssIFZdPiB8IG51bGwpIHtcblx0XHRzdXBlcihlbnRyaWVzKTtcblxuXHRcdC8qKlxuXHRcdCAqIENhY2hlZCBhcnJheSBmb3IgdGhlIGBhcnJheSgpYCBtZXRob2QgLSB3aWxsIGJlIHJlc2V0IHRvIGBudWxsYCB3aGVuZXZlciBgc2V0KClgIG9yIGBkZWxldGUoKWAgYXJlIGNhbGxlZFxuXHRcdCAqIEBuYW1lIENvbGxlY3Rpb24jX2FycmF5XG5cdFx0ICogQHR5cGUgez9BcnJheX1cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2FycmF5JywgeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENhY2hlZCBhcnJheSBmb3IgdGhlIGBrZXlBcnJheSgpYCBtZXRob2QgLSB3aWxsIGJlIHJlc2V0IHRvIGBudWxsYCB3aGVuZXZlciBgc2V0KClgIG9yIGBkZWxldGUoKWAgYXJlIGNhbGxlZFxuXHRcdCAqIEBuYW1lIENvbGxlY3Rpb24jX2tleUFycmF5XG5cdFx0ICogQHR5cGUgez9BcnJheX1cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2tleUFycmF5JywgeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZGVudGljYWwgdG8gW01hcC5nZXQoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2dldCkuXG5cdCAqIEdldHMgYW4gZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LCBhbmQgcmV0dXJucyBpdHMgdmFsdWUsIG9yIGB1bmRlZmluZWRgIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0LlxuXHQgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgdG8gZ2V0IGZyb20gdGhpcyBjb2xsZWN0aW9uXG5cdCAqIEByZXR1cm5zIHsqIHwgdW5kZWZpbmVkfVxuXHQgKi9cblx0cHVibGljIGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG5cdH1cblxuXHQvKipcblx0ICogSWRlbnRpY2FsIHRvIFtNYXAuc2V0KCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9zZXQpLlxuXHQgKiBTZXRzIGEgbmV3IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBhbmQgdmFsdWUuXG5cdCAqIEBwYXJhbSB7Kn0ga2V5IC0gVGhlIGtleSBvZiB0aGUgZWxlbWVudCB0byBhZGRcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCB0byBhZGRcblx0ICogQHJldHVybnMge0NvbGxlY3Rpb259XG5cdCAqL1xuXHRwdWJsaWMgc2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzIHtcblx0XHR0aGlzLl9hcnJheSA9IG51bGw7XG5cdFx0dGhpcy5fa2V5QXJyYXkgPSBudWxsO1xuXHRcdHJldHVybiBzdXBlci5zZXQoa2V5LCB2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogSWRlbnRpY2FsIHRvIFtNYXAuaGFzKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9oYXMpLlxuXHQgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBleGlzdHMgaW4gdGhlIGNvbGxlY3Rpb24uXG5cdCAqIEBwYXJhbSB7Kn0ga2V5IC0gVGhlIGtleSBvZiB0aGUgZWxlbWVudCB0byBjaGVjayBmb3Jcblx0ICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZWxlbWVudCBleGlzdHMsIGBmYWxzZWAgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG5cdCAqL1xuXHRwdWJsaWMgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBzdXBlci5oYXMoa2V5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZGVudGljYWwgdG8gW01hcC5kZWxldGUoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2RlbGV0ZSkuXG5cdCAqIERlbGV0ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuXHQgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgdG8gZGVsZXRlIGZyb20gdGhlIGNvbGxlY3Rpb25cblx0ICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZWxlbWVudCB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cblx0ICovXG5cdHB1YmxpYyBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG5cdFx0dGhpcy5fYXJyYXkgPSBudWxsO1xuXHRcdHRoaXMuX2tleUFycmF5ID0gbnVsbDtcblx0XHRyZXR1cm4gc3VwZXIuZGVsZXRlKGtleSk7XG5cdH1cblxuXHQvKipcblx0ICogSWRlbnRpY2FsIHRvIFtNYXAuY2xlYXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2NsZWFyKS5cblx0ICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSB0aGUgY29sbGVjdGlvbi5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcblx0XHRyZXR1cm4gc3VwZXIuY2xlYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIG9yZGVyZWQgYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGlzIGNvbGxlY3Rpb24sIGFuZCBjYWNoZXMgaXQgaW50ZXJuYWxseS4gVGhlIGFycmF5IHdpbGwgb25seSBiZVxuXHQgKiByZWNvbnN0cnVjdGVkIGlmIGFuIGl0ZW0gaXMgYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uLCBvciBpZiB5b3UgY2hhbmdlIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XG5cdCAqIGl0c2VsZi4gSWYgeW91IGRvbid0IHdhbnQgdGhpcyBjYWNoaW5nIGJlaGF2aW9yLCB1c2UgYFsuLi5jb2xsZWN0aW9uLnZhbHVlcygpXWAgb3Jcblx0ICogYEFycmF5LmZyb20oY29sbGVjdGlvbi52YWx1ZXMoKSlgIGluc3RlYWQuXG5cdCAqIEByZXR1cm5zIHtBcnJheX1cblx0ICovXG5cdHB1YmxpYyBhcnJheSgpOiBWW10ge1xuXHRcdGlmICghdGhpcy5fYXJyYXkgfHwgdGhpcy5fYXJyYXkubGVuZ3RoICE9PSB0aGlzLnNpemUpIHRoaXMuX2FycmF5ID0gWy4uLnRoaXMudmFsdWVzKCldO1xuXHRcdHJldHVybiB0aGlzLl9hcnJheTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIG9yZGVyZWQgYXJyYXkgb2YgdGhlIGtleXMgb2YgdGhpcyBjb2xsZWN0aW9uLCBhbmQgY2FjaGVzIGl0IGludGVybmFsbHkuIFRoZSBhcnJheSB3aWxsIG9ubHkgYmVcblx0ICogcmVjb25zdHJ1Y3RlZCBpZiBhbiBpdGVtIGlzIGFkZGVkIHRvIG9yIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiwgb3IgaWYgeW91IGNoYW5nZSB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuXHQgKiBpdHNlbGYuIElmIHlvdSBkb24ndCB3YW50IHRoaXMgY2FjaGluZyBiZWhhdmlvciwgdXNlIGBbLi4uY29sbGVjdGlvbi5rZXlzKCldYCBvclxuXHQgKiBgQXJyYXkuZnJvbShjb2xsZWN0aW9uLmtleXMoKSlgIGluc3RlYWQuXG5cdCAqIEByZXR1cm5zIHtBcnJheX1cblx0ICovXG5cdHB1YmxpYyBrZXlBcnJheSgpOiBLW10ge1xuXHRcdGlmICghdGhpcy5fa2V5QXJyYXkgfHwgdGhpcy5fa2V5QXJyYXkubGVuZ3RoICE9PSB0aGlzLnNpemUpIHRoaXMuX2tleUFycmF5ID0gWy4uLnRoaXMua2V5cygpXTtcblx0XHRyZXR1cm4gdGhpcy5fa2V5QXJyYXk7XG5cdH1cblxuXHQvKipcblx0ICogT2J0YWlucyB0aGUgZmlyc3QgdmFsdWUocykgaW4gdGhpcyBjb2xsZWN0aW9uLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2Ftb3VudF0gQW1vdW50IG9mIHZhbHVlcyB0byBvYnRhaW4gZnJvbSB0aGUgYmVnaW5uaW5nXG5cdCAqIEByZXR1cm5zIHsqfEFycmF5PCo+fSBBIHNpbmdsZSB2YWx1ZSBpZiBubyBhbW91bnQgaXMgcHJvdmlkZWQgb3IgYW4gYXJyYXkgb2YgdmFsdWVzLCBzdGFydGluZyBmcm9tIHRoZSBlbmQgaWZcblx0ICogYW1vdW50IGlzIG5lZ2F0aXZlXG5cdCAqL1xuXHRwdWJsaWMgZmlyc3QoKTogViB8IHVuZGVmaW5lZDtcblx0cHVibGljIGZpcnN0KGFtb3VudDogbnVtYmVyKTogVltdO1xuXHRwdWJsaWMgZmlyc3QoYW1vdW50PzogbnVtYmVyKTogViB8IFZbXSB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcy52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG5cdFx0aWYgKGFtb3VudCA8IDApIHJldHVybiB0aGlzLmxhc3QoYW1vdW50ICogLTEpO1xuXHRcdGFtb3VudCA9IE1hdGgubWluKHRoaXMuc2l6ZSwgYW1vdW50KTtcblx0XHRjb25zdCBpdGVyID0gdGhpcy52YWx1ZXMoKTtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpOiBWID0+IGl0ZXIubmV4dCgpLnZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPYnRhaW5zIHRoZSBmaXJzdCBrZXkocykgaW4gdGhpcyBjb2xsZWN0aW9uLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2Ftb3VudF0gQW1vdW50IG9mIGtleXMgdG8gb2J0YWluIGZyb20gdGhlIGJlZ2lubmluZ1xuXHQgKiBAcmV0dXJucyB7KnxBcnJheTwqPn0gQSBzaW5nbGUga2V5IGlmIG5vIGFtb3VudCBpcyBwcm92aWRlZCBvciBhbiBhcnJheSBvZiBrZXlzLCBzdGFydGluZyBmcm9tIHRoZSBlbmQgaWZcblx0ICogYW1vdW50IGlzIG5lZ2F0aXZlXG5cdCAqL1xuXHRwdWJsaWMgZmlyc3RLZXkoKTogSyB8IHVuZGVmaW5lZDtcblx0cHVibGljIGZpcnN0S2V5KGFtb3VudDogbnVtYmVyKTogS1tdO1xuXHRwdWJsaWMgZmlyc3RLZXkoYW1vdW50PzogbnVtYmVyKTogSyB8IEtbXSB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcy5rZXlzKCkubmV4dCgpLnZhbHVlO1xuXHRcdGlmIChhbW91bnQgPCAwKSByZXR1cm4gdGhpcy5sYXN0S2V5KGFtb3VudCAqIC0xKTtcblx0XHRhbW91bnQgPSBNYXRoLm1pbih0aGlzLnNpemUsIGFtb3VudCk7XG5cdFx0Y29uc3QgaXRlciA9IHRoaXMua2V5cygpO1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBhbW91bnQgfSwgKCk6IEsgPT4gaXRlci5uZXh0KCkudmFsdWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9idGFpbnMgdGhlIGxhc3QgdmFsdWUocykgaW4gdGhpcyBjb2xsZWN0aW9uLiBUaGlzIHJlbGllcyBvbiB7QGxpbmsgQ29sbGVjdGlvbiNhcnJheX0sIGFuZCB0aHVzIHRoZSBjYWNoaW5nXG5cdCAqIG1lY2hhbmlzbSBhcHBsaWVzIGhlcmUgYXMgd2VsbC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFthbW91bnRdIEFtb3VudCBvZiB2YWx1ZXMgdG8gb2J0YWluIGZyb20gdGhlIGVuZFxuXHQgKiBAcmV0dXJucyB7KnxBcnJheTwqPn0gQSBzaW5nbGUgdmFsdWUgaWYgbm8gYW1vdW50IGlzIHByb3ZpZGVkIG9yIGFuIGFycmF5IG9mIHZhbHVlcywgc3RhcnRpbmcgZnJvbSB0aGUgc3RhcnQgaWZcblx0ICogYW1vdW50IGlzIG5lZ2F0aXZlXG5cdCAqL1xuXHRwdWJsaWMgbGFzdCgpOiBWIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgbGFzdChhbW91bnQ6IG51bWJlcik6IFZbXTtcblx0cHVibGljIGxhc3QoYW1vdW50PzogbnVtYmVyKTogViB8IFZbXSB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgYXJyID0gdGhpcy5hcnJheSgpO1xuXHRcdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG5cdFx0aWYgKGFtb3VudCA8IDApIHJldHVybiB0aGlzLmZpcnN0KGFtb3VudCAqIC0xKTtcblx0XHRpZiAoIWFtb3VudCkgcmV0dXJuIFtdO1xuXHRcdHJldHVybiBhcnIuc2xpY2UoLWFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogT2J0YWlucyB0aGUgbGFzdCBrZXkocykgaW4gdGhpcyBjb2xsZWN0aW9uLiBUaGlzIHJlbGllcyBvbiB7QGxpbmsgQ29sbGVjdGlvbiNrZXlBcnJheX0sIGFuZCB0aHVzIHRoZSBjYWNoaW5nXG5cdCAqIG1lY2hhbmlzbSBhcHBsaWVzIGhlcmUgYXMgd2VsbC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFthbW91bnRdIEFtb3VudCBvZiBrZXlzIHRvIG9idGFpbiBmcm9tIHRoZSBlbmRcblx0ICogQHJldHVybnMgeyp8QXJyYXk8Kj59IEEgc2luZ2xlIGtleSBpZiBubyBhbW91bnQgaXMgcHJvdmlkZWQgb3IgYW4gYXJyYXkgb2Yga2V5cywgc3RhcnRpbmcgZnJvbSB0aGUgc3RhcnQgaWZcblx0ICogYW1vdW50IGlzIG5lZ2F0aXZlXG5cdCAqL1xuXHRwdWJsaWMgbGFzdEtleSgpOiBLIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgbGFzdEtleShhbW91bnQ6IG51bWJlcik6IEtbXTtcblx0cHVibGljIGxhc3RLZXkoYW1vdW50PzogbnVtYmVyKTogSyB8IEtbXSB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgYXJyID0gdGhpcy5rZXlBcnJheSgpO1xuXHRcdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG5cdFx0aWYgKGFtb3VudCA8IDApIHJldHVybiB0aGlzLmZpcnN0S2V5KGFtb3VudCAqIC0xKTtcblx0XHRpZiAoIWFtb3VudCkgcmV0dXJuIFtdO1xuXHRcdHJldHVybiBhcnIuc2xpY2UoLWFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogT2J0YWlucyB1bmlxdWUgcmFuZG9tIHZhbHVlKHMpIGZyb20gdGhpcyBjb2xsZWN0aW9uLiBUaGlzIHJlbGllcyBvbiB7QGxpbmsgQ29sbGVjdGlvbiNhcnJheX0sIGFuZCB0aHVzIHRoZSBjYWNoaW5nXG5cdCAqIG1lY2hhbmlzbSBhcHBsaWVzIGhlcmUgYXMgd2VsbC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFthbW91bnRdIEFtb3VudCBvZiB2YWx1ZXMgdG8gb2J0YWluIHJhbmRvbWx5XG5cdCAqIEByZXR1cm5zIHsqfEFycmF5PCo+fSBBIHNpbmdsZSB2YWx1ZSBpZiBubyBhbW91bnQgaXMgcHJvdmlkZWQgb3IgYW4gYXJyYXkgb2YgdmFsdWVzXG5cdCAqL1xuXHRwdWJsaWMgcmFuZG9tKCk6IFY7XG5cdHB1YmxpYyByYW5kb20oYW1vdW50OiBudW1iZXIpOiBWW107XG5cdHB1YmxpYyByYW5kb20oYW1vdW50PzogbnVtYmVyKTogViB8IFZbXSB7XG5cdFx0bGV0IGFyciA9IHRoaXMuYXJyYXkoKTtcblx0XHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuXHRcdGlmIChhcnIubGVuZ3RoID09PSAwIHx8ICFhbW91bnQpIHJldHVybiBbXTtcblx0XHRhcnIgPSBhcnIuc2xpY2UoKTtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpOiBWID0+IGFyci5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCksIDEpWzBdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPYnRhaW5zIHVuaXF1ZSByYW5kb20ga2V5KHMpIGZyb20gdGhpcyBjb2xsZWN0aW9uLiBUaGlzIHJlbGllcyBvbiB7QGxpbmsgQ29sbGVjdGlvbiNrZXlBcnJheX0sIGFuZCB0aHVzIHRoZSBjYWNoaW5nXG5cdCAqIG1lY2hhbmlzbSBhcHBsaWVzIGhlcmUgYXMgd2VsbC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFthbW91bnRdIEFtb3VudCBvZiBrZXlzIHRvIG9idGFpbiByYW5kb21seVxuXHQgKiBAcmV0dXJucyB7KnxBcnJheTwqPn0gQSBzaW5nbGUga2V5IGlmIG5vIGFtb3VudCBpcyBwcm92aWRlZCBvciBhbiBhcnJheVxuXHQgKi9cblx0cHVibGljIHJhbmRvbUtleSgpOiBLO1xuXHRwdWJsaWMgcmFuZG9tS2V5KGFtb3VudDogbnVtYmVyKTogS1tdO1xuXHRwdWJsaWMgcmFuZG9tS2V5KGFtb3VudD86IG51bWJlcik6IEsgfCBLW10ge1xuXHRcdGxldCBhcnIgPSB0aGlzLmtleUFycmF5KCk7XG5cdFx0aWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcblx0XHRpZiAoYXJyLmxlbmd0aCA9PT0gMCB8fCAhYW1vdW50KSByZXR1cm4gW107XG5cdFx0YXJyID0gYXJyLnNsaWNlKCk7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGFtb3VudCB9LCAoKTogSyA9PiBhcnIuc3BsaWNlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpLCAxKVswXSk7XG5cdH1cblxuXHQvKipcblx0ICogU2VhcmNoZXMgZm9yIGEgc2luZ2xlIGl0ZW0gd2hlcmUgdGhlIGdpdmVuIGZ1bmN0aW9uIHJldHVybnMgYSB0cnV0aHkgdmFsdWUuIFRoaXMgYmVoYXZlcyBsaWtlXG5cdCAqIFtBcnJheS5maW5kKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbmQpLlxuXHQgKiA8d2Fybj5BbGwgY29sbGVjdGlvbnMgdXNlZCBpbiBEaXNjb3JkLmpzIGFyZSBtYXBwZWQgdXNpbmcgdGhlaXIgYGlkYCBwcm9wZXJ0eSwgYW5kIGlmIHlvdSB3YW50IHRvIGZpbmQgYnkgaWQgeW91XG5cdCAqIHNob3VsZCB1c2UgdGhlIGBnZXRgIG1ldGhvZC4gU2VlXG5cdCAqIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9nZXQpIGZvciBkZXRhaWxzLjwvd2Fybj5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHRlc3Qgd2l0aCAoc2hvdWxkIHJldHVybiBib29sZWFuKVxuXHQgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBWYWx1ZSB0byB1c2UgYXMgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLmZpbmQodXNlciA9PiB1c2VyLnVzZXJuYW1lID09PSAnQm9iJyk7XG5cdCAqL1xuXHRwdWJsaWMgZmluZChmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiBWIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgZmluZDxUPihmbjogKHRoaXM6IFQsIHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc6IFQpOiBWIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgZmluZChmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc/OiB1bmtub3duKTogViB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJykgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG5cdFx0XHRpZiAoZm4odmFsLCBrZXksIHRoaXMpKSByZXR1cm4gdmFsO1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNlYXJjaGVzIGZvciB0aGUga2V5IG9mIGEgc2luZ2xlIGl0ZW0gd2hlcmUgdGhlIGdpdmVuIGZ1bmN0aW9uIHJldHVybnMgYSB0cnV0aHkgdmFsdWUuIFRoaXMgYmVoYXZlcyBsaWtlXG5cdCAqIFtBcnJheS5maW5kSW5kZXgoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmluZEluZGV4KSxcblx0ICogYnV0IHJldHVybnMgdGhlIGtleSByYXRoZXIgdGhhbiB0aGUgcG9zaXRpb25hbCBpbmRleC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHRlc3Qgd2l0aCAoc2hvdWxkIHJldHVybiBib29sZWFuKVxuXHQgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBWYWx1ZSB0byB1c2UgYXMgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLmZpbmRLZXkodXNlciA9PiB1c2VyLnVzZXJuYW1lID09PSAnQm9iJyk7XG5cdCAqL1xuXHRwdWJsaWMgZmluZEtleShmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiBLIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgZmluZEtleTxUPihmbjogKHRoaXM6IFQsIHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc6IFQpOiBLIHwgdW5kZWZpbmVkO1xuXHRwdWJsaWMgZmluZEtleShmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc/OiB1bmtub3duKTogSyB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJykgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG5cdFx0XHRpZiAoZm4odmFsLCBrZXksIHRoaXMpKSByZXR1cm4ga2V5O1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgaXRlbXMgdGhhdCBzYXRpc2Z5IHRoZSBwcm92aWRlZCBmaWx0ZXIgZnVuY3Rpb24uXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHVzZWQgdG8gdGVzdCAoc2hvdWxkIHJldHVybiBhIGJvb2xlYW4pXG5cdCAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFZhbHVlIHRvIHVzZSBhcyBgdGhpc2Agd2hlbiBleGVjdXRpbmcgZnVuY3Rpb25cblx0ICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiByZW1vdmVkIGVudHJpZXNcblx0ICovXG5cdHB1YmxpYyBzd2VlcChmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiBudW1iZXI7XG5cdHB1YmxpYyBzd2VlcDxUPihmbjogKHRoaXM6IFQsIHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc6IFQpOiBudW1iZXI7XG5cdHB1YmxpYyBzd2VlcChmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4sIHRoaXNBcmc/OiB1bmtub3duKTogbnVtYmVyIHtcblx0XHRpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKSBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG5cdFx0Y29uc3QgcHJldmlvdXNTaXplID0gdGhpcy5zaXplO1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG5cdFx0XHRpZiAoZm4odmFsLCBrZXksIHRoaXMpKSB0aGlzLmRlbGV0ZShrZXkpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJldmlvdXNTaXplIC0gdGhpcy5zaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIElkZW50aWNhbCB0b1xuXHQgKiBbQXJyYXkuZmlsdGVyKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlciksXG5cdCAqIGJ1dCByZXR1cm5zIGEgQ29sbGVjdGlvbiBpbnN0ZWFkIG9mIGFuIEFycmF5LlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gdGVzdCB3aXRoIChzaG91bGQgcmV0dXJuIGJvb2xlYW4pXG5cdCAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFZhbHVlIHRvIHVzZSBhcyBgdGhpc2Agd2hlbiBleGVjdXRpbmcgZnVuY3Rpb25cblx0ICogQHJldHVybnMge0NvbGxlY3Rpb259XG5cdCAqIEBleGFtcGxlIGNvbGxlY3Rpb24uZmlsdGVyKHVzZXIgPT4gdXNlci51c2VybmFtZSA9PT0gJ0JvYicpO1xuXHQgKi9cblx0cHVibGljIGZpbHRlcihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiB0aGlzO1xuXHRwdWJsaWMgZmlsdGVyPFQ+KGZuOiAodGhpczogVCwgdmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gYm9vbGVhbiwgdGhpc0FyZzogVCk6IHRoaXM7XG5cdHB1YmxpYyBmaWx0ZXIoZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuLCB0aGlzQXJnPzogdW5rbm93bik6IHRoaXMge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHRjb25zdCByZXN1bHRzID0gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdPEssIFY+KCkgYXMgdGhpcztcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuXHRcdFx0aWYgKGZuKHZhbCwga2V5LCB0aGlzKSkgcmVzdWx0cy5zZXQoa2V5LCB2YWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJ0aXRpb25zIHRoZSBjb2xsZWN0aW9uIGludG8gdHdvIGNvbGxlY3Rpb25zIHdoZXJlIHRoZSBmaXJzdCBjb2xsZWN0aW9uXG5cdCAqIGNvbnRhaW5zIHRoZSBpdGVtcyB0aGF0IHBhc3NlZCBhbmQgdGhlIHNlY29uZCBjb250YWlucyB0aGUgaXRlbXMgdGhhdCBmYWlsZWQuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHVzZWQgdG8gdGVzdCAoc2hvdWxkIHJldHVybiBhIGJvb2xlYW4pXG5cdCAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFZhbHVlIHRvIHVzZSBhcyBgdGhpc2Agd2hlbiBleGVjdXRpbmcgZnVuY3Rpb25cblx0ICogQHJldHVybnMge0NvbGxlY3Rpb25bXX1cblx0ICogQGV4YW1wbGUgY29uc3QgW2JpZywgc21hbGxdID0gY29sbGVjdGlvbi5wYXJ0aXRpb24oZ3VpbGQgPT4gZ3VpbGQubWVtYmVyQ291bnQgPiAyNTApO1xuXHQgKi9cblx0cHVibGljIHBhcnRpdGlvbihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiBbdGhpcywgdGhpc107XG5cdHB1YmxpYyBwYXJ0aXRpb248VD4oZm46ICh0aGlzOiBULCB2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuLCB0aGlzQXJnOiBUKTogW3RoaXMsIHRoaXNdO1xuXHRwdWJsaWMgcGFydGl0aW9uKGZuOiAodmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gYm9vbGVhbiwgdGhpc0FyZz86IHVua25vd24pOiBbdGhpcywgdGhpc10ge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHQvLyBUT0RPOiBjb25zaWRlciByZW1vdmluZyB0aGUgPEssIFY+IGZyb20gdGhlIGNvbnN0cnVjdG9ycyBhZnRlciBUUyAzLjcuMCBpcyByZWxlYXNlZCwgYXMgaXQgaW5mZXJzIGl0XG5cdFx0Y29uc3QgcmVzdWx0czogW3RoaXMsIHRoaXNdID0gW25ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXTxLLCBWPigpIGFzIHRoaXMsIG5ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXTxLLCBWPigpIGFzIHRoaXNdO1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG5cdFx0XHRpZiAoZm4odmFsLCBrZXksIHRoaXMpKSB7XG5cdFx0XHRcdHJlc3VsdHNbMF0uc2V0KGtleSwgdmFsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdHNbMV0uc2V0KGtleSwgdmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogTWFwcyBlYWNoIGl0ZW0gaW50byBhIENvbGxlY3Rpb24sIHRoZW4gam9pbnMgdGhlIHJlc3VsdHMgaW50byBhIHNpbmdsZSBDb2xsZWN0aW9uLiBJZGVudGljYWwgaW4gYmVoYXZpb3IgdG9cblx0ICogW0FycmF5LmZsYXRNYXAoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmxhdE1hcCkuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgYSBuZXcgQ29sbGVjdGlvblxuXHQgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBWYWx1ZSB0byB1c2UgYXMgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLmZsYXRNYXAoZ3VpbGQgPT4gZ3VpbGQubWVtYmVycy5jYWNoZSk7XG5cdCAqL1xuXHRwdWJsaWMgZmxhdE1hcDxUPihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IENvbGxlY3Rpb248SywgVD4pOiBDb2xsZWN0aW9uPEssIFQ+O1xuXHRwdWJsaWMgZmxhdE1hcDxULCBUaGlzPihmbjogKHRoaXM6IFRoaXMsIHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IENvbGxlY3Rpb248SywgVD4sIHRoaXNBcmc6IFRoaXMpOiBDb2xsZWN0aW9uPEssIFQ+O1xuXHRwdWJsaWMgZmxhdE1hcDxUPihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IENvbGxlY3Rpb248SywgVD4sIHRoaXNBcmc/OiB1bmtub3duKTogQ29sbGVjdGlvbjxLLCBUPiB7XG5cdFx0Y29uc3QgY29sbGVjdGlvbnMgPSB0aGlzLm1hcChmbiwgdGhpc0FyZyk7XG5cdFx0cmV0dXJuIChuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc108SywgVD4oKSBhcyBDb2xsZWN0aW9uPEssIFQ+KS5jb25jYXQoLi4uY29sbGVjdGlvbnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcHMgZWFjaCBpdGVtIHRvIGFub3RoZXIgdmFsdWUgaW50byBhbiBhcnJheS4gSWRlbnRpY2FsIGluIGJlaGF2aW9yIHRvXG5cdCAqIFtBcnJheS5tYXAoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBhbiBlbGVtZW50IG9mIHRoZSBuZXcgYXJyYXksIHRha2luZyB0aHJlZSBhcmd1bWVudHNcblx0ICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVmFsdWUgdG8gdXNlIGFzIGB0aGlzYCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvblxuXHQgKiBAcmV0dXJucyB7QXJyYXl9XG5cdCAqIEBleGFtcGxlIGNvbGxlY3Rpb24ubWFwKHVzZXIgPT4gdXNlci50YWcpO1xuXHQgKi9cblx0cHVibGljIG1hcDxUPihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IFQpOiBUW107XG5cdHB1YmxpYyBtYXA8VGhpcywgVD4oZm46ICh0aGlzOiBUaGlzLCB2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBULCB0aGlzQXJnOiBUaGlzKTogVFtdO1xuXHRwdWJsaWMgbWFwPFQ+KGZuOiAodmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gVCwgdGhpc0FyZz86IHVua25vd24pOiBUW10ge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHRjb25zdCBpdGVyID0gdGhpcy5lbnRyaWVzKCk7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuc2l6ZSB9LCAoKTogVCA9PiB7XG5cdFx0XHRjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVyLm5leHQoKS52YWx1ZTtcblx0XHRcdHJldHVybiBmbih2YWx1ZSwga2V5LCB0aGlzKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXBzIGVhY2ggaXRlbSB0byBhbm90aGVyIHZhbHVlIGludG8gYSBjb2xsZWN0aW9uLiBJZGVudGljYWwgaW4gYmVoYXZpb3IgdG9cblx0ICogW0FycmF5Lm1hcCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9tYXApLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0aGF0IHByb2R1Y2VzIGFuIGVsZW1lbnQgb2YgdGhlIG5ldyBjb2xsZWN0aW9uLCB0YWtpbmcgdGhyZWUgYXJndW1lbnRzXG5cdCAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFZhbHVlIHRvIHVzZSBhcyBgdGhpc2Agd2hlbiBleGVjdXRpbmcgZnVuY3Rpb25cblx0ICogQHJldHVybnMge0NvbGxlY3Rpb259XG5cdCAqIEBleGFtcGxlIGNvbGxlY3Rpb24ubWFwVmFsdWVzKHVzZXIgPT4gdXNlci50YWcpO1xuXHQgKi9cblx0cHVibGljIG1hcFZhbHVlczxUPihmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IFQpOiBDb2xsZWN0aW9uPEssIFQ+O1xuXHRwdWJsaWMgbWFwVmFsdWVzPFRoaXMsIFQ+KGZuOiAodGhpczogVGhpcywgdmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gVCwgdGhpc0FyZzogVGhpcyk6IENvbGxlY3Rpb248SywgVD47XG5cdHB1YmxpYyBtYXBWYWx1ZXM8VD4oZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBULCB0aGlzQXJnPzogdW5rbm93bik6IENvbGxlY3Rpb248SywgVD4ge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHRjb25zdCBjb2xsID0gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdPEssIFQ+KCkgYXMgQ29sbGVjdGlvbjxLLCBUPjtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykgY29sbC5zZXQoa2V5LCBmbih2YWwsIGtleSwgdGhpcykpO1xuXHRcdHJldHVybiBjb2xsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiB0aGVyZSBleGlzdHMgYW4gaXRlbSB0aGF0IHBhc3NlcyBhIHRlc3QuIElkZW50aWNhbCBpbiBiZWhhdmlvciB0b1xuXHQgKiBbQXJyYXkuc29tZSgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zb21lKS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdXNlZCB0byB0ZXN0IChzaG91bGQgcmV0dXJuIGEgYm9vbGVhbilcblx0ICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVmFsdWUgdG8gdXNlIGFzIGB0aGlzYCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvblxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICogQGV4YW1wbGUgY29sbGVjdGlvbi5zb21lKHVzZXIgPT4gdXNlci5kaXNjcmltaW5hdG9yID09PSAnMDAwMCcpO1xuXHQgKi9cblx0cHVibGljIHNvbWUoZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuKTogYm9vbGVhbjtcblx0cHVibGljIHNvbWU8VD4oZm46ICh0aGlzOiBULCB2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuLCB0aGlzQXJnOiBUKTogYm9vbGVhbjtcblx0cHVibGljIHNvbWUoZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuLCB0aGlzQXJnPzogdW5rbm93bik6IGJvb2xlYW4ge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuXHRcdFx0aWYgKGZuKHZhbCwga2V5LCB0aGlzKSkgcmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYWxsIGl0ZW1zIHBhc3NlcyBhIHRlc3QuIElkZW50aWNhbCBpbiBiZWhhdmlvciB0b1xuXHQgKiBbQXJyYXkuZXZlcnkoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZXZlcnkpLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB1c2VkIHRvIHRlc3QgKHNob3VsZCByZXR1cm4gYSBib29sZWFuKVxuXHQgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBWYWx1ZSB0byB1c2UgYXMgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLmV2ZXJ5KHVzZXIgPT4gIXVzZXIuYm90KTtcblx0ICovXG5cdHB1YmxpYyBldmVyeShmbjogKHZhbHVlOiBWLCBrZXk6IEssIGNvbGxlY3Rpb246IHRoaXMpID0+IGJvb2xlYW4pOiBib29sZWFuO1xuXHRwdWJsaWMgZXZlcnk8VD4oZm46ICh0aGlzOiBULCB2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiBib29sZWFuLCB0aGlzQXJnOiBUKTogYm9vbGVhbjtcblx0cHVibGljIGV2ZXJ5KGZuOiAodmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gYm9vbGVhbiwgdGhpc0FyZz86IHVua25vd24pOiBib29sZWFuIHtcblx0XHRpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKSBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcblx0XHRcdGlmICghZm4odmFsLCBrZXksIHRoaXMpKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBwcm9kdWNlIGEgc2luZ2xlIHZhbHVlLiBJZGVudGljYWwgaW4gYmVoYXZpb3IgdG9cblx0ICogW0FycmF5LnJlZHVjZSgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9yZWR1Y2UpLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB1c2VkIHRvIHJlZHVjZSwgdGFraW5nIGZvdXIgYXJndW1lbnRzOyBgYWNjdW11bGF0b3JgLCBgY3VycmVudFZhbHVlYCwgYGN1cnJlbnRLZXlgLFxuXHQgKiBhbmQgYGNvbGxlY3Rpb25gXG5cdCAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gU3RhcnRpbmcgdmFsdWUgZm9yIHRoZSBhY2N1bXVsYXRvclxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICogQGV4YW1wbGUgY29sbGVjdGlvbi5yZWR1Y2UoKGFjYywgZ3VpbGQpID0+IGFjYyArIGd1aWxkLm1lbWJlckNvdW50LCAwKTtcblx0ICovXG5cdHB1YmxpYyByZWR1Y2U8VD4oZm46IChhY2N1bXVsYXRvcjogVCwgdmFsdWU6IFYsIGtleTogSywgY29sbGVjdGlvbjogdGhpcykgPT4gVCwgaW5pdGlhbFZhbHVlPzogVCk6IFQge1xuXHRcdGxldCBhY2N1bXVsYXRvciE6IFQ7XG5cblx0XHRpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGFjY3VtdWxhdG9yID0gaW5pdGlhbFZhbHVlO1xuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIGFjY3VtdWxhdG9yID0gZm4oYWNjdW11bGF0b3IsIHZhbCwga2V5LCB0aGlzKTtcblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9XG5cdFx0bGV0IGZpcnN0ID0gdHJ1ZTtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuXHRcdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRcdGFjY3VtdWxhdG9yID0gdmFsIGFzIHVua25vd24gYXMgVDtcblx0XHRcdFx0Zmlyc3QgPSBmYWxzZTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRhY2N1bXVsYXRvciA9IGZuKGFjY3VtdWxhdG9yLCB2YWwsIGtleSwgdGhpcyk7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gaXRlbXMgaXRlcmF0ZWQuXG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgY29sbGVjdGlvbiB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdH1cblxuXHQvKipcblx0ICogSWRlbnRpY2FsIHRvXG5cdCAqIFtNYXAuZm9yRWFjaCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZm9yRWFjaCksXG5cdCAqIGJ1dCByZXR1cm5zIHRoZSBjb2xsZWN0aW9uIGluc3RlYWQgb2YgdW5kZWZpbmVkLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBleGVjdXRlIGZvciBlYWNoIGVsZW1lbnRcblx0ICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVmFsdWUgdG8gdXNlIGFzIGB0aGlzYCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvblxuXHQgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cblx0ICogQGV4YW1wbGVcblx0ICogY29sbGVjdGlvblxuXHQgKiAgLmVhY2godXNlciA9PiBjb25zb2xlLmxvZyh1c2VyLnVzZXJuYW1lKSlcblx0ICogIC5maWx0ZXIodXNlciA9PiB1c2VyLmJvdClcblx0ICogIC5lYWNoKHVzZXIgPT4gY29uc29sZS5sb2codXNlci51c2VybmFtZSkpO1xuXHQgKi9cblx0cHVibGljIGVhY2goZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiB2b2lkKTogdGhpcztcblx0cHVibGljIGVhY2g8VD4oZm46ICh0aGlzOiBULCB2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiB2b2lkLCB0aGlzQXJnOiBUKTogdGhpcztcblx0cHVibGljIGVhY2goZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiB0aGlzKSA9PiB2b2lkLCB0aGlzQXJnPzogdW5rbm93bik6IHRoaXMge1xuXHRcdHRoaXMuZm9yRWFjaChmbiBhcyAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmcpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJ1bnMgYSBmdW5jdGlvbiBvbiB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyB0aGUgY29sbGVjdGlvbi5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gZXhlY3V0ZVxuXHQgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBWYWx1ZSB0byB1c2UgYXMgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb2xsZWN0aW9uXG5cdCAqICAudGFwKGNvbGwgPT4gY29uc29sZS5sb2coY29sbC5zaXplKSlcblx0ICogIC5maWx0ZXIodXNlciA9PiB1c2VyLmJvdClcblx0ICogIC50YXAoY29sbCA9PiBjb25zb2xlLmxvZyhjb2xsLnNpemUpKVxuXHQgKi9cblx0cHVibGljIHRhcChmbjogKGNvbGxlY3Rpb246IHRoaXMpID0+IHZvaWQpOiB0aGlzO1xuXHRwdWJsaWMgdGFwPFQ+KGZuOiAodGhpczogVCwgY29sbGVjdGlvbjogdGhpcykgPT4gdm9pZCwgdGhpc0FyZzogVCk6IHRoaXM7XG5cdHB1YmxpYyB0YXAoZm46IChjb2xsZWN0aW9uOiB0aGlzKSA9PiB2b2lkLCB0aGlzQXJnPzogdW5rbm93bik6IHRoaXMge1xuXHRcdGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcblx0XHRmbih0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGlkZW50aWNhbCBzaGFsbG93IGNvcHkgb2YgdGhpcyBjb2xsZWN0aW9uLlxuXHQgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cblx0ICogQGV4YW1wbGUgY29uc3QgbmV3Q29sbCA9IHNvbWVDb2xsLmNsb25lKCk7XG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTogdGhpcyB7XG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXSh0aGlzKSBhcyB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbWJpbmVzIHRoaXMgY29sbGVjdGlvbiB3aXRoIG90aGVycyBpbnRvIGEgbmV3IGNvbGxlY3Rpb24uIE5vbmUgb2YgdGhlIHNvdXJjZSBjb2xsZWN0aW9ucyBhcmUgbW9kaWZpZWQuXG5cdCAqIEBwYXJhbSB7Li4uQ29sbGVjdGlvbn0gY29sbGVjdGlvbnMgQ29sbGVjdGlvbnMgdG8gbWVyZ2Vcblx0ICogQHJldHVybnMge0NvbGxlY3Rpb259XG5cdCAqIEBleGFtcGxlIGNvbnN0IG5ld0NvbGwgPSBzb21lQ29sbC5jb25jYXQoc29tZU90aGVyQ29sbCwgYW5vdGhlckNvbGwsIG9oQm95QUNvbGwpO1xuXHQgKi9cblx0cHVibGljIGNvbmNhdCguLi5jb2xsZWN0aW9uczogQ29sbGVjdGlvbjxLLCBWPltdKTogdGhpcyB7XG5cdFx0Y29uc3QgbmV3Q29sbCA9IHRoaXMuY2xvbmUoKTtcblx0XHRmb3IgKGNvbnN0IGNvbGwgb2YgY29sbGVjdGlvbnMpIHtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBjb2xsKSBuZXdDb2xsLnNldChrZXksIHZhbCk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdDb2xsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiB0aGlzIGNvbGxlY3Rpb24gc2hhcmVzIGlkZW50aWNhbCBpdGVtcyB3aXRoIGFub3RoZXIuXG5cdCAqIFRoaXMgaXMgZGlmZmVyZW50IHRvIGNoZWNraW5nIGZvciBlcXVhbGl0eSB1c2luZyBlcXVhbC1zaWducywgYmVjYXVzZVxuXHQgKiB0aGUgY29sbGVjdGlvbnMgbWF5IGJlIGRpZmZlcmVudCBvYmplY3RzLCBidXQgY29udGFpbiB0aGUgc2FtZSBkYXRhLlxuXHQgKiBAcGFyYW0ge0NvbGxlY3Rpb259IGNvbGxlY3Rpb24gQ29sbGVjdGlvbiB0byBjb21wYXJlIHdpdGhcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGNvbGxlY3Rpb25zIGhhdmUgaWRlbnRpY2FsIGNvbnRlbnRzXG5cdCAqL1xuXHRwdWJsaWMgZXF1YWxzKGNvbGxlY3Rpb246IENvbGxlY3Rpb248SywgVj4pOiBib29sZWFuIHtcblx0XHRpZiAoIWNvbGxlY3Rpb24pIHJldHVybiBmYWxzZTtcblx0XHRpZiAodGhpcyA9PT0gY29sbGVjdGlvbikgcmV0dXJuIHRydWU7XG5cdFx0aWYgKHRoaXMuc2l6ZSAhPT0gY29sbGVjdGlvbi5zaXplKSByZXR1cm4gZmFsc2U7XG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcykge1xuXHRcdFx0aWYgKCFjb2xsZWN0aW9uLmhhcyhrZXkpIHx8IHZhbHVlICE9PSBjb2xsZWN0aW9uLmdldChrZXkpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNvcnQgbWV0aG9kIHNvcnRzIHRoZSBpdGVtcyBvZiBhIGNvbGxlY3Rpb24gaW4gcGxhY2UgYW5kIHJldHVybnMgaXQuXG5cdCAqIFRoZSBzb3J0IGlzIG5vdCBuZWNlc3NhcmlseSBzdGFibGUgaW4gTm9kZSAxMCBvciBvbGRlci5cblx0ICogVGhlIGRlZmF1bHQgc29ydCBvcmRlciBpcyBhY2NvcmRpbmcgdG8gc3RyaW5nIFVuaWNvZGUgY29kZSBwb2ludHMuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJlRnVuY3Rpb25dIFNwZWNpZmllcyBhIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc29ydCBvcmRlci5cblx0ICogSWYgb21pdHRlZCwgdGhlIGNvbGxlY3Rpb24gaXMgc29ydGVkIGFjY29yZGluZyB0byBlYWNoIGNoYXJhY3RlcidzIFVuaWNvZGUgY29kZSBwb2ludCB2YWx1ZSxcblx0ICogYWNjb3JkaW5nIHRvIHRoZSBzdHJpbmcgY29udmVyc2lvbiBvZiBlYWNoIGVsZW1lbnQuXG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLnNvcnQoKHVzZXJBLCB1c2VyQikgPT4gdXNlckEuY3JlYXRlZFRpbWVzdGFtcCAtIHVzZXJCLmNyZWF0ZWRUaW1lc3RhbXApO1xuXHQgKi9cblx0cHVibGljIHNvcnQoY29tcGFyZUZ1bmN0aW9uOiAoZmlyc3RWYWx1ZTogViwgc2Vjb25kVmFsdWU6IFYsIGZpcnN0S2V5OiBLLCBzZWNvbmRLZXk6IEspID0+IG51bWJlciA9ICh4LCB5KTogbnVtYmVyID0+IE51bWJlcih4ID4geSkgfHwgTnVtYmVyKHggPT09IHkpIC0gMSk6IHRoaXMge1xuXHRcdGNvbnN0IGVudHJpZXMgPSBbLi4udGhpcy5lbnRyaWVzKCldO1xuXHRcdGVudHJpZXMuc29ydCgoYSwgYik6IG51bWJlciA9PiBjb21wYXJlRnVuY3Rpb24oYVsxXSwgYlsxXSwgYVswXSwgYlswXSkpO1xuXG5cdFx0Ly8gUGVyZm9ybSBjbGVhbi11cFxuXHRcdHN1cGVyLmNsZWFyKCk7XG5cdFx0dGhpcy5fYXJyYXkgPSBudWxsO1xuXHRcdHRoaXMuX2tleUFycmF5ID0gbnVsbDtcblxuXHRcdC8vIFNldCB0aGUgbmV3IGVudHJpZXNcblx0XHRmb3IgKGNvbnN0IFtrLCB2XSBvZiBlbnRyaWVzKSB7XG5cdFx0XHRzdXBlci5zZXQoaywgdik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlcnNlY3QgbWV0aG9kIHJldHVybnMgYSBuZXcgc3RydWN0dXJlIGNvbnRhaW5pbmcgaXRlbXMgd2hlcmUgdGhlIGtleXMgYXJlIHByZXNlbnQgaW4gYm90aCBvcmlnaW5hbCBzdHJ1Y3R1cmVzLlxuXHQgKiBAcGFyYW0ge0NvbGxlY3Rpb259IG90aGVyIFRoZSBvdGhlciBDb2xsZWN0aW9uIHRvIGZpbHRlciBhZ2FpbnN0XG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKi9cblx0cHVibGljIGludGVyc2VjdChvdGhlcjogQ29sbGVjdGlvbjxLLCBWPik6IENvbGxlY3Rpb248SywgVj4ge1xuXHRcdHJldHVybiBvdGhlci5maWx0ZXIoKF8sIGspID0+IHRoaXMuaGFzKGspKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgZGlmZmVyZW5jZSBtZXRob2QgcmV0dXJucyBhIG5ldyBzdHJ1Y3R1cmUgY29udGFpbmluZyBpdGVtcyB3aGVyZSB0aGUga2V5IGlzIHByZXNlbnQgaW4gb25lIG9mIHRoZSBvcmlnaW5hbCBzdHJ1Y3R1cmVzIGJ1dCBub3QgdGhlIG90aGVyLlxuXHQgKiBAcGFyYW0ge0NvbGxlY3Rpb259IG90aGVyIFRoZSBvdGhlciBDb2xsZWN0aW9uIHRvIGZpbHRlciBhZ2FpbnN0XG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKi9cblx0cHVibGljIGRpZmZlcmVuY2Uob3RoZXI6IENvbGxlY3Rpb248SywgVj4pOiBDb2xsZWN0aW9uPEssIFY+IHtcblx0XHRyZXR1cm4gb3RoZXIuZmlsdGVyKChfLCBrKSA9PiAhdGhpcy5oYXMoaykpLmNvbmNhdCh0aGlzLmZpbHRlcigoXywgaykgPT4gIW90aGVyLmhhcyhrKSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzb3J0ZWQgbWV0aG9kIHNvcnRzIHRoZSBpdGVtcyBvZiBhIGNvbGxlY3Rpb24gYW5kIHJldHVybnMgaXQuXG5cdCAqIFRoZSBzb3J0IGlzIG5vdCBuZWNlc3NhcmlseSBzdGFibGUgaW4gTm9kZSAxMCBvciBvbGRlci5cblx0ICogVGhlIGRlZmF1bHQgc29ydCBvcmRlciBpcyBhY2NvcmRpbmcgdG8gc3RyaW5nIFVuaWNvZGUgY29kZSBwb2ludHMuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJlRnVuY3Rpb25dIFNwZWNpZmllcyBhIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc29ydCBvcmRlci5cblx0ICogSWYgb21pdHRlZCwgdGhlIGNvbGxlY3Rpb24gaXMgc29ydGVkIGFjY29yZGluZyB0byBlYWNoIGNoYXJhY3RlcidzIFVuaWNvZGUgY29kZSBwb2ludCB2YWx1ZSxcblx0ICogYWNjb3JkaW5nIHRvIHRoZSBzdHJpbmcgY29udmVyc2lvbiBvZiBlYWNoIGVsZW1lbnQuXG5cdCAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuXHQgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLnNvcnRlZCgodXNlckEsIHVzZXJCKSA9PiB1c2VyQS5jcmVhdGVkVGltZXN0YW1wIC0gdXNlckIuY3JlYXRlZFRpbWVzdGFtcCk7XG5cdCAqL1xuXHRwdWJsaWMgc29ydGVkKGNvbXBhcmVGdW5jdGlvbjogKGZpcnN0VmFsdWU6IFYsIHNlY29uZFZhbHVlOiBWLCBmaXJzdEtleTogSywgc2Vjb25kS2V5OiBLKSA9PiBudW1iZXIgPSAoeCwgeSk6IG51bWJlciA9PiBOdW1iZXIoeCA+IHkpIHx8IE51bWJlcih4ID09PSB5KSAtIDEpOiB0aGlzIHtcblx0XHRyZXR1cm4gKG5ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXShbLi4udGhpcy5lbnRyaWVzKCldKSBhcyB0aGlzKVxuXHRcdFx0LnNvcnQoKGF2LCBidiwgYWssIGJrKSA9PiBjb21wYXJlRnVuY3Rpb24oYXYsIGJ2LCBhaywgYmspKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb247XG5leHBvcnQgeyBDb2xsZWN0aW9uIH07XG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uO1xuIl19

/***/ }),

/***/ "./node_modules/@ungap/url-search-params/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@ungap/url-search-params/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*! (c) Andrea Giammarchi - ISC */
var self = undefined || /* istanbul ignore next */ {};
try {
  (function (URLSearchParams, plus) {
    if (
      new URLSearchParams('q=%2B').get('q') !== plus ||
      new URLSearchParams({q: plus}).get('q') !== plus ||
      new URLSearchParams([['q', plus]]).get('q') !== plus ||
      new URLSearchParams('q=\n').toString() !== 'q=%0A' ||
      new URLSearchParams({q: ' &'}).toString() !== 'q=+%26' ||
      new URLSearchParams({q: '%zx'}).toString() !== 'q=%25zx'
    )
      throw URLSearchParams;
    self.URLSearchParams = URLSearchParams;
  }(URLSearchParams, '+'));
} catch(URLSearchParams) {
  (function (Object, String, isArray) {'use strict';
    var create = Object.create;
    var defineProperty = Object.defineProperty;
    var find = /[!'\(\)~]|%20|%00/g;
    var findPercentSign = /%(?![0-9a-fA-F]{2})/g;
    var plus = /\+/g;
    var replace = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    var proto = {
      append: function (key, value) {
        appendTo(this._ungap, key, value);
      },
      delete: function (key) {
        delete this._ungap[key];
      },
      get: function (key) {
        return this.has(key) ? this._ungap[key][0] : null;
      },
      getAll: function (key) {
        return this.has(key) ? this._ungap[key].slice(0) : [];
      },
      has: function (key) {
        return key in this._ungap;
      },
      set: function (key, value) {
        this._ungap[key] = [String(value)];
      },
      forEach: function (callback, thisArg) {
        var self = this;
        for (var key in self._ungap)
          self._ungap[key].forEach(invoke, key);
        function invoke(value) {
          callback.call(thisArg, value, String(key), self);
        }
      },
      toJSON: function () {
        return {};
      },
      toString: function () {
        var query = [];
        for (var key in this._ungap) {
          var encoded = encode(key);
          for (var
            i = 0,
            value = this._ungap[key];
            i < value.length; i++
          ) {
            query.push(encoded + '=' + encode(value[i]));
          }
        }
        return query.join('&');
      }
    };
    for (var key in proto)
      defineProperty(URLSearchParams.prototype, key, {
        configurable: true,
        writable: true,
        value: proto[key]
      });
    self.URLSearchParams = URLSearchParams;
    function URLSearchParams(query) {
      var dict = create(null);
      defineProperty(this, '_ungap', {value: dict});
      switch (true) {
        case !query:
          break;
        case typeof query === 'string':
          if (query.charAt(0) === '?') {
            query = query.slice(1);
          }
          for (var
            pairs = query.split('&'),
            i = 0,
            length = pairs.length; i < length; i++
          ) {
            var value = pairs[i];
            var index = value.indexOf('=');
            if (-1 < index) {
              appendTo(
                dict,
                decode(value.slice(0, index)),
                decode(value.slice(index + 1))
              );
            } else if (value.length){
              appendTo(
                dict,
                decode(value),
                ''
              );
            }
          }
          break;
        case isArray(query):
          for (var
            i = 0,
            length = query.length; i < length; i++
          ) {
            var value = query[i];
            appendTo(dict, value[0], value[1]);
          }
          break;
        case 'forEach' in query:
          query.forEach(addEach, dict);
          break;
        default:
          for (var key in query)
            appendTo(dict, key, query[key]);
      }
    }

    function addEach(value, key) {
      appendTo(this, key, value);
    }

    function appendTo(dict, key, value) {
      var res = isArray(value) ? value.join(',') : value;
      if (key in dict)
        dict[key].push(res);
      else
        dict[key] = [res];
    }

    function decode(str) {
      return decodeURIComponent(str.replace(findPercentSign, '%25').replace(plus, ' '));
    }

    function encode(str) {
      return encodeURIComponent(str).replace(find, replacer);
    }

    function replacer(match) {
      return replace[match];
    }

  }(Object, String, Array.isArray));
}

(function (URLSearchParamsProto) {

  var iterable = false;
  try { iterable = !!Symbol.iterator; } catch (o_O) {}

  /* istanbul ignore else */
  if (!('forEach' in URLSearchParamsProto)) {
    URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
      var self = this;
      var names = Object.create(null);
      this.toString()
          .replace(/=[\s\S]*?(?:&|$)/g, '=')
          .split('=')
          .forEach(function (name) {
            if (!name.length || name in names)
              return;
            (names[name] = self.getAll(name)).forEach(function(value) {
              callback.call(thisArg, value, name, self);
            });
          });
    };
  }

  /* istanbul ignore else */
  if (!('keys' in URLSearchParamsProto)) {
    URLSearchParamsProto.keys = function keys() {
      return iterator(this, function(value, key) { this.push(key); });
    };
  }

   /* istanbul ignore else */
  if (!('values' in URLSearchParamsProto)) {
    URLSearchParamsProto.values = function values() {
      return iterator(this, function(value, key) { this.push(value); });
    };
  }

  /* istanbul ignore else */
  if (!('entries' in URLSearchParamsProto)) {
    URLSearchParamsProto.entries = function entries() {
      return iterator(this, function(value, key) { this.push([key, value]); });
    };
  }

  /* istanbul ignore else */
  if (iterable && !(Symbol.iterator in URLSearchParamsProto)) {
    URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
  }

  /* istanbul ignore else */
  if (!('sort' in URLSearchParamsProto)) {
    URLSearchParamsProto.sort = function sort() {
      var
        entries = this.entries(),
        entry = entries.next(),
        done = entry.done,
        keys = [],
        values = Object.create(null),
        i, key, value
      ;
      while (!done) {
        value = entry.value;
        key = value[0];
        keys.push(key);
        if (!(key in values)) {
          values[key] = [];
        }
        values[key].push(value[1]);
        entry = entries.next();
        done = entry.done;
      }
      // not the champion in efficiency
      // but these two bits just do the job
      keys.sort();
      for (i = 0; i < keys.length; i++) {
        this.delete(keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        this.append(key, values[key].shift());
      }
    };
  }

  function iterator(self, callback) {
    var items = [];
    self.forEach(callback, items);
    return iterable ?
      items[Symbol.iterator]() :
      {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };
  }

  /* istanbul ignore next */
  (function (Object) {
    var
      dP = Object.defineProperty,
      gOPD = Object.getOwnPropertyDescriptor,
      createSearchParamsPollute = function (search) {
        function append(name, value) {
          URLSearchParamsProto.append.call(this, name, value);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        function del(name) {
          URLSearchParamsProto.delete.call(this, name);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        function set(name, value) {
          URLSearchParamsProto.set.call(this, name, value);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        return function (sp, value) {
          sp.append = append;
          sp.delete = del;
          sp.set = set;
          return dP(sp, '_usp', {
            configurable: true,
            writable: true,
            value: value
          });
        };
      },
      createSearchParamsCreate = function (polluteSearchParams) {
        return function (obj, sp) {
          dP(
            obj, '_searchParams', {
              configurable: true,
              writable: true,
              value: polluteSearchParams(sp, obj)
            }
          );
          return sp;
        };
      },
      updateSearchParams = function (sp) {
        var append = sp.append;
        sp.append = URLSearchParamsProto.append;
        URLSearchParams.call(sp, sp._usp.search.slice(1));
        sp.append = append;
      },
      verifySearchParams = function (obj, Class) {
        if (!(obj instanceof Class)) throw new TypeError(
          "'searchParams' accessed on an object that " +
          "does not implement interface " + Class.name
        );
      },
      upgradeClass = function (Class) {
        var
          ClassProto = Class.prototype,
          searchParams = gOPD(ClassProto, 'searchParams'),
          href = gOPD(ClassProto, 'href'),
          search = gOPD(ClassProto, 'search'),
          createSearchParams
        ;
        if (!searchParams && search && search.set) {
          createSearchParams = createSearchParamsCreate(
            createSearchParamsPollute(search)
          );
          Object.defineProperties(
            ClassProto,
            {
              href: {
                get: function () {
                  return href.get.call(this);
                },
                set: function (value) {
                  var sp = this._searchParams;
                  href.set.call(this, value);
                  if (sp) updateSearchParams(sp);
                }
              },
              search: {
                get: function () {
                  return search.get.call(this);
                },
                set: function (value) {
                  var sp = this._searchParams;
                  search.set.call(this, value);
                  if (sp) updateSearchParams(sp);
                }
              },
              searchParams: {
                get: function () {
                  verifySearchParams(this, Class);
                  return this._searchParams || createSearchParams(
                    this,
                    new URLSearchParams(this.search.slice(1))
                  );
                },
                set: function (sp) {
                  verifySearchParams(this, Class);
                  createSearchParams(this, sp);
                }
              }
            }
          );
        }
      }
    ;
    try {
      upgradeClass(HTMLAnchorElement);
      if (/^function|object$/.test(typeof URL) && URL.prototype)
        upgradeClass(URL);
    } catch (meh) {}
  }(Object));

}(self.URLSearchParams.prototype, Object));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (self.URLSearchParams);


/***/ }),

/***/ "./node_modules/cross-fetch/dist/browser-ponyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

var global = typeof self !== 'undefined' ? self : this;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException
}
F.prototype = global;
return new F();
})();
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
exports["default"] = ctx.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers
exports.Request = ctx.Request
exports.Response = ctx.Response
module.exports = exports


/***/ }),

/***/ "./node_modules/pokeapi-typescript/dist/classes/Endpoint.js":
/*!******************************************************************!*\
  !*** ./node_modules/pokeapi-typescript/dist/classes/Endpoint.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var collection_1 = __importDefault(__webpack_require__(/*! @discordjs/collection */ "./node_modules/@discordjs/collection/dist/index.js"));
var url_search_params_1 = __importDefault(__webpack_require__(/*! @ungap/url-search-params */ "./node_modules/@ungap/url-search-params/esm/index.js"));
var cross_fetch_1 = __importDefault(__webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js"));
var enumerable_1 = __importDefault(__webpack_require__(/*! ../decorators/enumerable */ "./node_modules/pokeapi-typescript/dist/decorators/enumerable.js"));
var BASE_URI = "https://pokeapi.co/api/v2";
var Endpoint = /** @class */ (function () {
    function Endpoint(resource) {
        this.resource = resource;
        this.cache = new collection_1.default();
    }
    /**
     * Retrieve a resource from the cache
     * @param {EndpointParam} param - The ID of the resource to retrieve from cache
     * @returns {?T}
     */
    Endpoint.prototype.get = function (param) {
        return this.cache.get(param);
    };
    /**
     * Retrieve a resource from cache if it exists, or attempt to fetch it from the API
     * @param {EndpointParam} param - The ID of the resource to resolve
     * @returns {Promise<T>}
     */
    Endpoint.prototype.resolve = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(param) || this.fetch(param)];
            });
        });
    };
    /**
     * Fetch a resource from the API
     * @param {EndpointParam} param - The ID of the item to fetch
     * @param {boolean} [cache=true] - Whether or not to cache this resource
     * @returns {Promise<T>}
     */
    Endpoint.prototype.fetch = function (param, cache) {
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "/" + param).then(function (res) { return res.json(); })];
                    case 1:
                        data = _a.sent();
                        this._cache(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Fetches the paginated resource list from the API, or uses the internal cache if listAll() has been called.
     * @param {number} [limit=20] - How many resources to list
     * @param {offset} [offset=0]
     * @returns {Promise<NamedApiResourceList<T>>}
     */
    Endpoint.prototype.list = function (limit, offset) {
        if (limit === void 0) { limit = 20; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var results, _a, count, next, previous, params;
            return __generator(this, function (_b) {
                if (this._list) {
                    results = this._list.results.slice(offset, limit);
                    _a = this._list, count = _a.count, next = _a.next, previous = _a.previous;
                    return [2 /*return*/, { count: count, next: next, previous: previous, results: results }];
                }
                params = new url_search_params_1.default({ limit: "" + limit, offset: "" + offset });
                return [2 /*return*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?" + params).then(function (res) { return res.json(); })];
            });
        });
    };
    /**
     * Fetches the complete resource list from the API by making two calls.
     * Caches the list by default for API-less pagination
     * @param {boolean} [cache=true] - If the result should be cahced in-memory
     * @returns {Promise<NamedApiResourceList<T>>}
     */
    Endpoint.prototype.listAll = function (cache) {
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var count, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._list) {
                            return [2 /*return*/, this._list];
                        }
                        return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?limit=1").then(function (res) { return res.json(); })];
                    case 1:
                        count = (_a.sent()).count;
                        return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?limit=" + count).then(function (res) { return res.json(); })];
                    case 2:
                        data = _a.sent();
                        if (cache) {
                            this._list = data;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Endpoint.prototype._cache = function (data) {
        this.cache.set(data.id, data);
    };
    __decorate([
        enumerable_1.default
    ], Endpoint.prototype, "resource", void 0);
    __decorate([
        enumerable_1.default
    ], Endpoint.prototype, "_list", void 0);
    return Endpoint;
}());
exports.Endpoint = Endpoint;
//# sourceMappingURL=Endpoint.js.map

/***/ }),

/***/ "./node_modules/pokeapi-typescript/dist/classes/NamedEndpoint.js":
/*!***********************************************************************!*\
  !*** ./node_modules/pokeapi-typescript/dist/classes/NamedEndpoint.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var url_search_params_1 = __importDefault(__webpack_require__(/*! @ungap/url-search-params */ "./node_modules/@ungap/url-search-params/esm/index.js"));
var cross_fetch_1 = __importDefault(__webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js"));
var enumerable_1 = __importDefault(__webpack_require__(/*! ../decorators/enumerable */ "./node_modules/pokeapi-typescript/dist/decorators/enumerable.js"));
var Endpoint_1 = __webpack_require__(/*! ./Endpoint */ "./node_modules/pokeapi-typescript/dist/classes/Endpoint.js");
var BASE_URI = "https://pokeapi.co/api/v2";
var NamedEndpoint = /** @class */ (function (_super) {
    __extends(NamedEndpoint, _super);
    function NamedEndpoint(resource) {
        var _this = _super.call(this, resource) || this;
        _this._nameMap = new Map();
        return _this;
    }
    /**
     * Retrieve a resource from the cache by name or ID
     * @param {NamedEndpointParam} param - The name or ID of the resource to retrieve from cache
     * @returns {?T}
     */
    NamedEndpoint.prototype.get = function (param) {
        return this.cache.get(typeof param === "number" ? param : this._nameMap.get(param.toLowerCase()));
    };
    /**
     * Fetch a resource from the API
     * @param {NamedEndpointParam} param - The name orcID of the resource to fetch
     * @param {boolean} [cache=true] - Whether or not to cache this resource
     * @returns {Promise<T>}
     */
    NamedEndpoint.prototype.fetch = function (param, cache) {
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = typeof param === "string" ? param.toLowerCase() : param;
                        return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "/" + param).then(function (res) { return res.json(); })];
                    case 1:
                        data = _a.sent();
                        this._cache(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Retrieve a resource from cache if it exists, or attempt to fetch it from the API
     * @param {EndpointParam} param - The ID of the resource to resolve
     * @returns {Promise<T>}
     */
    NamedEndpoint.prototype.resolve = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get(param) || this.fetch(param)];
            });
        });
    };
    /**
     * Fetches the paginated resource list from the API, or uses the internal cache if listAll() has been called.
     * @param {number} [limit=20] - How many resources to list
     * @param {offset} [offset=0]
     * @returns {Promise<NamedApiResourceList<T>>}
     */
    NamedEndpoint.prototype.list = function (limit, offset) {
        if (limit === void 0) { limit = 20; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var results, _a, count, next, previous, params;
            return __generator(this, function (_b) {
                if (this._list) {
                    results = this._list.results.slice(offset, limit);
                    _a = this._list, count = _a.count, next = _a.next, previous = _a.previous;
                    return [2 /*return*/, { count: count, next: next, previous: previous, results: results }];
                }
                params = new url_search_params_1.default({ limit: "" + limit, offset: "" + offset });
                return [2 /*return*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?" + params).then(function (res) { return res.json(); })];
            });
        });
    };
    /**
     * Fetches the complete resource list from the API by making two calls.
     * Caches the list by default for API-less pagination
     * @param {boolean} [cache=true] - If the result should be cahced in-memory
     * @returns {Promise<NamedApiResourceList<T>>}
     */
    NamedEndpoint.prototype.listAll = function (cache) {
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var count, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._list) {
                            return [2 /*return*/, this._list];
                        }
                        return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?limit=1").then(function (res) { return res.json(); })];
                    case 1:
                        count = (_a.sent()).count;
                        return [4 /*yield*/, cross_fetch_1.default(BASE_URI + "/" + this.resource + "?limit=" + count).then(function (res) { return res.json(); })];
                    case 2:
                        data = _a.sent();
                        if (cache) {
                            this._list = data;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    NamedEndpoint.prototype._cache = function (data) {
        this.cache.set(data.id, data);
        this._nameMap.set(data.name, data.id);
    };
    __decorate([
        enumerable_1.default
    ], NamedEndpoint.prototype, "_list", void 0);
    __decorate([
        enumerable_1.default
    ], NamedEndpoint.prototype, "_nameMap", void 0);
    return NamedEndpoint;
}(Endpoint_1.Endpoint));
exports.NamedEndpoint = NamedEndpoint;
//# sourceMappingURL=NamedEndpoint.js.map

/***/ }),

/***/ "./node_modules/pokeapi-typescript/dist/decorators/enumerable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/pokeapi-typescript/dist/decorators/enumerable.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var nonenumerable = function (target, propertyKey) {
    var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    if (descriptor.enumerable !== false) {
        Object.defineProperty(target, propertyKey, {
            enumerable: false,
            set: function (value) {
                Object.defineProperty(this, propertyKey, {
                    enumerable: false,
                    writable: true,
                    value: value
                });
            }
        });
    }
};
exports["default"] = nonenumerable;
//# sourceMappingURL=enumerable.js.map

/***/ }),

/***/ "./node_modules/pokeapi-typescript/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/pokeapi-typescript/dist/index.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Endpoint_1 = __webpack_require__(/*! ./classes/Endpoint */ "./node_modules/pokeapi-typescript/dist/classes/Endpoint.js");
var NamedEndpoint_1 = __webpack_require__(/*! ./classes/NamedEndpoint */ "./node_modules/pokeapi-typescript/dist/classes/NamedEndpoint.js");
__export(__webpack_require__(/*! ./interfaces/Berries/Berry */ "./node_modules/pokeapi-typescript/dist/interfaces/Berries/Berry.js"));
var PokeAPI = /** @class */ (function () {
    function PokeAPI() {
    }
    PokeAPI.fromResource = function (apiResource) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, match, resource, id, endpoint;
            var _this = this;
            return __generator(this, function (_b) {
                _a = /([a-z-]+)\/(\d+)/.exec(apiResource.url), match = _a[0], resource = _a[1], id = _a[2];
                if (apiResource.endpoint) {
                    return [2 /*return*/, apiResource.endpoint.resolve(parseInt(id, 10))];
                }
                endpoint = Object.getOwnPropertyNames(this).find(function (prop) { return _this[prop].resource === resource; });
                return [2 /*return*/, this[endpoint].resolve(parseInt(id, 10))];
            });
        });
    };
    PokeAPI.Berry = new NamedEndpoint_1.NamedEndpoint("berry");
    PokeAPI.BerryFirmness = new NamedEndpoint_1.NamedEndpoint("berry-firmness");
    PokeAPI.BerryFlavor = new NamedEndpoint_1.NamedEndpoint("berry-flavor");
    PokeAPI.ContestType = new NamedEndpoint_1.NamedEndpoint("contest-type");
    PokeAPI.ContestEffect = new Endpoint_1.Endpoint("contest-effect");
    PokeAPI.SuperContestEffect = new Endpoint_1.Endpoint("super-contest-effect");
    PokeAPI.EncounterMethod = new NamedEndpoint_1.NamedEndpoint("encounter-method");
    PokeAPI.EncounterCondition = new NamedEndpoint_1.NamedEndpoint("encounter-condition");
    PokeAPI.EncounterConditionValue = new NamedEndpoint_1.NamedEndpoint("encounter-condition-value");
    PokeAPI.EvolutionChain = new Endpoint_1.Endpoint("evolution-chain");
    PokeAPI.EvolutionTrigger = new NamedEndpoint_1.NamedEndpoint("evolution-trigger");
    PokeAPI.Generaition = new NamedEndpoint_1.NamedEndpoint("generation");
    PokeAPI.Pokedex = new NamedEndpoint_1.NamedEndpoint("pokedex");
    PokeAPI.Version = new NamedEndpoint_1.NamedEndpoint("version");
    PokeAPI.VerionGroup = new NamedEndpoint_1.NamedEndpoint("version-group");
    PokeAPI.Item = new NamedEndpoint_1.NamedEndpoint("item");
    PokeAPI.ItemAttribute = new NamedEndpoint_1.NamedEndpoint("item-attribute");
    PokeAPI.ItemCategory = new NamedEndpoint_1.NamedEndpoint("item-category");
    PokeAPI.ItemFlingEffect = new NamedEndpoint_1.NamedEndpoint("item-fling-effect");
    PokeAPI.ItemPocket = new NamedEndpoint_1.NamedEndpoint("item-pocket");
    PokeAPI.Location = new NamedEndpoint_1.NamedEndpoint("location");
    PokeAPI.LocationArea = new NamedEndpoint_1.NamedEndpoint("location-area");
    PokeAPI.PalParkArea = new NamedEndpoint_1.NamedEndpoint("pal-park-area");
    PokeAPI.Region = new NamedEndpoint_1.NamedEndpoint("region");
    PokeAPI.Machine = new Endpoint_1.Endpoint("machine");
    PokeAPI.Move = new NamedEndpoint_1.NamedEndpoint("move");
    PokeAPI.MoveAilment = new NamedEndpoint_1.NamedEndpoint("move-ailment");
    PokeAPI.MoveBattleStyle = new NamedEndpoint_1.NamedEndpoint("move-battle-style");
    PokeAPI.MoveCategory = new NamedEndpoint_1.NamedEndpoint("move-category");
    PokeAPI.MoveDamageClass = new NamedEndpoint_1.NamedEndpoint("move-damage-class");
    PokeAPI.MoveLearnMethod = new NamedEndpoint_1.NamedEndpoint("move-learn-method");
    PokeAPI.MoveTarget = new NamedEndpoint_1.NamedEndpoint("move-target");
    PokeAPI.Ability = new NamedEndpoint_1.NamedEndpoint("ability");
    PokeAPI.Characteristic = new Endpoint_1.Endpoint("characteristic");
    PokeAPI.EggGroup = new NamedEndpoint_1.NamedEndpoint("egg-group");
    PokeAPI.Gender = new NamedEndpoint_1.NamedEndpoint("gender");
    PokeAPI.GrowthRate = new NamedEndpoint_1.NamedEndpoint("growth-rate");
    PokeAPI.Nature = new NamedEndpoint_1.NamedEndpoint("nature");
    PokeAPI.PokeathlonStat = new NamedEndpoint_1.NamedEndpoint("pokeathlon-stat");
    PokeAPI.Pokemon = new NamedEndpoint_1.NamedEndpoint("pokemon");
    PokeAPI.PokemonColor = new NamedEndpoint_1.NamedEndpoint("pokemon-color");
    PokeAPI.PokemonForm = new NamedEndpoint_1.NamedEndpoint("pokemon-form");
    PokeAPI.PokemonHabitat = new NamedEndpoint_1.NamedEndpoint("pokemon-habitat");
    PokeAPI.PokemonShape = new NamedEndpoint_1.NamedEndpoint("pokemon-shape");
    PokeAPI.PokemonSpecies = new NamedEndpoint_1.NamedEndpoint("pokemon-species");
    PokeAPI.Stat = new NamedEndpoint_1.NamedEndpoint("stat");
    PokeAPI.Type = new NamedEndpoint_1.NamedEndpoint("type");
    PokeAPI.Language = new NamedEndpoint_1.NamedEndpoint("language");
    return PokeAPI;
}());
module.exports = PokeAPI;
exports["default"] = PokeAPI;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/pokeapi-typescript/dist/interfaces/Berries/Berry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/pokeapi-typescript/dist/interfaces/Berries/Berry.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Berry = /** @class */ (function () {
    function Berry() {
    }
    return Berry;
}());
exports.Berry = Berry;
//# sourceMappingURL=Berry.js.map

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// const P = new Pokedex.Pokedex()
const pokeapi_typescript_1 = __importDefault(__webpack_require__(/*! pokeapi-typescript */ "./node_modules/pokeapi-typescript/dist/index.js"));
const P = pokeapi_typescript_1.default.Pokemon;
const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const html = document.querySelector('.wrapper');
    const getPokemons = yield P.listAll();
    const pokemons = getPokemons.results;
    const filterPokemons = pokemons.filter((_, index) => index < 50);
    const responsePokemons = yield Promise.all(filterPokemons.map((pokemon) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pokeapi_typescript_1.default.Pokemon.fetch(pokemon.name);
        return {
            id: result.id,
            name: result.name,
            image: result.sprites.front_default,
            type: result.types.map(({ type }) => type.name)
        };
    })));
    const cardsHtml = responsePokemons.map((pokemon) => `
    <div class="card" data-id="${pokemon.id}">
      <img src="${pokemon.image}" width="50" height="50" />
      <span>${pokemon.name}</span>
    </div>
  `);
    if (html)
        html.innerHTML = cardsHtml.join('\n');
    // NOTE: Evento para abrir o modal ao clicar no card
    const cardAll = document.querySelectorAll('.card');
    cardAll.forEach(function (card) {
        card.addEventListener('click', function () {
            const modal = document.querySelector('.modal');
            modal.classList.remove('modal--close');
            modal === null || modal === void 0 ? void 0 : modal.classList.add('modal--open');
            const useId = parseFloat(this.dataset.id);
            const pokemon = responsePokemons.find((data) => data.id === useId);
            const modal__content = document.querySelector('.modal__content');
            if (modal__content) {
                modal__content.innerHTML = `
              <div class="pokemon">
                <div class="pokemon__head">
                  <button class="pokemon__back" type="button">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </button>
                  <span class="pokemon__id">#${pokemon === null || pokemon === void 0 ? void 0 : pokemon.id}</span>
                </div>
                <div class="pokemon__main">
                  <div class="pokemon__imagem">
                    <div class="pokemon__blur" style="background-image: url(${pokemon === null || pokemon === void 0 ? void 0 : pokemon.image});"></div>
                    <img class="pokemon__imagem" src="${pokemon === null || pokemon === void 0 ? void 0 : pokemon.image}" height="300" />
                  </div>
                  <div class="pokemon__info">
                    <span class="pokemon__name">${pokemon === null || pokemon === void 0 ? void 0 : pokemon.name}</span>
                    <div class="pokemon__types">
                      ${pokemon === null || pokemon === void 0 ? void 0 : pokemon.type.map((type) => `
                        <p class="pokemon__typeName pokemon__typeName--${type}">
                          ${capitalizeFirstLetter(type)}
                        </p>
                      `).join('\n')}
                    </div>
                  </div>
                </div>
              </div>
            `;
            }
            //     // eventos
            const pokemon__back = document.querySelector('.pokemon__back');
            pokemon__back === null || pokemon__back === void 0 ? void 0 : pokemon__back.addEventListener('click', function () {
                if (modal) {
                    modal.classList.remove('modal--open');
                    modal.classList.add('modal--close');
                }
            });
        });
        // NOTE: Fecha todos os modal
        const modal__close = document.querySelector('.modal__close');
        modal__close === null || modal__close === void 0 ? void 0 : modal__close.addEventListener('click', function () {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.classList.remove('modal--open');
                modal.classList.add('modal--close');
            }
        });
    });
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGdEQUFnRCxpREFBaUQ7QUFDakc7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxtREFBbUQsaURBQWlEO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVSxtREFBbUQ7QUFDNUU7QUFDQSxlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFlO0FBQ2YsMkNBQTJDOzs7Ozs7Ozs7Ozs7Ozs7QUN2WTNDO0FBQ0EsV0FBVyxTQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0EsMkJBQTJCLFFBQVE7QUFDbkMsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRix1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLEVBQUU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxnQ0FBZ0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxpQkFBaUI7QUFDcEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsbUJBQW1CO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELDBCQUEwQjtBQUM3RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixHQUFHOztBQUVILENBQUM7QUFDRCxpRUFBZSxvQkFBb0IsRUFBQzs7Ozs7Ozs7Ozs7QUN0WHBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RCxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1YsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFDNUc7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLGdFQUFnRSxFQUFFO0FBQ2hKLHdEQUF3RCxnRUFBZ0U7QUFDeEg7QUFDQTtBQUNBLGtEQUFrRCwrREFBK0Q7QUFDakg7QUFDQSx3QkFBd0I7QUFDeEIseUVBQXlFLEtBQUs7QUFDOUUsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQzs7Ozs7OztVQ25HRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9AZGlzY29yZGpzL2NvbGxlY3Rpb24vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9ub2RlX21vZHVsZXMvQHVuZ2FwL3VybC1zZWFyY2gtcGFyYW1zL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9ub2RlX21vZHVsZXMvY3Jvc3MtZmV0Y2gvZGlzdC9icm93c2VyLXBvbnlmaWxsLmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9wb2tlYXBpLXR5cGVzY3JpcHQvZGlzdC9jbGFzc2VzL0VuZHBvaW50LmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9wb2tlYXBpLXR5cGVzY3JpcHQvZGlzdC9jbGFzc2VzL05hbWVkRW5kcG9pbnQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzLy4vbm9kZV9tb2R1bGVzL3Bva2VhcGktdHlwZXNjcmlwdC9kaXN0L2RlY29yYXRvcnMvZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9ub2RlX21vZHVsZXMvcG9rZWFwaS10eXBlc2NyaXB0L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzLy4vbm9kZV9tb2R1bGVzL3Bva2VhcGktdHlwZXNjcmlwdC9kaXN0L2ludGVyZmFjZXMvQmVycmllcy9CZXJyeS5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gdm9pZCAwO1xuLyoqXG4gKiBBIE1hcCB3aXRoIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzLiBUaGlzIGlzIHVzZWQgdGhyb3VnaG91dCBkaXNjb3JkLmpzIHJhdGhlciB0aGFuIEFycmF5cyBmb3IgYW55dGhpbmcgdGhhdCBoYXNcbiAqIGFuIElELCBmb3Igc2lnbmlmaWNhbnRseSBpbXByb3ZlZCBwZXJmb3JtYW5jZSBhbmQgZWFzZS1vZi11c2UuXG4gKiBAZXh0ZW5kcyB7TWFwfVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpemUgLSBUaGUgYW1vdW50IG9mIGVsZW1lbnRzIGluIHRoaXMgY29sbGVjdGlvbi5cbiAqL1xuY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoZW50cmllcykge1xuICAgICAgICBzdXBlcihlbnRyaWVzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhY2hlZCBhcnJheSBmb3IgdGhlIGBhcnJheSgpYCBtZXRob2QgLSB3aWxsIGJlIHJlc2V0IHRvIGBudWxsYCB3aGVuZXZlciBgc2V0KClgIG9yIGBkZWxldGUoKWAgYXJlIGNhbGxlZFxuICAgICAgICAgKiBAbmFtZSBDb2xsZWN0aW9uI19hcnJheVxuICAgICAgICAgKiBAdHlwZSB7P0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfYXJyYXknLCB7IHZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2FjaGVkIGFycmF5IGZvciB0aGUgYGtleUFycmF5KClgIG1ldGhvZCAtIHdpbGwgYmUgcmVzZXQgdG8gYG51bGxgIHdoZW5ldmVyIGBzZXQoKWAgb3IgYGRlbGV0ZSgpYCBhcmUgY2FsbGVkXG4gICAgICAgICAqIEBuYW1lIENvbGxlY3Rpb24jX2tleUFycmF5XG4gICAgICAgICAqIEB0eXBlIHs/QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19rZXlBcnJheScsIHsgdmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElkZW50aWNhbCB0byBbTWFwLmdldCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZ2V0KS5cbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSwgYW5kIHJldHVybnMgaXRzIHZhbHVlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgdG8gZ2V0IGZyb20gdGhpcyBjb2xsZWN0aW9uXG4gICAgICogQHJldHVybnMgeyogfCB1bmRlZmluZWR9XG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElkZW50aWNhbCB0byBbTWFwLnNldCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvc2V0KS5cbiAgICAgKiBTZXRzIGEgbmV3IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBhbmQgdmFsdWUuXG4gICAgICogQHBhcmFtIHsqfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBlbGVtZW50IHRvIGFkZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgdG8gYWRkXG4gICAgICogQHJldHVybnMge0NvbGxlY3Rpb259XG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9rZXlBcnJheSA9IG51bGw7XG4gICAgICAgIHJldHVybiBzdXBlci5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElkZW50aWNhbCB0byBbTWFwLmhhcygpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvaGFzKS5cbiAgICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBleGlzdHMgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIHsqfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBlbGVtZW50IHRvIGNoZWNrIGZvclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGVsZW1lbnQgZXhpc3RzLCBgZmFsc2VgIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmhhcyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZGVudGljYWwgdG8gW01hcC5kZWxldGUoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2RlbGV0ZSkuXG4gICAgICogRGVsZXRlcyBhbiBlbGVtZW50IGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIHsqfSBrZXkgLSBUaGUga2V5IHRvIGRlbGV0ZSBmcm9tIHRoZSBjb2xsZWN0aW9uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZWxlbWVudCB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fa2V5QXJyYXkgPSBudWxsO1xuICAgICAgICByZXR1cm4gc3VwZXIuZGVsZXRlKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElkZW50aWNhbCB0byBbTWFwLmNsZWFyKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9jbGVhcikuXG4gICAgICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvcmRlcmVkIGFycmF5IG9mIHRoZSB2YWx1ZXMgb2YgdGhpcyBjb2xsZWN0aW9uLCBhbmQgY2FjaGVzIGl0IGludGVybmFsbHkuIFRoZSBhcnJheSB3aWxsIG9ubHkgYmVcbiAgICAgKiByZWNvbnN0cnVjdGVkIGlmIGFuIGl0ZW0gaXMgYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uLCBvciBpZiB5b3UgY2hhbmdlIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XG4gICAgICogaXRzZWxmLiBJZiB5b3UgZG9uJ3Qgd2FudCB0aGlzIGNhY2hpbmcgYmVoYXZpb3IsIHVzZSBgWy4uLmNvbGxlY3Rpb24udmFsdWVzKCldYCBvclxuICAgICAqIGBBcnJheS5mcm9tKGNvbGxlY3Rpb24udmFsdWVzKCkpYCBpbnN0ZWFkLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBhcnJheSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hcnJheSB8fCB0aGlzLl9hcnJheS5sZW5ndGggIT09IHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuX2FycmF5ID0gWy4uLnRoaXMudmFsdWVzKCldO1xuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gb3JkZXJlZCBhcnJheSBvZiB0aGUga2V5cyBvZiB0aGlzIGNvbGxlY3Rpb24sIGFuZCBjYWNoZXMgaXQgaW50ZXJuYWxseS4gVGhlIGFycmF5IHdpbGwgb25seSBiZVxuICAgICAqIHJlY29uc3RydWN0ZWQgaWYgYW4gaXRlbSBpcyBhZGRlZCB0byBvciByZW1vdmVkIGZyb20gdGhlIGNvbGxlY3Rpb24sIG9yIGlmIHlvdSBjaGFuZ2UgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcbiAgICAgKiBpdHNlbGYuIElmIHlvdSBkb24ndCB3YW50IHRoaXMgY2FjaGluZyBiZWhhdmlvciwgdXNlIGBbLi4uY29sbGVjdGlvbi5rZXlzKCldYCBvclxuICAgICAqIGBBcnJheS5mcm9tKGNvbGxlY3Rpb24ua2V5cygpKWAgaW5zdGVhZC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAga2V5QXJyYXkoKSB7XG4gICAgICAgIGlmICghdGhpcy5fa2V5QXJyYXkgfHwgdGhpcy5fa2V5QXJyYXkubGVuZ3RoICE9PSB0aGlzLnNpemUpXG4gICAgICAgICAgICB0aGlzLl9rZXlBcnJheSA9IFsuLi50aGlzLmtleXMoKV07XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlBcnJheTtcbiAgICB9XG4gICAgZmlyc3QoYW1vdW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgaWYgKGFtb3VudCA8IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0KGFtb3VudCAqIC0xKTtcbiAgICAgICAgYW1vdW50ID0gTWF0aC5taW4odGhpcy5zaXplLCBhbW91bnQpO1xuICAgICAgICBjb25zdCBpdGVyID0gdGhpcy52YWx1ZXMoKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGFtb3VudCB9LCAoKSA9PiBpdGVyLm5leHQoKS52YWx1ZSk7XG4gICAgfVxuICAgIGZpcnN0S2V5KGFtb3VudCkge1xuICAgICAgICBpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICBpZiAoYW1vdW50IDwgMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RLZXkoYW1vdW50ICogLTEpO1xuICAgICAgICBhbW91bnQgPSBNYXRoLm1pbih0aGlzLnNpemUsIGFtb3VudCk7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSB0aGlzLmtleXMoKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGFtb3VudCB9LCAoKSA9PiBpdGVyLm5leHQoKS52YWx1ZSk7XG4gICAgfVxuICAgIGxhc3QoYW1vdW50KSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChhbW91bnQgPCAwKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3QoYW1vdW50ICogLTEpO1xuICAgICAgICBpZiAoIWFtb3VudClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgtYW1vdW50KTtcbiAgICB9XG4gICAgbGFzdEtleShhbW91bnQpIHtcbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5rZXlBcnJheSgpO1xuICAgICAgICBpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGFtb3VudCA8IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEtleShhbW91bnQgKiAtMSk7XG4gICAgICAgIGlmICghYW1vdW50KVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gYXJyLnNsaWNlKC1hbW91bnQpO1xuICAgIH1cbiAgICByYW5kb20oYW1vdW50KSB7XG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmFycmF5KCk7XG4gICAgICAgIGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCB8fCAhYW1vdW50KVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGFtb3VudCB9LCAoKSA9PiBhcnIuc3BsaWNlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpLCAxKVswXSk7XG4gICAgfVxuICAgIHJhbmRvbUtleShhbW91bnQpIHtcbiAgICAgICAgbGV0IGFyciA9IHRoaXMua2V5QXJyYXkoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwIHx8ICFhbW91bnQpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGFyciA9IGFyci5zbGljZSgpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpID0+IGFyci5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCksIDEpWzBdKTtcbiAgICB9XG4gICAgZmluZChmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKGZuKHZhbCwga2V5LCB0aGlzKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZpbmRLZXkoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmIChmbih2YWwsIGtleSwgdGhpcykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzd2VlcChmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBjb25zdCBwcmV2aW91c1NpemUgPSB0aGlzLnNpemU7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoZm4odmFsLCBrZXksIHRoaXMpKVxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzU2l6ZSAtIHRoaXMuc2l6ZTtcbiAgICB9XG4gICAgZmlsdGVyKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10oKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmIChmbih2YWwsIGtleSwgdGhpcykpXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5zZXQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBwYXJ0aXRpb24oZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgLy8gVE9ETzogY29uc2lkZXIgcmVtb3ZpbmcgdGhlIDxLLCBWPiBmcm9tIHRoZSBjb25zdHJ1Y3RvcnMgYWZ0ZXIgVFMgMy43LjAgaXMgcmVsZWFzZWQsIGFzIGl0IGluZmVycyBpdFxuICAgICAgICBjb25zdCByZXN1bHRzID0gW25ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXSgpLCBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10oKV07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoZm4odmFsLCBrZXksIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1swXS5zZXQoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1sxXS5zZXQoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBmbGF0TWFwKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gdGhpcy5tYXAoZm4sIHRoaXNBcmcpO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdKCkuY29uY2F0KC4uLmNvbGxlY3Rpb25zKTtcbiAgICB9XG4gICAgbWFwKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSB0aGlzLmVudHJpZXMoKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuc2l6ZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVyLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBmbih2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1hcFZhbHVlcyhmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBjb25zdCBjb2xsID0gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdKCk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKVxuICAgICAgICAgICAgY29sbC5zZXQoa2V5LCBmbih2YWwsIGtleSwgdGhpcykpO1xuICAgICAgICByZXR1cm4gY29sbDtcbiAgICB9XG4gICAgc29tZShmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKGZuKHZhbCwga2V5LCB0aGlzKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGV2ZXJ5KGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoIWZuKHZhbCwga2V5LCB0aGlzKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBwcm9kdWNlIGEgc2luZ2xlIHZhbHVlLiBJZGVudGljYWwgaW4gYmVoYXZpb3IgdG9cbiAgICAgKiBbQXJyYXkucmVkdWNlKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdXNlZCB0byByZWR1Y2UsIHRha2luZyBmb3VyIGFyZ3VtZW50czsgYGFjY3VtdWxhdG9yYCwgYGN1cnJlbnRWYWx1ZWAsIGBjdXJyZW50S2V5YCxcbiAgICAgKiBhbmQgYGNvbGxlY3Rpb25gXG4gICAgICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBTdGFydGluZyB2YWx1ZSBmb3IgdGhlIGFjY3VtdWxhdG9yXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQGV4YW1wbGUgY29sbGVjdGlvbi5yZWR1Y2UoKGFjYywgZ3VpbGQpID0+IGFjYyArIGd1aWxkLm1lbWJlckNvdW50LCAwKTtcbiAgICAgKi9cbiAgICByZWR1Y2UoZm4sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBsZXQgYWNjdW11bGF0b3I7XG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBpbml0aWFsVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcylcbiAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IGZuKGFjY3VtdWxhdG9yLCB2YWwsIGtleSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gdmFsO1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2N1bXVsYXRvciA9IGZuKGFjY3VtdWxhdG9yLCB2YWwsIGtleSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gaXRlbXMgaXRlcmF0ZWQuXG4gICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGNvbGxlY3Rpb24gd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgIH1cbiAgICBlYWNoKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChmbiwgdGhpc0FyZyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0YXAoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgZm4odGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGlkZW50aWNhbCBzaGFsbG93IGNvcHkgb2YgdGhpcyBjb2xsZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuICAgICAqIEBleGFtcGxlIGNvbnN0IG5ld0NvbGwgPSBzb21lQ29sbC5jbG9uZSgpO1xuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21iaW5lcyB0aGlzIGNvbGxlY3Rpb24gd2l0aCBvdGhlcnMgaW50byBhIG5ldyBjb2xsZWN0aW9uLiBOb25lIG9mIHRoZSBzb3VyY2UgY29sbGVjdGlvbnMgYXJlIG1vZGlmaWVkLlxuICAgICAqIEBwYXJhbSB7Li4uQ29sbGVjdGlvbn0gY29sbGVjdGlvbnMgQ29sbGVjdGlvbnMgdG8gbWVyZ2VcbiAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgKiBAZXhhbXBsZSBjb25zdCBuZXdDb2xsID0gc29tZUNvbGwuY29uY2F0KHNvbWVPdGhlckNvbGwsIGFub3RoZXJDb2xsLCBvaEJveUFDb2xsKTtcbiAgICAgKi9cbiAgICBjb25jYXQoLi4uY29sbGVjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbmV3Q29sbCA9IHRoaXMuY2xvbmUoKTtcbiAgICAgICAgZm9yIChjb25zdCBjb2xsIG9mIGNvbGxlY3Rpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgY29sbClcbiAgICAgICAgICAgICAgICBuZXdDb2xsLnNldChrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0NvbGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIGNvbGxlY3Rpb24gc2hhcmVzIGlkZW50aWNhbCBpdGVtcyB3aXRoIGFub3RoZXIuXG4gICAgICogVGhpcyBpcyBkaWZmZXJlbnQgdG8gY2hlY2tpbmcgZm9yIGVxdWFsaXR5IHVzaW5nIGVxdWFsLXNpZ25zLCBiZWNhdXNlXG4gICAgICogdGhlIGNvbGxlY3Rpb25zIG1heSBiZSBkaWZmZXJlbnQgb2JqZWN0cywgYnV0IGNvbnRhaW4gdGhlIHNhbWUgZGF0YS5cbiAgICAgKiBAcGFyYW0ge0NvbGxlY3Rpb259IGNvbGxlY3Rpb24gQ29sbGVjdGlvbiB0byBjb21wYXJlIHdpdGhcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgY29sbGVjdGlvbnMgaGF2ZSBpZGVudGljYWwgY29udGVudHNcbiAgICAgKi9cbiAgICBlcXVhbHMoY29sbGVjdGlvbikge1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzID09PSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNpemUgIT09IGNvbGxlY3Rpb24uc2l6ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKCFjb2xsZWN0aW9uLmhhcyhrZXkpIHx8IHZhbHVlICE9PSBjb2xsZWN0aW9uLmdldChrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc29ydCBtZXRob2Qgc29ydHMgdGhlIGl0ZW1zIG9mIGEgY29sbGVjdGlvbiBpbiBwbGFjZSBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBUaGUgc29ydCBpcyBub3QgbmVjZXNzYXJpbHkgc3RhYmxlIGluIE5vZGUgMTAgb3Igb2xkZXIuXG4gICAgICogVGhlIGRlZmF1bHQgc29ydCBvcmRlciBpcyBhY2NvcmRpbmcgdG8gc3RyaW5nIFVuaWNvZGUgY29kZSBwb2ludHMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVGdW5jdGlvbl0gU3BlY2lmaWVzIGEgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIHRoZSBzb3J0IG9yZGVyLlxuICAgICAqIElmIG9taXR0ZWQsIHRoZSBjb2xsZWN0aW9uIGlzIHNvcnRlZCBhY2NvcmRpbmcgdG8gZWFjaCBjaGFyYWN0ZXIncyBVbmljb2RlIGNvZGUgcG9pbnQgdmFsdWUsXG4gICAgICogYWNjb3JkaW5nIHRvIHRoZSBzdHJpbmcgY29udmVyc2lvbiBvZiBlYWNoIGVsZW1lbnQuXG4gICAgICogQHJldHVybnMge0NvbGxlY3Rpb259XG4gICAgICogQGV4YW1wbGUgY29sbGVjdGlvbi5zb3J0KCh1c2VyQSwgdXNlckIpID0+IHVzZXJBLmNyZWF0ZWRUaW1lc3RhbXAgLSB1c2VyQi5jcmVhdGVkVGltZXN0YW1wKTtcbiAgICAgKi9cbiAgICBzb3J0KGNvbXBhcmVGdW5jdGlvbiA9ICh4LCB5KSA9PiBOdW1iZXIoeCA+IHkpIHx8IE51bWJlcih4ID09PSB5KSAtIDEpIHtcbiAgICAgICAgY29uc3QgZW50cmllcyA9IFsuLi50aGlzLmVudHJpZXMoKV07XG4gICAgICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4gY29tcGFyZUZ1bmN0aW9uKGFbMV0sIGJbMV0sIGFbMF0sIGJbMF0pKTtcbiAgICAgICAgLy8gUGVyZm9ybSBjbGVhbi11cFxuICAgICAgICBzdXBlci5jbGVhcigpO1xuICAgICAgICB0aGlzLl9hcnJheSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2tleUFycmF5ID0gbnVsbDtcbiAgICAgICAgLy8gU2V0IHRoZSBuZXcgZW50cmllc1xuICAgICAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBzdXBlci5zZXQoaywgdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlcnNlY3QgbWV0aG9kIHJldHVybnMgYSBuZXcgc3RydWN0dXJlIGNvbnRhaW5pbmcgaXRlbXMgd2hlcmUgdGhlIGtleXMgYXJlIHByZXNlbnQgaW4gYm90aCBvcmlnaW5hbCBzdHJ1Y3R1cmVzLlxuICAgICAqIEBwYXJhbSB7Q29sbGVjdGlvbn0gb3RoZXIgVGhlIG90aGVyIENvbGxlY3Rpb24gdG8gZmlsdGVyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBpbnRlcnNlY3Qob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIG90aGVyLmZpbHRlcigoXywgaykgPT4gdGhpcy5oYXMoaykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGlmZmVyZW5jZSBtZXRob2QgcmV0dXJucyBhIG5ldyBzdHJ1Y3R1cmUgY29udGFpbmluZyBpdGVtcyB3aGVyZSB0aGUga2V5IGlzIHByZXNlbnQgaW4gb25lIG9mIHRoZSBvcmlnaW5hbCBzdHJ1Y3R1cmVzIGJ1dCBub3QgdGhlIG90aGVyLlxuICAgICAqIEBwYXJhbSB7Q29sbGVjdGlvbn0gb3RoZXIgVGhlIG90aGVyIENvbGxlY3Rpb24gdG8gZmlsdGVyIGFnYWluc3RcbiAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBkaWZmZXJlbmNlKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBvdGhlci5maWx0ZXIoKF8sIGspID0+ICF0aGlzLmhhcyhrKSkuY29uY2F0KHRoaXMuZmlsdGVyKChfLCBrKSA9PiAhb3RoZXIuaGFzKGspKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzb3J0ZWQgbWV0aG9kIHNvcnRzIHRoZSBpdGVtcyBvZiBhIGNvbGxlY3Rpb24gYW5kIHJldHVybnMgaXQuXG4gICAgICogVGhlIHNvcnQgaXMgbm90IG5lY2Vzc2FyaWx5IHN0YWJsZSBpbiBOb2RlIDEwIG9yIG9sZGVyLlxuICAgICAqIFRoZSBkZWZhdWx0IHNvcnQgb3JkZXIgaXMgYWNjb3JkaW5nIHRvIHN0cmluZyBVbmljb2RlIGNvZGUgcG9pbnRzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJlRnVuY3Rpb25dIFNwZWNpZmllcyBhIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc29ydCBvcmRlci5cbiAgICAgKiBJZiBvbWl0dGVkLCB0aGUgY29sbGVjdGlvbiBpcyBzb3J0ZWQgYWNjb3JkaW5nIHRvIGVhY2ggY2hhcmFjdGVyJ3MgVW5pY29kZSBjb2RlIHBvaW50IHZhbHVlLFxuICAgICAqIGFjY29yZGluZyB0byB0aGUgc3RyaW5nIGNvbnZlcnNpb24gb2YgZWFjaCBlbGVtZW50LlxuICAgICAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuICAgICAqIEBleGFtcGxlIGNvbGxlY3Rpb24uc29ydGVkKCh1c2VyQSwgdXNlckIpID0+IHVzZXJBLmNyZWF0ZWRUaW1lc3RhbXAgLSB1c2VyQi5jcmVhdGVkVGltZXN0YW1wKTtcbiAgICAgKi9cbiAgICBzb3J0ZWQoY29tcGFyZUZ1bmN0aW9uID0gKHgsIHkpID0+IE51bWJlcih4ID4geSkgfHwgTnVtYmVyKHggPT09IHkpIC0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdKFsuLi50aGlzLmVudHJpZXMoKV0pXG4gICAgICAgICAgICAuc29ydCgoYXYsIGJ2LCBhaywgYmspID0+IGNvbXBhcmVGdW5jdGlvbihhdiwgYnYsIGFrLCBiaykpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG5Db2xsZWN0aW9uLmRlZmF1bHQgPSBDb2xsZWN0aW9uO1xubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pTHlJc0luTnZkWEpqWlhNaU9sc2lhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPMEZCVVVFN096czdPMGRCUzBjN1FVRkRTQ3hOUVVGTkxGVkJRV2xDTEZOQlFWRXNSMEZCVXp0SlFVMTJReXhaUVVGdFFpeFBRVUVyUXp0UlFVTnFSU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZGWmpzN096czdWMEZMUnp0UlFVTklMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hKUVVGSkxFVkJRVVVzVVVGQlVTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WlFVRlpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVVV6UmpzN096czdWMEZMUnp0UlFVTklMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeEZRVUZGTEZkQlFWY3NSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hKUVVGSkxFVkJRVVVzVVVGQlVTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WlFVRlpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU12Uml4RFFVRkRPMGxCUlVRN096czdPMDlCUzBjN1NVRkRTU3hIUVVGSExFTkJRVU1zUjBGQlRUdFJRVU5vUWl4UFFVRlBMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZEZGtJc1EwRkJRenRKUVVWRU96czdPenM3VDBGTlJ6dEpRVU5KTEVkQlFVY3NRMEZCUXl4SFFVRk5MRVZCUVVVc1MwRkJVVHRSUVVNeFFpeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOdVFpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOMFFpeFBRVUZQTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzBsQlF6bENMRU5CUVVNN1NVRkZSRHM3T3pzN1QwRkxSenRKUVVOSkxFZEJRVWNzUTBGQlF5eEhRVUZOTzFGQlEyaENMRTlCUVU4c1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVTjJRaXhEUVVGRE8wbEJSVVE3T3pzN08wOUJTMGM3U1VGRFNTeE5RVUZOTEVOQlFVTXNSMEZCVFR0UlFVTnVRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTjBRaXhQUVVGUExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRNVUlzUTBGQlF6dEpRVVZFT3pzN08wOUJTVWM3U1VGRFNTeExRVUZMTzFGQlExZ3NUMEZCVHl4TFFVRkxMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03U1VGRGRFSXNRMEZCUXp0SlFVVkVPenM3T3pzN1QwRk5SenRKUVVOSkxFdEJRVXM3VVVGRFdDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1NVRkJTU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNTMEZCU3l4SlFVRkpMRU5CUVVNc1NVRkJTVHRaUVVGRkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzWkdMRTlCUVU4c1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF6dEpRVU53UWl4RFFVRkRPMGxCUlVRN096czdPenRQUVUxSE8wbEJRMGtzVVVGQlVUdFJRVU5rTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhKUVVGSkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNUVUZCVFN4TFFVRkxMRWxCUVVrc1EwRkJReXhKUVVGSk8xbEJRVVVzU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZET1VZc1QwRkJUeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzBsQlEzWkNMRU5CUVVNN1NVRlZUU3hMUVVGTExFTkJRVU1zVFVGQlpUdFJRVU16UWl4SlFVRkpMRTlCUVU4c1RVRkJUU3hMUVVGTExGZEJRVmM3V1VGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZEY2tVc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF6dFpRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTTVReXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEzSkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0UlFVTXpRaXhQUVVGUExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFVkJRVVVzUjBGQlRTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBsQlEyNUZMRU5CUVVNN1NVRlZUU3hSUVVGUkxFTkJRVU1zVFVGQlpUdFJRVU01UWl4SlFVRkpMRTlCUVU4c1RVRkJUU3hMUVVGTExGZEJRVmM3V1VGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZEYmtVc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF6dFpRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEzSkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhQUVVGUExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFVkJRVVVzUjBGQlRTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBsQlEyNUZMRU5CUVVNN1NVRlhUU3hKUVVGSkxFTkJRVU1zVFVGQlpUdFJRVU14UWl4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdVVUZEZWtJc1NVRkJTU3hQUVVGUExFMUJRVTBzUzBGQlN5eFhRVUZYTzFsQlFVVXNUMEZCVHl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTTVSQ3hKUVVGSkxFMUJRVTBzUjBGQlJ5eERRVUZETzFsQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXk5RExFbEJRVWtzUTBGQlF5eE5RVUZOTzFsQlFVVXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkRka0lzVDBGQlR5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03U1VGRE0wSXNRMEZCUXp0SlFWZE5MRTlCUVU4c1EwRkJReXhOUVVGbE8xRkJRemRDTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6dFJRVU0xUWl4SlFVRkpMRTlCUVU4c1RVRkJUU3hMUVVGTExGZEJRVmM3V1VGQlJTeFBRVUZQTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlF6bEVMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU03V1VGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYkVRc1NVRkJTU3hEUVVGRExFMUJRVTA3V1VGQlJTeFBRVUZQTEVWQlFVVXNRMEZCUXp0UlFVTjJRaXhQUVVGUExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVNelFpeERRVUZETzBsQlZVMHNUVUZCVFN4RFFVRkRMRTFCUVdVN1VVRkROVUlzU1VGQlNTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJRM1pDTEVsQlFVa3NUMEZCVHl4TlFVRk5MRXRCUVVzc1YwRkJWenRaUVVGRkxFOUJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM1JHTEVsQlFVa3NSMEZCUnl4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTzFsQlFVVXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkRNME1zUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVOc1FpeFBRVUZQTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNSMEZCVFN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTXhSeXhEUVVGRE8wbEJWVTBzVTBGQlV5eERRVUZETEUxQlFXVTdVVUZETDBJc1NVRkJTU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRPMUZCUXpGQ0xFbEJRVWtzVDBGQlR5eE5RVUZOTEV0QlFVc3NWMEZCVnp0WlFVRkZMRTlCUVU4c1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGSExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNSR0xFbEJRVWtzUjBGQlJ5eERRVUZETEUxQlFVMHNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTk8xbEJRVVVzVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZETTBNc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0UlFVTnNRaXhQUVVGUExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFVkJRVVVzUjBGQlRTeEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1IwRkJSeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU14Unl4RFFVRkRPMGxCWlUwc1NVRkJTU3hEUVVGRExFVkJRVzFFTEVWQlFVVXNUMEZCYVVJN1VVRkRha1lzU1VGQlNTeFBRVUZQTEU5QlFVOHNTMEZCU3l4WFFVRlhPMWxCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNVVFzUzBGQlN5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUlVGQlJUdFpRVU01UWl4SlFVRkpMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkJSU3hQUVVGUExFZEJRVWNzUTBGQlF6dFRRVU51UXp0UlFVTkVMRTlCUVU4c1UwRkJVeXhEUVVGRE8wbEJRMnhDTEVOQlFVTTdTVUZoVFN4UFFVRlBMRU5CUVVNc1JVRkJiVVFzUlVGQlJTeFBRVUZwUWp0UlFVTndSaXhKUVVGSkxFOUJRVThzVDBGQlR5eExRVUZMTEZkQlFWYzdXVUZCUlN4RlFVRkZMRWRCUVVjc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTXhSQ3hMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTU3hGUVVGRk8xbEJRemxDTEVsQlFVa3NSVUZCUlN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETzJkQ1FVRkZMRTlCUVU4c1IwRkJSeXhEUVVGRE8xTkJRMjVETzFGQlEwUXNUMEZCVHl4VFFVRlRMRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEpRVlZOTEV0QlFVc3NRMEZCUXl4RlFVRnRSQ3hGUVVGRkxFOUJRV2xDTzFGQlEyeEdMRWxCUVVrc1QwRkJUeXhQUVVGUExFdEJRVXNzVjBGQlZ6dFpRVUZGTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6RkVMRTFCUVUwc1dVRkJXU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdVVUZETDBJc1MwRkJTeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1JVRkJSVHRaUVVNNVFpeEpRVUZKTEVWQlFVVXNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF6dG5Ra0ZCUlN4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFOQlEzcERPMUZCUTBRc1QwRkJUeXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJZVTBzVFVGQlRTeERRVUZETEVWQlFXMUVMRVZCUVVVc1QwRkJhVUk3VVVGRGJrWXNTVUZCU1N4UFFVRlBMRTlCUVU4c1MwRkJTeXhYUVVGWE8xbEJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRE1VUXNUVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJaMElzUTBGQlF6dFJRVU55UlN4TFFVRkxMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1N4RlFVRkZPMWxCUXpsQ0xFbEJRVWtzUlVGQlJTeERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRE8yZENRVUZGTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFOQlF6bERPMUZCUTBRc1QwRkJUeXhQUVVGUExFTkJRVU03U1VGRGFFSXNRMEZCUXp0SlFWbE5MRk5CUVZNc1EwRkJReXhGUVVGdFJDeEZRVUZGTEU5QlFXbENPMUZCUTNSR0xFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NWMEZCVnp0WlFVRkZMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUXpGRUxIVkhRVUYxUnp0UlFVTjJSeXhOUVVGTkxFOUJRVThzUjBGQmFVSXNRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRm5RaXhGUVVGRkxFbEJRVWtzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRV2RDTEVOQlFVTXNRMEZCUXp0UlFVTXpTU3hMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTU3hGUVVGRk8xbEJRemxDTEVsQlFVa3NSVUZCUlN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVWQlFVVTdaMEpCUTNaQ0xFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzJGQlEzcENPMmxDUVVGTk8yZENRVU5PTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMkZCUTNwQ08xTkJRMFE3VVVGRFJDeFBRVUZQTEU5QlFVOHNRMEZCUXp0SlFVTm9RaXhEUVVGRE8wbEJXVTBzVDBGQlR5eERRVUZKTEVWQlFUUkVMRVZCUVVVc1QwRkJhVUk3VVVGRGFFY3NUVUZCVFN4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNVU1zVDBGQlVTeEpRVUZKTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEZRVUUyUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExGZEJRVmNzUTBGQlF5eERRVUZETzBsQlEyeEhMRU5CUVVNN1NVRlpUU3hIUVVGSExFTkJRVWtzUlVGQk5rTXNSVUZCUlN4UFFVRnBRanRSUVVNM1JTeEpRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRmRCUVZjN1dVRkJSU3hGUVVGRkxFZEJRVWNzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVNeFJDeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRE5VSXNUMEZCVHl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzVFVGQlRTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSU3hIUVVGTkxFVkJRVVU3V1VGRGFFUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM1pETEU5QlFVOHNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETjBJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQldVMHNVMEZCVXl4RFFVRkpMRVZCUVRaRExFVkJRVVVzVDBGQmFVSTdVVUZEYmtZc1NVRkJTU3hQUVVGUExFOUJRVThzUzBGQlN5eFhRVUZYTzFsQlFVVXNSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZETVVRc1RVRkJUU3hKUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQk5FSXNRMEZCUXp0UlFVTTVSU3hMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTVHRaUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRha1VzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWWl4RFFVRkRPMGxCV1Uwc1NVRkJTU3hEUVVGRExFVkJRVzFFTEVWQlFVVXNUMEZCYVVJN1VVRkRha1lzU1VGQlNTeFBRVUZQTEU5QlFVOHNTMEZCU3l4WFFVRlhPMWxCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNVVFzUzBGQlN5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUlVGQlJUdFpRVU01UWl4SlFVRkpMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF6dFRRVU53UXp0UlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMlFzUTBGQlF6dEpRVmxOTEV0QlFVc3NRMEZCUXl4RlFVRnRSQ3hGUVVGRkxFOUJRV2xDTzFGQlEyeEdMRWxCUVVrc1QwRkJUeXhQUVVGUExFdEJRVXNzVjBGQlZ6dFpRVUZGTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6RkVMRXRCUVVzc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4SlFVRkpMRVZCUVVVN1dVRkRPVUlzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF6dG5Ra0ZCUlN4UFFVRlBMRXRCUVVzc1EwRkJRenRUUVVOMFF6dFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJJc1EwRkJRenRKUVVWRU96czdPenM3T3p0UFFWRkhPMGxCUTBrc1RVRkJUU3hEUVVGSkxFVkJRVFpFTEVWQlFVVXNXVUZCWjBJN1VVRkRMMFlzU1VGQlNTeFhRVUZsTEVOQlFVTTdVVUZGY0VJc1NVRkJTU3hQUVVGUExGbEJRVmtzUzBGQlN5eFhRVUZYTEVWQlFVVTdXVUZEZUVNc1YwRkJWeXhIUVVGSExGbEJRVmtzUTBGQlF6dFpRVU16UWl4TFFVRkxMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1R0blFrRkJSU3hYUVVGWExFZEJRVWNzUlVGQlJTeERRVUZETEZkQlFWY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6ZEZMRTlCUVU4c1YwRkJWeXhEUVVGRE8xTkJRMjVDTzFGQlEwUXNTVUZCU1N4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRMnBDTEV0QlFVc3NUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFTkJRVU1zU1VGQlNTeEpRVUZKTEVWQlFVVTdXVUZET1VJc1NVRkJTU3hMUVVGTExFVkJRVVU3WjBKQlExWXNWMEZCVnl4SFFVRkhMRWRCUVcxQ0xFTkJRVU03WjBKQlEyeERMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03WjBKQlEyUXNVMEZCVXp0aFFVTlVPMWxCUTBRc1YwRkJWeXhIUVVGSExFVkJRVVVzUTBGQlF5eFhRVUZYTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFRRVU01UXp0UlFVVkVMSEZDUVVGeFFqdFJRVU55UWl4SlFVRkpMRXRCUVVzc1JVRkJSVHRaUVVOV0xFMUJRVTBzU1VGQlNTeFRRVUZUTEVOQlFVTXNhMFJCUVd0RUxFTkJRVU1zUTBGQlF6dFRRVU40UlR0UlFVVkVMRTlCUVU4c1YwRkJWeXhEUVVGRE8wbEJRM0JDTEVOQlFVTTdTVUZwUWswc1NVRkJTU3hEUVVGRExFVkJRV2RFTEVWQlFVVXNUMEZCYVVJN1VVRkRPVVVzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRm5SQ3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzFGQlEzaEZMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMklzUTBGQlF6dEpRV1ZOTEVkQlFVY3NRMEZCUXl4RlFVRTRRaXhGUVVGRkxFOUJRV2xDTzFGQlF6TkVMRWxCUVVrc1QwRkJUeXhQUVVGUExFdEJRVXNzVjBGQlZ6dFpRVUZGTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6RkVMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU5VTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJJc1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTU3hMUVVGTE8xRkJRMWdzVDBGQlR5eEpRVUZKTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCVXl4RFFVRkRPMGxCUXpORUxFTkJRVU03U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5KTEUxQlFVMHNRMEZCUXl4SFFVRkhMRmRCUVN0Q08xRkJReTlETEUxQlFVMHNUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFJRVU0zUWl4TFFVRkxMRTFCUVUwc1NVRkJTU3hKUVVGSkxGZEJRVmNzUlVGQlJUdFpRVU12UWl4TFFVRkxMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1R0blFrRkJSU3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOeVJEdFJRVU5FTEU5QlFVOHNUMEZCVHl4RFFVRkRPMGxCUTJoQ0xFTkJRVU03U1VGRlJEczdPenM3TzA5QlRVYzdTVUZEU1N4TlFVRk5MRU5CUVVNc1ZVRkJORUk3VVVGRGVrTXNTVUZCU1N4RFFVRkRMRlZCUVZVN1dVRkJSU3hQUVVGUExFdEJRVXNzUTBGQlF6dFJRVU01UWl4SlFVRkpMRWxCUVVrc1MwRkJTeXhWUVVGVk8xbEJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTTdVVUZEY2tNc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeExRVUZMTEZWQlFWVXNRMEZCUXl4SlFVRkpPMWxCUVVVc1QwRkJUeXhMUVVGTExFTkJRVU03VVVGRGFFUXNTMEZCU3l4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVsQlFVa3NSVUZCUlR0WlFVTm9ReXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hMUVVGTExFdEJRVXNzVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSVHRuUWtGRE1VUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRZanRUUVVORU8xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWWl4RFFVRkRPMGxCUlVRN096czdPenM3T3p0UFFWTkhPMGxCUTBrc1NVRkJTU3hEUVVGRExHdENRVUYzUml4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVlVzUlVGQlJTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzVFVGQlRTeERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRE8xRkJRM3BLTEUxQlFVMHNUMEZCVHl4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTndReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJWU3hGUVVGRkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZlRVVzYlVKQlFXMUNPMUZCUTI1Q0xFdEJRVXNzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0UlFVTmtMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEyNUNMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETzFGQlJYUkNMSE5DUVVGelFqdFJRVU4wUWl4TFFVRkxMRTFCUVUwc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NUMEZCVHl4RlFVRkZPMWxCUXpkQ0xFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRMmhDTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRZaXhEUVVGRE8wbEJSVVE3T3pzN1QwRkpSenRKUVVOSkxGTkJRVk1zUTBGQlF5eExRVUYxUWp0UlFVTjJReXhQUVVGUExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE5VTXNRMEZCUXp0SlFVVkVPenM3TzA5QlNVYzdTVUZEU1N4VlFVRlZMRU5CUVVNc1MwRkJkVUk3VVVGRGVFTXNUMEZCVHl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlF6RkdMRU5CUVVNN1NVRkZSRHM3T3pzN096czdPMDlCVTBjN1NVRkRTU3hOUVVGTkxFTkJRVU1zYTBKQlFYZEdMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlZTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeE5RVUZOTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU03VVVGRE0wb3NUMEZCVVN4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCVlR0aFFVTjRSU3hKUVVGSkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkZMRVZCUVVVc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeERRVUZETEdWQlFXVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpkRUxFTkJRVU03TzBGQlNVOHNaME5CUVZVN1FVRndha0pMTEd0Q1FVRlBMRWRCUVhOQ0xGVkJRVlVzUTBGQlF6dEJRVzFxUW1oRkxFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVY3NWVUZCVlN4RFFVRkRPMEZCUlRWQ0xHdENRVUZsTEZWQlFWVXNRMEZCUXlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltVjRjRzl5ZENCcGJuUmxjbVpoWTJVZ1EyOXNiR1ZqZEdsdmJrTnZibk4wY25WamRHOXlJSHRjYmx4MGJtVjNLQ2s2SUVOdmJHeGxZM1JwYjI0OGRXNXJibTkzYml3Z2RXNXJibTkzYmo0N1hHNWNkRzVsZHp4TExDQldQaWhsYm5SeWFXVnpQem9nVW1WaFpHOXViSGxCY25KaGVUeHlaV0ZrYjI1c2VTQmJTeXdnVmwwK0lId2diblZzYkNrNklFTnZiR3hsWTNScGIyNDhTeXdnVmo0N1hHNWNkRzVsZHp4TExDQldQaWhwZEdWeVlXSnNaVG9nU1hSbGNtRmliR1U4Y21WaFpHOXViSGtnVzBzc0lGWmRQaWs2SUVOdmJHeGxZM1JwYjI0OFN5d2dWajQ3WEc1Y2RISmxZV1J2Ym14NUlIQnliM1J2ZEhsd1pUb2dRMjlzYkdWamRHbHZiangxYm10dWIzZHVMQ0IxYm10dWIzZHVQanRjYmx4MGNtVmhaRzl1YkhrZ1cxTjViV0p2YkM1emNHVmphV1Z6WFRvZ1EyOXNiR1ZqZEdsdmJrTnZibk4wY25WamRHOXlPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFRWdUV0Z3SUhkcGRHZ2dZV1JrYVhScGIyNWhiQ0IxZEdsc2FYUjVJRzFsZEdodlpITXVJRlJvYVhNZ2FYTWdkWE5sWkNCMGFISnZkV2RvYjNWMElHUnBjMk52Y21RdWFuTWdjbUYwYUdWeUlIUm9ZVzRnUVhKeVlYbHpJR1p2Y2lCaGJubDBhR2x1WnlCMGFHRjBJR2hoYzF4dUlDb2dZVzRnU1VRc0lHWnZjaUJ6YVdkdWFXWnBZMkZ1ZEd4NUlHbHRjSEp2ZG1Wa0lIQmxjbVp2Y20xaGJtTmxJR0Z1WkNCbFlYTmxMVzltTFhWelpTNWNiaUFxSUVCbGVIUmxibVJ6SUh0TllYQjlYRzRnS2lCQWNISnZjR1Z5ZEhrZ2UyNTFiV0psY24wZ2MybDZaU0F0SUZSb1pTQmhiVzkxYm5RZ2IyWWdaV3hsYldWdWRITWdhVzRnZEdocGN5QmpiMnhzWldOMGFXOXVMbHh1SUNvdlhHNWpiR0Z6Y3lCRGIyeHNaV04wYVc5dVBFc3NJRlkrSUdWNGRHVnVaSE1nVFdGd1BFc3NJRlkrSUh0Y2JseDBjSEpwZG1GMFpTQmZZWEp5WVhraE9pQldXMTBnZkNCdWRXeHNPMXh1WEhSd2NtbDJZWFJsSUY5clpYbEJjbkpoZVNFNklFdGJYU0I4SUc1MWJHdzdYRzVjZEhCMVlteHBZeUJ6ZEdGMGFXTWdjbVZoWkc5dWJIa2daR1ZtWVhWc2REb2dkSGx3Wlc5bUlFTnZiR3hsWTNScGIyNGdQU0JEYjJ4c1pXTjBhVzl1TzF4dVhIUndkV0pzYVdNZ1d5ZGpiMjV6ZEhKMVkzUnZjaWRkT2lCMGVYQmxiMllnUTI5c2JHVmpkR2x2Ymp0Y2JseHVYSFJ3ZFdKc2FXTWdZMjl1YzNSeWRXTjBiM0lvWlc1MGNtbGxjejg2SUZKbFlXUnZibXg1UVhKeVlYazhjbVZoWkc5dWJIa2dXMHNzSUZaZFBpQjhJRzUxYkd3cElIdGNibHgwWEhSemRYQmxjaWhsYm5SeWFXVnpLVHRjYmx4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUVOaFkyaGxaQ0JoY25KaGVTQm1iM0lnZEdobElHQmhjbkpoZVNncFlDQnRaWFJvYjJRZ0xTQjNhV3hzSUdKbElISmxjMlYwSUhSdklHQnVkV3hzWUNCM2FHVnVaWFpsY2lCZ2MyVjBLQ2xnSUc5eUlHQmtaV3hsZEdVb0tXQWdZWEpsSUdOaGJHeGxaRnh1WEhSY2RDQXFJRUJ1WVcxbElFTnZiR3hsWTNScGIyNGpYMkZ5Y21GNVhHNWNkRngwSUNvZ1FIUjVjR1VnZXo5QmNuSmhlWDFjYmx4MFhIUWdLaUJBY0hKcGRtRjBaVnh1WEhSY2RDQXFMMXh1WEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2gwYUdsekxDQW5YMkZ5Y21GNUp5d2dleUIyWVd4MVpUb2diblZzYkN3Z2QzSnBkR0ZpYkdVNklIUnlkV1VzSUdOdmJtWnBaM1Z5WVdKc1pUb2dkSEoxWlNCOUtUdGNibHh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRU5oWTJobFpDQmhjbkpoZVNCbWIzSWdkR2hsSUdCclpYbEJjbkpoZVNncFlDQnRaWFJvYjJRZ0xTQjNhV3hzSUdKbElISmxjMlYwSUhSdklHQnVkV3hzWUNCM2FHVnVaWFpsY2lCZ2MyVjBLQ2xnSUc5eUlHQmtaV3hsZEdVb0tXQWdZWEpsSUdOaGJHeGxaRnh1WEhSY2RDQXFJRUJ1WVcxbElFTnZiR3hsWTNScGIyNGpYMnRsZVVGeWNtRjVYRzVjZEZ4MElDb2dRSFI1Y0dVZ2V6OUJjbkpoZVgxY2JseDBYSFFnS2lCQWNISnBkbUYwWlZ4dVhIUmNkQ0FxTDF4dVhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNoMGFHbHpMQ0FuWDJ0bGVVRnljbUY1Snl3Z2V5QjJZV3gxWlRvZ2JuVnNiQ3dnZDNKcGRHRmliR1U2SUhSeWRXVXNJR052Ym1acFozVnlZV0pzWlRvZ2RISjFaU0I5S1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkpaR1Z1ZEdsallXd2dkRzhnVzAxaGNDNW5aWFFvS1Ywb2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlNtRjJZVk5qY21sd2RDOVNaV1psY21WdVkyVXZSMnh2WW1Gc1gwOWlhbVZqZEhNdlRXRndMMmRsZENrdVhHNWNkQ0FxSUVkbGRITWdZVzRnWld4bGJXVnVkQ0IzYVhSb0lIUm9aU0J6Y0dWamFXWnBaV1FnYTJWNUxDQmhibVFnY21WMGRYSnVjeUJwZEhNZ2RtRnNkV1VzSUc5eUlHQjFibVJsWm1sdVpXUmdJR2xtSUhSb1pTQmxiR1Z0Wlc1MElHUnZaWE1nYm05MElHVjRhWE4wTGx4dVhIUWdLaUJBY0dGeVlXMGdleXA5SUd0bGVTQXRJRlJvWlNCclpYa2dkRzhnWjJWMElHWnliMjBnZEdocGN5QmpiMnhzWldOMGFXOXVYRzVjZENBcUlFQnlaWFIxY201eklIc3FJSHdnZFc1a1pXWnBibVZrZlZ4dVhIUWdLaTljYmx4MGNIVmliR2xqSUdkbGRDaHJaWGs2SUVzcE9pQldJSHdnZFc1a1pXWnBibVZrSUh0Y2JseDBYSFJ5WlhSMWNtNGdjM1Z3WlhJdVoyVjBLR3RsZVNrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1JsYm5ScFkyRnNJSFJ2SUZ0TllYQXVjMlYwS0NsZEtHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwcGhkbUZUWTNKcGNIUXZVbVZtWlhKbGJtTmxMMGRzYjJKaGJGOVBZbXBsWTNSekwwMWhjQzl6WlhRcExseHVYSFFnS2lCVFpYUnpJR0VnYm1WM0lHVnNaVzFsYm5RZ2FXNGdkR2hsSUdOdmJHeGxZM1JwYjI0Z2QybDBhQ0IwYUdVZ2MzQmxZMmxtYVdWa0lHdGxlU0JoYm1RZ2RtRnNkV1V1WEc1Y2RDQXFJRUJ3WVhKaGJTQjdLbjBnYTJWNUlDMGdWR2hsSUd0bGVTQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCMGJ5QmhaR1JjYmx4MElDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQXRJRlJvWlNCMllXeDFaU0J2WmlCMGFHVWdaV3hsYldWdWRDQjBieUJoWkdSY2JseDBJQ29nUUhKbGRIVnlibk1nZTBOdmJHeGxZM1JwYjI1OVhHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ2MyVjBLR3RsZVRvZ1N5d2dkbUZzZFdVNklGWXBPaUIwYUdseklIdGNibHgwWEhSMGFHbHpMbDloY25KaGVTQTlJRzUxYkd3N1hHNWNkRngwZEdocGN5NWZhMlY1UVhKeVlYa2dQU0J1ZFd4c08xeHVYSFJjZEhKbGRIVnliaUJ6ZFhCbGNpNXpaWFFvYTJWNUxDQjJZV3gxWlNrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1JsYm5ScFkyRnNJSFJ2SUZ0TllYQXVhR0Z6S0NsZEtHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwcGhkbUZUWTNKcGNIUXZVbVZtWlhKbGJtTmxMMGRzYjJKaGJGOVBZbXBsWTNSekwwMWhjQzlvWVhNcExseHVYSFFnS2lCRGFHVmphM01nYVdZZ1lXNGdaV3hsYldWdWRDQmxlR2x6ZEhNZ2FXNGdkR2hsSUdOdmJHeGxZM1JwYjI0dVhHNWNkQ0FxSUVCd1lYSmhiU0I3S24wZ2EyVjVJQzBnVkdobElHdGxlU0J2WmlCMGFHVWdaV3hsYldWdWRDQjBieUJqYUdWamF5Qm1iM0pjYmx4MElDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJR0IwY25WbFlDQnBaaUIwYUdVZ1pXeGxiV1Z1ZENCbGVHbHpkSE1zSUdCbVlXeHpaV0FnYVdZZ2FYUWdaRzlsY3lCdWIzUWdaWGhwYzNRdVhHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ2FHRnpLR3RsZVRvZ1N5azZJR0p2YjJ4bFlXNGdlMXh1WEhSY2RISmxkSFZ5YmlCemRYQmxjaTVvWVhNb2EyVjVLVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCSlpHVnVkR2xqWVd3Z2RHOGdXMDFoY0M1a1pXeGxkR1VvS1Ywb2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlNtRjJZVk5qY21sd2RDOVNaV1psY21WdVkyVXZSMnh2WW1Gc1gwOWlhbVZqZEhNdlRXRndMMlJsYkdWMFpTa3VYRzVjZENBcUlFUmxiR1YwWlhNZ1lXNGdaV3hsYldWdWRDQm1jbTl0SUhSb1pTQmpiMnhzWldOMGFXOXVMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2V5cDlJR3RsZVNBdElGUm9aU0JyWlhrZ2RHOGdaR1ZzWlhSbElHWnliMjBnZEdobElHTnZiR3hsWTNScGIyNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlHQjBjblZsWUNCcFppQjBhR1VnWld4bGJXVnVkQ0IzWVhNZ2NtVnRiM1psWkN3Z1lHWmhiSE5sWUNCcFppQjBhR1VnWld4bGJXVnVkQ0JrYjJWeklHNXZkQ0JsZUdsemRDNWNibHgwSUNvdlhHNWNkSEIxWW14cFl5QmtaV3hsZEdVb2EyVjVPaUJMS1RvZ1ltOXZiR1ZoYmlCN1hHNWNkRngwZEdocGN5NWZZWEp5WVhrZ1BTQnVkV3hzTzF4dVhIUmNkSFJvYVhNdVgydGxlVUZ5Y21GNUlEMGdiblZzYkR0Y2JseDBYSFJ5WlhSMWNtNGdjM1Z3WlhJdVpHVnNaWFJsS0d0bGVTazdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nU1dSbGJuUnBZMkZzSUhSdklGdE5ZWEF1WTJ4bFlYSW9LVjBvYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U21GMllWTmpjbWx3ZEM5U1pXWmxjbVZ1WTJVdlIyeHZZbUZzWDA5aWFtVmpkSE12VFdGd0wyTnNaV0Z5S1M1Y2JseDBJQ29nVW1WdGIzWmxjeUJoYkd3Z1pXeGxiV1Z1ZEhNZ1puSnZiU0IwYUdVZ1kyOXNiR1ZqZEdsdmJpNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2UzVnVaR1ZtYVc1bFpIMWNibHgwSUNvdlhHNWNkSEIxWW14cFl5QmpiR1ZoY2lncE9pQjJiMmxrSUh0Y2JseDBYSFJ5WlhSMWNtNGdjM1Z3WlhJdVkyeGxZWElvS1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkRjbVZoZEdWeklHRnVJRzl5WkdWeVpXUWdZWEp5WVhrZ2IyWWdkR2hsSUhaaGJIVmxjeUJ2WmlCMGFHbHpJR052Ykd4bFkzUnBiMjRzSUdGdVpDQmpZV05vWlhNZ2FYUWdhVzUwWlhKdVlXeHNlUzRnVkdobElHRnljbUY1SUhkcGJHd2diMjVzZVNCaVpWeHVYSFFnS2lCeVpXTnZibk4wY25WamRHVmtJR2xtSUdGdUlHbDBaVzBnYVhNZ1lXUmtaV1FnZEc4Z2IzSWdjbVZ0YjNabFpDQm1jbTl0SUhSb1pTQmpiMnhzWldOMGFXOXVMQ0J2Y2lCcFppQjViM1VnWTJoaGJtZGxJSFJvWlNCc1pXNW5kR2dnYjJZZ2RHaGxJR0Z5Y21GNVhHNWNkQ0FxSUdsMGMyVnNaaTRnU1dZZ2VXOTFJR1J2YmlkMElIZGhiblFnZEdocGN5QmpZV05vYVc1bklHSmxhR0YyYVc5eUxDQjFjMlVnWUZzdUxpNWpiMnhzWldOMGFXOXVMblpoYkhWbGN5Z3BYV0FnYjNKY2JseDBJQ29nWUVGeWNtRjVMbVp5YjIwb1kyOXNiR1ZqZEdsdmJpNTJZV3gxWlhNb0tTbGdJR2x1YzNSbFlXUXVYRzVjZENBcUlFQnlaWFIxY201eklIdEJjbkpoZVgxY2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCaGNuSmhlU2dwT2lCV1cxMGdlMXh1WEhSY2RHbG1JQ2doZEdocGN5NWZZWEp5WVhrZ2ZId2dkR2hwY3k1ZllYSnlZWGt1YkdWdVozUm9JQ0U5UFNCMGFHbHpMbk5wZW1VcElIUm9hWE11WDJGeWNtRjVJRDBnV3k0dUxuUm9hWE11ZG1Gc2RXVnpLQ2xkTzF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TGw5aGNuSmhlVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCRGNtVmhkR1Z6SUdGdUlHOXlaR1Z5WldRZ1lYSnlZWGtnYjJZZ2RHaGxJR3RsZVhNZ2IyWWdkR2hwY3lCamIyeHNaV04wYVc5dUxDQmhibVFnWTJGamFHVnpJR2wwSUdsdWRHVnlibUZzYkhrdUlGUm9aU0JoY25KaGVTQjNhV3hzSUc5dWJIa2dZbVZjYmx4MElDb2djbVZqYjI1emRISjFZM1JsWkNCcFppQmhiaUJwZEdWdElHbHpJR0ZrWkdWa0lIUnZJRzl5SUhKbGJXOTJaV1FnWm5KdmJTQjBhR1VnWTI5c2JHVmpkR2x2Yml3Z2IzSWdhV1lnZVc5MUlHTm9ZVzVuWlNCMGFHVWdiR1Z1WjNSb0lHOW1JSFJvWlNCaGNuSmhlVnh1WEhRZ0tpQnBkSE5sYkdZdUlFbG1JSGx2ZFNCa2IyNG5kQ0IzWVc1MElIUm9hWE1nWTJGamFHbHVaeUJpWldoaGRtbHZjaXdnZFhObElHQmJMaTR1WTI5c2JHVmpkR2x2Ymk1clpYbHpLQ2xkWUNCdmNseHVYSFFnS2lCZ1FYSnlZWGt1Wm5KdmJTaGpiMnhzWldOMGFXOXVMbXRsZVhNb0tTbGdJR2x1YzNSbFlXUXVYRzVjZENBcUlFQnlaWFIxY201eklIdEJjbkpoZVgxY2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCclpYbEJjbkpoZVNncE9pQkxXMTBnZTF4dVhIUmNkR2xtSUNnaGRHaHBjeTVmYTJWNVFYSnlZWGtnZkh3Z2RHaHBjeTVmYTJWNVFYSnlZWGt1YkdWdVozUm9JQ0U5UFNCMGFHbHpMbk5wZW1VcElIUm9hWE11WDJ0bGVVRnljbUY1SUQwZ1d5NHVMblJvYVhNdWEyVjVjeWdwWFR0Y2JseDBYSFJ5WlhSMWNtNGdkR2hwY3k1ZmEyVjVRWEp5WVhrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dUMkowWVdsdWN5QjBhR1VnWm1seWMzUWdkbUZzZFdVb2N5a2dhVzRnZEdocGN5QmpiMnhzWldOMGFXOXVMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UyNTFiV0psY24wZ1cyRnRiM1Z1ZEYwZ1FXMXZkVzUwSUc5bUlIWmhiSFZsY3lCMGJ5QnZZblJoYVc0Z1puSnZiU0IwYUdVZ1ltVm5hVzV1YVc1blhHNWNkQ0FxSUVCeVpYUjFjbTV6SUhzcWZFRnljbUY1UENvK2ZTQkJJSE5wYm1kc1pTQjJZV3gxWlNCcFppQnVieUJoYlc5MWJuUWdhWE1nY0hKdmRtbGtaV1FnYjNJZ1lXNGdZWEp5WVhrZ2IyWWdkbUZzZFdWekxDQnpkR0Z5ZEdsdVp5Qm1jbTl0SUhSb1pTQmxibVFnYVdaY2JseDBJQ29nWVcxdmRXNTBJR2x6SUc1bFoyRjBhWFpsWEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWm1seWMzUW9LVG9nVmlCOElIVnVaR1ZtYVc1bFpEdGNibHgwY0hWaWJHbGpJR1pwY25OMEtHRnRiM1Z1ZERvZ2JuVnRZbVZ5S1RvZ1ZsdGRPMXh1WEhSd2RXSnNhV01nWm1seWMzUW9ZVzF2ZFc1MFB6b2diblZ0WW1WeUtUb2dWaUI4SUZaYlhTQjhJSFZ1WkdWbWFXNWxaQ0I3WEc1Y2RGeDBhV1lnS0hSNWNHVnZaaUJoYlc5MWJuUWdQVDA5SUNkMWJtUmxabWx1WldRbktTQnlaWFIxY200Z2RHaHBjeTUyWVd4MVpYTW9LUzV1WlhoMEtDa3VkbUZzZFdVN1hHNWNkRngwYVdZZ0tHRnRiM1Z1ZENBOElEQXBJSEpsZEhWeWJpQjBhR2x6TG14aGMzUW9ZVzF2ZFc1MElDb2dMVEVwTzF4dVhIUmNkR0Z0YjNWdWRDQTlJRTFoZEdndWJXbHVLSFJvYVhNdWMybDZaU3dnWVcxdmRXNTBLVHRjYmx4MFhIUmpiMjV6ZENCcGRHVnlJRDBnZEdocGN5NTJZV3gxWlhNb0tUdGNibHgwWEhSeVpYUjFjbTRnUVhKeVlYa3Vabkp2YlNoN0lHeGxibWQwYURvZ1lXMXZkVzUwSUgwc0lDZ3BPaUJXSUQwK0lHbDBaWEl1Ym1WNGRDZ3BMblpoYkhWbEtUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJQWW5SaGFXNXpJSFJvWlNCbWFYSnpkQ0JyWlhrb2N5a2dhVzRnZEdocGN5QmpiMnhzWldOMGFXOXVMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UyNTFiV0psY24wZ1cyRnRiM1Z1ZEYwZ1FXMXZkVzUwSUc5bUlHdGxlWE1nZEc4Z2IySjBZV2x1SUdaeWIyMGdkR2hsSUdKbFoybHVibWx1WjF4dVhIUWdLaUJBY21WMGRYSnVjeUI3S254QmNuSmhlVHdxUG4wZ1FTQnphVzVuYkdVZ2EyVjVJR2xtSUc1dklHRnRiM1Z1ZENCcGN5QndjbTkyYVdSbFpDQnZjaUJoYmlCaGNuSmhlU0J2WmlCclpYbHpMQ0J6ZEdGeWRHbHVaeUJtY205dElIUm9aU0JsYm1RZ2FXWmNibHgwSUNvZ1lXMXZkVzUwSUdseklHNWxaMkYwYVhabFhHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ1ptbHljM1JMWlhrb0tUb2dTeUI4SUhWdVpHVm1hVzVsWkR0Y2JseDBjSFZpYkdsaklHWnBjbk4wUzJWNUtHRnRiM1Z1ZERvZ2JuVnRZbVZ5S1RvZ1MxdGRPMXh1WEhSd2RXSnNhV01nWm1seWMzUkxaWGtvWVcxdmRXNTBQem9nYm5WdFltVnlLVG9nU3lCOElFdGJYU0I4SUhWdVpHVm1hVzVsWkNCN1hHNWNkRngwYVdZZ0tIUjVjR1Z2WmlCaGJXOTFiblFnUFQwOUlDZDFibVJsWm1sdVpXUW5LU0J5WlhSMWNtNGdkR2hwY3k1clpYbHpLQ2t1Ym1WNGRDZ3BMblpoYkhWbE8xeHVYSFJjZEdsbUlDaGhiVzkxYm5RZ1BDQXdLU0J5WlhSMWNtNGdkR2hwY3k1c1lYTjBTMlY1S0dGdGIzVnVkQ0FxSUMweEtUdGNibHgwWEhSaGJXOTFiblFnUFNCTllYUm9MbTFwYmloMGFHbHpMbk5wZW1Vc0lHRnRiM1Z1ZENrN1hHNWNkRngwWTI5dWMzUWdhWFJsY2lBOUlIUm9hWE11YTJWNWN5Z3BPMXh1WEhSY2RISmxkSFZ5YmlCQmNuSmhlUzVtY205dEtIc2diR1Z1WjNSb09pQmhiVzkxYm5RZ2ZTd2dLQ2s2SUVzZ1BUNGdhWFJsY2k1dVpYaDBLQ2t1ZG1Gc2RXVXBPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUU5aWRHRnBibk1nZEdobElHeGhjM1FnZG1Gc2RXVW9jeWtnYVc0Z2RHaHBjeUJqYjJ4c1pXTjBhVzl1TGlCVWFHbHpJSEpsYkdsbGN5QnZiaUI3UUd4cGJtc2dRMjlzYkdWamRHbHZiaU5oY25KaGVYMHNJR0Z1WkNCMGFIVnpJSFJvWlNCallXTm9hVzVuWEc1Y2RDQXFJRzFsWTJoaGJtbHpiU0JoY0hCc2FXVnpJR2hsY21VZ1lYTWdkMlZzYkM1Y2JseDBJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJRnRoYlc5MWJuUmRJRUZ0YjNWdWRDQnZaaUIyWVd4MVpYTWdkRzhnYjJKMFlXbHVJR1p5YjIwZ2RHaGxJR1Z1WkZ4dVhIUWdLaUJBY21WMGRYSnVjeUI3S254QmNuSmhlVHdxUG4wZ1FTQnphVzVuYkdVZ2RtRnNkV1VnYVdZZ2JtOGdZVzF2ZFc1MElHbHpJSEJ5YjNacFpHVmtJRzl5SUdGdUlHRnljbUY1SUc5bUlIWmhiSFZsY3l3Z2MzUmhjblJwYm1jZ1puSnZiU0IwYUdVZ2MzUmhjblFnYVdaY2JseDBJQ29nWVcxdmRXNTBJR2x6SUc1bFoyRjBhWFpsWEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nYkdGemRDZ3BPaUJXSUh3Z2RXNWtaV1pwYm1Wa08xeHVYSFJ3ZFdKc2FXTWdiR0Z6ZENoaGJXOTFiblE2SUc1MWJXSmxjaWs2SUZaYlhUdGNibHgwY0hWaWJHbGpJR3hoYzNRb1lXMXZkVzUwUHpvZ2JuVnRZbVZ5S1RvZ1ZpQjhJRlpiWFNCOElIVnVaR1ZtYVc1bFpDQjdYRzVjZEZ4MFkyOXVjM1FnWVhKeUlEMGdkR2hwY3k1aGNuSmhlU2dwTzF4dVhIUmNkR2xtSUNoMGVYQmxiMllnWVcxdmRXNTBJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5a2djbVYwZFhKdUlHRnljbHRoY25JdWJHVnVaM1JvSUMwZ01WMDdYRzVjZEZ4MGFXWWdLR0Z0YjNWdWRDQThJREFwSUhKbGRIVnliaUIwYUdsekxtWnBjbk4wS0dGdGIzVnVkQ0FxSUMweEtUdGNibHgwWEhScFppQW9JV0Z0YjNWdWRDa2djbVYwZFhKdUlGdGRPMXh1WEhSY2RISmxkSFZ5YmlCaGNuSXVjMnhwWTJVb0xXRnRiM1Z1ZENrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dUMkowWVdsdWN5QjBhR1VnYkdGemRDQnJaWGtvY3lrZ2FXNGdkR2hwY3lCamIyeHNaV04wYVc5dUxpQlVhR2x6SUhKbGJHbGxjeUJ2YmlCN1FHeHBibXNnUTI5c2JHVmpkR2x2YmlOclpYbEJjbkpoZVgwc0lHRnVaQ0IwYUhWeklIUm9aU0JqWVdOb2FXNW5YRzVjZENBcUlHMWxZMmhoYm1semJTQmhjSEJzYVdWeklHaGxjbVVnWVhNZ2QyVnNiQzVjYmx4MElDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlGdGhiVzkxYm5SZElFRnRiM1Z1ZENCdlppQnJaWGx6SUhSdklHOWlkR0ZwYmlCbWNtOXRJSFJvWlNCbGJtUmNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2V5cDhRWEp5WVhrOEtqNTlJRUVnYzJsdVoyeGxJR3RsZVNCcFppQnVieUJoYlc5MWJuUWdhWE1nY0hKdmRtbGtaV1FnYjNJZ1lXNGdZWEp5WVhrZ2IyWWdhMlY1Y3l3Z2MzUmhjblJwYm1jZ1puSnZiU0IwYUdVZ2MzUmhjblFnYVdaY2JseDBJQ29nWVcxdmRXNTBJR2x6SUc1bFoyRjBhWFpsWEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nYkdGemRFdGxlU2dwT2lCTElId2dkVzVrWldacGJtVmtPMXh1WEhSd2RXSnNhV01nYkdGemRFdGxlU2hoYlc5MWJuUTZJRzUxYldKbGNpazZJRXRiWFR0Y2JseDBjSFZpYkdsaklHeGhjM1JMWlhrb1lXMXZkVzUwUHpvZ2JuVnRZbVZ5S1RvZ1N5QjhJRXRiWFNCOElIVnVaR1ZtYVc1bFpDQjdYRzVjZEZ4MFkyOXVjM1FnWVhKeUlEMGdkR2hwY3k1clpYbEJjbkpoZVNncE8xeHVYSFJjZEdsbUlDaDBlWEJsYjJZZ1lXMXZkVzUwSUQwOVBTQW5kVzVrWldacGJtVmtKeWtnY21WMGRYSnVJR0Z5Y2x0aGNuSXViR1Z1WjNSb0lDMGdNVjA3WEc1Y2RGeDBhV1lnS0dGdGIzVnVkQ0E4SURBcElISmxkSFZ5YmlCMGFHbHpMbVpwY25OMFMyVjVLR0Z0YjNWdWRDQXFJQzB4S1R0Y2JseDBYSFJwWmlBb0lXRnRiM1Z1ZENrZ2NtVjBkWEp1SUZ0ZE8xeHVYSFJjZEhKbGRIVnliaUJoY25JdWMyeHBZMlVvTFdGdGIzVnVkQ2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1QySjBZV2x1Y3lCMWJtbHhkV1VnY21GdVpHOXRJSFpoYkhWbEtITXBJR1p5YjIwZ2RHaHBjeUJqYjJ4c1pXTjBhVzl1TGlCVWFHbHpJSEpsYkdsbGN5QnZiaUI3UUd4cGJtc2dRMjlzYkdWamRHbHZiaU5oY25KaGVYMHNJR0Z1WkNCMGFIVnpJSFJvWlNCallXTm9hVzVuWEc1Y2RDQXFJRzFsWTJoaGJtbHpiU0JoY0hCc2FXVnpJR2hsY21VZ1lYTWdkMlZzYkM1Y2JseDBJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJRnRoYlc5MWJuUmRJRUZ0YjNWdWRDQnZaaUIyWVd4MVpYTWdkRzhnYjJKMFlXbHVJSEpoYm1SdmJXeDVYRzVjZENBcUlFQnlaWFIxY201eklIc3FmRUZ5Y21GNVBDbytmU0JCSUhOcGJtZHNaU0IyWVd4MVpTQnBaaUJ1YnlCaGJXOTFiblFnYVhNZ2NISnZkbWxrWldRZ2IzSWdZVzRnWVhKeVlYa2diMllnZG1Gc2RXVnpYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdjbUZ1Wkc5dEtDazZJRlk3WEc1Y2RIQjFZbXhwWXlCeVlXNWtiMjBvWVcxdmRXNTBPaUJ1ZFcxaVpYSXBPaUJXVzEwN1hHNWNkSEIxWW14cFl5QnlZVzVrYjIwb1lXMXZkVzUwUHpvZ2JuVnRZbVZ5S1RvZ1ZpQjhJRlpiWFNCN1hHNWNkRngwYkdWMElHRnljaUE5SUhSb2FYTXVZWEp5WVhrb0tUdGNibHgwWEhScFppQW9kSGx3Wlc5bUlHRnRiM1Z1ZENBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUhKbGRIVnliaUJoY25KYlRXRjBhQzVtYkc5dmNpaE5ZWFJvTG5KaGJtUnZiU2dwSUNvZ1lYSnlMbXhsYm1kMGFDbGRPMXh1WEhSY2RHbG1JQ2hoY25JdWJHVnVaM1JvSUQwOVBTQXdJSHg4SUNGaGJXOTFiblFwSUhKbGRIVnliaUJiWFR0Y2JseDBYSFJoY25JZ1BTQmhjbkl1YzJ4cFkyVW9LVHRjYmx4MFhIUnlaWFIxY200Z1FYSnlZWGt1Wm5KdmJTaDdJR3hsYm1kMGFEb2dZVzF2ZFc1MElIMHNJQ2dwT2lCV0lEMCtJR0Z5Y2k1emNHeHBZMlVvVFdGMGFDNW1iRzl2Y2loTllYUm9MbkpoYm1SdmJTZ3BJQ29nWVhKeUxteGxibWQwYUNrc0lERXBXekJkS1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlBZblJoYVc1eklIVnVhWEYxWlNCeVlXNWtiMjBnYTJWNUtITXBJR1p5YjIwZ2RHaHBjeUJqYjJ4c1pXTjBhVzl1TGlCVWFHbHpJSEpsYkdsbGN5QnZiaUI3UUd4cGJtc2dRMjlzYkdWamRHbHZiaU5yWlhsQmNuSmhlWDBzSUdGdVpDQjBhSFZ6SUhSb1pTQmpZV05vYVc1blhHNWNkQ0FxSUcxbFkyaGhibWx6YlNCaGNIQnNhV1Z6SUdobGNtVWdZWE1nZDJWc2JDNWNibHgwSUNvZ1FIQmhjbUZ0SUh0dWRXMWlaWEo5SUZ0aGJXOTFiblJkSUVGdGIzVnVkQ0J2WmlCclpYbHpJSFJ2SUc5aWRHRnBiaUJ5WVc1a2IyMXNlVnh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdLbnhCY25KaGVUd3FQbjBnUVNCemFXNW5iR1VnYTJWNUlHbG1JRzV2SUdGdGIzVnVkQ0JwY3lCd2NtOTJhV1JsWkNCdmNpQmhiaUJoY25KaGVWeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklISmhibVJ2YlV0bGVTZ3BPaUJMTzF4dVhIUndkV0pzYVdNZ2NtRnVaRzl0UzJWNUtHRnRiM1Z1ZERvZ2JuVnRZbVZ5S1RvZ1MxdGRPMXh1WEhSd2RXSnNhV01nY21GdVpHOXRTMlY1S0dGdGIzVnVkRDg2SUc1MWJXSmxjaWs2SUVzZ2ZDQkxXMTBnZTF4dVhIUmNkR3hsZENCaGNuSWdQU0IwYUdsekxtdGxlVUZ5Y21GNUtDazdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQmhiVzkxYm5RZ1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCeVpYUjFjbTRnWVhKeVcwMWhkR2d1Wm14dmIzSW9UV0YwYUM1eVlXNWtiMjBvS1NBcUlHRnljaTVzWlc1bmRHZ3BYVHRjYmx4MFhIUnBaaUFvWVhKeUxteGxibWQwYUNBOVBUMGdNQ0I4ZkNBaFlXMXZkVzUwS1NCeVpYUjFjbTRnVzEwN1hHNWNkRngwWVhKeUlEMGdZWEp5TG5Oc2FXTmxLQ2s3WEc1Y2RGeDBjbVYwZFhKdUlFRnljbUY1TG1aeWIyMG9leUJzWlc1bmRHZzZJR0Z0YjNWdWRDQjlMQ0FvS1RvZ1N5QTlQaUJoY25JdWMzQnNhV05sS0UxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSUdGeWNpNXNaVzVuZEdncExDQXhLVnN3WFNrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dVMlZoY21Ob1pYTWdabTl5SUdFZ2MybHVaMnhsSUdsMFpXMGdkMmhsY21VZ2RHaGxJR2RwZG1WdUlHWjFibU4wYVc5dUlISmxkSFZ5Ym5NZ1lTQjBjblYwYUhrZ2RtRnNkV1V1SUZSb2FYTWdZbVZvWVhabGN5QnNhV3RsWEc1Y2RDQXFJRnRCY25KaGVTNW1hVzVrS0NsZEtHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwcGhkbUZUWTNKcGNIUXZVbVZtWlhKbGJtTmxMMGRzYjJKaGJGOVBZbXBsWTNSekwwRnljbUY1TDJacGJtUXBMbHh1WEhRZ0tpQThkMkZ5Ymo1QmJHd2dZMjlzYkdWamRHbHZibk1nZFhObFpDQnBiaUJFYVhOamIzSmtMbXB6SUdGeVpTQnRZWEJ3WldRZ2RYTnBibWNnZEdobGFYSWdZR2xrWUNCd2NtOXdaWEowZVN3Z1lXNWtJR2xtSUhsdmRTQjNZVzUwSUhSdklHWnBibVFnWW5rZ2FXUWdlVzkxWEc1Y2RDQXFJSE5vYjNWc1pDQjFjMlVnZEdobElHQm5aWFJnSUcxbGRHaHZaQzRnVTJWbFhHNWNkQ0FxSUZ0TlJFNWRLR2gwZEhCek9pOHZaR1YyWld4dmNHVnlMbTF2ZW1sc2JHRXViM0puTDJWdUxWVlRMMlJ2WTNNdlYyVmlMMHBoZG1GVFkzSnBjSFF2VW1WbVpYSmxibU5sTDBkc2IySmhiRjlQWW1wbFkzUnpMMDFoY0M5blpYUXBJR1p2Y2lCa1pYUmhhV3h6TGp3dmQyRnliajVjYmx4MElDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnVkdobElHWjFibU4wYVc5dUlIUnZJSFJsYzNRZ2QybDBhQ0FvYzJodmRXeGtJSEpsZEhWeWJpQmliMjlzWldGdUtWeHVYSFFnS2lCQWNHRnlZVzBnZXlwOUlGdDBhR2x6UVhKblhTQldZV3gxWlNCMGJ5QjFjMlVnWVhNZ1lIUm9hWE5nSUhkb1pXNGdaWGhsWTNWMGFXNW5JR1oxYm1OMGFXOXVYRzVjZENBcUlFQnlaWFIxY201eklIc3FmVnh1WEhRZ0tpQkFaWGhoYlhCc1pTQmpiMnhzWldOMGFXOXVMbVpwYm1Rb2RYTmxjaUE5UGlCMWMyVnlMblZ6WlhKdVlXMWxJRDA5UFNBblFtOWlKeWs3WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWm1sdVpDaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQldJSHdnZFc1a1pXWnBibVZrTzF4dVhIUndkV0pzYVdNZ1ptbHVaRHhVUGlobWJqb2dLSFJvYVhNNklGUXNJSFpoYkhWbE9pQldMQ0JyWlhrNklFc3NJR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUdKdmIyeGxZVzRzSUhSb2FYTkJjbWM2SUZRcE9pQldJSHdnZFc1a1pXWnBibVZrTzF4dVhIUndkV0pzYVdNZ1ptbHVaQ2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYy9PaUIxYm10dWIzZHVLVG9nVmlCOElIVnVaR1ZtYVc1bFpDQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQjBhR2x6UVhKbklDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ1ptNGdQU0JtYmk1aWFXNWtLSFJvYVhOQmNtY3BPMXh1WEhSY2RHWnZjaUFvWTI5dWMzUWdXMnRsZVN3Z2RtRnNYU0J2WmlCMGFHbHpLU0I3WEc1Y2RGeDBYSFJwWmlBb1ptNG9kbUZzTENCclpYa3NJSFJvYVhNcEtTQnlaWFIxY200Z2RtRnNPMXh1WEhSY2RIMWNibHgwWEhSeVpYUjFjbTRnZFc1a1pXWnBibVZrTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGTmxZWEpqYUdWeklHWnZjaUIwYUdVZ2EyVjVJRzltSUdFZ2MybHVaMnhsSUdsMFpXMGdkMmhsY21VZ2RHaGxJR2RwZG1WdUlHWjFibU4wYVc5dUlISmxkSFZ5Ym5NZ1lTQjBjblYwYUhrZ2RtRnNkV1V1SUZSb2FYTWdZbVZvWVhabGN5QnNhV3RsWEc1Y2RDQXFJRnRCY25KaGVTNW1hVzVrU1c1a1pYZ29LVjBvYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U21GMllWTmpjbWx3ZEM5U1pXWmxjbVZ1WTJVdlIyeHZZbUZzWDA5aWFtVmpkSE12UVhKeVlYa3ZabWx1WkVsdVpHVjRLU3hjYmx4MElDb2dZblYwSUhKbGRIVnlibk1nZEdobElHdGxlU0J5WVhSb1pYSWdkR2hoYmlCMGFHVWdjRzl6YVhScGIyNWhiQ0JwYm1SbGVDNWNibHgwSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1ptNGdWR2hsSUdaMWJtTjBhVzl1SUhSdklIUmxjM1FnZDJsMGFDQW9jMmh2ZFd4a0lISmxkSFZ5YmlCaWIyOXNaV0Z1S1Z4dVhIUWdLaUJBY0dGeVlXMGdleXA5SUZ0MGFHbHpRWEpuWFNCV1lXeDFaU0IwYnlCMWMyVWdZWE1nWUhSb2FYTmdJSGRvWlc0Z1pYaGxZM1YwYVc1bklHWjFibU4wYVc5dVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUhzcWZWeHVYSFFnS2lCQVpYaGhiWEJzWlNCamIyeHNaV04wYVc5dUxtWnBibVJMWlhrb2RYTmxjaUE5UGlCMWMyVnlMblZ6WlhKdVlXMWxJRDA5UFNBblFtOWlKeWs3WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWm1sdVpFdGxlU2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHBPaUJMSUh3Z2RXNWtaV1pwYm1Wa08xeHVYSFJ3ZFdKc2FXTWdabWx1WkV0bGVUeFVQaWhtYmpvZ0tIUm9hWE02SUZRc0lIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYzZJRlFwT2lCTElId2dkVzVrWldacGJtVmtPMXh1WEhSd2RXSnNhV01nWm1sdVpFdGxlU2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYy9PaUIxYm10dWIzZHVLVG9nU3lCOElIVnVaR1ZtYVc1bFpDQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQjBhR2x6UVhKbklDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ1ptNGdQU0JtYmk1aWFXNWtLSFJvYVhOQmNtY3BPMXh1WEhSY2RHWnZjaUFvWTI5dWMzUWdXMnRsZVN3Z2RtRnNYU0J2WmlCMGFHbHpLU0I3WEc1Y2RGeDBYSFJwWmlBb1ptNG9kbUZzTENCclpYa3NJSFJvYVhNcEtTQnlaWFIxY200Z2EyVjVPMXh1WEhSY2RIMWNibHgwWEhSeVpYUjFjbTRnZFc1a1pXWnBibVZrTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGSmxiVzkyWlhNZ2FYUmxiWE1nZEdoaGRDQnpZWFJwYzJaNUlIUm9aU0J3Y205MmFXUmxaQ0JtYVd4MFpYSWdablZ1WTNScGIyNHVYRzVjZENBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWnVJRVoxYm1OMGFXOXVJSFZ6WldRZ2RHOGdkR1Z6ZENBb2MyaHZkV3hrSUhKbGRIVnliaUJoSUdKdmIyeGxZVzRwWEc1Y2RDQXFJRUJ3WVhKaGJTQjdLbjBnVzNSb2FYTkJjbWRkSUZaaGJIVmxJSFJ2SUhWelpTQmhjeUJnZEdocGMyQWdkMmhsYmlCbGVHVmpkWFJwYm1jZ1puVnVZM1JwYjI1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTI1MWJXSmxjbjBnVkdobElHNTFiV0psY2lCdlppQnlaVzF2ZG1Wa0lHVnVkSEpwWlhOY2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCemQyVmxjQ2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHBPaUJ1ZFcxaVpYSTdYRzVjZEhCMVlteHBZeUJ6ZDJWbGNEeFVQaWhtYmpvZ0tIUm9hWE02SUZRc0lIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYzZJRlFwT2lCdWRXMWlaWEk3WEc1Y2RIQjFZbXhwWXlCemQyVmxjQ2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYy9PaUIxYm10dWIzZHVLVG9nYm5WdFltVnlJSHRjYmx4MFhIUnBaaUFvZEhsd1pXOW1JSFJvYVhOQmNtY2dJVDA5SUNkMWJtUmxabWx1WldRbktTQm1iaUE5SUdadUxtSnBibVFvZEdocGMwRnlaeWs3WEc1Y2RGeDBZMjl1YzNRZ2NISmxkbWx2ZFhOVGFYcGxJRDBnZEdocGN5NXphWHBsTzF4dVhIUmNkR1p2Y2lBb1kyOXVjM1FnVzJ0bGVTd2dkbUZzWFNCdlppQjBhR2x6S1NCN1hHNWNkRngwWEhScFppQW9abTRvZG1Gc0xDQnJaWGtzSUhSb2FYTXBLU0IwYUdsekxtUmxiR1YwWlNoclpYa3BPMXh1WEhSY2RIMWNibHgwWEhSeVpYUjFjbTRnY0hKbGRtbHZkWE5UYVhwbElDMGdkR2hwY3k1emFYcGxPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVsa1pXNTBhV05oYkNCMGIxeHVYSFFnS2lCYlFYSnlZWGt1Wm1sc2RHVnlLQ2xkS0doMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBwaGRtRlRZM0pwY0hRdlVtVm1aWEpsYm1ObEwwZHNiMkpoYkY5UFltcGxZM1J6TDBGeWNtRjVMMlpwYkhSbGNpa3NYRzVjZENBcUlHSjFkQ0J5WlhSMWNtNXpJR0VnUTI5c2JHVmpkR2x2YmlCcGJuTjBaV0ZrSUc5bUlHRnVJRUZ5Y21GNUxseHVYSFFnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWJpQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z2RHVnpkQ0IzYVhSb0lDaHphRzkxYkdRZ2NtVjBkWEp1SUdKdmIyeGxZVzRwWEc1Y2RDQXFJRUJ3WVhKaGJTQjdLbjBnVzNSb2FYTkJjbWRkSUZaaGJIVmxJSFJ2SUhWelpTQmhjeUJnZEdocGMyQWdkMmhsYmlCbGVHVmpkWFJwYm1jZ1puVnVZM1JwYjI1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTBOdmJHeGxZM1JwYjI1OVhHNWNkQ0FxSUVCbGVHRnRjR3hsSUdOdmJHeGxZM1JwYjI0dVptbHNkR1Z5S0hWelpYSWdQVDRnZFhObGNpNTFjMlZ5Ym1GdFpTQTlQVDBnSjBKdllpY3BPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJR1pwYkhSbGNpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQjBhR2x6TzF4dVhIUndkV0pzYVdNZ1ptbHNkR1Z5UEZRK0tHWnVPaUFvZEdocGN6b2dWQ3dnZG1Gc2RXVTZJRllzSUd0bGVUb2dTeXdnWTI5c2JHVmpkR2x2YmpvZ2RHaHBjeWtnUFQ0Z1ltOXZiR1ZoYml3Z2RHaHBjMEZ5WnpvZ1ZDazZJSFJvYVhNN1hHNWNkSEIxWW14cFl5Qm1hV3gwWlhJb1ptNDZJQ2gyWVd4MVpUb2dWaXdnYTJWNU9pQkxMQ0JqYjJ4c1pXTjBhVzl1T2lCMGFHbHpLU0E5UGlCaWIyOXNaV0Z1TENCMGFHbHpRWEpuUHpvZ2RXNXJibTkzYmlrNklIUm9hWE1nZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnZEdocGMwRnlaeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJR1p1SUQwZ1ptNHVZbWx1WkNoMGFHbHpRWEpuS1R0Y2JseDBYSFJqYjI1emRDQnlaWE4xYkhSeklEMGdibVYzSUhSb2FYTXVZMjl1YzNSeWRXTjBiM0piVTNsdFltOXNMbk53WldOcFpYTmRQRXNzSUZZK0tDa2dZWE1nZEdocGN6dGNibHgwWEhSbWIzSWdLR052Ym5OMElGdHJaWGtzSUhaaGJGMGdiMllnZEdocGN5a2dlMXh1WEhSY2RGeDBhV1lnS0dadUtIWmhiQ3dnYTJWNUxDQjBhR2x6S1NrZ2NtVnpkV3gwY3k1elpYUW9hMlY1TENCMllXd3BPMXh1WEhSY2RIMWNibHgwWEhSeVpYUjFjbTRnY21WemRXeDBjenRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCUVlYSjBhWFJwYjI1eklIUm9aU0JqYjJ4c1pXTjBhVzl1SUdsdWRHOGdkSGR2SUdOdmJHeGxZM1JwYjI1eklIZG9aWEpsSUhSb1pTQm1hWEp6ZENCamIyeHNaV04wYVc5dVhHNWNkQ0FxSUdOdmJuUmhhVzV6SUhSb1pTQnBkR1Z0Y3lCMGFHRjBJSEJoYzNObFpDQmhibVFnZEdobElITmxZMjl1WkNCamIyNTBZV2x1Y3lCMGFHVWdhWFJsYlhNZ2RHaGhkQ0JtWVdsc1pXUXVYRzVjZENBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWnVJRVoxYm1OMGFXOXVJSFZ6WldRZ2RHOGdkR1Z6ZENBb2MyaHZkV3hrSUhKbGRIVnliaUJoSUdKdmIyeGxZVzRwWEc1Y2RDQXFJRUJ3WVhKaGJTQjdLbjBnVzNSb2FYTkJjbWRkSUZaaGJIVmxJSFJ2SUhWelpTQmhjeUJnZEdocGMyQWdkMmhsYmlCbGVHVmpkWFJwYm1jZ1puVnVZM1JwYjI1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTBOdmJHeGxZM1JwYjI1YlhYMWNibHgwSUNvZ1FHVjRZVzF3YkdVZ1kyOXVjM1FnVzJKcFp5d2djMjFoYkd4ZElEMGdZMjlzYkdWamRHbHZiaTV3WVhKMGFYUnBiMjRvWjNWcGJHUWdQVDRnWjNWcGJHUXViV1Z0WW1WeVEyOTFiblFnUGlBeU5UQXBPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJSEJoY25ScGRHbHZiaWhtYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHBPaUJiZEdocGN5d2dkR2hwYzEwN1hHNWNkSEIxWW14cFl5QndZWEowYVhScGIyNDhWRDRvWm00NklDaDBhR2x6T2lCVUxDQjJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVMQ0IwYUdselFYSm5PaUJVS1RvZ1czUm9hWE1zSUhSb2FYTmRPMXh1WEhSd2RXSnNhV01nY0dGeWRHbDBhVzl1S0dadU9pQW9kbUZzZFdVNklGWXNJR3RsZVRvZ1N5d2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnWW05dmJHVmhiaXdnZEdocGMwRnlaejg2SUhWdWEyNXZkMjRwT2lCYmRHaHBjeXdnZEdocGMxMGdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdkR2hwYzBGeVp5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHWnVJRDBnWm00dVltbHVaQ2gwYUdselFYSm5LVHRjYmx4MFhIUXZMeUJVVDBSUE9pQmpiMjV6YVdSbGNpQnlaVzF2ZG1sdVp5QjBhR1VnUEVzc0lGWStJR1p5YjIwZ2RHaGxJR052Ym5OMGNuVmpkRzl5Y3lCaFpuUmxjaUJVVXlBekxqY3VNQ0JwY3lCeVpXeGxZWE5sWkN3Z1lYTWdhWFFnYVc1bVpYSnpJR2wwWEc1Y2RGeDBZMjl1YzNRZ2NtVnpkV3gwY3pvZ1czUm9hWE1zSUhSb2FYTmRJRDBnVzI1bGR5QjBhR2x6TG1OdmJuTjBjblZqZEc5eVcxTjViV0p2YkM1emNHVmphV1Z6WFR4TExDQldQaWdwSUdGeklIUm9hWE1zSUc1bGR5QjBhR2x6TG1OdmJuTjBjblZqZEc5eVcxTjViV0p2YkM1emNHVmphV1Z6WFR4TExDQldQaWdwSUdGeklIUm9hWE5kTzF4dVhIUmNkR1p2Y2lBb1kyOXVjM1FnVzJ0bGVTd2dkbUZzWFNCdlppQjBhR2x6S1NCN1hHNWNkRngwWEhScFppQW9abTRvZG1Gc0xDQnJaWGtzSUhSb2FYTXBLU0I3WEc1Y2RGeDBYSFJjZEhKbGMzVnNkSE5iTUYwdWMyVjBLR3RsZVN3Z2RtRnNLVHRjYmx4MFhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUmNkSEpsYzNWc2RITmJNVjB1YzJWMEtHdGxlU3dnZG1Gc0tUdGNibHgwWEhSY2RIMWNibHgwWEhSOVhHNWNkRngwY21WMGRYSnVJSEpsYzNWc2RITTdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVFdGd2N5QmxZV05vSUdsMFpXMGdhVzUwYnlCaElFTnZiR3hsWTNScGIyNHNJSFJvWlc0Z2FtOXBibk1nZEdobElISmxjM1ZzZEhNZ2FXNTBieUJoSUhOcGJtZHNaU0JEYjJ4c1pXTjBhVzl1TGlCSlpHVnVkR2xqWVd3Z2FXNGdZbVZvWVhacGIzSWdkRzljYmx4MElDb2dXMEZ5Y21GNUxtWnNZWFJOWVhBb0tWMG9hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTbUYyWVZOamNtbHdkQzlTWldabGNtVnVZMlV2UjJ4dlltRnNYMDlpYW1WamRITXZRWEp5WVhrdlpteGhkRTFoY0NrdVhHNWNkQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdadUlFWjFibU4wYVc5dUlIUm9ZWFFnY0hKdlpIVmpaWE1nWVNCdVpYY2dRMjlzYkdWamRHbHZibHh1WEhRZ0tpQkFjR0Z5WVcwZ2V5cDlJRnQwYUdselFYSm5YU0JXWVd4MVpTQjBieUIxYzJVZ1lYTWdZSFJvYVhOZ0lIZG9aVzRnWlhobFkzVjBhVzVuSUdaMWJtTjBhVzl1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHREYjJ4c1pXTjBhVzl1ZlZ4dVhIUWdLaUJBWlhoaGJYQnNaU0JqYjJ4c1pXTjBhVzl1TG1ac1lYUk5ZWEFvWjNWcGJHUWdQVDRnWjNWcGJHUXViV1Z0WW1WeWN5NWpZV05vWlNrN1hHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ1pteGhkRTFoY0R4VVBpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lFTnZiR3hsWTNScGIyNDhTeXdnVkQ0cE9pQkRiMnhzWldOMGFXOXVQRXNzSUZRK08xeHVYSFJ3ZFdKc2FXTWdabXhoZEUxaGNEeFVMQ0JVYUdselBpaG1iam9nS0hSb2FYTTZJRlJvYVhNc0lIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJRU52Ykd4bFkzUnBiMjQ4U3l3Z1ZENHNJSFJvYVhOQmNtYzZJRlJvYVhNcE9pQkRiMnhzWldOMGFXOXVQRXNzSUZRK08xeHVYSFJ3ZFdKc2FXTWdabXhoZEUxaGNEeFVQaWhtYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJRU52Ykd4bFkzUnBiMjQ4U3l3Z1ZENHNJSFJvYVhOQmNtYy9PaUIxYm10dWIzZHVLVG9nUTI5c2JHVmpkR2x2Ymp4TExDQlVQaUI3WEc1Y2RGeDBZMjl1YzNRZ1kyOXNiR1ZqZEdsdmJuTWdQU0IwYUdsekxtMWhjQ2htYml3Z2RHaHBjMEZ5WnlrN1hHNWNkRngwY21WMGRYSnVJQ2h1WlhjZ2RHaHBjeTVqYjI1emRISjFZM1J2Y2x0VGVXMWliMnd1YzNCbFkybGxjMTA4U3l3Z1ZENG9LU0JoY3lCRGIyeHNaV04wYVc5dVBFc3NJRlErS1M1amIyNWpZWFFvTGk0dVkyOXNiR1ZqZEdsdmJuTXBPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUUxaGNITWdaV0ZqYUNCcGRHVnRJSFJ2SUdGdWIzUm9aWElnZG1Gc2RXVWdhVzUwYnlCaGJpQmhjbkpoZVM0Z1NXUmxiblJwWTJGc0lHbHVJR0psYUdGMmFXOXlJSFJ2WEc1Y2RDQXFJRnRCY25KaGVTNXRZWEFvS1Ywb2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlNtRjJZVk5qY21sd2RDOVNaV1psY21WdVkyVXZSMnh2WW1Gc1gwOWlhbVZqZEhNdlFYSnlZWGt2YldGd0tTNWNibHgwSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1ptNGdSblZ1WTNScGIyNGdkR2hoZENCd2NtOWtkV05sY3lCaGJpQmxiR1Z0Wlc1MElHOW1JSFJvWlNCdVpYY2dZWEp5WVhrc0lIUmhhMmx1WnlCMGFISmxaU0JoY21kMWJXVnVkSE5jYmx4MElDb2dRSEJoY21GdElIc3FmU0JiZEdocGMwRnlaMTBnVm1Gc2RXVWdkRzhnZFhObElHRnpJR0IwYUdsellDQjNhR1Z1SUdWNFpXTjFkR2x1WnlCbWRXNWpkR2x2Ymx4dVhIUWdLaUJBY21WMGRYSnVjeUI3UVhKeVlYbDlYRzVjZENBcUlFQmxlR0Z0Y0d4bElHTnZiR3hsWTNScGIyNHViV0Z3S0hWelpYSWdQVDRnZFhObGNpNTBZV2NwTzF4dVhIUWdLaTljYmx4MGNIVmliR2xqSUcxaGNEeFVQaWhtYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJRlFwT2lCVVcxMDdYRzVjZEhCMVlteHBZeUJ0WVhBOFZHaHBjeXdnVkQ0b1ptNDZJQ2gwYUdsek9pQlVhR2x6TENCMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQlVMQ0IwYUdselFYSm5PaUJVYUdsektUb2dWRnRkTzF4dVhIUndkV0pzYVdNZ2JXRndQRlErS0dadU9pQW9kbUZzZFdVNklGWXNJR3RsZVRvZ1N5d2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnVkN3Z2RHaHBjMEZ5Wno4NklIVnVhMjV2ZDI0cE9pQlVXMTBnZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnZEdocGMwRnlaeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJR1p1SUQwZ1ptNHVZbWx1WkNoMGFHbHpRWEpuS1R0Y2JseDBYSFJqYjI1emRDQnBkR1Z5SUQwZ2RHaHBjeTVsYm5SeWFXVnpLQ2s3WEc1Y2RGeDBjbVYwZFhKdUlFRnljbUY1TG1aeWIyMG9leUJzWlc1bmRHZzZJSFJvYVhNdWMybDZaU0I5TENBb0tUb2dWQ0E5UGlCN1hHNWNkRngwWEhSamIyNXpkQ0JiYTJWNUxDQjJZV3gxWlYwZ1BTQnBkR1Z5TG01bGVIUW9LUzUyWVd4MVpUdGNibHgwWEhSY2RISmxkSFZ5YmlCbWJpaDJZV3gxWlN3Z2EyVjVMQ0IwYUdsektUdGNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJOWVhCeklHVmhZMmdnYVhSbGJTQjBieUJoYm05MGFHVnlJSFpoYkhWbElHbHVkRzhnWVNCamIyeHNaV04wYVc5dUxpQkpaR1Z1ZEdsallXd2dhVzRnWW1Wb1lYWnBiM0lnZEc5Y2JseDBJQ29nVzBGeWNtRjVMbTFoY0NncFhTaG9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUtZWFpoVTJOeWFYQjBMMUpsWm1WeVpXNWpaUzlIYkc5aVlXeGZUMkpxWldOMGN5OUJjbkpoZVM5dFlYQXBMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQm1iaUJHZFc1amRHbHZiaUIwYUdGMElIQnliMlIxWTJWeklHRnVJR1ZzWlcxbGJuUWdiMllnZEdobElHNWxkeUJqYjJ4c1pXTjBhVzl1TENCMFlXdHBibWNnZEdoeVpXVWdZWEpuZFcxbGJuUnpYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdXM1JvYVhOQmNtZGRJRlpoYkhWbElIUnZJSFZ6WlNCaGN5QmdkR2hwYzJBZ2QyaGxiaUJsZUdWamRYUnBibWNnWm5WdVkzUnBiMjVjYmx4MElDb2dRSEpsZEhWeWJuTWdlME52Ykd4bFkzUnBiMjU5WEc1Y2RDQXFJRUJsZUdGdGNHeGxJR052Ykd4bFkzUnBiMjR1YldGd1ZtRnNkV1Z6S0hWelpYSWdQVDRnZFhObGNpNTBZV2NwTzF4dVhIUWdLaTljYmx4MGNIVmliR2xqSUcxaGNGWmhiSFZsY3p4VVBpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lGUXBPaUJEYjJ4c1pXTjBhVzl1UEVzc0lGUStPMXh1WEhSd2RXSnNhV01nYldGd1ZtRnNkV1Z6UEZSb2FYTXNJRlErS0dadU9pQW9kR2hwY3pvZ1ZHaHBjeXdnZG1Gc2RXVTZJRllzSUd0bGVUb2dTeXdnWTI5c2JHVmpkR2x2YmpvZ2RHaHBjeWtnUFQ0Z1ZDd2dkR2hwYzBGeVp6b2dWR2hwY3lrNklFTnZiR3hsWTNScGIyNDhTeXdnVkQ0N1hHNWNkSEIxWW14cFl5QnRZWEJXWVd4MVpYTThWRDRvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJVTENCMGFHbHpRWEpuUHpvZ2RXNXJibTkzYmlrNklFTnZiR3hsWTNScGIyNDhTeXdnVkQ0Z2UxeHVYSFJjZEdsbUlDaDBlWEJsYjJZZ2RHaHBjMEZ5WnlBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUdadUlEMGdabTR1WW1sdVpDaDBhR2x6UVhKbktUdGNibHgwWEhSamIyNXpkQ0JqYjJ4c0lEMGdibVYzSUhSb2FYTXVZMjl1YzNSeWRXTjBiM0piVTNsdFltOXNMbk53WldOcFpYTmRQRXNzSUZRK0tDa2dZWE1nUTI5c2JHVmpkR2x2Ymp4TExDQlVQanRjYmx4MFhIUm1iM0lnS0dOdmJuTjBJRnRyWlhrc0lIWmhiRjBnYjJZZ2RHaHBjeWtnWTI5c2JDNXpaWFFvYTJWNUxDQm1iaWgyWVd3c0lHdGxlU3dnZEdocGN5a3BPMXh1WEhSY2RISmxkSFZ5YmlCamIyeHNPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVOb1pXTnJjeUJwWmlCMGFHVnlaU0JsZUdsemRITWdZVzRnYVhSbGJTQjBhR0YwSUhCaGMzTmxjeUJoSUhSbGMzUXVJRWxrWlc1MGFXTmhiQ0JwYmlCaVpXaGhkbWx2Y2lCMGIxeHVYSFFnS2lCYlFYSnlZWGt1YzI5dFpTZ3BYU2hvZEhSd2N6b3ZMMlJsZG1Wc2IzQmxjaTV0YjNwcGJHeGhMbTl5Wnk5bGJpMVZVeTlrYjJOekwxZGxZaTlLWVhaaFUyTnlhWEIwTDFKbFptVnlaVzVqWlM5SGJHOWlZV3hmVDJKcVpXTjBjeTlCY25KaGVTOXpiMjFsS1M1Y2JseDBJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm00Z1JuVnVZM1JwYjI0Z2RYTmxaQ0IwYnlCMFpYTjBJQ2h6YUc5MWJHUWdjbVYwZFhKdUlHRWdZbTl2YkdWaGJpbGNibHgwSUNvZ1FIQmhjbUZ0SUhzcWZTQmJkR2hwYzBGeVoxMGdWbUZzZFdVZ2RHOGdkWE5sSUdGeklHQjBhR2x6WUNCM2FHVnVJR1Y0WldOMWRHbHVaeUJtZFc1amRHbHZibHh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMWNibHgwSUNvZ1FHVjRZVzF3YkdVZ1kyOXNiR1ZqZEdsdmJpNXpiMjFsS0hWelpYSWdQVDRnZFhObGNpNWthWE5qY21sdGFXNWhkRzl5SUQwOVBTQW5NREF3TUNjcE8xeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklITnZiV1VvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVLVG9nWW05dmJHVmhianRjYmx4MGNIVmliR2xqSUhOdmJXVThWRDRvWm00NklDaDBhR2x6T2lCVUxDQjJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVMQ0IwYUdselFYSm5PaUJVS1RvZ1ltOXZiR1ZoYmp0Y2JseDBjSFZpYkdsaklITnZiV1VvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVMQ0IwYUdselFYSm5Qem9nZFc1cmJtOTNiaWs2SUdKdmIyeGxZVzRnZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnZEdocGMwRnlaeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJR1p1SUQwZ1ptNHVZbWx1WkNoMGFHbHpRWEpuS1R0Y2JseDBYSFJtYjNJZ0tHTnZibk4wSUZ0clpYa3NJSFpoYkYwZ2IyWWdkR2hwY3lrZ2UxeHVYSFJjZEZ4MGFXWWdLR1p1S0haaGJDd2dhMlY1TENCMGFHbHpLU2tnY21WMGRYSnVJSFJ5ZFdVN1hHNWNkRngwZlZ4dVhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkRhR1ZqYTNNZ2FXWWdZV3hzSUdsMFpXMXpJSEJoYzNObGN5QmhJSFJsYzNRdUlFbGtaVzUwYVdOaGJDQnBiaUJpWldoaGRtbHZjaUIwYjF4dVhIUWdLaUJiUVhKeVlYa3VaWFpsY25rb0tWMG9hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTbUYyWVZOamNtbHdkQzlTWldabGNtVnVZMlV2UjJ4dlltRnNYMDlpYW1WamRITXZRWEp5WVhrdlpYWmxjbmtwTGx4dVhIUWdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtYmlCR2RXNWpkR2x2YmlCMWMyVmtJSFJ2SUhSbGMzUWdLSE5vYjNWc1pDQnlaWFIxY200Z1lTQmliMjlzWldGdUtWeHVYSFFnS2lCQWNHRnlZVzBnZXlwOUlGdDBhR2x6UVhKblhTQldZV3gxWlNCMGJ5QjFjMlVnWVhNZ1lIUm9hWE5nSUhkb1pXNGdaWGhsWTNWMGFXNW5JR1oxYm1OMGFXOXVYRzVjZENBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZWeHVYSFFnS2lCQVpYaGhiWEJzWlNCamIyeHNaV04wYVc5dUxtVjJaWEo1S0hWelpYSWdQVDRnSVhWelpYSXVZbTkwS1R0Y2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCbGRtVnllU2htYmpvZ0tIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHBPaUJpYjI5c1pXRnVPMXh1WEhSd2RXSnNhV01nWlhabGNuazhWRDRvWm00NklDaDBhR2x6T2lCVUxDQjJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVMQ0IwYUdselFYSm5PaUJVS1RvZ1ltOXZiR1ZoYmp0Y2JseDBjSFZpYkdsaklHVjJaWEo1S0dadU9pQW9kbUZzZFdVNklGWXNJR3RsZVRvZ1N5d2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnWW05dmJHVmhiaXdnZEdocGMwRnlaejg2SUhWdWEyNXZkMjRwT2lCaWIyOXNaV0Z1SUh0Y2JseDBYSFJwWmlBb2RIbHdaVzltSUhSb2FYTkJjbWNnSVQwOUlDZDFibVJsWm1sdVpXUW5LU0JtYmlBOUlHWnVMbUpwYm1Rb2RHaHBjMEZ5WnlrN1hHNWNkRngwWm05eUlDaGpiMjV6ZENCYmEyVjVMQ0IyWVd4ZElHOW1JSFJvYVhNcElIdGNibHgwWEhSY2RHbG1JQ2doWm00b2RtRnNMQ0JyWlhrc0lIUm9hWE1wS1NCeVpYUjFjbTRnWm1Gc2MyVTdYRzVjZEZ4MGZWeHVYSFJjZEhKbGRIVnliaUIwY25WbE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRUZ3Y0d4cFpYTWdZU0JtZFc1amRHbHZiaUIwYnlCd2NtOWtkV05sSUdFZ2MybHVaMnhsSUhaaGJIVmxMaUJKWkdWdWRHbGpZV3dnYVc0Z1ltVm9ZWFpwYjNJZ2RHOWNibHgwSUNvZ1cwRnljbUY1TG5KbFpIVmpaU2dwWFNob2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTFWVXk5a2IyTnpMMWRsWWk5S1lYWmhVMk55YVhCMEwxSmxabVZ5Wlc1alpTOUhiRzlpWVd4ZlQySnFaV04wY3k5QmNuSmhlUzl5WldSMVkyVXBMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQm1iaUJHZFc1amRHbHZiaUIxYzJWa0lIUnZJSEpsWkhWalpTd2dkR0ZyYVc1bklHWnZkWElnWVhKbmRXMWxiblJ6T3lCZ1lXTmpkVzExYkdGMGIzSmdMQ0JnWTNWeWNtVnVkRlpoYkhWbFlDd2dZR04xY25KbGJuUkxaWGxnTEZ4dVhIUWdLaUJoYm1RZ1lHTnZiR3hsWTNScGIyNWdYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdXMmx1YVhScFlXeFdZV3gxWlYwZ1UzUmhjblJwYm1jZ2RtRnNkV1VnWm05eUlIUm9aU0JoWTJOMWJYVnNZWFJ2Y2x4dVhIUWdLaUJBY21WMGRYSnVjeUI3S24xY2JseDBJQ29nUUdWNFlXMXdiR1VnWTI5c2JHVmpkR2x2Ymk1eVpXUjFZMlVvS0dGall5d2daM1ZwYkdRcElEMCtJR0ZqWXlBcklHZDFhV3hrTG0xbGJXSmxja052ZFc1MExDQXdLVHRjYmx4MElDb3ZYRzVjZEhCMVlteHBZeUJ5WldSMVkyVThWRDRvWm00NklDaGhZMk4xYlhWc1lYUnZjam9nVkN3Z2RtRnNkV1U2SUZZc0lHdGxlVG9nU3l3Z1kyOXNiR1ZqZEdsdmJqb2dkR2hwY3lrZ1BUNGdWQ3dnYVc1cGRHbGhiRlpoYkhWbFB6b2dWQ2s2SUZRZ2UxeHVYSFJjZEd4bGRDQmhZMk4xYlhWc1lYUnZjaUU2SUZRN1hHNWNibHgwWEhScFppQW9kSGx3Wlc5bUlHbHVhWFJwWVd4V1lXeDFaU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJSHRjYmx4MFhIUmNkR0ZqWTNWdGRXeGhkRzl5SUQwZ2FXNXBkR2xoYkZaaGJIVmxPMXh1WEhSY2RGeDBabTl5SUNoamIyNXpkQ0JiYTJWNUxDQjJZV3hkSUc5bUlIUm9hWE1wSUdGalkzVnRkV3hoZEc5eUlEMGdabTRvWVdOamRXMTFiR0YwYjNJc0lIWmhiQ3dnYTJWNUxDQjBhR2x6S1R0Y2JseDBYSFJjZEhKbGRIVnliaUJoWTJOMWJYVnNZWFJ2Y2p0Y2JseDBYSFI5WEc1Y2RGeDBiR1YwSUdacGNuTjBJRDBnZEhKMVpUdGNibHgwWEhSbWIzSWdLR052Ym5OMElGdHJaWGtzSUhaaGJGMGdiMllnZEdocGN5a2dlMXh1WEhSY2RGeDBhV1lnS0dacGNuTjBLU0I3WEc1Y2RGeDBYSFJjZEdGalkzVnRkV3hoZEc5eUlEMGdkbUZzSUdGeklIVnVhMjV2ZDI0Z1lYTWdWRHRjYmx4MFhIUmNkRngwWm1seWMzUWdQU0JtWVd4elpUdGNibHgwWEhSY2RGeDBZMjl1ZEdsdWRXVTdYRzVjZEZ4MFhIUjlYRzVjZEZ4MFhIUmhZMk4xYlhWc1lYUnZjaUE5SUdadUtHRmpZM1Z0ZFd4aGRHOXlMQ0IyWVd3c0lHdGxlU3dnZEdocGN5azdYRzVjZEZ4MGZWeHVYRzVjZEZ4MEx5OGdUbThnYVhSbGJYTWdhWFJsY21GMFpXUXVYRzVjZEZ4MGFXWWdLR1pwY25OMEtTQjdYRzVjZEZ4MFhIUjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2RTWldSMVkyVWdiMllnWlcxd2RIa2dZMjlzYkdWamRHbHZiaUIzYVhSb0lHNXZJR2x1YVhScFlXd2dkbUZzZFdVbktUdGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnWVdOamRXMTFiR0YwYjNJN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1JsYm5ScFkyRnNJSFJ2WEc1Y2RDQXFJRnROWVhBdVptOXlSV0ZqYUNncFhTaG9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUtZWFpoVTJOeWFYQjBMMUpsWm1WeVpXNWpaUzlIYkc5aVlXeGZUMkpxWldOMGN5OU5ZWEF2Wm05eVJXRmphQ2tzWEc1Y2RDQXFJR0oxZENCeVpYUjFjbTV6SUhSb1pTQmpiMnhzWldOMGFXOXVJR2x1YzNSbFlXUWdiMllnZFc1a1pXWnBibVZrTGx4dVhIUWdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtYmlCR2RXNWpkR2x2YmlCMGJ5QmxlR1ZqZFhSbElHWnZjaUJsWVdOb0lHVnNaVzFsYm5SY2JseDBJQ29nUUhCaGNtRnRJSHNxZlNCYmRHaHBjMEZ5WjEwZ1ZtRnNkV1VnZEc4Z2RYTmxJR0Z6SUdCMGFHbHpZQ0IzYUdWdUlHVjRaV04xZEdsdVp5Qm1kVzVqZEdsdmJseHVYSFFnS2lCQWNtVjBkWEp1Y3lCN1EyOXNiR1ZqZEdsdmJuMWNibHgwSUNvZ1FHVjRZVzF3YkdWY2JseDBJQ29nWTI5c2JHVmpkR2x2Ymx4dVhIUWdLaUFnTG1WaFkyZ29kWE5sY2lBOVBpQmpiMjV6YjJ4bExteHZaeWgxYzJWeUxuVnpaWEp1WVcxbEtTbGNibHgwSUNvZ0lDNW1hV3gwWlhJb2RYTmxjaUE5UGlCMWMyVnlMbUp2ZENsY2JseDBJQ29nSUM1bFlXTm9LSFZ6WlhJZ1BUNGdZMjl1YzI5c1pTNXNiMmNvZFhObGNpNTFjMlZ5Ym1GdFpTa3BPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJR1ZoWTJnb1ptNDZJQ2gyWVd4MVpUb2dWaXdnYTJWNU9pQkxMQ0JqYjJ4c1pXTjBhVzl1T2lCMGFHbHpLU0E5UGlCMmIybGtLVG9nZEdocGN6dGNibHgwY0hWaWJHbGpJR1ZoWTJnOFZENG9abTQ2SUNoMGFHbHpPaUJVTENCMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQjJiMmxrTENCMGFHbHpRWEpuT2lCVUtUb2dkR2hwY3p0Y2JseDBjSFZpYkdsaklHVmhZMmdvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUIyYjJsa0xDQjBhR2x6UVhKblB6b2dkVzVyYm05M2JpazZJSFJvYVhNZ2UxeHVYSFJjZEhSb2FYTXVabTl5UldGamFDaG1iaUJoY3lBb2RtRnNkV1U2SUZZc0lHdGxlVG9nU3l3Z2JXRndPaUJOWVhBOFN5d2dWajRwSUQwK0lIWnZhV1FzSUhSb2FYTkJjbWNwTzF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGSjFibk1nWVNCbWRXNWpkR2x2YmlCdmJpQjBhR1VnWTI5c2JHVmpkR2x2YmlCaGJtUWdjbVYwZFhKdWN5QjBhR1VnWTI5c2JHVmpkR2x2Ymk1Y2JseDBJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm00Z1JuVnVZM1JwYjI0Z2RHOGdaWGhsWTNWMFpWeHVYSFFnS2lCQWNHRnlZVzBnZXlwOUlGdDBhR2x6UVhKblhTQldZV3gxWlNCMGJ5QjFjMlVnWVhNZ1lIUm9hWE5nSUhkb1pXNGdaWGhsWTNWMGFXNW5JR1oxYm1OMGFXOXVYRzVjZENBcUlFQnlaWFIxY201eklIdERiMnhzWldOMGFXOXVmVnh1WEhRZ0tpQkFaWGhoYlhCc1pWeHVYSFFnS2lCamIyeHNaV04wYVc5dVhHNWNkQ0FxSUNBdWRHRndLR052Ykd3Z1BUNGdZMjl1YzI5c1pTNXNiMmNvWTI5c2JDNXphWHBsS1NsY2JseDBJQ29nSUM1bWFXeDBaWElvZFhObGNpQTlQaUIxYzJWeUxtSnZkQ2xjYmx4MElDb2dJQzUwWVhBb1kyOXNiQ0E5UGlCamIyNXpiMnhsTG14dlp5aGpiMnhzTG5OcGVtVXBLVnh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJSFJoY0NobWJqb2dLR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUhadmFXUXBPaUIwYUdsek8xeHVYSFJ3ZFdKc2FXTWdkR0Z3UEZRK0tHWnVPaUFvZEdocGN6b2dWQ3dnWTI5c2JHVmpkR2x2YmpvZ2RHaHBjeWtnUFQ0Z2RtOXBaQ3dnZEdocGMwRnlaem9nVkNrNklIUm9hWE03WEc1Y2RIQjFZbXhwWXlCMFlYQW9abTQ2SUNoamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQjJiMmxrTENCMGFHbHpRWEpuUHpvZ2RXNXJibTkzYmlrNklIUm9hWE1nZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnZEdocGMwRnlaeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJR1p1SUQwZ1ptNHVZbWx1WkNoMGFHbHpRWEpuS1R0Y2JseDBYSFJtYmloMGFHbHpLVHRjYmx4MFhIUnlaWFIxY200Z2RHaHBjenRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCRGNtVmhkR1Z6SUdGdUlHbGtaVzUwYVdOaGJDQnphR0ZzYkc5M0lHTnZjSGtnYjJZZ2RHaHBjeUJqYjJ4c1pXTjBhVzl1TGx4dVhIUWdLaUJBY21WMGRYSnVjeUI3UTI5c2JHVmpkR2x2Ym4xY2JseDBJQ29nUUdWNFlXMXdiR1VnWTI5dWMzUWdibVYzUTI5c2JDQTlJSE52YldWRGIyeHNMbU5zYjI1bEtDazdYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdZMnh2Ym1Vb0tUb2dkR2hwY3lCN1hHNWNkRngwY21WMGRYSnVJRzVsZHlCMGFHbHpMbU52Ym5OMGNuVmpkRzl5VzFONWJXSnZiQzV6Y0dWamFXVnpYU2gwYUdsektTQmhjeUIwYUdsek8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU52YldKcGJtVnpJSFJvYVhNZ1kyOXNiR1ZqZEdsdmJpQjNhWFJvSUc5MGFHVnljeUJwYm5SdklHRWdibVYzSUdOdmJHeGxZM1JwYjI0dUlFNXZibVVnYjJZZ2RHaGxJSE52ZFhKalpTQmpiMnhzWldOMGFXOXVjeUJoY21VZ2JXOWthV1pwWldRdVhHNWNkQ0FxSUVCd1lYSmhiU0I3TGk0dVEyOXNiR1ZqZEdsdmJuMGdZMjlzYkdWamRHbHZibk1nUTI5c2JHVmpkR2x2Ym5NZ2RHOGdiV1Z5WjJWY2JseDBJQ29nUUhKbGRIVnlibk1nZTBOdmJHeGxZM1JwYjI1OVhHNWNkQ0FxSUVCbGVHRnRjR3hsSUdOdmJuTjBJRzVsZDBOdmJHd2dQU0J6YjIxbFEyOXNiQzVqYjI1allYUW9jMjl0WlU5MGFHVnlRMjlzYkN3Z1lXNXZkR2hsY2tOdmJHd3NJRzlvUW05NVFVTnZiR3dwTzF4dVhIUWdLaTljYmx4MGNIVmliR2xqSUdOdmJtTmhkQ2d1TGk1amIyeHNaV04wYVc5dWN6b2dRMjlzYkdWamRHbHZianhMTENCV1BsdGRLVG9nZEdocGN5QjdYRzVjZEZ4MFkyOXVjM1FnYm1WM1EyOXNiQ0E5SUhSb2FYTXVZMnh2Ym1Vb0tUdGNibHgwWEhSbWIzSWdLR052Ym5OMElHTnZiR3dnYjJZZ1kyOXNiR1ZqZEdsdmJuTXBJSHRjYmx4MFhIUmNkR1p2Y2lBb1kyOXVjM1FnVzJ0bGVTd2dkbUZzWFNCdlppQmpiMnhzS1NCdVpYZERiMnhzTG5ObGRDaHJaWGtzSUhaaGJDazdYRzVjZEZ4MGZWeHVYSFJjZEhKbGRIVnliaUJ1WlhkRGIyeHNPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVOb1pXTnJjeUJwWmlCMGFHbHpJR052Ykd4bFkzUnBiMjRnYzJoaGNtVnpJR2xrWlc1MGFXTmhiQ0JwZEdWdGN5QjNhWFJvSUdGdWIzUm9aWEl1WEc1Y2RDQXFJRlJvYVhNZ2FYTWdaR2xtWm1WeVpXNTBJSFJ2SUdOb1pXTnJhVzVuSUdadmNpQmxjWFZoYkdsMGVTQjFjMmx1WnlCbGNYVmhiQzF6YVdkdWN5d2dZbVZqWVhWelpWeHVYSFFnS2lCMGFHVWdZMjlzYkdWamRHbHZibk1nYldGNUlHSmxJR1JwWm1abGNtVnVkQ0J2WW1wbFkzUnpMQ0JpZFhRZ1kyOXVkR0ZwYmlCMGFHVWdjMkZ0WlNCa1lYUmhMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwTnZiR3hsWTNScGIyNTlJR052Ykd4bFkzUnBiMjRnUTI5c2JHVmpkR2x2YmlCMGJ5QmpiMjF3WVhKbElIZHBkR2hjYmx4MElDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRmRvWlhSb1pYSWdkR2hsSUdOdmJHeGxZM1JwYjI1eklHaGhkbVVnYVdSbGJuUnBZMkZzSUdOdmJuUmxiblJ6WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWlhGMVlXeHpLR052Ykd4bFkzUnBiMjQ2SUVOdmJHeGxZM1JwYjI0OFN5d2dWajRwT2lCaWIyOXNaV0Z1SUh0Y2JseDBYSFJwWmlBb0lXTnZiR3hsWTNScGIyNHBJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYSFJwWmlBb2RHaHBjeUE5UFQwZ1kyOXNiR1ZqZEdsdmJpa2djbVYwZFhKdUlIUnlkV1U3WEc1Y2RGeDBhV1lnS0hSb2FYTXVjMmw2WlNBaFBUMGdZMjlzYkdWamRHbHZiaTV6YVhwbEtTQnlaWFIxY200Z1ptRnNjMlU3WEc1Y2RGeDBabTl5SUNoamIyNXpkQ0JiYTJWNUxDQjJZV3gxWlYwZ2IyWWdkR2hwY3lrZ2UxeHVYSFJjZEZ4MGFXWWdLQ0ZqYjJ4c1pXTjBhVzl1TG1oaGN5aHJaWGtwSUh4OElIWmhiSFZsSUNFOVBTQmpiMnhzWldOMGFXOXVMbWRsZENoclpYa3BLU0I3WEc1Y2RGeDBYSFJjZEhKbGRIVnliaUJtWVd4elpUdGNibHgwWEhSY2RIMWNibHgwWEhSOVhHNWNkRngwY21WMGRYSnVJSFJ5ZFdVN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dWR2hsSUhOdmNuUWdiV1YwYUc5a0lITnZjblJ6SUhSb1pTQnBkR1Z0Y3lCdlppQmhJR052Ykd4bFkzUnBiMjRnYVc0Z2NHeGhZMlVnWVc1a0lISmxkSFZ5Ym5NZ2FYUXVYRzVjZENBcUlGUm9aU0J6YjNKMElHbHpJRzV2ZENCdVpXTmxjM05oY21sc2VTQnpkR0ZpYkdVZ2FXNGdUbTlrWlNBeE1DQnZjaUJ2YkdSbGNpNWNibHgwSUNvZ1ZHaGxJR1JsWm1GMWJIUWdjMjl5ZENCdmNtUmxjaUJwY3lCaFkyTnZjbVJwYm1jZ2RHOGdjM1J5YVc1bklGVnVhV052WkdVZ1kyOWtaU0J3YjJsdWRITXVYRzVjZENBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlGdGpiMjF3WVhKbFJuVnVZM1JwYjI1ZElGTndaV05wWm1sbGN5QmhJR1oxYm1OMGFXOXVJSFJvWVhRZ1pHVm1hVzVsY3lCMGFHVWdjMjl5ZENCdmNtUmxjaTVjYmx4MElDb2dTV1lnYjIxcGRIUmxaQ3dnZEdobElHTnZiR3hsWTNScGIyNGdhWE1nYzI5eWRHVmtJR0ZqWTI5eVpHbHVaeUIwYnlCbFlXTm9JR05vWVhKaFkzUmxjaWR6SUZWdWFXTnZaR1VnWTI5a1pTQndiMmx1ZENCMllXeDFaU3hjYmx4MElDb2dZV05qYjNKa2FXNW5JSFJ2SUhSb1pTQnpkSEpwYm1jZ1kyOXVkbVZ5YzJsdmJpQnZaaUJsWVdOb0lHVnNaVzFsYm5RdVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0RGIyeHNaV04wYVc5dWZWeHVYSFFnS2lCQVpYaGhiWEJzWlNCamIyeHNaV04wYVc5dUxuTnZjblFvS0hWelpYSkJMQ0IxYzJWeVFpa2dQVDRnZFhObGNrRXVZM0psWVhSbFpGUnBiV1Z6ZEdGdGNDQXRJSFZ6WlhKQ0xtTnlaV0YwWldSVWFXMWxjM1JoYlhBcE8xeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklITnZjblFvWTI5dGNHRnlaVVoxYm1OMGFXOXVPaUFvWm1seWMzUldZV3gxWlRvZ1Zpd2djMlZqYjI1a1ZtRnNkV1U2SUZZc0lHWnBjbk4wUzJWNU9pQkxMQ0J6WldOdmJtUkxaWGs2SUVzcElEMCtJRzUxYldKbGNpQTlJQ2g0TENCNUtUb2diblZ0WW1WeUlEMCtJRTUxYldKbGNpaDRJRDRnZVNrZ2ZId2dUblZ0WW1WeUtIZ2dQVDA5SUhrcElDMGdNU2s2SUhSb2FYTWdlMXh1WEhSY2RHTnZibk4wSUdWdWRISnBaWE1nUFNCYkxpNHVkR2hwY3k1bGJuUnlhV1Z6S0NsZE8xeHVYSFJjZEdWdWRISnBaWE11YzI5eWRDZ29ZU3dnWWlrNklHNTFiV0psY2lBOVBpQmpiMjF3WVhKbFJuVnVZM1JwYjI0b1lWc3hYU3dnWWxzeFhTd2dZVnN3WFN3Z1lsc3dYU2twTzF4dVhHNWNkRngwTHk4Z1VHVnlabTl5YlNCamJHVmhiaTExY0Z4dVhIUmNkSE4xY0dWeUxtTnNaV0Z5S0NrN1hHNWNkRngwZEdocGN5NWZZWEp5WVhrZ1BTQnVkV3hzTzF4dVhIUmNkSFJvYVhNdVgydGxlVUZ5Y21GNUlEMGdiblZzYkR0Y2JseHVYSFJjZEM4dklGTmxkQ0IwYUdVZ2JtVjNJR1Z1ZEhKcFpYTmNibHgwWEhSbWIzSWdLR052Ym5OMElGdHJMQ0IyWFNCdlppQmxiblJ5YVdWektTQjdYRzVjZEZ4MFhIUnpkWEJsY2k1elpYUW9heXdnZGlrN1hHNWNkRngwZlZ4dVhIUmNkSEpsZEhWeWJpQjBhR2x6TzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGUm9aU0JwYm5SbGNuTmxZM1FnYldWMGFHOWtJSEpsZEhWeWJuTWdZU0J1WlhjZ2MzUnlkV04wZFhKbElHTnZiblJoYVc1cGJtY2dhWFJsYlhNZ2QyaGxjbVVnZEdobElHdGxlWE1nWVhKbElIQnlaWE5sYm5RZ2FXNGdZbTkwYUNCdmNtbG5hVzVoYkNCemRISjFZM1IxY21WekxseHVYSFFnS2lCQWNHRnlZVzBnZTBOdmJHeGxZM1JwYjI1OUlHOTBhR1Z5SUZSb1pTQnZkR2hsY2lCRGIyeHNaV04wYVc5dUlIUnZJR1pwYkhSbGNpQmhaMkZwYm5OMFhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0RGIyeHNaV04wYVc5dWZWeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklHbHVkR1Z5YzJWamRDaHZkR2hsY2pvZ1EyOXNiR1ZqZEdsdmJqeExMQ0JXUGlrNklFTnZiR3hsWTNScGIyNDhTeXdnVmo0Z2UxeHVYSFJjZEhKbGRIVnliaUJ2ZEdobGNpNW1hV3gwWlhJb0tGOHNJR3NwSUQwK0lIUm9hWE11YUdGektHc3BLVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCVWFHVWdaR2xtWm1WeVpXNWpaU0J0WlhSb2IyUWdjbVYwZFhKdWN5QmhJRzVsZHlCemRISjFZM1IxY21VZ1kyOXVkR0ZwYm1sdVp5QnBkR1Z0Y3lCM2FHVnlaU0IwYUdVZ2EyVjVJR2x6SUhCeVpYTmxiblFnYVc0Z2IyNWxJRzltSUhSb1pTQnZjbWxuYVc1aGJDQnpkSEoxWTNSMWNtVnpJR0oxZENCdWIzUWdkR2hsSUc5MGFHVnlMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwTnZiR3hsWTNScGIyNTlJRzkwYUdWeUlGUm9aU0J2ZEdobGNpQkRiMnhzWldOMGFXOXVJSFJ2SUdacGJIUmxjaUJoWjJGcGJuTjBYRzVjZENBcUlFQnlaWFIxY201eklIdERiMnhzWldOMGFXOXVmVnh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJR1JwWm1abGNtVnVZMlVvYjNSb1pYSTZJRU52Ykd4bFkzUnBiMjQ4U3l3Z1ZqNHBPaUJEYjJ4c1pXTjBhVzl1UEVzc0lGWStJSHRjYmx4MFhIUnlaWFIxY200Z2IzUm9aWEl1Wm1sc2RHVnlLQ2hmTENCcktTQTlQaUFoZEdocGN5NW9ZWE1vYXlrcExtTnZibU5oZENoMGFHbHpMbVpwYkhSbGNpZ29YeXdnYXlrZ1BUNGdJVzkwYUdWeUxtaGhjeWhyS1NrcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRlJvWlNCemIzSjBaV1FnYldWMGFHOWtJSE52Y25SeklIUm9aU0JwZEdWdGN5QnZaaUJoSUdOdmJHeGxZM1JwYjI0Z1lXNWtJSEpsZEhWeWJuTWdhWFF1WEc1Y2RDQXFJRlJvWlNCemIzSjBJR2x6SUc1dmRDQnVaV05sYzNOaGNtbHNlU0J6ZEdGaWJHVWdhVzRnVG05a1pTQXhNQ0J2Y2lCdmJHUmxjaTVjYmx4MElDb2dWR2hsSUdSbFptRjFiSFFnYzI5eWRDQnZjbVJsY2lCcGN5QmhZMk52Y21ScGJtY2dkRzhnYzNSeWFXNW5JRlZ1YVdOdlpHVWdZMjlrWlNCd2IybHVkSE11WEc1Y2RDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJRnRqYjIxd1lYSmxSblZ1WTNScGIyNWRJRk53WldOcFptbGxjeUJoSUdaMWJtTjBhVzl1SUhSb1lYUWdaR1ZtYVc1bGN5QjBhR1VnYzI5eWRDQnZjbVJsY2k1Y2JseDBJQ29nU1dZZ2IyMXBkSFJsWkN3Z2RHaGxJR052Ykd4bFkzUnBiMjRnYVhNZ2MyOXlkR1ZrSUdGalkyOXlaR2x1WnlCMGJ5QmxZV05vSUdOb1lYSmhZM1JsY2lkeklGVnVhV052WkdVZ1kyOWtaU0J3YjJsdWRDQjJZV3gxWlN4Y2JseDBJQ29nWVdOamIzSmthVzVuSUhSdklIUm9aU0J6ZEhKcGJtY2dZMjl1ZG1WeWMybHZiaUJ2WmlCbFlXTm9JR1ZzWlcxbGJuUXVYRzVjZENBcUlFQnlaWFIxY201eklIdERiMnhzWldOMGFXOXVmVnh1WEhRZ0tpQkFaWGhoYlhCc1pTQmpiMnhzWldOMGFXOXVMbk52Y25SbFpDZ29kWE5sY2tFc0lIVnpaWEpDS1NBOVBpQjFjMlZ5UVM1amNtVmhkR1ZrVkdsdFpYTjBZVzF3SUMwZ2RYTmxja0l1WTNKbFlYUmxaRlJwYldWemRHRnRjQ2s3WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nYzI5eWRHVmtLR052YlhCaGNtVkdkVzVqZEdsdmJqb2dLR1pwY25OMFZtRnNkV1U2SUZZc0lITmxZMjl1WkZaaGJIVmxPaUJXTENCbWFYSnpkRXRsZVRvZ1N5d2djMlZqYjI1a1MyVjVPaUJMS1NBOVBpQnVkVzFpWlhJZ1BTQW9lQ3dnZVNrNklHNTFiV0psY2lBOVBpQk9kVzFpWlhJb2VDQStJSGtwSUh4OElFNTFiV0psY2loNElEMDlQU0I1S1NBdElERXBPaUIwYUdseklIdGNibHgwWEhSeVpYUjFjbTRnS0c1bGR5QjBhR2x6TG1OdmJuTjBjblZqZEc5eVcxTjViV0p2YkM1emNHVmphV1Z6WFNoYkxpNHVkR2hwY3k1bGJuUnlhV1Z6S0NsZEtTQmhjeUIwYUdsektWeHVYSFJjZEZ4MExuTnZjblFvS0dGMkxDQmlkaXdnWVdzc0lHSnJLU0E5UGlCamIyMXdZWEpsUm5WdVkzUnBiMjRvWVhZc0lHSjJMQ0JoYXl3Z1ltc3BLVHRjYmx4MGZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVOdmJHeGxZM1JwYjI0N1hHNWxlSEJ2Y25RZ2V5QkRiMnhzWldOMGFXOXVJSDA3WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JEYjJ4c1pXTjBhVzl1TzF4dUlsMTkiLCIvKiEgKGMpIEFuZHJlYSBHaWFtbWFyY2hpIC0gSVNDICovXG52YXIgc2VsZiA9IHRoaXMgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307XG50cnkge1xuICAoZnVuY3Rpb24gKFVSTFNlYXJjaFBhcmFtcywgcGx1cykge1xuICAgIGlmIChcbiAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoJ3E9JTJCJykuZ2V0KCdxJykgIT09IHBsdXMgfHxcbiAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoe3E6IHBsdXN9KS5nZXQoJ3EnKSAhPT0gcGx1cyB8fFxuICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyhbWydxJywgcGx1c11dKS5nZXQoJ3EnKSAhPT0gcGx1cyB8fFxuICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcygncT1cXG4nKS50b1N0cmluZygpICE9PSAncT0lMEEnIHx8XG4gICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHtxOiAnICYnfSkudG9TdHJpbmcoKSAhPT0gJ3E9KyUyNicgfHxcbiAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoe3E6ICclengnfSkudG9TdHJpbmcoKSAhPT0gJ3E9JTI1engnXG4gICAgKVxuICAgICAgdGhyb3cgVVJMU2VhcmNoUGFyYW1zO1xuICAgIHNlbGYuVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zO1xuICB9KFVSTFNlYXJjaFBhcmFtcywgJysnKSk7XG59IGNhdGNoKFVSTFNlYXJjaFBhcmFtcykge1xuICAoZnVuY3Rpb24gKE9iamVjdCwgU3RyaW5nLCBpc0FycmF5KSB7J3VzZSBzdHJpY3QnO1xuICAgIHZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuICAgIHZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgICB2YXIgZmluZCA9IC9bISdcXChcXCl+XXwlMjB8JTAwL2c7XG4gICAgdmFyIGZpbmRQZXJjZW50U2lnbiA9IC8lKD8hWzAtOWEtZkEtRl17Mn0pL2c7XG4gICAgdmFyIHBsdXMgPSAvXFwrL2c7XG4gICAgdmFyIHJlcGxhY2UgPSB7XG4gICAgICAnISc6ICclMjEnLFxuICAgICAgXCInXCI6ICclMjcnLFxuICAgICAgJygnOiAnJTI4JyxcbiAgICAgICcpJzogJyUyOScsXG4gICAgICAnfic6ICclN0UnLFxuICAgICAgJyUyMCc6ICcrJyxcbiAgICAgICclMDAnOiAnXFx4MDAnXG4gICAgfTtcbiAgICB2YXIgcHJvdG8gPSB7XG4gICAgICBhcHBlbmQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGFwcGVuZFRvKHRoaXMuX3VuZ2FwLCBrZXksIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBkZWxldGU6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3VuZ2FwW2tleV07XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpID8gdGhpcy5fdW5nYXBba2V5XVswXSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZ2V0QWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpID8gdGhpcy5fdW5nYXBba2V5XS5zbGljZSgwKSA6IFtdO1xuICAgICAgfSxcbiAgICAgIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuX3VuZ2FwO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdW5nYXBba2V5XSA9IFtTdHJpbmcodmFsdWUpXTtcbiAgICAgIH0sXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5fdW5nYXApXG4gICAgICAgICAgc2VsZi5fdW5nYXBba2V5XS5mb3JFYWNoKGludm9rZSwga2V5KTtcbiAgICAgICAgZnVuY3Rpb24gaW52b2tlKHZhbHVlKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgU3RyaW5nKGtleSksIHNlbGYpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXVlcnkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX3VuZ2FwKSB7XG4gICAgICAgICAgdmFyIGVuY29kZWQgPSBlbmNvZGUoa2V5KTtcbiAgICAgICAgICBmb3IgKHZhclxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3VuZ2FwW2tleV07XG4gICAgICAgICAgICBpIDwgdmFsdWUubGVuZ3RoOyBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlZCArICc9JyArIGVuY29kZSh2YWx1ZVtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnkuam9pbignJicpO1xuICAgICAgfVxuICAgIH07XG4gICAgZm9yICh2YXIga2V5IGluIHByb3RvKVxuICAgICAgZGVmaW5lUHJvcGVydHkoVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZSwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBwcm90b1trZXldXG4gICAgICB9KTtcbiAgICBzZWxmLlVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtcztcbiAgICBmdW5jdGlvbiBVUkxTZWFyY2hQYXJhbXMocXVlcnkpIHtcbiAgICAgIHZhciBkaWN0ID0gY3JlYXRlKG51bGwpO1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ191bmdhcCcsIHt2YWx1ZTogZGljdH0pO1xuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgIXF1ZXJ5OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHR5cGVvZiBxdWVyeSA9PT0gJ3N0cmluZyc6XG4gICAgICAgICAgaWYgKHF1ZXJ5LmNoYXJBdCgwKSA9PT0gJz8nKSB7XG4gICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnNsaWNlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhclxuICAgICAgICAgICAgcGFpcnMgPSBxdWVyeS5zcGxpdCgnJicpLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSBwYWlycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFpcnNbaV07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB2YWx1ZS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgICBpZiAoLTEgPCBpbmRleCkge1xuICAgICAgICAgICAgICBhcHBlbmRUbyhcbiAgICAgICAgICAgICAgICBkaWN0LFxuICAgICAgICAgICAgICAgIGRlY29kZSh2YWx1ZS5zbGljZSgwLCBpbmRleCkpLFxuICAgICAgICAgICAgICAgIGRlY29kZSh2YWx1ZS5zbGljZShpbmRleCArIDEpKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGgpe1xuICAgICAgICAgICAgICBhcHBlbmRUbyhcbiAgICAgICAgICAgICAgICBkaWN0LFxuICAgICAgICAgICAgICAgIGRlY29kZSh2YWx1ZSksXG4gICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgaXNBcnJheShxdWVyeSk6XG4gICAgICAgICAgZm9yICh2YXJcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgbGVuZ3RoID0gcXVlcnkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHF1ZXJ5W2ldO1xuICAgICAgICAgICAgYXBwZW5kVG8oZGljdCwgdmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvckVhY2gnIGluIHF1ZXJ5OlxuICAgICAgICAgIHF1ZXJ5LmZvckVhY2goYWRkRWFjaCwgZGljdCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHF1ZXJ5KVxuICAgICAgICAgICAgYXBwZW5kVG8oZGljdCwga2V5LCBxdWVyeVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRFYWNoKHZhbHVlLCBrZXkpIHtcbiAgICAgIGFwcGVuZFRvKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFRvKGRpY3QsIGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciByZXMgPSBpc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywnKSA6IHZhbHVlO1xuICAgICAgaWYgKGtleSBpbiBkaWN0KVxuICAgICAgICBkaWN0W2tleV0ucHVzaChyZXMpO1xuICAgICAgZWxzZVxuICAgICAgICBkaWN0W2tleV0gPSBbcmVzXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKGZpbmRQZXJjZW50U2lnbiwgJyUyNScpLnJlcGxhY2UocGx1cywgJyAnKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoZmluZCwgcmVwbGFjZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVwbGFjZVttYXRjaF07XG4gICAgfVxuXG4gIH0oT2JqZWN0LCBTdHJpbmcsIEFycmF5LmlzQXJyYXkpKTtcbn1cblxuKGZ1bmN0aW9uIChVUkxTZWFyY2hQYXJhbXNQcm90bykge1xuXG4gIHZhciBpdGVyYWJsZSA9IGZhbHNlO1xuICB0cnkgeyBpdGVyYWJsZSA9ICEhU3ltYm9sLml0ZXJhdG9yOyB9IGNhdGNoIChvX08pIHt9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKCEoJ2ZvckVhY2gnIGluIFVSTFNlYXJjaFBhcmFtc1Byb3RvKSkge1xuICAgIFVSTFNlYXJjaFBhcmFtc1Byb3RvLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgbmFtZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgdGhpcy50b1N0cmluZygpXG4gICAgICAgICAgLnJlcGxhY2UoLz1bXFxzXFxTXSo/KD86JnwkKS9nLCAnPScpXG4gICAgICAgICAgLnNwbGl0KCc9JylcbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCFuYW1lLmxlbmd0aCB8fCBuYW1lIGluIG5hbWVzKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAobmFtZXNbbmFtZV0gPSBzZWxmLmdldEFsbChuYW1lKSkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCBzZWxmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoISgna2V5cycgaW4gVVJMU2VhcmNoUGFyYW1zUHJvdG8pKSB7XG4gICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8ua2V5cyA9IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IodGhpcywgZnVuY3Rpb24odmFsdWUsIGtleSkgeyB0aGlzLnB1c2goa2V5KTsgfSk7XG4gICAgfTtcbiAgfVxuXG4gICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoISgndmFsdWVzJyBpbiBVUkxTZWFyY2hQYXJhbXNQcm90bykpIHtcbiAgICBVUkxTZWFyY2hQYXJhbXNQcm90by52YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IodGhpcywgZnVuY3Rpb24odmFsdWUsIGtleSkgeyB0aGlzLnB1c2godmFsdWUpOyB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKCEoJ2VudHJpZXMnIGluIFVSTFNlYXJjaFBhcmFtc1Byb3RvKSkge1xuICAgIFVSTFNlYXJjaFBhcmFtc1Byb3RvLmVudHJpZXMgPSBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yKHRoaXMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHsgdGhpcy5wdXNoKFtrZXksIHZhbHVlXSk7IH0pO1xuICAgIH07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoaXRlcmFibGUgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gVVJMU2VhcmNoUGFyYW1zUHJvdG8pKSB7XG4gICAgVVJMU2VhcmNoUGFyYW1zUHJvdG9bU3ltYm9sLml0ZXJhdG9yXSA9IFVSTFNlYXJjaFBhcmFtc1Byb3RvLmVudHJpZXM7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoISgnc29ydCcgaW4gVVJMU2VhcmNoUGFyYW1zUHJvdG8pKSB7XG4gICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8uc29ydCA9IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgICB2YXJcbiAgICAgICAgZW50cmllcyA9IHRoaXMuZW50cmllcygpLFxuICAgICAgICBlbnRyeSA9IGVudHJpZXMubmV4dCgpLFxuICAgICAgICBkb25lID0gZW50cnkuZG9uZSxcbiAgICAgICAga2V5cyA9IFtdLFxuICAgICAgICB2YWx1ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICBpLCBrZXksIHZhbHVlXG4gICAgICA7XG4gICAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgdmFsdWUgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAga2V5ID0gdmFsdWVbMF07XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICBpZiAoIShrZXkgaW4gdmFsdWVzKSkge1xuICAgICAgICAgIHZhbHVlc1trZXldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2tleV0ucHVzaCh2YWx1ZVsxXSk7XG4gICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCk7XG4gICAgICAgIGRvbmUgPSBlbnRyeS5kb25lO1xuICAgICAgfVxuICAgICAgLy8gbm90IHRoZSBjaGFtcGlvbiBpbiBlZmZpY2llbmN5XG4gICAgICAvLyBidXQgdGhlc2UgdHdvIGJpdHMganVzdCBkbyB0aGUgam9iXG4gICAgICBrZXlzLnNvcnQoKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlKGtleXNbaV0pO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZXNba2V5XS5zaGlmdCgpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaXRlcmF0b3Ioc2VsZiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICBzZWxmLmZvckVhY2goY2FsbGJhY2ssIGl0ZW1zKTtcbiAgICByZXR1cm4gaXRlcmFibGUgP1xuICAgICAgaXRlbXNbU3ltYm9sLml0ZXJhdG9yXSgpIDpcbiAgICAgIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX07XG4gICAgICAgIH1cbiAgICAgIH07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAoZnVuY3Rpb24gKE9iamVjdCkge1xuICAgIHZhclxuICAgICAgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gICAgICBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICAgIGNyZWF0ZVNlYXJjaFBhcmFtc1BvbGx1dGUgPSBmdW5jdGlvbiAoc2VhcmNoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgIFVSTFNlYXJjaFBhcmFtc1Byb3RvLmFwcGVuZC5jYWxsKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICBuYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgIHNlYXJjaC5zZXQuY2FsbCh0aGlzLl91c3AsIG5hbWUgPyAoJz8nICsgbmFtZSkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVsKG5hbWUpIHtcbiAgICAgICAgICBVUkxTZWFyY2hQYXJhbXNQcm90by5kZWxldGUuY2FsbCh0aGlzLCBuYW1lKTtcbiAgICAgICAgICBuYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgIHNlYXJjaC5zZXQuY2FsbCh0aGlzLl91c3AsIG5hbWUgPyAoJz8nICsgbmFtZSkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8uc2V0LmNhbGwodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIG5hbWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgc2VhcmNoLnNldC5jYWxsKHRoaXMuX3VzcCwgbmFtZSA/ICgnPycgKyBuYW1lKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNwLCB2YWx1ZSkge1xuICAgICAgICAgIHNwLmFwcGVuZCA9IGFwcGVuZDtcbiAgICAgICAgICBzcC5kZWxldGUgPSBkZWw7XG4gICAgICAgICAgc3Auc2V0ID0gc2V0O1xuICAgICAgICAgIHJldHVybiBkUChzcCwgJ191c3AnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZVNlYXJjaFBhcmFtc0NyZWF0ZSA9IGZ1bmN0aW9uIChwb2xsdXRlU2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBzcCkge1xuICAgICAgICAgIGRQKFxuICAgICAgICAgICAgb2JqLCAnX3NlYXJjaFBhcmFtcycsIHtcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdmFsdWU6IHBvbGx1dGVTZWFyY2hQYXJhbXMoc3AsIG9iailcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBzcDtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAoc3ApIHtcbiAgICAgICAgdmFyIGFwcGVuZCA9IHNwLmFwcGVuZDtcbiAgICAgICAgc3AuYXBwZW5kID0gVVJMU2VhcmNoUGFyYW1zUHJvdG8uYXBwZW5kO1xuICAgICAgICBVUkxTZWFyY2hQYXJhbXMuY2FsbChzcCwgc3AuX3VzcC5zZWFyY2guc2xpY2UoMSkpO1xuICAgICAgICBzcC5hcHBlbmQgPSBhcHBlbmQ7XG4gICAgICB9LFxuICAgICAgdmVyaWZ5U2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gKG9iaiwgQ2xhc3MpIHtcbiAgICAgICAgaWYgKCEob2JqIGluc3RhbmNlb2YgQ2xhc3MpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiJ3NlYXJjaFBhcmFtcycgYWNjZXNzZWQgb24gYW4gb2JqZWN0IHRoYXQgXCIgK1xuICAgICAgICAgIFwiZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBcIiArIENsYXNzLm5hbWVcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB1cGdyYWRlQ2xhc3MgPSBmdW5jdGlvbiAoQ2xhc3MpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgQ2xhc3NQcm90byA9IENsYXNzLnByb3RvdHlwZSxcbiAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBnT1BEKENsYXNzUHJvdG8sICdzZWFyY2hQYXJhbXMnKSxcbiAgICAgICAgICBocmVmID0gZ09QRChDbGFzc1Byb3RvLCAnaHJlZicpLFxuICAgICAgICAgIHNlYXJjaCA9IGdPUEQoQ2xhc3NQcm90bywgJ3NlYXJjaCcpLFxuICAgICAgICAgIGNyZWF0ZVNlYXJjaFBhcmFtc1xuICAgICAgICA7XG4gICAgICAgIGlmICghc2VhcmNoUGFyYW1zICYmIHNlYXJjaCAmJiBzZWFyY2guc2V0KSB7XG4gICAgICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zID0gY3JlYXRlU2VhcmNoUGFyYW1zQ3JlYXRlKFxuICAgICAgICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zUG9sbHV0ZShzZWFyY2gpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICAgICAgICAgIENsYXNzUHJvdG8sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGhyZWY6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBocmVmLmdldC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBzcCA9IHRoaXMuX3NlYXJjaFBhcmFtcztcbiAgICAgICAgICAgICAgICAgIGhyZWYuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKHNwKSB1cGRhdGVTZWFyY2hQYXJhbXMoc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoLmdldC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBzcCA9IHRoaXMuX3NlYXJjaFBhcmFtcztcbiAgICAgICAgICAgICAgICAgIHNlYXJjaC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoc3ApIHVwZGF0ZVNlYXJjaFBhcmFtcyhzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWFyY2hQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZlcmlmeVNlYXJjaFBhcmFtcyh0aGlzLCBDbGFzcyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoUGFyYW1zIHx8IGNyZWF0ZVNlYXJjaFBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLnNlYXJjaC5zbGljZSgxKSlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzcCkge1xuICAgICAgICAgICAgICAgICAgdmVyaWZ5U2VhcmNoUGFyYW1zKHRoaXMsIENsYXNzKTtcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVNlYXJjaFBhcmFtcyh0aGlzLCBzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIDtcbiAgICB0cnkge1xuICAgICAgdXBncmFkZUNsYXNzKEhUTUxBbmNob3JFbGVtZW50KTtcbiAgICAgIGlmICgvXmZ1bmN0aW9ufG9iamVjdCQvLnRlc3QodHlwZW9mIFVSTCkgJiYgVVJMLnByb3RvdHlwZSlcbiAgICAgICAgdXBncmFkZUNsYXNzKFVSTCk7XG4gICAgfSBjYXRjaCAobWVoKSB7fVxuICB9KE9iamVjdCkpO1xuXG59KHNlbGYuVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZSwgT2JqZWN0KSk7XG5leHBvcnQgZGVmYXVsdCBzZWxmLlVSTFNlYXJjaFBhcmFtcztcbiIsInZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcztcbnZhciBfX3NlbGZfXyA9IChmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBGKCkge1xudGhpcy5mZXRjaCA9IGZhbHNlO1xudGhpcy5ET01FeGNlcHRpb24gPSBnbG9iYWwuRE9NRXhjZXB0aW9uXG59XG5GLnByb3RvdHlwZSA9IGdsb2JhbDtcbnJldHVybiBuZXcgRigpO1xufSkoKTtcbihmdW5jdGlvbihzZWxmKSB7XG5cbnZhciBpcnJlbGV2YW50ID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6XG4gICAgICAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJlxuICAgICAgJ0Jsb2InIGluIHNlbGYgJiZcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXcgQmxvYigpO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfTtcblxuICBmdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdO1xuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICAgIEFycmF5QnVmZmVyLmlzVmlldyB8fFxuICAgICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9O1xuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXTtcbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXM7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpO1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYik7XG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aCk7XG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKTtcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHk7XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcik7XG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddO1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmw7XG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHM7XG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kO1xuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZTtcbiAgICAgIHRoaXMuc2lnbmFsID0gaW5wdXQuc2lnbmFsO1xuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXQ7XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJztcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKTtcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGw7XG4gICAgdGhpcy5zaWduYWwgPSBvcHRpb25zLnNpZ25hbCB8fCB0aGlzLnNpZ25hbDtcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbDtcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSk7XG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBib2R5XG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKTtcbiAgICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvZywgJyAnKTtcbiAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6Jyk7XG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKCk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snO1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJztcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdCk7XG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9O1xuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSk7XG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcic7XG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH07XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdO1xuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH07XG5cbiAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBzZWxmLkRPTUV4Y2VwdGlvbjtcbiAgdHJ5IHtcbiAgICBuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHZhciBlcnJvciA9IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgdGhpcy5zdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIH07XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICAgIGV4cG9ydHMuRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGV4cG9ydHMuRE9NRXhjZXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcblxuICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKTtcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwpIHtcbiAgICAgICAgcmVxdWVzdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdCk7XG4gICAgfSlcbiAgfVxuXG4gIGZldGNoLnBvbHlmaWxsID0gdHJ1ZTtcblxuICBpZiAoIXNlbGYuZmV0Y2gpIHtcbiAgICBzZWxmLmZldGNoID0gZmV0Y2g7XG4gICAgc2VsZi5IZWFkZXJzID0gSGVhZGVycztcbiAgICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgfVxuXG4gIGV4cG9ydHMuSGVhZGVycyA9IEhlYWRlcnM7XG4gIGV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gIGV4cG9ydHMuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgZXhwb3J0cy5mZXRjaCA9IGZldGNoO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0pKHt9KTtcbn0pKF9fc2VsZl9fKTtcbl9fc2VsZl9fLmZldGNoLnBvbnlmaWxsID0gdHJ1ZTtcbi8vIFJlbW92ZSBcInBvbHlmaWxsXCIgcHJvcGVydHkgYWRkZWQgYnkgd2hhdHdnLWZldGNoXG5kZWxldGUgX19zZWxmX18uZmV0Y2gucG9seWZpbGw7XG4vLyBDaG9vc2UgYmV0d2VlbiBuYXRpdmUgaW1wbGVtZW50YXRpb24gKGdsb2JhbCkgb3IgY3VzdG9tIGltcGxlbWVudGF0aW9uIChfX3NlbGZfXylcbi8vIHZhciBjdHggPSBnbG9iYWwuZmV0Y2ggPyBnbG9iYWwgOiBfX3NlbGZfXztcbnZhciBjdHggPSBfX3NlbGZfXzsgLy8gdGhpcyBsaW5lIGRpc2FibGUgc2VydmljZSB3b3JrZXIgc3VwcG9ydCB0ZW1wb3JhcmlseVxuZXhwb3J0cyA9IGN0eC5mZXRjaCAvLyBUbyBlbmFibGU6IGltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCdcbmV4cG9ydHMuZGVmYXVsdCA9IGN0eC5mZXRjaCAvLyBGb3IgVHlwZVNjcmlwdCBjb25zdW1lcnMgd2l0aG91dCBlc01vZHVsZUludGVyb3AuXG5leHBvcnRzLmZldGNoID0gY3R4LmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IHtmZXRjaH0gZnJvbSAnY3Jvc3MtZmV0Y2gnXG5leHBvcnRzLkhlYWRlcnMgPSBjdHguSGVhZGVyc1xuZXhwb3J0cy5SZXF1ZXN0ID0gY3R4LlJlcXVlc3RcbmV4cG9ydHMuUmVzcG9uc2UgPSBjdHguUmVzcG9uc2Vcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29sbGVjdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAZGlzY29yZGpzL2NvbGxlY3Rpb25cIikpO1xyXG52YXIgdXJsX3NlYXJjaF9wYXJhbXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQHVuZ2FwL3VybC1zZWFyY2gtcGFyYW1zXCIpKTtcclxudmFyIGNyb3NzX2ZldGNoXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNyb3NzLWZldGNoXCIpKTtcclxudmFyIGVudW1lcmFibGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vZGVjb3JhdG9ycy9lbnVtZXJhYmxlXCIpKTtcclxudmFyIEJBU0VfVVJJID0gXCJodHRwczovL3Bva2VhcGkuY28vYXBpL3YyXCI7XHJcbnZhciBFbmRwb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEVuZHBvaW50KHJlc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZSA9IHJlc291cmNlO1xyXG4gICAgICAgIHRoaXMuY2FjaGUgPSBuZXcgY29sbGVjdGlvbl8xLmRlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmUgYSByZXNvdXJjZSBmcm9tIHRoZSBjYWNoZVxyXG4gICAgICogQHBhcmFtIHtFbmRwb2ludFBhcmFtfSBwYXJhbSAtIFRoZSBJRCBvZiB0aGUgcmVzb3VyY2UgdG8gcmV0cmlldmUgZnJvbSBjYWNoZVxyXG4gICAgICogQHJldHVybnMgez9UfVxyXG4gICAgICovXHJcbiAgICBFbmRwb2ludC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHBhcmFtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGEgcmVzb3VyY2UgZnJvbSBjYWNoZSBpZiBpdCBleGlzdHMsIG9yIGF0dGVtcHQgdG8gZmV0Y2ggaXQgZnJvbSB0aGUgQVBJXHJcbiAgICAgKiBAcGFyYW0ge0VuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIElEIG9mIHRoZSByZXNvdXJjZSB0byByZXNvbHZlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgRW5kcG9pbnQucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmdldChwYXJhbSkgfHwgdGhpcy5mZXRjaChwYXJhbSldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZldGNoIGEgcmVzb3VyY2UgZnJvbSB0aGUgQVBJXHJcbiAgICAgKiBAcGFyYW0ge0VuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIElEIG9mIHRoZSBpdGVtIHRvIGZldGNoXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjYWNoZT10cnVlXSAtIFdoZXRoZXIgb3Igbm90IHRvIGNhY2hlIHRoaXMgcmVzb3VyY2VcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBFbmRwb2ludC5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAocGFyYW0sIGNhY2hlKSB7XHJcbiAgICAgICAgaWYgKGNhY2hlID09PSB2b2lkIDApIHsgY2FjaGUgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCIvXCIgKyBwYXJhbSkudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIHBhZ2luYXRlZCByZXNvdXJjZSBsaXN0IGZyb20gdGhlIEFQSSwgb3IgdXNlcyB0aGUgaW50ZXJuYWwgY2FjaGUgaWYgbGlzdEFsbCgpIGhhcyBiZWVuIGNhbGxlZC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGltaXQ9MjBdIC0gSG93IG1hbnkgcmVzb3VyY2VzIHRvIGxpc3RcclxuICAgICAqIEBwYXJhbSB7b2Zmc2V0fSBbb2Zmc2V0PTBdXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxOYW1lZEFwaVJlc291cmNlTGlzdDxUPj59XHJcbiAgICAgKi9cclxuICAgIEVuZHBvaW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGxpbWl0LCBvZmZzZXQpIHtcclxuICAgICAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDIwOyB9XHJcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IDA7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzLCBfYSwgY291bnQsIG5leHQsIHByZXZpb3VzLCBwYXJhbXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IHRoaXMuX2xpc3QucmVzdWx0cy5zbGljZShvZmZzZXQsIGxpbWl0KTtcclxuICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMuX2xpc3QsIGNvdW50ID0gX2EuY291bnQsIG5leHQgPSBfYS5uZXh0LCBwcmV2aW91cyA9IF9hLnByZXZpb3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7IGNvdW50OiBjb3VudCwgbmV4dDogbmV4dCwgcHJldmlvdXM6IHByZXZpb3VzLCByZXN1bHRzOiByZXN1bHRzIH1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gbmV3IHVybF9zZWFyY2hfcGFyYW1zXzEuZGVmYXVsdCh7IGxpbWl0OiBcIlwiICsgbGltaXQsIG9mZnNldDogXCJcIiArIG9mZnNldCB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBjcm9zc19mZXRjaF8xLmRlZmF1bHQoQkFTRV9VUkkgKyBcIi9cIiArIHRoaXMucmVzb3VyY2UgKyBcIj9cIiArIHBhcmFtcykudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgY29tcGxldGUgcmVzb3VyY2UgbGlzdCBmcm9tIHRoZSBBUEkgYnkgbWFraW5nIHR3byBjYWxscy5cclxuICAgICAqIENhY2hlcyB0aGUgbGlzdCBieSBkZWZhdWx0IGZvciBBUEktbGVzcyBwYWdpbmF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjYWNoZT10cnVlXSAtIElmIHRoZSByZXN1bHQgc2hvdWxkIGJlIGNhaGNlZCBpbi1tZW1vcnlcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE5hbWVkQXBpUmVzb3VyY2VMaXN0PFQ+Pn1cclxuICAgICAqL1xyXG4gICAgRW5kcG9pbnQucHJvdG90eXBlLmxpc3RBbGwgPSBmdW5jdGlvbiAoY2FjaGUpIHtcclxuICAgICAgICBpZiAoY2FjaGUgPT09IHZvaWQgMCkgeyBjYWNoZSA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCwgZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLl9saXN0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcm9zc19mZXRjaF8xLmRlZmF1bHQoQkFTRV9VUkkgKyBcIi9cIiArIHRoaXMucmVzb3VyY2UgKyBcIj9saW1pdD0xXCIpLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmpzb24oKTsgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgPSAoX2Euc2VudCgpKS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCI/bGltaXQ9XCIgKyBjb3VudCkudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgRW5kcG9pbnQucHJvdG90eXBlLl9jYWNoZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQoZGF0YS5pZCwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgZW51bWVyYWJsZV8xLmRlZmF1bHRcclxuICAgIF0sIEVuZHBvaW50LnByb3RvdHlwZSwgXCJyZXNvdXJjZVwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgZW51bWVyYWJsZV8xLmRlZmF1bHRcclxuICAgIF0sIEVuZHBvaW50LnByb3RvdHlwZSwgXCJfbGlzdFwiLCB2b2lkIDApO1xyXG4gICAgcmV0dXJuIEVuZHBvaW50O1xyXG59KCkpO1xyXG5leHBvcnRzLkVuZHBvaW50ID0gRW5kcG9pbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVuZHBvaW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1cmxfc2VhcmNoX3BhcmFtc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAdW5nYXAvdXJsLXNlYXJjaC1wYXJhbXNcIikpO1xyXG52YXIgY3Jvc3NfZmV0Y2hfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY3Jvc3MtZmV0Y2hcIikpO1xyXG52YXIgZW51bWVyYWJsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9kZWNvcmF0b3JzL2VudW1lcmFibGVcIikpO1xyXG52YXIgRW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuL0VuZHBvaW50XCIpO1xyXG52YXIgQkFTRV9VUkkgPSBcImh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjJcIjtcclxudmFyIE5hbWVkRW5kcG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTmFtZWRFbmRwb2ludCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE5hbWVkRW5kcG9pbnQocmVzb3VyY2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXNvdXJjZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fbmFtZU1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGEgcmVzb3VyY2UgZnJvbSB0aGUgY2FjaGUgYnkgbmFtZSBvciBJRFxyXG4gICAgICogQHBhcmFtIHtOYW1lZEVuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIG5hbWUgb3IgSUQgb2YgdGhlIHJlc291cmNlIHRvIHJldHJpZXZlIGZyb20gY2FjaGVcclxuICAgICAqIEByZXR1cm5zIHs/VH1cclxuICAgICAqL1xyXG4gICAgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHR5cGVvZiBwYXJhbSA9PT0gXCJudW1iZXJcIiA/IHBhcmFtIDogdGhpcy5fbmFtZU1hcC5nZXQocGFyYW0udG9Mb3dlckNhc2UoKSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggYSByZXNvdXJjZSBmcm9tIHRoZSBBUElcclxuICAgICAqIEBwYXJhbSB7TmFtZWRFbmRwb2ludFBhcmFtfSBwYXJhbSAtIFRoZSBuYW1lIG9yY0lEIG9mIHRoZSByZXNvdXJjZSB0byBmZXRjaFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY2FjaGU9dHJ1ZV0gLSBXaGV0aGVyIG9yIG5vdCB0byBjYWNoZSB0aGlzIHJlc291cmNlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAocGFyYW0sIGNhY2hlKSB7XHJcbiAgICAgICAgaWYgKGNhY2hlID09PSB2b2lkIDApIHsgY2FjaGUgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSB0eXBlb2YgcGFyYW0gPT09IFwic3RyaW5nXCIgPyBwYXJhbS50b0xvd2VyQ2FzZSgpIDogcGFyYW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyb3NzX2ZldGNoXzEuZGVmYXVsdChCQVNFX1VSSSArIFwiL1wiICsgdGhpcy5yZXNvdXJjZSArIFwiL1wiICsgcGFyYW0pLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmpzb24oKTsgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBhIHJlc291cmNlIGZyb20gY2FjaGUgaWYgaXQgZXhpc3RzLCBvciBhdHRlbXB0IHRvIGZldGNoIGl0IGZyb20gdGhlIEFQSVxyXG4gICAgICogQHBhcmFtIHtFbmRwb2ludFBhcmFtfSBwYXJhbSAtIFRoZSBJRCBvZiB0aGUgcmVzb3VyY2UgdG8gcmVzb2x2ZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIE5hbWVkRW5kcG9pbnQucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmdldChwYXJhbSkgfHwgdGhpcy5mZXRjaChwYXJhbSldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIHBhZ2luYXRlZCByZXNvdXJjZSBsaXN0IGZyb20gdGhlIEFQSSwgb3IgdXNlcyB0aGUgaW50ZXJuYWwgY2FjaGUgaWYgbGlzdEFsbCgpIGhhcyBiZWVuIGNhbGxlZC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGltaXQ9MjBdIC0gSG93IG1hbnkgcmVzb3VyY2VzIHRvIGxpc3RcclxuICAgICAqIEBwYXJhbSB7b2Zmc2V0fSBbb2Zmc2V0PTBdXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxOYW1lZEFwaVJlc291cmNlTGlzdDxUPj59XHJcbiAgICAgKi9cclxuICAgIE5hbWVkRW5kcG9pbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAobGltaXQsIG9mZnNldCkge1xyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMjA7IH1cclxuICAgICAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdHMsIF9hLCBjb3VudCwgbmV4dCwgcHJldmlvdXMsIHBhcmFtcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gdGhpcy5fbGlzdC5yZXN1bHRzLnNsaWNlKG9mZnNldCwgbGltaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5fbGlzdCwgY291bnQgPSBfYS5jb3VudCwgbmV4dCA9IF9hLm5leHQsIHByZXZpb3VzID0gX2EucHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHsgY291bnQ6IGNvdW50LCBuZXh0OiBuZXh0LCBwcmV2aW91czogcHJldmlvdXMsIHJlc3VsdHM6IHJlc3VsdHMgfV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBuZXcgdXJsX3NlYXJjaF9wYXJhbXNfMS5kZWZhdWx0KHsgbGltaXQ6IFwiXCIgKyBsaW1pdCwgb2Zmc2V0OiBcIlwiICsgb2Zmc2V0IH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNyb3NzX2ZldGNoXzEuZGVmYXVsdChCQVNFX1VSSSArIFwiL1wiICsgdGhpcy5yZXNvdXJjZSArIFwiP1wiICsgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIHRoZSBjb21wbGV0ZSByZXNvdXJjZSBsaXN0IGZyb20gdGhlIEFQSSBieSBtYWtpbmcgdHdvIGNhbGxzLlxyXG4gICAgICogQ2FjaGVzIHRoZSBsaXN0IGJ5IGRlZmF1bHQgZm9yIEFQSS1sZXNzIHBhZ2luYXRpb25cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhY2hlPXRydWVdIC0gSWYgdGhlIHJlc3VsdCBzaG91bGQgYmUgY2FoY2VkIGluLW1lbW9yeVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TmFtZWRBcGlSZXNvdXJjZUxpc3Q8VD4+fVxyXG4gICAgICovXHJcbiAgICBOYW1lZEVuZHBvaW50LnByb3RvdHlwZS5saXN0QWxsID0gZnVuY3Rpb24gKGNhY2hlKSB7XHJcbiAgICAgICAgaWYgKGNhY2hlID09PSB2b2lkIDApIHsgY2FjaGUgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY291bnQsIGRhdGE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5fbGlzdF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCI/bGltaXQ9MVwiKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gKF9hLnNlbnQoKSkuY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyb3NzX2ZldGNoXzEuZGVmYXVsdChCQVNFX1VSSSArIFwiL1wiICsgdGhpcy5yZXNvdXJjZSArIFwiP2xpbWl0PVwiICsgY291bnQpLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmpzb24oKTsgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE5hbWVkRW5kcG9pbnQucHJvdG90eXBlLl9jYWNoZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQoZGF0YS5pZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5fbmFtZU1hcC5zZXQoZGF0YS5uYW1lLCBkYXRhLmlkKTtcclxuICAgIH07XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBlbnVtZXJhYmxlXzEuZGVmYXVsdFxyXG4gICAgXSwgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUsIFwiX2xpc3RcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGVudW1lcmFibGVfMS5kZWZhdWx0XHJcbiAgICBdLCBOYW1lZEVuZHBvaW50LnByb3RvdHlwZSwgXCJfbmFtZU1hcFwiLCB2b2lkIDApO1xyXG4gICAgcmV0dXJuIE5hbWVkRW5kcG9pbnQ7XHJcbn0oRW5kcG9pbnRfMS5FbmRwb2ludCkpO1xyXG5leHBvcnRzLk5hbWVkRW5kcG9pbnQgPSBOYW1lZEVuZHBvaW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1OYW1lZEVuZHBvaW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBub25lbnVtZXJhYmxlID0gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB8fCB7fTtcclxuICAgIGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlLZXksIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5vbmVudW1lcmFibGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVudW1lcmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gX19leHBvcnQobSkge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEVuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzL0VuZHBvaW50XCIpO1xyXG52YXIgTmFtZWRFbmRwb2ludF8xID0gcmVxdWlyZShcIi4vY2xhc3Nlcy9OYW1lZEVuZHBvaW50XCIpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbnRlcmZhY2VzL0JlcnJpZXMvQmVycnlcIikpO1xyXG52YXIgUG9rZUFQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBva2VBUEkoKSB7XHJcbiAgICB9XHJcbiAgICBQb2tlQVBJLmZyb21SZXNvdXJjZSA9IGZ1bmN0aW9uIChhcGlSZXNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF9hLCBtYXRjaCwgcmVzb3VyY2UsIGlkLCBlbmRwb2ludDtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgX2EgPSAvKFthLXotXSspXFwvKFxcZCspLy5leGVjKGFwaVJlc291cmNlLnVybCksIG1hdGNoID0gX2FbMF0sIHJlc291cmNlID0gX2FbMV0sIGlkID0gX2FbMl07XHJcbiAgICAgICAgICAgICAgICBpZiAoYXBpUmVzb3VyY2UuZW5kcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgYXBpUmVzb3VyY2UuZW5kcG9pbnQucmVzb2x2ZShwYXJzZUludChpZCwgMTApKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbmRwb2ludCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLmZpbmQoZnVuY3Rpb24gKHByb3ApIHsgcmV0dXJuIF90aGlzW3Byb3BdLnJlc291cmNlID09PSByZXNvdXJjZTsgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpc1tlbmRwb2ludF0ucmVzb2x2ZShwYXJzZUludChpZCwgMTApKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFBva2VBUEkuQmVycnkgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJiZXJyeVwiKTtcclxuICAgIFBva2VBUEkuQmVycnlGaXJtbmVzcyA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImJlcnJ5LWZpcm1uZXNzXCIpO1xyXG4gICAgUG9rZUFQSS5CZXJyeUZsYXZvciA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImJlcnJ5LWZsYXZvclwiKTtcclxuICAgIFBva2VBUEkuQ29udGVzdFR5cGUgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJjb250ZXN0LXR5cGVcIik7XHJcbiAgICBQb2tlQVBJLkNvbnRlc3RFZmZlY3QgPSBuZXcgRW5kcG9pbnRfMS5FbmRwb2ludChcImNvbnRlc3QtZWZmZWN0XCIpO1xyXG4gICAgUG9rZUFQSS5TdXBlckNvbnRlc3RFZmZlY3QgPSBuZXcgRW5kcG9pbnRfMS5FbmRwb2ludChcInN1cGVyLWNvbnRlc3QtZWZmZWN0XCIpO1xyXG4gICAgUG9rZUFQSS5FbmNvdW50ZXJNZXRob2QgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJlbmNvdW50ZXItbWV0aG9kXCIpO1xyXG4gICAgUG9rZUFQSS5FbmNvdW50ZXJDb25kaXRpb24gPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJlbmNvdW50ZXItY29uZGl0aW9uXCIpO1xyXG4gICAgUG9rZUFQSS5FbmNvdW50ZXJDb25kaXRpb25WYWx1ZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImVuY291bnRlci1jb25kaXRpb24tdmFsdWVcIik7XHJcbiAgICBQb2tlQVBJLkV2b2x1dGlvbkNoYWluID0gbmV3IEVuZHBvaW50XzEuRW5kcG9pbnQoXCJldm9sdXRpb24tY2hhaW5cIik7XHJcbiAgICBQb2tlQVBJLkV2b2x1dGlvblRyaWdnZXIgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJldm9sdXRpb24tdHJpZ2dlclwiKTtcclxuICAgIFBva2VBUEkuR2VuZXJhaXRpb24gPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJnZW5lcmF0aW9uXCIpO1xyXG4gICAgUG9rZUFQSS5Qb2tlZGV4ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwicG9rZWRleFwiKTtcclxuICAgIFBva2VBUEkuVmVyc2lvbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInZlcnNpb25cIik7XHJcbiAgICBQb2tlQVBJLlZlcmlvbkdyb3VwID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwidmVyc2lvbi1ncm91cFwiKTtcclxuICAgIFBva2VBUEkuSXRlbSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIml0ZW1cIik7XHJcbiAgICBQb2tlQVBJLkl0ZW1BdHRyaWJ1dGUgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJpdGVtLWF0dHJpYnV0ZVwiKTtcclxuICAgIFBva2VBUEkuSXRlbUNhdGVnb3J5ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiaXRlbS1jYXRlZ29yeVwiKTtcclxuICAgIFBva2VBUEkuSXRlbUZsaW5nRWZmZWN0ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiaXRlbS1mbGluZy1lZmZlY3RcIik7XHJcbiAgICBQb2tlQVBJLkl0ZW1Qb2NrZXQgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJpdGVtLXBvY2tldFwiKTtcclxuICAgIFBva2VBUEkuTG9jYXRpb24gPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJsb2NhdGlvblwiKTtcclxuICAgIFBva2VBUEkuTG9jYXRpb25BcmVhID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibG9jYXRpb24tYXJlYVwiKTtcclxuICAgIFBva2VBUEkuUGFsUGFya0FyZWEgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwYWwtcGFyay1hcmVhXCIpO1xyXG4gICAgUG9rZUFQSS5SZWdpb24gPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJyZWdpb25cIik7XHJcbiAgICBQb2tlQVBJLk1hY2hpbmUgPSBuZXcgRW5kcG9pbnRfMS5FbmRwb2ludChcIm1hY2hpbmVcIik7XHJcbiAgICBQb2tlQVBJLk1vdmUgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJtb3ZlXCIpO1xyXG4gICAgUG9rZUFQSS5Nb3ZlQWlsbWVudCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmUtYWlsbWVudFwiKTtcclxuICAgIFBva2VBUEkuTW92ZUJhdHRsZVN0eWxlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibW92ZS1iYXR0bGUtc3R5bGVcIik7XHJcbiAgICBQb2tlQVBJLk1vdmVDYXRlZ29yeSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmUtY2F0ZWdvcnlcIik7XHJcbiAgICBQb2tlQVBJLk1vdmVEYW1hZ2VDbGFzcyA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmUtZGFtYWdlLWNsYXNzXCIpO1xyXG4gICAgUG9rZUFQSS5Nb3ZlTGVhcm5NZXRob2QgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJtb3ZlLWxlYXJuLW1ldGhvZFwiKTtcclxuICAgIFBva2VBUEkuTW92ZVRhcmdldCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmUtdGFyZ2V0XCIpO1xyXG4gICAgUG9rZUFQSS5BYmlsaXR5ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiYWJpbGl0eVwiKTtcclxuICAgIFBva2VBUEkuQ2hhcmFjdGVyaXN0aWMgPSBuZXcgRW5kcG9pbnRfMS5FbmRwb2ludChcImNoYXJhY3RlcmlzdGljXCIpO1xyXG4gICAgUG9rZUFQSS5FZ2dHcm91cCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImVnZy1ncm91cFwiKTtcclxuICAgIFBva2VBUEkuR2VuZGVyID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiZ2VuZGVyXCIpO1xyXG4gICAgUG9rZUFQSS5Hcm93dGhSYXRlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiZ3Jvd3RoLXJhdGVcIik7XHJcbiAgICBQb2tlQVBJLk5hdHVyZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm5hdHVyZVwiKTtcclxuICAgIFBva2VBUEkuUG9rZWF0aGxvblN0YXQgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlYXRobG9uLXN0YXRcIik7XHJcbiAgICBQb2tlQVBJLlBva2Vtb24gPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlbW9uXCIpO1xyXG4gICAgUG9rZUFQSS5Qb2tlbW9uQ29sb3IgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlbW9uLWNvbG9yXCIpO1xyXG4gICAgUG9rZUFQSS5Qb2tlbW9uRm9ybSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2Vtb24tZm9ybVwiKTtcclxuICAgIFBva2VBUEkuUG9rZW1vbkhhYml0YXQgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlbW9uLWhhYml0YXRcIik7XHJcbiAgICBQb2tlQVBJLlBva2Vtb25TaGFwZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2Vtb24tc2hhcGVcIik7XHJcbiAgICBQb2tlQVBJLlBva2Vtb25TcGVjaWVzID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwicG9rZW1vbi1zcGVjaWVzXCIpO1xyXG4gICAgUG9rZUFQSS5TdGF0ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwic3RhdFwiKTtcclxuICAgIFBva2VBUEkuVHlwZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInR5cGVcIik7XHJcbiAgICBQb2tlQVBJLkxhbmd1YWdlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibGFuZ3VhZ2VcIik7XHJcbiAgICByZXR1cm4gUG9rZUFQSTtcclxufSgpKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQb2tlQVBJO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBQb2tlQVBJO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgQmVycnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCZXJyeSgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBCZXJyeTtcclxufSgpKTtcclxuZXhwb3J0cy5CZXJyeSA9IEJlcnJ5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1CZXJyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIGNvbnN0IFAgPSBuZXcgUG9rZWRleC5Qb2tlZGV4KClcclxuY29uc3QgcG9rZWFwaV90eXBlc2NyaXB0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInBva2VhcGktdHlwZXNjcmlwdFwiKSk7XHJcbmNvbnN0IFAgPSBwb2tlYXBpX3R5cGVzY3JpcHRfMS5kZWZhdWx0LlBva2Vtb247XHJcbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XHJcbn07XHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xyXG4gICAgY29uc3QgZ2V0UG9rZW1vbnMgPSB5aWVsZCBQLmxpc3RBbGwoKTtcclxuICAgIGNvbnN0IHBva2Vtb25zID0gZ2V0UG9rZW1vbnMucmVzdWx0cztcclxuICAgIGNvbnN0IGZpbHRlclBva2Vtb25zID0gcG9rZW1vbnMuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggPCA1MCk7XHJcbiAgICBjb25zdCByZXNwb25zZVBva2Vtb25zID0geWllbGQgUHJvbWlzZS5hbGwoZmlsdGVyUG9rZW1vbnMubWFwKChwb2tlbW9uKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBwb2tlYXBpX3R5cGVzY3JpcHRfMS5kZWZhdWx0LlBva2Vtb24uZmV0Y2gocG9rZW1vbi5uYW1lKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogcmVzdWx0LmlkLFxyXG4gICAgICAgICAgICBuYW1lOiByZXN1bHQubmFtZSxcclxuICAgICAgICAgICAgaW1hZ2U6IHJlc3VsdC5zcHJpdGVzLmZyb250X2RlZmF1bHQsXHJcbiAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlcy5tYXAoKHsgdHlwZSB9KSA9PiB0eXBlLm5hbWUpXHJcbiAgICAgICAgfTtcclxuICAgIH0pKSk7XHJcbiAgICBjb25zdCBjYXJkc0h0bWwgPSByZXNwb25zZVBva2Vtb25zLm1hcCgocG9rZW1vbikgPT4gYFxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgZGF0YS1pZD1cIiR7cG9rZW1vbi5pZH1cIj5cbiAgICAgIDxpbWcgc3JjPVwiJHtwb2tlbW9uLmltYWdlfVwiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI1MFwiIC8+XG4gICAgICA8c3Bhbj4ke3Bva2Vtb24ubmFtZX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIGApO1xyXG4gICAgaWYgKGh0bWwpXHJcbiAgICAgICAgaHRtbC5pbm5lckhUTUwgPSBjYXJkc0h0bWwuam9pbignXFxuJyk7XHJcbiAgICAvLyBOT1RFOiBFdmVudG8gcGFyYSBhYnJpciBvIG1vZGFsIGFvIGNsaWNhciBubyBjYXJkXHJcbiAgICBjb25zdCBjYXJkQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuICAgIGNhcmRBbGwuZm9yRWFjaChmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1jbG9zZScpO1xyXG4gICAgICAgICAgICBtb2RhbCA9PT0gbnVsbCB8fCBtb2RhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLW9wZW4nKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlSWQgPSBwYXJzZUZsb2F0KHRoaXMuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb24gPSByZXNwb25zZVBva2Vtb25zLmZpbmQoKGRhdGEpID0+IGRhdGEuaWQgPT09IHVzZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxfX2NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NvbnRlbnQnKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsX19jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbF9fY29udGVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBva2Vtb25fX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwb2tlbW9uX19iYWNrXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZXZyb24tYmFjay1vdXRsaW5lXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb2tlbW9uX19pZFwiPiMke3Bva2Vtb24gPT09IG51bGwgfHwgcG9rZW1vbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9rZW1vbi5pZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBva2Vtb25fX21haW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uX19pbWFnZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBva2Vtb25fX2JsdXJcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgke3Bva2Vtb24gPT09IG51bGwgfHwgcG9rZW1vbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9rZW1vbi5pbWFnZX0pO1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicG9rZW1vbl9faW1hZ2VtXCIgc3JjPVwiJHtwb2tlbW9uID09PSBudWxsIHx8IHBva2Vtb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBva2Vtb24uaW1hZ2V9XCIgaGVpZ2h0PVwiMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBva2Vtb25fX2luZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb2tlbW9uX19uYW1lXCI+JHtwb2tlbW9uID09PSBudWxsIHx8IHBva2Vtb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBva2Vtb24ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uX190eXBlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICR7cG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnR5cGUubWFwKCh0eXBlKSA9PiBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBva2Vtb25fX3R5cGVOYW1lIHBva2Vtb25fX3R5cGVOYW1lLS0ke3R5cGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHR5cGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJ1xcbicpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIC8vIGV2ZW50b3NcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vbl9fYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uX19iYWNrJyk7XHJcbiAgICAgICAgICAgIHBva2Vtb25fX2JhY2sgPT09IG51bGwgfHwgcG9rZW1vbl9fYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9rZW1vbl9fYmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE5PVEU6IEZlY2hhIHRvZG9zIG9zIG1vZGFsXHJcbiAgICAgICAgY29uc3QgbW9kYWxfX2Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19jbG9zZScpO1xyXG4gICAgICAgIG1vZGFsX19jbG9zZSA9PT0gbnVsbCB8fCBtb2RhbF9fY2xvc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGFsX19jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==