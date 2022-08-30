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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pokeapi_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pokeapi-typescript */ "./node_modules/pokeapi-typescript/dist/index.js");
/* harmony import */ var pokeapi_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pokeapi_typescript__WEBPACK_IMPORTED_MODULE_0__);
// const P = new Pokedex.Pokedex()

const P = (pokeapi_typescript__WEBPACK_IMPORTED_MODULE_0___default().Pokemon); // const capitalizeFirstLetter = (value: string) => {
//   return value.charAt(0).toUpperCase() + value.slice(1)
// }

window.onload = async () => {
  const html = document.querySelector('.wrapper');
  const getPokemons = await P.listAll();
  const pokemons = getPokemons.results;
  const filterPokemons = pokemons.filter((_, index) => index < 50);
  const responsePokemons = await Promise.all(filterPokemons.map(async pokemon => {
    const result = await pokeapi_typescript__WEBPACK_IMPORTED_MODULE_0___default().Pokemon.fetch(pokemon.name);
    return {
      id: result.id,
      name: result.name,
      image: result.sprites.front_default,
      type: result.types.map(({
        type
      }) => type.name)
    };
  }));
  const cardsHtml = responsePokemons.map(pokemon => `
    <div class="card" data-id="${pokemon.id}">
      <img src="${pokemon.image}" width="50" height="50" />
      <span>${pokemon.name}</span>
    </div>
  `);
  if (html) html.innerHTML = cardsHtml.join('\n'); // NOTE: Evento para abrir o modal ao clicar no card
  // const cardAll = document.querySelectorAll('.card')
  // cardAll.forEach(function (abobrinha) {
  //   abobrinha.addEventListener('click', function () {
  //     const modal = document.querySelector('.modal')
  //     modal!.classList.remove('modal--close')
  //     modal?.classList.add('modal--open')
  //     const useId = parseFloat(this.dataset.id)
  //     const pokemon = responsePokemons.find((data) => data.id === useId)
  //     const modal__content = document.querySelector('.modal__content')
  //     if (modal__content) {
  //       modal__content.innerHTML = `
  //       <div class="pokemon">
  //         <div class="pokemon__head">
  //           <button class="pokemon__back" type="button">
  //             <ion-icon name="chevron-back-outline"></ion-icon>
  //           </button>
  //           <span class="pokemon__id">#${pokemon.id}</span>
  //         </div>
  //         <div class="pokemon__main">
  //           <div class="pokemon__imagem">
  //             <div class="pokemon__blur" style="background-image: url(${
  //               pokemon.image
  //             });"></div>
  //             <img class="pokemon__imagem" src="${
  //               pokemon.image
  //             }" height="300" />
  //           </div>
  //           <div class="pokemon__info">
  //             <span class="pokemon__name">${pokemon.name}</span>
  //             <div class="pokemon__types">
  //               ${pokemon.type
  //                 .map(
  //                   (type) => `
  //                 <p class="pokemon__typeName pokemon__typeName--${type}">
  //                   ${capitalizeFirstLetter(type)}
  //                 </p>
  //               `
  //                 )
  //                 .join('\n')}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `
  //     }
  //     // eventos
  //     const pokemon__back = document.querySelector('.pokemon__back')
  //     pokemon__back.addEventListener('click', function () {
  //       modal.classList.remove('modal--open')
  //       modal.classList.add('modal--close')
  //     })
  //   })
  // })
  // ELEMENTO .ADD_EVENTO('EVENTO DE CLICK', () => {
  //   // meu codigo
  // })
  // NOTE: Fecha todos os modal
  // const modal__close = document.querySelector('.modal__close')
  // modal__close.addEventListener('click', function () {
  //   const modal = document.querySelector('.modal')
  //   modal.classList.remove('modal--open')
  //   modal.classList.add('modal--close')
  // })
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGdEQUFnRCxpREFBaUQ7QUFDakc7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxtREFBbUQsaURBQWlEO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVSxtREFBbUQ7QUFDNUU7QUFDQSxlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RCxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1YsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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Q0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDRCxDQTdGRCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzLy4vbm9kZV9tb2R1bGVzL0BkaXNjb3JkanMvY29sbGVjdGlvbi9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9AdW5nYXAvdXJsLXNlYXJjaC1wYXJhbXMvZXNtL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9jcm9zcy1mZXRjaC9kaXN0L2Jyb3dzZXItcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzLy4vbm9kZV9tb2R1bGVzL3Bva2VhcGktdHlwZXNjcmlwdC9kaXN0L2NsYXNzZXMvRW5kcG9pbnQuanMiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzLy4vbm9kZV9tb2R1bGVzL3Bva2VhcGktdHlwZXNjcmlwdC9kaXN0L2NsYXNzZXMvTmFtZWRFbmRwb2ludC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9ub2RlX21vZHVsZXMvcG9rZWFwaS10eXBlc2NyaXB0L2Rpc3QvZGVjb3JhdG9ycy9lbnVtZXJhYmxlLmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy8uL25vZGVfbW9kdWxlcy9wb2tlYXBpLXR5cGVzY3JpcHQvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9ub2RlX21vZHVsZXMvcG9rZWFwaS10eXBlc2NyaXB0L2Rpc3QvaW50ZXJmYWNlcy9CZXJyaWVzL0JlcnJ5LmpzIiwid2VicGFjazovL2NsaWVudC1wb2tlbW9uLWNhcmRzLXZhbmlsbGFqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2xpZW50LXBva2Vtb24tY2FyZHMtdmFuaWxsYWpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jbGllbnQtcG9rZW1vbi1jYXJkcy12YW5pbGxhanMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSB2b2lkIDA7XG4vKipcbiAqIEEgTWFwIHdpdGggYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMuIFRoaXMgaXMgdXNlZCB0aHJvdWdob3V0IGRpc2NvcmQuanMgcmF0aGVyIHRoYW4gQXJyYXlzIGZvciBhbnl0aGluZyB0aGF0IGhhc1xuICogYW4gSUQsIGZvciBzaWduaWZpY2FudGx5IGltcHJvdmVkIHBlcmZvcm1hbmNlIGFuZCBlYXNlLW9mLXVzZS5cbiAqIEBleHRlbmRzIHtNYXB9XG4gKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSAtIFRoZSBhbW91bnQgb2YgZWxlbWVudHMgaW4gdGhpcyBjb2xsZWN0aW9uLlxuICovXG5jbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihlbnRyaWVzKSB7XG4gICAgICAgIHN1cGVyKGVudHJpZXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2FjaGVkIGFycmF5IGZvciB0aGUgYGFycmF5KClgIG1ldGhvZCAtIHdpbGwgYmUgcmVzZXQgdG8gYG51bGxgIHdoZW5ldmVyIGBzZXQoKWAgb3IgYGRlbGV0ZSgpYCBhcmUgY2FsbGVkXG4gICAgICAgICAqIEBuYW1lIENvbGxlY3Rpb24jX2FycmF5XG4gICAgICAgICAqIEB0eXBlIHs/QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19hcnJheScsIHsgdmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZWQgYXJyYXkgZm9yIHRoZSBga2V5QXJyYXkoKWAgbWV0aG9kIC0gd2lsbCBiZSByZXNldCB0byBgbnVsbGAgd2hlbmV2ZXIgYHNldCgpYCBvciBgZGVsZXRlKClgIGFyZSBjYWxsZWRcbiAgICAgICAgICogQG5hbWUgQ29sbGVjdGlvbiNfa2V5QXJyYXlcbiAgICAgICAgICogQHR5cGUgez9BcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2tleUFycmF5JywgeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWRlbnRpY2FsIHRvIFtNYXAuZ2V0KCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9nZXQpLlxuICAgICAqIEdldHMgYW4gZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LCBhbmQgcmV0dXJucyBpdHMgdmFsdWUsIG9yIGB1bmRlZmluZWRgIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7Kn0ga2V5IC0gVGhlIGtleSB0byBnZXQgZnJvbSB0aGlzIGNvbGxlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7KiB8IHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWRlbnRpY2FsIHRvIFtNYXAuc2V0KCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9zZXQpLlxuICAgICAqIFNldHMgYSBuZXcgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQga2V5IGFuZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGVsZW1lbnQgdG8gYWRkXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCB0byBhZGRcbiAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgKi9cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hcnJheSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2tleUFycmF5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWRlbnRpY2FsIHRvIFtNYXAuaGFzKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9oYXMpLlxuICAgICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGV4aXN0cyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGVsZW1lbnQgdG8gY2hlY2sgZm9yXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZWxlbWVudCBleGlzdHMsIGBmYWxzZWAgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gICAgICovXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuaGFzKGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElkZW50aWNhbCB0byBbTWFwLmRlbGV0ZSgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZGVsZXRlKS5cbiAgICAgKiBEZWxldGVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0geyp9IGtleSAtIFRoZSBrZXkgdG8gZGVsZXRlIGZyb20gdGhlIGNvbGxlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBlbGVtZW50IHdhcyByZW1vdmVkLCBgZmFsc2VgIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9rZXlBcnJheSA9IG51bGw7XG4gICAgICAgIHJldHVybiBzdXBlci5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWRlbnRpY2FsIHRvIFtNYXAuY2xlYXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL2NsZWFyKS5cbiAgICAgKiBSZW1vdmVzIGFsbCBlbGVtZW50cyBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIG9yZGVyZWQgYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGlzIGNvbGxlY3Rpb24sIGFuZCBjYWNoZXMgaXQgaW50ZXJuYWxseS4gVGhlIGFycmF5IHdpbGwgb25seSBiZVxuICAgICAqIHJlY29uc3RydWN0ZWQgaWYgYW4gaXRlbSBpcyBhZGRlZCB0byBvciByZW1vdmVkIGZyb20gdGhlIGNvbGxlY3Rpb24sIG9yIGlmIHlvdSBjaGFuZ2UgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcbiAgICAgKiBpdHNlbGYuIElmIHlvdSBkb24ndCB3YW50IHRoaXMgY2FjaGluZyBiZWhhdmlvciwgdXNlIGBbLi4uY29sbGVjdGlvbi52YWx1ZXMoKV1gIG9yXG4gICAgICogYEFycmF5LmZyb20oY29sbGVjdGlvbi52YWx1ZXMoKSlgIGluc3RlYWQuXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGFycmF5KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2FycmF5IHx8IHRoaXMuX2FycmF5Lmxlbmd0aCAhPT0gdGhpcy5zaXplKVxuICAgICAgICAgICAgdGhpcy5fYXJyYXkgPSBbLi4udGhpcy52YWx1ZXMoKV07XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvcmRlcmVkIGFycmF5IG9mIHRoZSBrZXlzIG9mIHRoaXMgY29sbGVjdGlvbiwgYW5kIGNhY2hlcyBpdCBpbnRlcm5hbGx5LiBUaGUgYXJyYXkgd2lsbCBvbmx5IGJlXG4gICAgICogcmVjb25zdHJ1Y3RlZCBpZiBhbiBpdGVtIGlzIGFkZGVkIHRvIG9yIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiwgb3IgaWYgeW91IGNoYW5nZSB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAgICAqIGl0c2VsZi4gSWYgeW91IGRvbid0IHdhbnQgdGhpcyBjYWNoaW5nIGJlaGF2aW9yLCB1c2UgYFsuLi5jb2xsZWN0aW9uLmtleXMoKV1gIG9yXG4gICAgICogYEFycmF5LmZyb20oY29sbGVjdGlvbi5rZXlzKCkpYCBpbnN0ZWFkLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBrZXlBcnJheSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9rZXlBcnJheSB8fCB0aGlzLl9rZXlBcnJheS5sZW5ndGggIT09IHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuX2tleUFycmF5ID0gWy4uLnRoaXMua2V5cygpXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleUFycmF5O1xuICAgIH1cbiAgICBmaXJzdChhbW91bnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICBpZiAoYW1vdW50IDwgMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3QoYW1vdW50ICogLTEpO1xuICAgICAgICBhbW91bnQgPSBNYXRoLm1pbih0aGlzLnNpemUsIGFtb3VudCk7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSB0aGlzLnZhbHVlcygpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpID0+IGl0ZXIubmV4dCgpLnZhbHVlKTtcbiAgICB9XG4gICAgZmlyc3RLZXkoYW1vdW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgIGlmIChhbW91bnQgPCAwKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdEtleShhbW91bnQgKiAtMSk7XG4gICAgICAgIGFtb3VudCA9IE1hdGgubWluKHRoaXMuc2l6ZSwgYW1vdW50KTtcbiAgICAgICAgY29uc3QgaXRlciA9IHRoaXMua2V5cygpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpID0+IGl0ZXIubmV4dCgpLnZhbHVlKTtcbiAgICB9XG4gICAgbGFzdChhbW91bnQpIHtcbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5hcnJheSgpO1xuICAgICAgICBpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGFtb3VudCA8IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdChhbW91bnQgKiAtMSk7XG4gICAgICAgIGlmICghYW1vdW50KVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gYXJyLnNsaWNlKC1hbW91bnQpO1xuICAgIH1cbiAgICBsYXN0S2V5KGFtb3VudCkge1xuICAgICAgICBjb25zdCBhcnIgPSB0aGlzLmtleUFycmF5KCk7XG4gICAgICAgIGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoYW1vdW50IDwgMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0S2V5KGFtb3VudCAqIC0xKTtcbiAgICAgICAgaWYgKCFhbW91bnQpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHJldHVybiBhcnIuc2xpY2UoLWFtb3VudCk7XG4gICAgfVxuICAgIHJhbmRvbShhbW91bnQpIHtcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhbW91bnQgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwIHx8ICFhbW91bnQpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGFyciA9IGFyci5zbGljZSgpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogYW1vdW50IH0sICgpID0+IGFyci5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCksIDEpWzBdKTtcbiAgICB9XG4gICAgcmFuZG9tS2V5KGFtb3VudCkge1xuICAgICAgICBsZXQgYXJyID0gdGhpcy5rZXlBcnJheSgpO1xuICAgICAgICBpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDAgfHwgIWFtb3VudClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBhbW91bnQgfSwgKCkgPT4gYXJyLnNwbGljZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSwgMSlbMF0pO1xuICAgIH1cbiAgICBmaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoZm4odmFsLCBrZXksIHRoaXMpKVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZmluZEtleShmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKGZuKHZhbCwga2V5LCB0aGlzKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHN3ZWVwKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmIChmbih2YWwsIGtleSwgdGhpcykpXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXNTaXplIC0gdGhpcy5zaXplO1xuICAgIH1cbiAgICBmaWx0ZXIoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXSgpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKGZuKHZhbCwga2V5LCB0aGlzKSlcbiAgICAgICAgICAgICAgICByZXN1bHRzLnNldChrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHBhcnRpdGlvbihmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICAvLyBUT0RPOiBjb25zaWRlciByZW1vdmluZyB0aGUgPEssIFY+IGZyb20gdGhlIGNvbnN0cnVjdG9ycyBhZnRlciBUUyAzLjcuMCBpcyByZWxlYXNlZCwgYXMgaXQgaW5mZXJzIGl0XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbbmV3IHRoaXMuY29uc3RydWN0b3JbU3ltYm9sLnNwZWNpZXNdKCksIG5ldyB0aGlzLmNvbnN0cnVjdG9yW1N5bWJvbC5zcGVjaWVzXSgpXTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmIChmbih2YWwsIGtleSwgdGhpcykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzWzBdLnNldChrZXksIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzWzFdLnNldChrZXksIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGZsYXRNYXAoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB0aGlzLm1hcChmbiwgdGhpc0FyZyk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10oKS5jb25jYXQoLi4uY29sbGVjdGlvbnMpO1xuICAgIH1cbiAgICBtYXAoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgY29uc3QgaXRlciA9IHRoaXMuZW50cmllcygpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5zaXplIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZXIubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGZuKHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWFwVmFsdWVzKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGNvbnN0IGNvbGwgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10oKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpXG4gICAgICAgICAgICBjb2xsLnNldChrZXksIGZuKHZhbCwga2V5LCB0aGlzKSk7XG4gICAgICAgIHJldHVybiBjb2xsO1xuICAgIH1cbiAgICBzb21lKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBmbiA9IGZuLmJpbmQodGhpc0FyZyk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoZm4odmFsLCBrZXksIHRoaXMpKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZXZlcnkoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGZuID0gZm4uYmluZCh0aGlzQXJnKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICghZm4odmFsLCBrZXksIHRoaXMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIHByb2R1Y2UgYSBzaW5nbGUgdmFsdWUuIElkZW50aWNhbCBpbiBiZWhhdmlvciB0b1xuICAgICAqIFtBcnJheS5yZWR1Y2UoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB1c2VkIHRvIHJlZHVjZSwgdGFraW5nIGZvdXIgYXJndW1lbnRzOyBgYWNjdW11bGF0b3JgLCBgY3VycmVudFZhbHVlYCwgYGN1cnJlbnRLZXlgLFxuICAgICAqIGFuZCBgY29sbGVjdGlvbmBcbiAgICAgKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFN0YXJ0aW5nIHZhbHVlIGZvciB0aGUgYWNjdW11bGF0b3JcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLnJlZHVjZSgoYWNjLCBndWlsZCkgPT4gYWNjICsgZ3VpbGQubWVtYmVyQ291bnQsIDApO1xuICAgICAqL1xuICAgIHJlZHVjZShmbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGxldCBhY2N1bXVsYXRvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY2N1bXVsYXRvciA9IGluaXRpYWxWYWx1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiB0aGlzKVxuICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gZm4oYWNjdW11bGF0b3IsIHZhbCwga2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgdGhpcykge1xuICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSB2YWw7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gZm4oYWNjdW11bGF0b3IsIHZhbCwga2V5LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBObyBpdGVtcyBpdGVyYXRlZC5cbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgY29sbGVjdGlvbiB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfVxuICAgIGVhY2goZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZuLCB0aGlzQXJnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRhcChmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgZm4gPSBmbi5iaW5kKHRoaXNBcmcpO1xuICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaWRlbnRpY2FsIHNoYWxsb3cgY29weSBvZiB0aGlzIGNvbGxlY3Rpb24uXG4gICAgICogQHJldHVybnMge0NvbGxlY3Rpb259XG4gICAgICogQGV4YW1wbGUgY29uc3QgbmV3Q29sbCA9IHNvbWVDb2xsLmNsb25lKCk7XG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10odGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbWJpbmVzIHRoaXMgY29sbGVjdGlvbiB3aXRoIG90aGVycyBpbnRvIGEgbmV3IGNvbGxlY3Rpb24uIE5vbmUgb2YgdGhlIHNvdXJjZSBjb2xsZWN0aW9ucyBhcmUgbW9kaWZpZWQuXG4gICAgICogQHBhcmFtIHsuLi5Db2xsZWN0aW9ufSBjb2xsZWN0aW9ucyBDb2xsZWN0aW9ucyB0byBtZXJnZVxuICAgICAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuICAgICAqIEBleGFtcGxlIGNvbnN0IG5ld0NvbGwgPSBzb21lQ29sbC5jb25jYXQoc29tZU90aGVyQ29sbCwgYW5vdGhlckNvbGwsIG9oQm95QUNvbGwpO1xuICAgICAqL1xuICAgIGNvbmNhdCguLi5jb2xsZWN0aW9ucykge1xuICAgICAgICBjb25zdCBuZXdDb2xsID0gdGhpcy5jbG9uZSgpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbGwgb2YgY29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBjb2xsKVxuICAgICAgICAgICAgICAgIG5ld0NvbGwuc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3Q29sbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgY29sbGVjdGlvbiBzaGFyZXMgaWRlbnRpY2FsIGl0ZW1zIHdpdGggYW5vdGhlci5cbiAgICAgKiBUaGlzIGlzIGRpZmZlcmVudCB0byBjaGVja2luZyBmb3IgZXF1YWxpdHkgdXNpbmcgZXF1YWwtc2lnbnMsIGJlY2F1c2VcbiAgICAgKiB0aGUgY29sbGVjdGlvbnMgbWF5IGJlIGRpZmZlcmVudCBvYmplY3RzLCBidXQgY29udGFpbiB0aGUgc2FtZSBkYXRhLlxuICAgICAqIEBwYXJhbSB7Q29sbGVjdGlvbn0gY29sbGVjdGlvbiBDb2xsZWN0aW9uIHRvIGNvbXBhcmUgd2l0aFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBjb2xsZWN0aW9ucyBoYXZlIGlkZW50aWNhbCBjb250ZW50c1xuICAgICAqL1xuICAgIGVxdWFscyhjb2xsZWN0aW9uKSB7XG4gICAgICAgIGlmICghY29sbGVjdGlvbilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMgPT09IGNvbGxlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSAhPT0gY29sbGVjdGlvbi5zaXplKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24uaGFzKGtleSkgfHwgdmFsdWUgIT09IGNvbGxlY3Rpb24uZ2V0KGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzb3J0IG1ldGhvZCBzb3J0cyB0aGUgaXRlbXMgb2YgYSBjb2xsZWN0aW9uIGluIHBsYWNlIGFuZCByZXR1cm5zIGl0LlxuICAgICAqIFRoZSBzb3J0IGlzIG5vdCBuZWNlc3NhcmlseSBzdGFibGUgaW4gTm9kZSAxMCBvciBvbGRlci5cbiAgICAgKiBUaGUgZGVmYXVsdCBzb3J0IG9yZGVyIGlzIGFjY29yZGluZyB0byBzdHJpbmcgVW5pY29kZSBjb2RlIHBvaW50cy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyZUZ1bmN0aW9uXSBTcGVjaWZpZXMgYSBmdW5jdGlvbiB0aGF0IGRlZmluZXMgdGhlIHNvcnQgb3JkZXIuXG4gICAgICogSWYgb21pdHRlZCwgdGhlIGNvbGxlY3Rpb24gaXMgc29ydGVkIGFjY29yZGluZyB0byBlYWNoIGNoYXJhY3RlcidzIFVuaWNvZGUgY29kZSBwb2ludCB2YWx1ZSxcbiAgICAgKiBhY2NvcmRpbmcgdG8gdGhlIHN0cmluZyBjb252ZXJzaW9uIG9mIGVhY2ggZWxlbWVudC5cbiAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgKiBAZXhhbXBsZSBjb2xsZWN0aW9uLnNvcnQoKHVzZXJBLCB1c2VyQikgPT4gdXNlckEuY3JlYXRlZFRpbWVzdGFtcCAtIHVzZXJCLmNyZWF0ZWRUaW1lc3RhbXApO1xuICAgICAqL1xuICAgIHNvcnQoY29tcGFyZUZ1bmN0aW9uID0gKHgsIHkpID0+IE51bWJlcih4ID4geSkgfHwgTnVtYmVyKHggPT09IHkpIC0gMSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gWy4uLnRoaXMuZW50cmllcygpXTtcbiAgICAgICAgZW50cmllcy5zb3J0KChhLCBiKSA9PiBjb21wYXJlRnVuY3Rpb24oYVsxXSwgYlsxXSwgYVswXSwgYlswXSkpO1xuICAgICAgICAvLyBQZXJmb3JtIGNsZWFuLXVwXG4gICAgICAgIHN1cGVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fa2V5QXJyYXkgPSBudWxsO1xuICAgICAgICAvLyBTZXQgdGhlIG5ldyBlbnRyaWVzXG4gICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgIHN1cGVyLnNldChrLCB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGludGVyc2VjdCBtZXRob2QgcmV0dXJucyBhIG5ldyBzdHJ1Y3R1cmUgY29udGFpbmluZyBpdGVtcyB3aGVyZSB0aGUga2V5cyBhcmUgcHJlc2VudCBpbiBib3RoIG9yaWdpbmFsIHN0cnVjdHVyZXMuXG4gICAgICogQHBhcmFtIHtDb2xsZWN0aW9ufSBvdGhlciBUaGUgb3RoZXIgQ29sbGVjdGlvbiB0byBmaWx0ZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGludGVyc2VjdChvdGhlcikge1xuICAgICAgICByZXR1cm4gb3RoZXIuZmlsdGVyKChfLCBrKSA9PiB0aGlzLmhhcyhrKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkaWZmZXJlbmNlIG1ldGhvZCByZXR1cm5zIGEgbmV3IHN0cnVjdHVyZSBjb250YWluaW5nIGl0ZW1zIHdoZXJlIHRoZSBrZXkgaXMgcHJlc2VudCBpbiBvbmUgb2YgdGhlIG9yaWdpbmFsIHN0cnVjdHVyZXMgYnV0IG5vdCB0aGUgb3RoZXIuXG4gICAgICogQHBhcmFtIHtDb2xsZWN0aW9ufSBvdGhlciBUaGUgb3RoZXIgQ29sbGVjdGlvbiB0byBmaWx0ZXIgYWdhaW5zdFxuICAgICAqIEByZXR1cm5zIHtDb2xsZWN0aW9ufVxuICAgICAqL1xuICAgIGRpZmZlcmVuY2Uob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIG90aGVyLmZpbHRlcigoXywgaykgPT4gIXRoaXMuaGFzKGspKS5jb25jYXQodGhpcy5maWx0ZXIoKF8sIGspID0+ICFvdGhlci5oYXMoaykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNvcnRlZCBtZXRob2Qgc29ydHMgdGhlIGl0ZW1zIG9mIGEgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBUaGUgc29ydCBpcyBub3QgbmVjZXNzYXJpbHkgc3RhYmxlIGluIE5vZGUgMTAgb3Igb2xkZXIuXG4gICAgICogVGhlIGRlZmF1bHQgc29ydCBvcmRlciBpcyBhY2NvcmRpbmcgdG8gc3RyaW5nIFVuaWNvZGUgY29kZSBwb2ludHMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVGdW5jdGlvbl0gU3BlY2lmaWVzIGEgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIHRoZSBzb3J0IG9yZGVyLlxuICAgICAqIElmIG9taXR0ZWQsIHRoZSBjb2xsZWN0aW9uIGlzIHNvcnRlZCBhY2NvcmRpbmcgdG8gZWFjaCBjaGFyYWN0ZXIncyBVbmljb2RlIGNvZGUgcG9pbnQgdmFsdWUsXG4gICAgICogYWNjb3JkaW5nIHRvIHRoZSBzdHJpbmcgY29udmVyc2lvbiBvZiBlYWNoIGVsZW1lbnQuXG4gICAgICogQHJldHVybnMge0NvbGxlY3Rpb259XG4gICAgICogQGV4YW1wbGUgY29sbGVjdGlvbi5zb3J0ZWQoKHVzZXJBLCB1c2VyQikgPT4gdXNlckEuY3JlYXRlZFRpbWVzdGFtcCAtIHVzZXJCLmNyZWF0ZWRUaW1lc3RhbXApO1xuICAgICAqL1xuICAgIHNvcnRlZChjb21wYXJlRnVuY3Rpb24gPSAoeCwgeSkgPT4gTnVtYmVyKHggPiB5KSB8fCBOdW1iZXIoeCA9PT0geSkgLSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcltTeW1ib2wuc3BlY2llc10oWy4uLnRoaXMuZW50cmllcygpXSlcbiAgICAgICAgICAgIC5zb3J0KChhdiwgYnYsIGFrLCBiaykgPT4gY29tcGFyZUZ1bmN0aW9uKGF2LCBidiwgYWssIGJrKSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24uZGVmYXVsdCA9IENvbGxlY3Rpb247XG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb247XG5leHBvcnRzLmRlZmF1bHQgPSBDb2xsZWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lMeUlzSW5OdmRYSmpaWE1pT2xzaWFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN08wRkJVVUU3T3pzN08wZEJTMGM3UVVGRFNDeE5RVUZOTEZWQlFXbENMRk5CUVZFc1IwRkJVenRKUVUxMlF5eFpRVUZ0UWl4UFFVRXJRenRSUVVOcVJTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkZaanM3T3pzN1YwRkxSenRSUVVOSUxFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RlFVRkZMRkZCUVZFc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZMRWxCUVVrc1JVRkJSU3haUVVGWkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVVXpSanM3T3pzN1YwRkxSenRSUVVOSUxFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RlFVRkZMRmRCUVZjc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZMRWxCUVVrc1JVRkJSU3haUVVGWkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTXZSaXhEUVVGRE8wbEJSVVE3T3pzN08wOUJTMGM3U1VGRFNTeEhRVUZITEVOQlFVTXNSMEZCVFR0UlFVTm9RaXhQUVVGUExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRka0lzUTBGQlF6dEpRVVZFT3pzN096czdUMEZOUnp0SlFVTkpMRWRCUVVjc1EwRkJReXhIUVVGTkxFVkJRVVVzUzBGQlVUdFJRVU14UWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU51UWl4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU4wUWl4UFFVRlBMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUXpsQ0xFTkJRVU03U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5KTEVkQlFVY3NRMEZCUXl4SFFVRk5PMUZCUTJoQ0xFOUJRVThzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVOMlFpeERRVUZETzBsQlJVUTdPenM3TzA5QlMwYzdTVUZEU1N4TlFVRk5MRU5CUVVNc1IwRkJUVHRSUVVOdVFpeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOdVFpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOMFFpeFBRVUZQTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRE1VSXNRMEZCUXp0SlFVVkVPenM3TzA5QlNVYzdTVUZEU1N4TFFVRkxPMUZCUTFnc1QwRkJUeXhMUVVGTExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdTVUZEZEVJc1EwRkJRenRKUVVWRU96czdPenM3VDBGTlJ6dEpRVU5KTEV0QlFVczdVVUZEV0N4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1MwRkJTeXhKUVVGSkxFTkJRVU1zU1VGQlNUdFpRVUZGTEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNaR0xFOUJRVThzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXp0SlFVTndRaXhEUVVGRE8wbEJSVVE3T3pzN096dFBRVTFITzBsQlEwa3NVVUZCVVR0UlFVTmtMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eEpRVUZKTEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1RVRkJUU3hMUVVGTExFbEJRVWtzUTBGQlF5eEpRVUZKTzFsQlFVVXNTVUZCU1N4RFFVRkRMRk5CUVZNc1IwRkJSeXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRPVVlzVDBGQlR5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRPMGxCUTNaQ0xFTkJRVU03U1VGVlRTeExRVUZMTEVOQlFVTXNUVUZCWlR0UlFVTXpRaXhKUVVGSkxFOUJRVThzVFVGQlRTeExRVUZMTEZkQlFWYzdXVUZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRja1VzU1VGQlNTeE5RVUZOTEVkQlFVY3NRMEZCUXp0WlFVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNNVF5eE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTNKRExFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRSUVVNelFpeFBRVUZQTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNSMEZCVFN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUTI1RkxFTkJRVU03U1VGVlRTeFJRVUZSTEVOQlFVTXNUVUZCWlR0UlFVTTVRaXhKUVVGSkxFOUJRVThzVFVGQlRTeExRVUZMTEZkQlFWYzdXVUZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRia1VzU1VGQlNTeE5RVUZOTEVkQlFVY3NRMEZCUXp0WlFVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTNKRExFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVONlFpeFBRVUZQTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNSMEZCVFN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUTI1RkxFTkJRVU03U1VGWFRTeEpRVUZKTEVOQlFVTXNUVUZCWlR0UlFVTXhRaXhOUVVGTkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkRla0lzU1VGQlNTeFBRVUZQTEUxQlFVMHNTMEZCU3l4WFFVRlhPMWxCUVVVc1QwRkJUeXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNNVJDeEpRVUZKTEUxQlFVMHNSMEZCUnl4RFFVRkRPMWxCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJReTlETEVsQlFVa3NRMEZCUXl4TlFVRk5PMWxCUVVVc1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRGRrSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdTVUZETTBJc1EwRkJRenRKUVZkTkxFOUJRVThzUTBGQlF5eE5RVUZsTzFGQlF6ZENMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0UlFVTTFRaXhKUVVGSkxFOUJRVThzVFVGQlRTeExRVUZMTEZkQlFWYzdXVUZCUlN4UFFVRlBMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpsRUxFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTTdXVUZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRiRVFzU1VGQlNTeERRVUZETEUxQlFVMDdXVUZCUlN4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVOMlFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU16UWl4RFFVRkRPMGxCVlUwc1RVRkJUU3hEUVVGRExFMUJRV1U3VVVGRE5VSXNTVUZCU1N4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFGQlEzWkNMRWxCUVVrc1QwRkJUeXhOUVVGTkxFdEJRVXNzVjBGQlZ6dFpRVUZGTEU5QlFVOHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SFFVRkhMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzUkdMRWxCUVVrc1IwRkJSeXhEUVVGRExFMUJRVTBzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5PMWxCUVVVc1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRE0wTXNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFJRVU5zUWl4UFFVRlBMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4RlFVRkZMRVZCUVVVc1IwRkJUU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNSMEZCUnl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNeFJ5eERRVUZETzBsQlZVMHNVMEZCVXl4RFFVRkRMRTFCUVdVN1VVRkRMMElzU1VGQlNTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJRekZDTEVsQlFVa3NUMEZCVHl4TlFVRk5MRXRCUVVzc1YwRkJWenRaUVVGRkxFOUJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM1JHTEVsQlFVa3NSMEZCUnl4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTzFsQlFVVXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkRNME1zUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVOc1FpeFBRVUZQTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNSMEZCVFN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTXhSeXhEUVVGRE8wbEJaVTBzU1VGQlNTeERRVUZETEVWQlFXMUVMRVZCUVVVc1QwRkJhVUk3VVVGRGFrWXNTVUZCU1N4UFFVRlBMRTlCUVU4c1MwRkJTeXhYUVVGWE8xbEJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRE1VUXNTMEZCU3l4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NSVUZCUlR0WlFVTTVRaXhKUVVGSkxFVkJRVVVzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJRenRuUWtGQlJTeFBRVUZQTEVkQlFVY3NRMEZCUXp0VFFVTnVRenRSUVVORUxFOUJRVThzVTBGQlV5eERRVUZETzBsQlEyeENMRU5CUVVNN1NVRmhUU3hQUVVGUExFTkJRVU1zUlVGQmJVUXNSVUZCUlN4UFFVRnBRanRSUVVOd1JpeEpRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRmRCUVZjN1dVRkJSU3hGUVVGRkxFZEJRVWNzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVNeFJDeExRVUZMTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzU1VGQlNTeEZRVUZGTzFsQlF6bENMRWxCUVVrc1JVRkJSU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRPMmRDUVVGRkxFOUJRVThzUjBGQlJ5eERRVUZETzFOQlEyNURPMUZCUTBRc1QwRkJUeXhUUVVGVExFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFWVk5MRXRCUVVzc1EwRkJReXhGUVVGdFJDeEZRVUZGTEU5QlFXbENPMUZCUTJ4R0xFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NWMEZCVnp0WlFVRkZMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUXpGRUxFMUJRVTBzV1VGQldTeEhRVUZITEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkRMMElzUzBGQlN5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUlVGQlJUdFpRVU01UWl4SlFVRkpMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkJSU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUTNwRE8xRkJRMFFzVDBGQlR5eFpRVUZaTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRKUVVOcVF5eERRVUZETzBsQllVMHNUVUZCVFN4RFFVRkRMRVZCUVcxRUxFVkJRVVVzVDBGQmFVSTdVVUZEYmtZc1NVRkJTU3hQUVVGUExFOUJRVThzUzBGQlN5eFhRVUZYTzFsQlFVVXNSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZETVVRc1RVRkJUU3hQUVVGUExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlowSXNRMEZCUXp0UlFVTnlSU3hMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTU3hGUVVGRk8xbEJRemxDTEVsQlFVa3NSVUZCUlN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETzJkQ1FVRkZMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUXpsRE8xRkJRMFFzVDBGQlR5eFBRVUZQTEVOQlFVTTdTVUZEYUVJc1EwRkJRenRKUVZsTkxGTkJRVk1zUTBGQlF5eEZRVUZ0UkN4RlFVRkZMRTlCUVdsQ08xRkJRM1JHTEVsQlFVa3NUMEZCVHl4UFFVRlBMRXRCUVVzc1YwRkJWenRaUVVGRkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRekZFTEhWSFFVRjFSenRSUVVOMlJ5eE5RVUZOTEU5QlFVOHNSMEZCYVVJc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGblFpeEZRVUZGTEVsQlFVa3NTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFXZENMRU5CUVVNc1EwRkJRenRSUVVNelNTeExRVUZMTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzU1VGQlNTeEZRVUZGTzFsQlF6bENMRWxCUVVrc1JVRkJSU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJRM1pDTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMkZCUTNwQ08ybENRVUZOTzJkQ1FVTk9MRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8yRkJRM3BDTzFOQlEwUTdVVUZEUkN4UFFVRlBMRTlCUVU4c1EwRkJRenRKUVVOb1FpeERRVUZETzBsQldVMHNUMEZCVHl4RFFVRkpMRVZCUVRSRUxFVkJRVVVzVDBGQmFVSTdVVUZEYUVjc1RVRkJUU3hYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRE1VTXNUMEZCVVN4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRTJRaXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTJ4SExFTkJRVU03U1VGWlRTeEhRVUZITEVOQlFVa3NSVUZCTmtNc1JVRkJSU3hQUVVGcFFqdFJRVU0zUlN4SlFVRkpMRTlCUVU4c1QwRkJUeXhMUVVGTExGZEJRVmM3V1VGQlJTeEZRVUZGTEVkQlFVY3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU14UkN4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZETlVJc1QwRkJUeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNUVUZCVFN4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJTeEhRVUZOTEVWQlFVVTdXVUZEYUVRc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeExRVUZMTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEzWkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkROMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRPMGxCV1Uwc1UwRkJVeXhEUVVGSkxFVkJRVFpETEVWQlFVVXNUMEZCYVVJN1VVRkRia1lzU1VGQlNTeFBRVUZQTEU5QlFVOHNTMEZCU3l4WFFVRlhPMWxCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNVVFzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCTkVJc1EwRkJRenRSUVVNNVJTeExRVUZMTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzU1VGQlNUdFpRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVVVzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFrVXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRZaXhEUVVGRE8wbEJXVTBzU1VGQlNTeERRVUZETEVWQlFXMUVMRVZCUVVVc1QwRkJhVUk3VVVGRGFrWXNTVUZCU1N4UFFVRlBMRTlCUVU4c1MwRkJTeXhYUVVGWE8xbEJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRE1VUXNTMEZCU3l4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NSVUZCUlR0WlFVTTVRaXhKUVVGSkxFVkJRVVVzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJRenRuUWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXp0VFFVTndRenRSUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyUXNRMEZCUXp0SlFWbE5MRXRCUVVzc1EwRkJReXhGUVVGdFJDeEZRVUZGTEU5QlFXbENPMUZCUTJ4R0xFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NWMEZCVnp0WlFVRkZMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUXpGRUxFdEJRVXNzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hKUVVGSkxFVkJRVVU3V1VGRE9VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkJSU3hQUVVGUExFdEJRVXNzUTBGQlF6dFRRVU4wUXp0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMklzUTBGQlF6dEpRVVZFT3pzN096czdPenRQUVZGSE8wbEJRMGtzVFVGQlRTeERRVUZKTEVWQlFUWkVMRVZCUVVVc1dVRkJaMEk3VVVGREwwWXNTVUZCU1N4WFFVRmxMRU5CUVVNN1VVRkZjRUlzU1VGQlNTeFBRVUZQTEZsQlFWa3NTMEZCU3l4WFFVRlhMRVZCUVVVN1dVRkRlRU1zVjBGQlZ5eEhRVUZITEZsQlFWa3NRMEZCUXp0WlFVTXpRaXhMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTVHRuUWtGQlJTeFhRVUZYTEVkQlFVY3NSVUZCUlN4RFFVRkRMRmRCUVZjc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpkRkxFOUJRVThzVjBGQlZ5eERRVUZETzFOQlEyNUNPMUZCUTBRc1NVRkJTU3hMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEycENMRXRCUVVzc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4SlFVRkpMRVZCUVVVN1dVRkRPVUlzU1VGQlNTeExRVUZMTEVWQlFVVTdaMEpCUTFZc1YwRkJWeXhIUVVGSExFZEJRVzFDTEVOQlFVTTdaMEpCUTJ4RExFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTTdaMEpCUTJRc1UwRkJVenRoUVVOVU8xbEJRMFFzVjBGQlZ5eEhRVUZITEVWQlFVVXNRMEZCUXl4WFFVRlhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTTVRenRSUVVWRUxIRkNRVUZ4UWp0UlFVTnlRaXhKUVVGSkxFdEJRVXNzUlVGQlJUdFpRVU5XTEUxQlFVMHNTVUZCU1N4VFFVRlRMRU5CUVVNc2EwUkJRV3RFTEVOQlFVTXNRMEZCUXp0VFFVTjRSVHRSUVVWRUxFOUJRVThzVjBGQlZ5eERRVUZETzBsQlEzQkNMRU5CUVVNN1NVRnBRazBzU1VGQlNTeERRVUZETEVWQlFXZEVMRVZCUVVVc1QwRkJhVUk3VVVGRE9VVXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGblJDeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUTNoRkxFOUJRVThzU1VGQlNTeERRVUZETzBsQlEySXNRMEZCUXp0SlFXVk5MRWRCUVVjc1EwRkJReXhGUVVFNFFpeEZRVUZGTEU5QlFXbENPMUZCUXpORUxFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NWMEZCVnp0WlFVRkZMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUXpGRUxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTlVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMklzUTBGQlF6dEpRVVZFT3pzN08wOUJTVWM3U1VGRFNTeExRVUZMTzFGQlExZ3NUMEZCVHl4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJVeXhEUVVGRE8wbEJRek5FTEVOQlFVTTdTVUZGUkRzN096czdUMEZMUnp0SlFVTkpMRTFCUVUwc1EwRkJReXhIUVVGSExGZEJRU3RDTzFGQlF5OURMRTFCUVUwc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0UlFVTTNRaXhMUVVGTExFMUJRVTBzU1VGQlNTeEpRVUZKTEZkQlFWY3NSVUZCUlR0WlFVTXZRaXhMUVVGTExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1NVRkJTVHRuUWtGQlJTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFRRVU55UkR0UlFVTkVMRTlCUVU4c1QwRkJUeXhEUVVGRE8wbEJRMmhDTEVOQlFVTTdTVUZGUkRzN096czdPMDlCVFVjN1NVRkRTU3hOUVVGTkxFTkJRVU1zVlVGQk5FSTdVVUZEZWtNc1NVRkJTU3hEUVVGRExGVkJRVlU3V1VGQlJTeFBRVUZQTEV0QlFVc3NRMEZCUXp0UlFVTTVRaXhKUVVGSkxFbEJRVWtzUzBGQlN5eFZRVUZWTzFsQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNN1VVRkRja01zU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4TFFVRkxMRlZCUVZVc1EwRkJReXhKUVVGSk8xbEJRVVVzVDBGQlR5eExRVUZMTEVOQlFVTTdVVUZEYUVRc1MwRkJTeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEV0QlFVc3NRMEZCUXl4SlFVRkpMRWxCUVVrc1JVRkJSVHRaUVVOb1F5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeExRVUZMTEV0QlFVc3NWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJUdG5Ra0ZETVVRc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRFlqdFRRVU5FTzFGQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1NVRkRZaXhEUVVGRE8wbEJSVVE3T3pzN096czdPenRQUVZOSE8wbEJRMGtzU1VGQlNTeERRVUZETEd0Q1FVRjNSaXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFWVXNSVUZCUlN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NUVUZCVFN4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEzcEtMRTFCUVUwc1QwRkJUeXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOd1F5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlZTeEZRVUZGTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRmVFVXNiVUpCUVcxQ08xRkJRMjVDTEV0QlFVc3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRSUVVOa0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTI1Q0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUlhSQ0xITkNRVUZ6UWp0UlFVTjBRaXhMUVVGTExFMUJRVTBzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1QwRkJUeXhGUVVGRk8xbEJRemRDTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEyaENPMUZCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU03U1VGRFlpeERRVUZETzBsQlJVUTdPenM3VDBGSlJ6dEpRVU5KTEZOQlFWTXNRMEZCUXl4TFFVRjFRanRSUVVOMlF5eFBRVUZQTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZETlVNc1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTU3hWUVVGVkxFTkJRVU1zUzBGQmRVSTdVVUZEZUVNc1QwRkJUeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpGR0xFTkJRVU03U1VGRlJEczdPenM3T3pzN08wOUJVMGM3U1VGRFNTeE5RVUZOTEVOQlFVTXNhMEpCUVhkR0xFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCVlN4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4TlFVRk5MRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTTdVVUZETTBvc1QwRkJVU3hKUVVGSkxFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJWVHRoUVVONFJTeEpRVUZKTEVOQlFVTXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RFFVRkRMR1ZCUVdVc1EwRkJReXhGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRemRFTEVOQlFVTTdPMEZCU1U4c1owTkJRVlU3UVVGd2FrSkxMR3RDUVVGUExFZEJRWE5DTEZWQlFWVXNRMEZCUXp0QlFXMXFRbWhGTEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVjc1ZVRkJWU3hEUVVGRE8wRkJSVFZDTEd0Q1FVRmxMRlZCUVZVc1EwRkJReUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1WNGNHOXlkQ0JwYm5SbGNtWmhZMlVnUTI5c2JHVmpkR2x2YmtOdmJuTjBjblZqZEc5eUlIdGNibHgwYm1WM0tDazZJRU52Ykd4bFkzUnBiMjQ4ZFc1cmJtOTNiaXdnZFc1cmJtOTNiajQ3WEc1Y2RHNWxkenhMTENCV1BpaGxiblJ5YVdWelB6b2dVbVZoWkc5dWJIbEJjbkpoZVR4eVpXRmtiMjVzZVNCYlN5d2dWbDArSUh3Z2JuVnNiQ2s2SUVOdmJHeGxZM1JwYjI0OFN5d2dWajQ3WEc1Y2RHNWxkenhMTENCV1BpaHBkR1Z5WVdKc1pUb2dTWFJsY21GaWJHVThjbVZoWkc5dWJIa2dXMHNzSUZaZFBpazZJRU52Ykd4bFkzUnBiMjQ4U3l3Z1ZqNDdYRzVjZEhKbFlXUnZibXg1SUhCeWIzUnZkSGx3WlRvZ1EyOXNiR1ZqZEdsdmJqeDFibXR1YjNkdUxDQjFibXR1YjNkdVBqdGNibHgwY21WaFpHOXViSGtnVzFONWJXSnZiQzV6Y0dWamFXVnpYVG9nUTI5c2JHVmpkR2x2YmtOdmJuTjBjblZqZEc5eU8xeHVmVnh1WEc0dktpcGNiaUFxSUVFZ1RXRndJSGRwZEdnZ1lXUmthWFJwYjI1aGJDQjFkR2xzYVhSNUlHMWxkR2h2WkhNdUlGUm9hWE1nYVhNZ2RYTmxaQ0IwYUhKdmRXZG9iM1YwSUdScGMyTnZjbVF1YW5NZ2NtRjBhR1Z5SUhSb1lXNGdRWEp5WVhseklHWnZjaUJoYm5sMGFHbHVaeUIwYUdGMElHaGhjMXh1SUNvZ1lXNGdTVVFzSUdadmNpQnphV2R1YVdacFkyRnVkR3g1SUdsdGNISnZkbVZrSUhCbGNtWnZjbTFoYm1ObElHRnVaQ0JsWVhObExXOW1MWFZ6WlM1Y2JpQXFJRUJsZUhSbGJtUnpJSHROWVhCOVhHNGdLaUJBY0hKdmNHVnlkSGtnZTI1MWJXSmxjbjBnYzJsNlpTQXRJRlJvWlNCaGJXOTFiblFnYjJZZ1pXeGxiV1Z1ZEhNZ2FXNGdkR2hwY3lCamIyeHNaV04wYVc5dUxseHVJQ292WEc1amJHRnpjeUJEYjJ4c1pXTjBhVzl1UEVzc0lGWStJR1Y0ZEdWdVpITWdUV0Z3UEVzc0lGWStJSHRjYmx4MGNISnBkbUYwWlNCZllYSnlZWGtoT2lCV1cxMGdmQ0J1ZFd4c08xeHVYSFJ3Y21sMllYUmxJRjlyWlhsQmNuSmhlU0U2SUV0YlhTQjhJRzUxYkd3N1hHNWNkSEIxWW14cFl5QnpkR0YwYVdNZ2NtVmhaRzl1YkhrZ1pHVm1ZWFZzZERvZ2RIbHdaVzltSUVOdmJHeGxZM1JwYjI0Z1BTQkRiMnhzWldOMGFXOXVPMXh1WEhSd2RXSnNhV01nV3lkamIyNXpkSEoxWTNSdmNpZGRPaUIwZVhCbGIyWWdRMjlzYkdWamRHbHZianRjYmx4dVhIUndkV0pzYVdNZ1kyOXVjM1J5ZFdOMGIzSW9aVzUwY21sbGN6ODZJRkpsWVdSdmJteDVRWEp5WVhrOGNtVmhaRzl1YkhrZ1cwc3NJRlpkUGlCOElHNTFiR3dwSUh0Y2JseDBYSFJ6ZFhCbGNpaGxiblJ5YVdWektUdGNibHh1WEhSY2RDOHFLbHh1WEhSY2RDQXFJRU5oWTJobFpDQmhjbkpoZVNCbWIzSWdkR2hsSUdCaGNuSmhlU2dwWUNCdFpYUm9iMlFnTFNCM2FXeHNJR0psSUhKbGMyVjBJSFJ2SUdCdWRXeHNZQ0IzYUdWdVpYWmxjaUJnYzJWMEtDbGdJRzl5SUdCa1pXeGxkR1VvS1dBZ1lYSmxJR05oYkd4bFpGeHVYSFJjZENBcUlFQnVZVzFsSUVOdmJHeGxZM1JwYjI0algyRnljbUY1WEc1Y2RGeDBJQ29nUUhSNWNHVWdlejlCY25KaGVYMWNibHgwWEhRZ0tpQkFjSEpwZG1GMFpWeHVYSFJjZENBcUwxeHVYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaDBhR2x6TENBblgyRnljbUY1Snl3Z2V5QjJZV3gxWlRvZ2JuVnNiQ3dnZDNKcGRHRmliR1U2SUhSeWRXVXNJR052Ym1acFozVnlZV0pzWlRvZ2RISjFaU0I5S1R0Y2JseHVYSFJjZEM4cUtseHVYSFJjZENBcUlFTmhZMmhsWkNCaGNuSmhlU0JtYjNJZ2RHaGxJR0JyWlhsQmNuSmhlU2dwWUNCdFpYUm9iMlFnTFNCM2FXeHNJR0psSUhKbGMyVjBJSFJ2SUdCdWRXeHNZQ0IzYUdWdVpYWmxjaUJnYzJWMEtDbGdJRzl5SUdCa1pXeGxkR1VvS1dBZ1lYSmxJR05oYkd4bFpGeHVYSFJjZENBcUlFQnVZVzFsSUVOdmJHeGxZM1JwYjI0algydGxlVUZ5Y21GNVhHNWNkRngwSUNvZ1FIUjVjR1VnZXo5QmNuSmhlWDFjYmx4MFhIUWdLaUJBY0hKcGRtRjBaVnh1WEhSY2RDQXFMMXh1WEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2gwYUdsekxDQW5YMnRsZVVGeWNtRjVKeXdnZXlCMllXeDFaVG9nYm5Wc2JDd2dkM0pwZEdGaWJHVTZJSFJ5ZFdVc0lHTnZibVpwWjNWeVlXSnNaVG9nZEhKMVpTQjlLVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCSlpHVnVkR2xqWVd3Z2RHOGdXMDFoY0M1blpYUW9LVjBvYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U21GMllWTmpjbWx3ZEM5U1pXWmxjbVZ1WTJVdlIyeHZZbUZzWDA5aWFtVmpkSE12VFdGd0wyZGxkQ2t1WEc1Y2RDQXFJRWRsZEhNZ1lXNGdaV3hsYldWdWRDQjNhWFJvSUhSb1pTQnpjR1ZqYVdacFpXUWdhMlY1TENCaGJtUWdjbVYwZFhKdWN5QnBkSE1nZG1Gc2RXVXNJRzl5SUdCMWJtUmxabWx1WldSZ0lHbG1JSFJvWlNCbGJHVnRaVzUwSUdSdlpYTWdibTkwSUdWNGFYTjBMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2V5cDlJR3RsZVNBdElGUm9aU0JyWlhrZ2RHOGdaMlYwSUdaeWIyMGdkR2hwY3lCamIyeHNaV04wYVc5dVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUhzcUlId2dkVzVrWldacGJtVmtmVnh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJR2RsZENoclpYazZJRXNwT2lCV0lId2dkVzVrWldacGJtVmtJSHRjYmx4MFhIUnlaWFIxY200Z2MzVndaWEl1WjJWMEtHdGxlU2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXUmxiblJwWTJGc0lIUnZJRnROWVhBdWMyVjBLQ2xkS0doMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBwaGRtRlRZM0pwY0hRdlVtVm1aWEpsYm1ObEwwZHNiMkpoYkY5UFltcGxZM1J6TDAxaGNDOXpaWFFwTGx4dVhIUWdLaUJUWlhSeklHRWdibVYzSUdWc1pXMWxiblFnYVc0Z2RHaGxJR052Ykd4bFkzUnBiMjRnZDJsMGFDQjBhR1VnYzNCbFkybG1hV1ZrSUd0bGVTQmhibVFnZG1Gc2RXVXVYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdhMlY1SUMwZ1ZHaGxJR3RsZVNCdlppQjBhR1VnWld4bGJXVnVkQ0IwYnlCaFpHUmNibHgwSUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNBdElGUm9aU0IyWVd4MVpTQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCMGJ5QmhaR1JjYmx4MElDb2dRSEpsZEhWeWJuTWdlME52Ykd4bFkzUnBiMjU5WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nYzJWMEtHdGxlVG9nU3l3Z2RtRnNkV1U2SUZZcE9pQjBhR2x6SUh0Y2JseDBYSFIwYUdsekxsOWhjbkpoZVNBOUlHNTFiR3c3WEc1Y2RGeDBkR2hwY3k1ZmEyVjVRWEp5WVhrZ1BTQnVkV3hzTzF4dVhIUmNkSEpsZEhWeWJpQnpkWEJsY2k1elpYUW9hMlY1TENCMllXeDFaU2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXUmxiblJwWTJGc0lIUnZJRnROWVhBdWFHRnpLQ2xkS0doMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBwaGRtRlRZM0pwY0hRdlVtVm1aWEpsYm1ObEwwZHNiMkpoYkY5UFltcGxZM1J6TDAxaGNDOW9ZWE1wTGx4dVhIUWdLaUJEYUdWamEzTWdhV1lnWVc0Z1pXeGxiV1Z1ZENCbGVHbHpkSE1nYVc0Z2RHaGxJR052Ykd4bFkzUnBiMjR1WEc1Y2RDQXFJRUJ3WVhKaGJTQjdLbjBnYTJWNUlDMGdWR2hsSUd0bGVTQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCMGJ5QmphR1ZqYXlCbWIzSmNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlHQjBjblZsWUNCcFppQjBhR1VnWld4bGJXVnVkQ0JsZUdsemRITXNJR0JtWVd4elpXQWdhV1lnYVhRZ1pHOWxjeUJ1YjNRZ1pYaHBjM1F1WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nYUdGektHdGxlVG9nU3lrNklHSnZiMnhsWVc0Z2UxeHVYSFJjZEhKbGRIVnliaUJ6ZFhCbGNpNW9ZWE1vYTJWNUtUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJKWkdWdWRHbGpZV3dnZEc4Z1cwMWhjQzVrWld4bGRHVW9LVjBvYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U21GMllWTmpjbWx3ZEM5U1pXWmxjbVZ1WTJVdlIyeHZZbUZzWDA5aWFtVmpkSE12VFdGd0wyUmxiR1YwWlNrdVhHNWNkQ0FxSUVSbGJHVjBaWE1nWVc0Z1pXeGxiV1Z1ZENCbWNtOXRJSFJvWlNCamIyeHNaV04wYVc5dUxseHVYSFFnS2lCQWNHRnlZVzBnZXlwOUlHdGxlU0F0SUZSb1pTQnJaWGtnZEc4Z1pHVnNaWFJsSUdaeWIyMGdkR2hsSUdOdmJHeGxZM1JwYjI1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUdCMGNuVmxZQ0JwWmlCMGFHVWdaV3hsYldWdWRDQjNZWE1nY21WdGIzWmxaQ3dnWUdaaGJITmxZQ0JwWmlCMGFHVWdaV3hsYldWdWRDQmtiMlZ6SUc1dmRDQmxlR2x6ZEM1Y2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCa1pXeGxkR1VvYTJWNU9pQkxLVG9nWW05dmJHVmhiaUI3WEc1Y2RGeDBkR2hwY3k1ZllYSnlZWGtnUFNCdWRXeHNPMXh1WEhSY2RIUm9hWE11WDJ0bGVVRnljbUY1SUQwZ2JuVnNiRHRjYmx4MFhIUnlaWFIxY200Z2MzVndaWEl1WkdWc1pYUmxLR3RsZVNrN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dTV1JsYm5ScFkyRnNJSFJ2SUZ0TllYQXVZMnhsWVhJb0tWMG9hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTbUYyWVZOamNtbHdkQzlTWldabGNtVnVZMlV2UjJ4dlltRnNYMDlpYW1WamRITXZUV0Z3TDJOc1pXRnlLUzVjYmx4MElDb2dVbVZ0YjNabGN5QmhiR3dnWld4bGJXVnVkSE1nWm5KdmJTQjBhR1VnWTI5c2JHVmpkR2x2Ymk1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTNWdVpHVm1hVzVsWkgxY2JseDBJQ292WEc1Y2RIQjFZbXhwWXlCamJHVmhjaWdwT2lCMmIybGtJSHRjYmx4MFhIUnlaWFIxY200Z2MzVndaWEl1WTJ4bFlYSW9LVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCRGNtVmhkR1Z6SUdGdUlHOXlaR1Z5WldRZ1lYSnlZWGtnYjJZZ2RHaGxJSFpoYkhWbGN5QnZaaUIwYUdseklHTnZiR3hsWTNScGIyNHNJR0Z1WkNCallXTm9aWE1nYVhRZ2FXNTBaWEp1WVd4c2VTNGdWR2hsSUdGeWNtRjVJSGRwYkd3Z2IyNXNlU0JpWlZ4dVhIUWdLaUJ5WldOdmJuTjBjblZqZEdWa0lHbG1JR0Z1SUdsMFpXMGdhWE1nWVdSa1pXUWdkRzhnYjNJZ2NtVnRiM1psWkNCbWNtOXRJSFJvWlNCamIyeHNaV04wYVc5dUxDQnZjaUJwWmlCNWIzVWdZMmhoYm1kbElIUm9aU0JzWlc1bmRHZ2diMllnZEdobElHRnljbUY1WEc1Y2RDQXFJR2wwYzJWc1ppNGdTV1lnZVc5MUlHUnZiaWQwSUhkaGJuUWdkR2hwY3lCallXTm9hVzVuSUdKbGFHRjJhVzl5TENCMWMyVWdZRnN1TGk1amIyeHNaV04wYVc5dUxuWmhiSFZsY3lncFhXQWdiM0pjYmx4MElDb2dZRUZ5Y21GNUxtWnliMjBvWTI5c2JHVmpkR2x2Ymk1MllXeDFaWE1vS1NsZ0lHbHVjM1JsWVdRdVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0QmNuSmhlWDFjYmx4MElDb3ZYRzVjZEhCMVlteHBZeUJoY25KaGVTZ3BPaUJXVzEwZ2UxeHVYSFJjZEdsbUlDZ2hkR2hwY3k1ZllYSnlZWGtnZkh3Z2RHaHBjeTVmWVhKeVlYa3ViR1Z1WjNSb0lDRTlQU0IwYUdsekxuTnBlbVVwSUhSb2FYTXVYMkZ5Y21GNUlEMGdXeTR1TG5Sb2FYTXVkbUZzZFdWektDbGRPMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpMbDloY25KaGVUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJEY21WaGRHVnpJR0Z1SUc5eVpHVnlaV1FnWVhKeVlYa2diMllnZEdobElHdGxlWE1nYjJZZ2RHaHBjeUJqYjJ4c1pXTjBhVzl1TENCaGJtUWdZMkZqYUdWeklHbDBJR2x1ZEdWeWJtRnNiSGt1SUZSb1pTQmhjbkpoZVNCM2FXeHNJRzl1YkhrZ1ltVmNibHgwSUNvZ2NtVmpiMjV6ZEhKMVkzUmxaQ0JwWmlCaGJpQnBkR1Z0SUdseklHRmtaR1ZrSUhSdklHOXlJSEpsYlc5MlpXUWdabkp2YlNCMGFHVWdZMjlzYkdWamRHbHZiaXdnYjNJZ2FXWWdlVzkxSUdOb1lXNW5aU0IwYUdVZ2JHVnVaM1JvSUc5bUlIUm9aU0JoY25KaGVWeHVYSFFnS2lCcGRITmxiR1l1SUVsbUlIbHZkU0JrYjI0bmRDQjNZVzUwSUhSb2FYTWdZMkZqYUdsdVp5QmlaV2hoZG1sdmNpd2dkWE5sSUdCYkxpNHVZMjlzYkdWamRHbHZiaTVyWlhsektDbGRZQ0J2Y2x4dVhIUWdLaUJnUVhKeVlYa3Vabkp2YlNoamIyeHNaV04wYVc5dUxtdGxlWE1vS1NsZ0lHbHVjM1JsWVdRdVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0QmNuSmhlWDFjYmx4MElDb3ZYRzVjZEhCMVlteHBZeUJyWlhsQmNuSmhlU2dwT2lCTFcxMGdlMXh1WEhSY2RHbG1JQ2doZEdocGN5NWZhMlY1UVhKeVlYa2dmSHdnZEdocGN5NWZhMlY1UVhKeVlYa3ViR1Z1WjNSb0lDRTlQU0IwYUdsekxuTnBlbVVwSUhSb2FYTXVYMnRsZVVGeWNtRjVJRDBnV3k0dUxuUm9hWE11YTJWNWN5Z3BYVHRjYmx4MFhIUnlaWFIxY200Z2RHaHBjeTVmYTJWNVFYSnlZWGs3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1QySjBZV2x1Y3lCMGFHVWdabWx5YzNRZ2RtRnNkV1VvY3lrZ2FXNGdkR2hwY3lCamIyeHNaV04wYVc5dUxseHVYSFFnS2lCQWNHRnlZVzBnZTI1MWJXSmxjbjBnVzJGdGIzVnVkRjBnUVcxdmRXNTBJRzltSUhaaGJIVmxjeUIwYnlCdlluUmhhVzRnWm5KdmJTQjBhR1VnWW1WbmFXNXVhVzVuWEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHNxZkVGeWNtRjVQQ28rZlNCQklITnBibWRzWlNCMllXeDFaU0JwWmlCdWJ5QmhiVzkxYm5RZ2FYTWdjSEp2ZG1sa1pXUWdiM0lnWVc0Z1lYSnlZWGtnYjJZZ2RtRnNkV1Z6TENCemRHRnlkR2x1WnlCbWNtOXRJSFJvWlNCbGJtUWdhV1pjYmx4MElDb2dZVzF2ZFc1MElHbHpJRzVsWjJGMGFYWmxYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdabWx5YzNRb0tUb2dWaUI4SUhWdVpHVm1hVzVsWkR0Y2JseDBjSFZpYkdsaklHWnBjbk4wS0dGdGIzVnVkRG9nYm5WdFltVnlLVG9nVmx0ZE8xeHVYSFJ3ZFdKc2FXTWdabWx5YzNRb1lXMXZkVzUwUHpvZ2JuVnRZbVZ5S1RvZ1ZpQjhJRlpiWFNCOElIVnVaR1ZtYVc1bFpDQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQmhiVzkxYm5RZ1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCeVpYUjFjbTRnZEdocGN5NTJZV3gxWlhNb0tTNXVaWGgwS0NrdWRtRnNkV1U3WEc1Y2RGeDBhV1lnS0dGdGIzVnVkQ0E4SURBcElISmxkSFZ5YmlCMGFHbHpMbXhoYzNRb1lXMXZkVzUwSUNvZ0xURXBPMXh1WEhSY2RHRnRiM1Z1ZENBOUlFMWhkR2d1YldsdUtIUm9hWE11YzJsNlpTd2dZVzF2ZFc1MEtUdGNibHgwWEhSamIyNXpkQ0JwZEdWeUlEMGdkR2hwY3k1MllXeDFaWE1vS1R0Y2JseDBYSFJ5WlhSMWNtNGdRWEp5WVhrdVpuSnZiU2g3SUd4bGJtZDBhRG9nWVcxdmRXNTBJSDBzSUNncE9pQldJRDArSUdsMFpYSXVibVY0ZENncExuWmhiSFZsS1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlBZblJoYVc1eklIUm9aU0JtYVhKemRDQnJaWGtvY3lrZ2FXNGdkR2hwY3lCamIyeHNaV04wYVc5dUxseHVYSFFnS2lCQWNHRnlZVzBnZTI1MWJXSmxjbjBnVzJGdGIzVnVkRjBnUVcxdmRXNTBJRzltSUd0bGVYTWdkRzhnYjJKMFlXbHVJR1p5YjIwZ2RHaGxJR0psWjJsdWJtbHVaMXh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdLbnhCY25KaGVUd3FQbjBnUVNCemFXNW5iR1VnYTJWNUlHbG1JRzV2SUdGdGIzVnVkQ0JwY3lCd2NtOTJhV1JsWkNCdmNpQmhiaUJoY25KaGVTQnZaaUJyWlhsekxDQnpkR0Z5ZEdsdVp5Qm1jbTl0SUhSb1pTQmxibVFnYVdaY2JseDBJQ29nWVcxdmRXNTBJR2x6SUc1bFoyRjBhWFpsWEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWm1seWMzUkxaWGtvS1RvZ1N5QjhJSFZ1WkdWbWFXNWxaRHRjYmx4MGNIVmliR2xqSUdacGNuTjBTMlY1S0dGdGIzVnVkRG9nYm5WdFltVnlLVG9nUzF0ZE8xeHVYSFJ3ZFdKc2FXTWdabWx5YzNSTFpYa29ZVzF2ZFc1MFB6b2diblZ0WW1WeUtUb2dTeUI4SUV0YlhTQjhJSFZ1WkdWbWFXNWxaQ0I3WEc1Y2RGeDBhV1lnS0hSNWNHVnZaaUJoYlc5MWJuUWdQVDA5SUNkMWJtUmxabWx1WldRbktTQnlaWFIxY200Z2RHaHBjeTVyWlhsektDa3VibVY0ZENncExuWmhiSFZsTzF4dVhIUmNkR2xtSUNoaGJXOTFiblFnUENBd0tTQnlaWFIxY200Z2RHaHBjeTVzWVhOMFMyVjVLR0Z0YjNWdWRDQXFJQzB4S1R0Y2JseDBYSFJoYlc5MWJuUWdQU0JOWVhSb0xtMXBiaWgwYUdsekxuTnBlbVVzSUdGdGIzVnVkQ2s3WEc1Y2RGeDBZMjl1YzNRZ2FYUmxjaUE5SUhSb2FYTXVhMlY1Y3lncE8xeHVYSFJjZEhKbGRIVnliaUJCY25KaGVTNW1jbTl0S0hzZ2JHVnVaM1JvT2lCaGJXOTFiblFnZlN3Z0tDazZJRXNnUFQ0Z2FYUmxjaTV1WlhoMEtDa3VkbUZzZFdVcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRTlpZEdGcGJuTWdkR2hsSUd4aGMzUWdkbUZzZFdVb2N5a2dhVzRnZEdocGN5QmpiMnhzWldOMGFXOXVMaUJVYUdseklISmxiR2xsY3lCdmJpQjdRR3hwYm1zZ1EyOXNiR1ZqZEdsdmJpTmhjbkpoZVgwc0lHRnVaQ0IwYUhWeklIUm9aU0JqWVdOb2FXNW5YRzVjZENBcUlHMWxZMmhoYm1semJTQmhjSEJzYVdWeklHaGxjbVVnWVhNZ2QyVnNiQzVjYmx4MElDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlGdGhiVzkxYm5SZElFRnRiM1Z1ZENCdlppQjJZV3gxWlhNZ2RHOGdiMkowWVdsdUlHWnliMjBnZEdobElHVnVaRnh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdLbnhCY25KaGVUd3FQbjBnUVNCemFXNW5iR1VnZG1Gc2RXVWdhV1lnYm04Z1lXMXZkVzUwSUdseklIQnliM1pwWkdWa0lHOXlJR0Z1SUdGeWNtRjVJRzltSUhaaGJIVmxjeXdnYzNSaGNuUnBibWNnWm5KdmJTQjBhR1VnYzNSaGNuUWdhV1pjYmx4MElDb2dZVzF2ZFc1MElHbHpJRzVsWjJGMGFYWmxYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdiR0Z6ZENncE9pQldJSHdnZFc1a1pXWnBibVZrTzF4dVhIUndkV0pzYVdNZ2JHRnpkQ2hoYlc5MWJuUTZJRzUxYldKbGNpazZJRlpiWFR0Y2JseDBjSFZpYkdsaklHeGhjM1FvWVcxdmRXNTBQem9nYm5WdFltVnlLVG9nVmlCOElGWmJYU0I4SUhWdVpHVm1hVzVsWkNCN1hHNWNkRngwWTI5dWMzUWdZWEp5SUQwZ2RHaHBjeTVoY25KaGVTZ3BPMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdZVzF2ZFc1MElEMDlQU0FuZFc1a1pXWnBibVZrSnlrZ2NtVjBkWEp1SUdGeWNsdGhjbkl1YkdWdVozUm9JQzBnTVYwN1hHNWNkRngwYVdZZ0tHRnRiM1Z1ZENBOElEQXBJSEpsZEhWeWJpQjBhR2x6TG1acGNuTjBLR0Z0YjNWdWRDQXFJQzB4S1R0Y2JseDBYSFJwWmlBb0lXRnRiM1Z1ZENrZ2NtVjBkWEp1SUZ0ZE8xeHVYSFJjZEhKbGRIVnliaUJoY25JdWMyeHBZMlVvTFdGdGIzVnVkQ2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1QySjBZV2x1Y3lCMGFHVWdiR0Z6ZENCclpYa29jeWtnYVc0Z2RHaHBjeUJqYjJ4c1pXTjBhVzl1TGlCVWFHbHpJSEpsYkdsbGN5QnZiaUI3UUd4cGJtc2dRMjlzYkdWamRHbHZiaU5yWlhsQmNuSmhlWDBzSUdGdVpDQjBhSFZ6SUhSb1pTQmpZV05vYVc1blhHNWNkQ0FxSUcxbFkyaGhibWx6YlNCaGNIQnNhV1Z6SUdobGNtVWdZWE1nZDJWc2JDNWNibHgwSUNvZ1FIQmhjbUZ0SUh0dWRXMWlaWEo5SUZ0aGJXOTFiblJkSUVGdGIzVnVkQ0J2WmlCclpYbHpJSFJ2SUc5aWRHRnBiaUJtY205dElIUm9aU0JsYm1SY2JseDBJQ29nUUhKbGRIVnlibk1nZXlwOFFYSnlZWGs4S2o1OUlFRWdjMmx1WjJ4bElHdGxlU0JwWmlCdWJ5QmhiVzkxYm5RZ2FYTWdjSEp2ZG1sa1pXUWdiM0lnWVc0Z1lYSnlZWGtnYjJZZ2EyVjVjeXdnYzNSaGNuUnBibWNnWm5KdmJTQjBhR1VnYzNSaGNuUWdhV1pjYmx4MElDb2dZVzF2ZFc1MElHbHpJRzVsWjJGMGFYWmxYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdiR0Z6ZEV0bGVTZ3BPaUJMSUh3Z2RXNWtaV1pwYm1Wa08xeHVYSFJ3ZFdKc2FXTWdiR0Z6ZEV0bGVTaGhiVzkxYm5RNklHNTFiV0psY2lrNklFdGJYVHRjYmx4MGNIVmliR2xqSUd4aGMzUkxaWGtvWVcxdmRXNTBQem9nYm5WdFltVnlLVG9nU3lCOElFdGJYU0I4SUhWdVpHVm1hVzVsWkNCN1hHNWNkRngwWTI5dWMzUWdZWEp5SUQwZ2RHaHBjeTVyWlhsQmNuSmhlU2dwTzF4dVhIUmNkR2xtSUNoMGVYQmxiMllnWVcxdmRXNTBJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5a2djbVYwZFhKdUlHRnljbHRoY25JdWJHVnVaM1JvSUMwZ01WMDdYRzVjZEZ4MGFXWWdLR0Z0YjNWdWRDQThJREFwSUhKbGRIVnliaUIwYUdsekxtWnBjbk4wUzJWNUtHRnRiM1Z1ZENBcUlDMHhLVHRjYmx4MFhIUnBaaUFvSVdGdGIzVnVkQ2tnY21WMGRYSnVJRnRkTzF4dVhIUmNkSEpsZEhWeWJpQmhjbkl1YzJ4cFkyVW9MV0Z0YjNWdWRDazdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nVDJKMFlXbHVjeUIxYm1seGRXVWdjbUZ1Wkc5dElIWmhiSFZsS0hNcElHWnliMjBnZEdocGN5QmpiMnhzWldOMGFXOXVMaUJVYUdseklISmxiR2xsY3lCdmJpQjdRR3hwYm1zZ1EyOXNiR1ZqZEdsdmJpTmhjbkpoZVgwc0lHRnVaQ0IwYUhWeklIUm9aU0JqWVdOb2FXNW5YRzVjZENBcUlHMWxZMmhoYm1semJTQmhjSEJzYVdWeklHaGxjbVVnWVhNZ2QyVnNiQzVjYmx4MElDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlGdGhiVzkxYm5SZElFRnRiM1Z1ZENCdlppQjJZV3gxWlhNZ2RHOGdiMkowWVdsdUlISmhibVJ2Yld4NVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUhzcWZFRnljbUY1UENvK2ZTQkJJSE5wYm1kc1pTQjJZV3gxWlNCcFppQnVieUJoYlc5MWJuUWdhWE1nY0hKdmRtbGtaV1FnYjNJZ1lXNGdZWEp5WVhrZ2IyWWdkbUZzZFdWelhHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ2NtRnVaRzl0S0NrNklGWTdYRzVjZEhCMVlteHBZeUJ5WVc1a2IyMG9ZVzF2ZFc1ME9pQnVkVzFpWlhJcE9pQldXMTA3WEc1Y2RIQjFZbXhwWXlCeVlXNWtiMjBvWVcxdmRXNTBQem9nYm5WdFltVnlLVG9nVmlCOElGWmJYU0I3WEc1Y2RGeDBiR1YwSUdGeWNpQTlJSFJvYVhNdVlYSnlZWGtvS1R0Y2JseDBYSFJwWmlBb2RIbHdaVzltSUdGdGIzVnVkQ0E5UFQwZ0ozVnVaR1ZtYVc1bFpDY3BJSEpsZEhWeWJpQmhjbkpiVFdGMGFDNW1iRzl2Y2loTllYUm9MbkpoYm1SdmJTZ3BJQ29nWVhKeUxteGxibWQwYUNsZE8xeHVYSFJjZEdsbUlDaGhjbkl1YkdWdVozUm9JRDA5UFNBd0lIeDhJQ0ZoYlc5MWJuUXBJSEpsZEhWeWJpQmJYVHRjYmx4MFhIUmhjbklnUFNCaGNuSXVjMnhwWTJVb0tUdGNibHgwWEhSeVpYUjFjbTRnUVhKeVlYa3Vabkp2YlNoN0lHeGxibWQwYURvZ1lXMXZkVzUwSUgwc0lDZ3BPaUJXSUQwK0lHRnljaTV6Y0d4cFkyVW9UV0YwYUM1bWJHOXZjaWhOWVhSb0xuSmhibVJ2YlNncElDb2dZWEp5TG14bGJtZDBhQ2tzSURFcFd6QmRLVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCUFluUmhhVzV6SUhWdWFYRjFaU0J5WVc1a2IyMGdhMlY1S0hNcElHWnliMjBnZEdocGN5QmpiMnhzWldOMGFXOXVMaUJVYUdseklISmxiR2xsY3lCdmJpQjdRR3hwYm1zZ1EyOXNiR1ZqZEdsdmJpTnJaWGxCY25KaGVYMHNJR0Z1WkNCMGFIVnpJSFJvWlNCallXTm9hVzVuWEc1Y2RDQXFJRzFsWTJoaGJtbHpiU0JoY0hCc2FXVnpJR2hsY21VZ1lYTWdkMlZzYkM1Y2JseDBJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJRnRoYlc5MWJuUmRJRUZ0YjNWdWRDQnZaaUJyWlhseklIUnZJRzlpZEdGcGJpQnlZVzVrYjIxc2VWeHVYSFFnS2lCQWNtVjBkWEp1Y3lCN0tueEJjbkpoZVR3cVBuMGdRU0J6YVc1bmJHVWdhMlY1SUdsbUlHNXZJR0Z0YjNWdWRDQnBjeUJ3Y205MmFXUmxaQ0J2Y2lCaGJpQmhjbkpoZVZ4dVhIUWdLaTljYmx4MGNIVmliR2xqSUhKaGJtUnZiVXRsZVNncE9pQkxPMXh1WEhSd2RXSnNhV01nY21GdVpHOXRTMlY1S0dGdGIzVnVkRG9nYm5WdFltVnlLVG9nUzF0ZE8xeHVYSFJ3ZFdKc2FXTWdjbUZ1Wkc5dFMyVjVLR0Z0YjNWdWREODZJRzUxYldKbGNpazZJRXNnZkNCTFcxMGdlMXh1WEhSY2RHeGxkQ0JoY25JZ1BTQjBhR2x6TG10bGVVRnljbUY1S0NrN1hHNWNkRngwYVdZZ0tIUjVjR1Z2WmlCaGJXOTFiblFnUFQwOUlDZDFibVJsWm1sdVpXUW5LU0J5WlhSMWNtNGdZWEp5VzAxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSUdGeWNpNXNaVzVuZEdncFhUdGNibHgwWEhScFppQW9ZWEp5TG14bGJtZDBhQ0E5UFQwZ01DQjhmQ0FoWVcxdmRXNTBLU0J5WlhSMWNtNGdXMTA3WEc1Y2RGeDBZWEp5SUQwZ1lYSnlMbk5zYVdObEtDazdYRzVjZEZ4MGNtVjBkWEp1SUVGeWNtRjVMbVp5YjIwb2V5QnNaVzVuZEdnNklHRnRiM1Z1ZENCOUxDQW9LVG9nU3lBOVBpQmhjbkl1YzNCc2FXTmxLRTFoZEdndVpteHZiM0lvVFdGMGFDNXlZVzVrYjIwb0tTQXFJR0Z5Y2k1c1pXNW5kR2dwTENBeEtWc3dYU2s3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1UyVmhjbU5vWlhNZ1ptOXlJR0VnYzJsdVoyeGxJR2wwWlcwZ2QyaGxjbVVnZEdobElHZHBkbVZ1SUdaMWJtTjBhVzl1SUhKbGRIVnlibk1nWVNCMGNuVjBhSGtnZG1Gc2RXVXVJRlJvYVhNZ1ltVm9ZWFpsY3lCc2FXdGxYRzVjZENBcUlGdEJjbkpoZVM1bWFXNWtLQ2xkS0doMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBwaGRtRlRZM0pwY0hRdlVtVm1aWEpsYm1ObEwwZHNiMkpoYkY5UFltcGxZM1J6TDBGeWNtRjVMMlpwYm1RcExseHVYSFFnS2lBOGQyRnliajVCYkd3Z1kyOXNiR1ZqZEdsdmJuTWdkWE5sWkNCcGJpQkVhWE5qYjNKa0xtcHpJR0Z5WlNCdFlYQndaV1FnZFhOcGJtY2dkR2hsYVhJZ1lHbGtZQ0J3Y205d1pYSjBlU3dnWVc1a0lHbG1JSGx2ZFNCM1lXNTBJSFJ2SUdacGJtUWdZbmtnYVdRZ2VXOTFYRzVjZENBcUlITm9iM1ZzWkNCMWMyVWdkR2hsSUdCblpYUmdJRzFsZEdodlpDNGdVMlZsWEc1Y2RDQXFJRnROUkU1ZEtHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwcGhkbUZUWTNKcGNIUXZVbVZtWlhKbGJtTmxMMGRzYjJKaGJGOVBZbXBsWTNSekwwMWhjQzluWlhRcElHWnZjaUJrWlhSaGFXeHpMand2ZDJGeWJqNWNibHgwSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1ptNGdWR2hsSUdaMWJtTjBhVzl1SUhSdklIUmxjM1FnZDJsMGFDQW9jMmh2ZFd4a0lISmxkSFZ5YmlCaWIyOXNaV0Z1S1Z4dVhIUWdLaUJBY0dGeVlXMGdleXA5SUZ0MGFHbHpRWEpuWFNCV1lXeDFaU0IwYnlCMWMyVWdZWE1nWUhSb2FYTmdJSGRvWlc0Z1pYaGxZM1YwYVc1bklHWjFibU4wYVc5dVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUhzcWZWeHVYSFFnS2lCQVpYaGhiWEJzWlNCamIyeHNaV04wYVc5dUxtWnBibVFvZFhObGNpQTlQaUIxYzJWeUxuVnpaWEp1WVcxbElEMDlQU0FuUW05aUp5azdYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdabWx1WkNobWJqb2dLSFpoYkhWbE9pQldMQ0JyWlhrNklFc3NJR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUdKdmIyeGxZVzRwT2lCV0lId2dkVzVrWldacGJtVmtPMXh1WEhSd2RXSnNhV01nWm1sdVpEeFVQaWhtYmpvZ0tIUm9hWE02SUZRc0lIWmhiSFZsT2lCV0xDQnJaWGs2SUVzc0lHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJR0p2YjJ4bFlXNHNJSFJvYVhOQmNtYzZJRlFwT2lCV0lId2dkVzVrWldacGJtVmtPMXh1WEhSd2RXSnNhV01nWm1sdVpDaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0c0lIUm9hWE5CY21jL09pQjFibXR1YjNkdUtUb2dWaUI4SUhWdVpHVm1hVzVsWkNCN1hHNWNkRngwYVdZZ0tIUjVjR1Z2WmlCMGFHbHpRWEpuSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnWm00Z1BTQm1iaTVpYVc1a0tIUm9hWE5CY21jcE8xeHVYSFJjZEdadmNpQW9ZMjl1YzNRZ1cydGxlU3dnZG1Gc1hTQnZaaUIwYUdsektTQjdYRzVjZEZ4MFhIUnBaaUFvWm00b2RtRnNMQ0JyWlhrc0lIUm9hWE1wS1NCeVpYUjFjbTRnZG1Gc08xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdkVzVrWldacGJtVmtPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZObFlYSmphR1Z6SUdadmNpQjBhR1VnYTJWNUlHOW1JR0VnYzJsdVoyeGxJR2wwWlcwZ2QyaGxjbVVnZEdobElHZHBkbVZ1SUdaMWJtTjBhVzl1SUhKbGRIVnlibk1nWVNCMGNuVjBhSGtnZG1Gc2RXVXVJRlJvYVhNZ1ltVm9ZWFpsY3lCc2FXdGxYRzVjZENBcUlGdEJjbkpoZVM1bWFXNWtTVzVrWlhnb0tWMG9hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTbUYyWVZOamNtbHdkQzlTWldabGNtVnVZMlV2UjJ4dlltRnNYMDlpYW1WamRITXZRWEp5WVhrdlptbHVaRWx1WkdWNEtTeGNibHgwSUNvZ1luVjBJSEpsZEhWeWJuTWdkR2hsSUd0bGVTQnlZWFJvWlhJZ2RHaGhiaUIwYUdVZ2NHOXphWFJwYjI1aGJDQnBibVJsZUM1Y2JseDBJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm00Z1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUhSbGMzUWdkMmwwYUNBb2MyaHZkV3hrSUhKbGRIVnliaUJpYjI5c1pXRnVLVnh1WEhRZ0tpQkFjR0Z5WVcwZ2V5cDlJRnQwYUdselFYSm5YU0JXWVd4MVpTQjBieUIxYzJVZ1lYTWdZSFJvYVhOZ0lIZG9aVzRnWlhobFkzVjBhVzVuSUdaMWJtTjBhVzl1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHNxZlZ4dVhIUWdLaUJBWlhoaGJYQnNaU0JqYjJ4c1pXTjBhVzl1TG1acGJtUkxaWGtvZFhObGNpQTlQaUIxYzJWeUxuVnpaWEp1WVcxbElEMDlQU0FuUW05aUp5azdYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdabWx1WkV0bGVTaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQkxJSHdnZFc1a1pXWnBibVZrTzF4dVhIUndkV0pzYVdNZ1ptbHVaRXRsZVR4VVBpaG1iam9nS0hSb2FYTTZJRlFzSUhaaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0c0lIUm9hWE5CY21jNklGUXBPaUJMSUh3Z2RXNWtaV1pwYm1Wa08xeHVYSFJ3ZFdKc2FXTWdabWx1WkV0bGVTaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0c0lIUm9hWE5CY21jL09pQjFibXR1YjNkdUtUb2dTeUI4SUhWdVpHVm1hVzVsWkNCN1hHNWNkRngwYVdZZ0tIUjVjR1Z2WmlCMGFHbHpRWEpuSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnWm00Z1BTQm1iaTVpYVc1a0tIUm9hWE5CY21jcE8xeHVYSFJjZEdadmNpQW9ZMjl1YzNRZ1cydGxlU3dnZG1Gc1hTQnZaaUIwYUdsektTQjdYRzVjZEZ4MFhIUnBaaUFvWm00b2RtRnNMQ0JyWlhrc0lIUm9hWE1wS1NCeVpYUjFjbTRnYTJWNU8xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdkVzVrWldacGJtVmtPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZKbGJXOTJaWE1nYVhSbGJYTWdkR2hoZENCellYUnBjMlo1SUhSb1pTQndjbTkyYVdSbFpDQm1hV3gwWlhJZ1puVnVZM1JwYjI0dVhHNWNkQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdadUlFWjFibU4wYVc5dUlIVnpaV1FnZEc4Z2RHVnpkQ0FvYzJodmRXeGtJSEpsZEhWeWJpQmhJR0p2YjJ4bFlXNHBYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdXM1JvYVhOQmNtZGRJRlpoYkhWbElIUnZJSFZ6WlNCaGN5QmdkR2hwYzJBZ2QyaGxiaUJsZUdWamRYUnBibWNnWm5WdVkzUnBiMjVjYmx4MElDb2dRSEpsZEhWeWJuTWdlMjUxYldKbGNuMGdWR2hsSUc1MWJXSmxjaUJ2WmlCeVpXMXZkbVZrSUdWdWRISnBaWE5jYmx4MElDb3ZYRzVjZEhCMVlteHBZeUJ6ZDJWbGNDaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQnVkVzFpWlhJN1hHNWNkSEIxWW14cFl5QnpkMlZsY0R4VVBpaG1iam9nS0hSb2FYTTZJRlFzSUhaaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0c0lIUm9hWE5CY21jNklGUXBPaUJ1ZFcxaVpYSTdYRzVjZEhCMVlteHBZeUJ6ZDJWbGNDaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0c0lIUm9hWE5CY21jL09pQjFibXR1YjNkdUtUb2diblZ0WW1WeUlIdGNibHgwWEhScFppQW9kSGx3Wlc5bUlIUm9hWE5CY21jZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1NCbWJpQTlJR1p1TG1KcGJtUW9kR2hwYzBGeVp5azdYRzVjZEZ4MFkyOXVjM1FnY0hKbGRtbHZkWE5UYVhwbElEMGdkR2hwY3k1emFYcGxPMXh1WEhSY2RHWnZjaUFvWTI5dWMzUWdXMnRsZVN3Z2RtRnNYU0J2WmlCMGFHbHpLU0I3WEc1Y2RGeDBYSFJwWmlBb1ptNG9kbUZzTENCclpYa3NJSFJvYVhNcEtTQjBhR2x6TG1SbGJHVjBaU2hyWlhrcE8xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdjSEpsZG1sdmRYTlRhWHBsSUMwZ2RHaHBjeTV6YVhwbE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRWxrWlc1MGFXTmhiQ0IwYjF4dVhIUWdLaUJiUVhKeVlYa3VabWxzZEdWeUtDbGRLR2gwZEhCek9pOHZaR1YyWld4dmNHVnlMbTF2ZW1sc2JHRXViM0puTDJWdUxWVlRMMlJ2WTNNdlYyVmlMMHBoZG1GVFkzSnBjSFF2VW1WbVpYSmxibU5sTDBkc2IySmhiRjlQWW1wbFkzUnpMMEZ5Y21GNUwyWnBiSFJsY2lrc1hHNWNkQ0FxSUdKMWRDQnlaWFIxY201eklHRWdRMjlzYkdWamRHbHZiaUJwYm5OMFpXRmtJRzltSUdGdUlFRnljbUY1TGx4dVhIUWdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtYmlCVWFHVWdablZ1WTNScGIyNGdkRzhnZEdWemRDQjNhWFJvSUNoemFHOTFiR1FnY21WMGRYSnVJR0p2YjJ4bFlXNHBYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdXM1JvYVhOQmNtZGRJRlpoYkhWbElIUnZJSFZ6WlNCaGN5QmdkR2hwYzJBZ2QyaGxiaUJsZUdWamRYUnBibWNnWm5WdVkzUnBiMjVjYmx4MElDb2dRSEpsZEhWeWJuTWdlME52Ykd4bFkzUnBiMjU5WEc1Y2RDQXFJRUJsZUdGdGNHeGxJR052Ykd4bFkzUnBiMjR1Wm1sc2RHVnlLSFZ6WlhJZ1BUNGdkWE5sY2k1MWMyVnlibUZ0WlNBOVBUMGdKMEp2WWljcE8xeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklHWnBiSFJsY2lobWJqb2dLSFpoYkhWbE9pQldMQ0JyWlhrNklFc3NJR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUdKdmIyeGxZVzRwT2lCMGFHbHpPMXh1WEhSd2RXSnNhV01nWm1sc2RHVnlQRlErS0dadU9pQW9kR2hwY3pvZ1ZDd2dkbUZzZFdVNklGWXNJR3RsZVRvZ1N5d2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnWW05dmJHVmhiaXdnZEdocGMwRnlaem9nVkNrNklIUm9hWE03WEc1Y2RIQjFZbXhwWXlCbWFXeDBaWElvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUJpYjI5c1pXRnVMQ0IwYUdselFYSm5Qem9nZFc1cmJtOTNiaWs2SUhSb2FYTWdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdkR2hwYzBGeVp5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHWnVJRDBnWm00dVltbHVaQ2gwYUdselFYSm5LVHRjYmx4MFhIUmpiMjV6ZENCeVpYTjFiSFJ6SUQwZ2JtVjNJSFJvYVhNdVkyOXVjM1J5ZFdOMGIzSmJVM2x0WW05c0xuTndaV05wWlhOZFBFc3NJRlkrS0NrZ1lYTWdkR2hwY3p0Y2JseDBYSFJtYjNJZ0tHTnZibk4wSUZ0clpYa3NJSFpoYkYwZ2IyWWdkR2hwY3lrZ2UxeHVYSFJjZEZ4MGFXWWdLR1p1S0haaGJDd2dhMlY1TENCMGFHbHpLU2tnY21WemRXeDBjeTV6WlhRb2EyVjVMQ0IyWVd3cE8xeHVYSFJjZEgxY2JseDBYSFJ5WlhSMWNtNGdjbVZ6ZFd4MGN6dGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJRWVhKMGFYUnBiMjV6SUhSb1pTQmpiMnhzWldOMGFXOXVJR2x1ZEc4Z2RIZHZJR052Ykd4bFkzUnBiMjV6SUhkb1pYSmxJSFJvWlNCbWFYSnpkQ0JqYjJ4c1pXTjBhVzl1WEc1Y2RDQXFJR052Ym5SaGFXNXpJSFJvWlNCcGRHVnRjeUIwYUdGMElIQmhjM05sWkNCaGJtUWdkR2hsSUhObFkyOXVaQ0JqYjI1MFlXbHVjeUIwYUdVZ2FYUmxiWE1nZEdoaGRDQm1ZV2xzWldRdVhHNWNkQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdadUlFWjFibU4wYVc5dUlIVnpaV1FnZEc4Z2RHVnpkQ0FvYzJodmRXeGtJSEpsZEhWeWJpQmhJR0p2YjJ4bFlXNHBYRzVjZENBcUlFQndZWEpoYlNCN0tuMGdXM1JvYVhOQmNtZGRJRlpoYkhWbElIUnZJSFZ6WlNCaGN5QmdkR2hwYzJBZ2QyaGxiaUJsZUdWamRYUnBibWNnWm5WdVkzUnBiMjVjYmx4MElDb2dRSEpsZEhWeWJuTWdlME52Ykd4bFkzUnBiMjViWFgxY2JseDBJQ29nUUdWNFlXMXdiR1VnWTI5dWMzUWdXMkpwWnl3Z2MyMWhiR3hkSUQwZ1kyOXNiR1ZqZEdsdmJpNXdZWEowYVhScGIyNG9aM1ZwYkdRZ1BUNGdaM1ZwYkdRdWJXVnRZbVZ5UTI5MWJuUWdQaUF5TlRBcE8xeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklIQmhjblJwZEdsdmJpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQmJkR2hwY3l3Z2RHaHBjMTA3WEc1Y2RIQjFZbXhwWXlCd1lYSjBhWFJwYjI0OFZENG9abTQ2SUNoMGFHbHpPaUJVTENCMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQmliMjlzWldGdUxDQjBhR2x6UVhKbk9pQlVLVG9nVzNSb2FYTXNJSFJvYVhOZE8xeHVYSFJ3ZFdKc2FXTWdjR0Z5ZEdsMGFXOXVLR1p1T2lBb2RtRnNkV1U2SUZZc0lHdGxlVG9nU3l3Z1kyOXNiR1ZqZEdsdmJqb2dkR2hwY3lrZ1BUNGdZbTl2YkdWaGJpd2dkR2hwYzBGeVp6ODZJSFZ1YTI1dmQyNHBPaUJiZEdocGN5d2dkR2hwYzEwZ2UxeHVYSFJjZEdsbUlDaDBlWEJsYjJZZ2RHaHBjMEZ5WnlBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUdadUlEMGdabTR1WW1sdVpDaDBhR2x6UVhKbktUdGNibHgwWEhRdkx5QlVUMFJQT2lCamIyNXphV1JsY2lCeVpXMXZkbWx1WnlCMGFHVWdQRXNzSUZZK0lHWnliMjBnZEdobElHTnZibk4wY25WamRHOXljeUJoWm5SbGNpQlVVeUF6TGpjdU1DQnBjeUJ5Wld4bFlYTmxaQ3dnWVhNZ2FYUWdhVzVtWlhKeklHbDBYRzVjZEZ4MFkyOXVjM1FnY21WemRXeDBjem9nVzNSb2FYTXNJSFJvYVhOZElEMGdXMjVsZHlCMGFHbHpMbU52Ym5OMGNuVmpkRzl5VzFONWJXSnZiQzV6Y0dWamFXVnpYVHhMTENCV1BpZ3BJR0Z6SUhSb2FYTXNJRzVsZHlCMGFHbHpMbU52Ym5OMGNuVmpkRzl5VzFONWJXSnZiQzV6Y0dWamFXVnpYVHhMTENCV1BpZ3BJR0Z6SUhSb2FYTmRPMXh1WEhSY2RHWnZjaUFvWTI5dWMzUWdXMnRsZVN3Z2RtRnNYU0J2WmlCMGFHbHpLU0I3WEc1Y2RGeDBYSFJwWmlBb1ptNG9kbUZzTENCclpYa3NJSFJvYVhNcEtTQjdYRzVjZEZ4MFhIUmNkSEpsYzNWc2RITmJNRjB1YzJWMEtHdGxlU3dnZG1Gc0tUdGNibHgwWEhSY2RIMGdaV3h6WlNCN1hHNWNkRngwWEhSY2RISmxjM1ZzZEhOYk1WMHVjMlYwS0d0bGVTd2dkbUZzS1R0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2RGeDBjbVYwZFhKdUlISmxjM1ZzZEhNN1hHNWNkSDFjYmx4dVhIUXZLaXBjYmx4MElDb2dUV0Z3Y3lCbFlXTm9JR2wwWlcwZ2FXNTBieUJoSUVOdmJHeGxZM1JwYjI0c0lIUm9aVzRnYW05cGJuTWdkR2hsSUhKbGMzVnNkSE1nYVc1MGJ5QmhJSE5wYm1kc1pTQkRiMnhzWldOMGFXOXVMaUJKWkdWdWRHbGpZV3dnYVc0Z1ltVm9ZWFpwYjNJZ2RHOWNibHgwSUNvZ1cwRnljbUY1TG1ac1lYUk5ZWEFvS1Ywb2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlNtRjJZVk5qY21sd2RDOVNaV1psY21WdVkyVXZSMnh2WW1Gc1gwOWlhbVZqZEhNdlFYSnlZWGt2Wm14aGRFMWhjQ2t1WEc1Y2RDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR1p1SUVaMWJtTjBhVzl1SUhSb1lYUWdjSEp2WkhWalpYTWdZU0J1WlhjZ1EyOXNiR1ZqZEdsdmJseHVYSFFnS2lCQWNHRnlZVzBnZXlwOUlGdDBhR2x6UVhKblhTQldZV3gxWlNCMGJ5QjFjMlVnWVhNZ1lIUm9hWE5nSUhkb1pXNGdaWGhsWTNWMGFXNW5JR1oxYm1OMGFXOXVYRzVjZENBcUlFQnlaWFIxY201eklIdERiMnhzWldOMGFXOXVmVnh1WEhRZ0tpQkFaWGhoYlhCc1pTQmpiMnhzWldOMGFXOXVMbVpzWVhSTllYQW9aM1ZwYkdRZ1BUNGdaM1ZwYkdRdWJXVnRZbVZ5Y3k1allXTm9aU2s3WEc1Y2RDQXFMMXh1WEhSd2RXSnNhV01nWm14aGRFMWhjRHhVUGlobWJqb2dLSFpoYkhWbE9pQldMQ0JyWlhrNklFc3NJR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUVOdmJHeGxZM1JwYjI0OFN5d2dWRDRwT2lCRGIyeHNaV04wYVc5dVBFc3NJRlErTzF4dVhIUndkV0pzYVdNZ1pteGhkRTFoY0R4VUxDQlVhR2x6UGlobWJqb2dLSFJvYVhNNklGUm9hWE1zSUhaaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lFTnZiR3hsWTNScGIyNDhTeXdnVkQ0c0lIUm9hWE5CY21jNklGUm9hWE1wT2lCRGIyeHNaV04wYVc5dVBFc3NJRlErTzF4dVhIUndkV0pzYVdNZ1pteGhkRTFoY0R4VVBpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lFTnZiR3hsWTNScGIyNDhTeXdnVkQ0c0lIUm9hWE5CY21jL09pQjFibXR1YjNkdUtUb2dRMjlzYkdWamRHbHZianhMTENCVVBpQjdYRzVjZEZ4MFkyOXVjM1FnWTI5c2JHVmpkR2x2Ym5NZ1BTQjBhR2x6TG0xaGNDaG1iaXdnZEdocGMwRnlaeWs3WEc1Y2RGeDBjbVYwZFhKdUlDaHVaWGNnZEdocGN5NWpiMjV6ZEhKMVkzUnZjbHRUZVcxaWIyd3VjM0JsWTJsbGMxMDhTeXdnVkQ0b0tTQmhjeUJEYjJ4c1pXTjBhVzl1UEVzc0lGUStLUzVqYjI1allYUW9MaTR1WTI5c2JHVmpkR2x2Ym5NcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRTFoY0hNZ1pXRmphQ0JwZEdWdElIUnZJR0Z1YjNSb1pYSWdkbUZzZFdVZ2FXNTBieUJoYmlCaGNuSmhlUzRnU1dSbGJuUnBZMkZzSUdsdUlHSmxhR0YyYVc5eUlIUnZYRzVjZENBcUlGdEJjbkpoZVM1dFlYQW9LVjBvYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U21GMllWTmpjbWx3ZEM5U1pXWmxjbVZ1WTJVdlIyeHZZbUZzWDA5aWFtVmpkSE12UVhKeVlYa3ZiV0Z3S1M1Y2JseDBJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm00Z1JuVnVZM1JwYjI0Z2RHaGhkQ0J3Y205a2RXTmxjeUJoYmlCbGJHVnRaVzUwSUc5bUlIUm9aU0J1WlhjZ1lYSnlZWGtzSUhSaGEybHVaeUIwYUhKbFpTQmhjbWQxYldWdWRITmNibHgwSUNvZ1FIQmhjbUZ0SUhzcWZTQmJkR2hwYzBGeVoxMGdWbUZzZFdVZ2RHOGdkWE5sSUdGeklHQjBhR2x6WUNCM2FHVnVJR1Y0WldOMWRHbHVaeUJtZFc1amRHbHZibHh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdRWEp5WVhsOVhHNWNkQ0FxSUVCbGVHRnRjR3hsSUdOdmJHeGxZM1JwYjI0dWJXRndLSFZ6WlhJZ1BUNGdkWE5sY2k1MFlXY3BPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJRzFoY0R4VVBpaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lGUXBPaUJVVzEwN1hHNWNkSEIxWW14cFl5QnRZWEE4VkdocGN5d2dWRDRvWm00NklDaDBhR2x6T2lCVWFHbHpMQ0IyWVd4MVpUb2dWaXdnYTJWNU9pQkxMQ0JqYjJ4c1pXTjBhVzl1T2lCMGFHbHpLU0E5UGlCVUxDQjBhR2x6UVhKbk9pQlVhR2x6S1RvZ1ZGdGRPMXh1WEhSd2RXSnNhV01nYldGd1BGUStLR1p1T2lBb2RtRnNkV1U2SUZZc0lHdGxlVG9nU3l3Z1kyOXNiR1ZqZEdsdmJqb2dkR2hwY3lrZ1BUNGdWQ3dnZEdocGMwRnlaejg2SUhWdWEyNXZkMjRwT2lCVVcxMGdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdkR2hwYzBGeVp5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHWnVJRDBnWm00dVltbHVaQ2gwYUdselFYSm5LVHRjYmx4MFhIUmpiMjV6ZENCcGRHVnlJRDBnZEdocGN5NWxiblJ5YVdWektDazdYRzVjZEZ4MGNtVjBkWEp1SUVGeWNtRjVMbVp5YjIwb2V5QnNaVzVuZEdnNklIUm9hWE11YzJsNlpTQjlMQ0FvS1RvZ1ZDQTlQaUI3WEc1Y2RGeDBYSFJqYjI1emRDQmJhMlY1TENCMllXeDFaVjBnUFNCcGRHVnlMbTVsZUhRb0tTNTJZV3gxWlR0Y2JseDBYSFJjZEhKbGRIVnliaUJtYmloMllXeDFaU3dnYTJWNUxDQjBhR2x6S1R0Y2JseDBYSFI5S1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQk5ZWEJ6SUdWaFkyZ2dhWFJsYlNCMGJ5QmhibTkwYUdWeUlIWmhiSFZsSUdsdWRHOGdZU0JqYjJ4c1pXTjBhVzl1TGlCSlpHVnVkR2xqWVd3Z2FXNGdZbVZvWVhacGIzSWdkRzljYmx4MElDb2dXMEZ5Y21GNUxtMWhjQ2dwWFNob2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTFWVXk5a2IyTnpMMWRsWWk5S1lYWmhVMk55YVhCMEwxSmxabVZ5Wlc1alpTOUhiRzlpWVd4ZlQySnFaV04wY3k5QmNuSmhlUzl0WVhBcExseHVYSFFnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWJpQkdkVzVqZEdsdmJpQjBhR0YwSUhCeWIyUjFZMlZ6SUdGdUlHVnNaVzFsYm5RZ2IyWWdkR2hsSUc1bGR5QmpiMnhzWldOMGFXOXVMQ0IwWVd0cGJtY2dkR2h5WldVZ1lYSm5kVzFsYm5SelhHNWNkQ0FxSUVCd1lYSmhiU0I3S24wZ1czUm9hWE5CY21kZElGWmhiSFZsSUhSdklIVnpaU0JoY3lCZ2RHaHBjMkFnZDJobGJpQmxlR1ZqZFhScGJtY2dablZ1WTNScGIyNWNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2UwTnZiR3hsWTNScGIyNTlYRzVjZENBcUlFQmxlR0Z0Y0d4bElHTnZiR3hsWTNScGIyNHViV0Z3Vm1Gc2RXVnpLSFZ6WlhJZ1BUNGdkWE5sY2k1MFlXY3BPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJRzFoY0ZaaGJIVmxjenhVUGlobWJqb2dLSFpoYkhWbE9pQldMQ0JyWlhrNklFc3NJR052Ykd4bFkzUnBiMjQ2SUhSb2FYTXBJRDArSUZRcE9pQkRiMnhzWldOMGFXOXVQRXNzSUZRK08xeHVYSFJ3ZFdKc2FXTWdiV0Z3Vm1Gc2RXVnpQRlJvYVhNc0lGUStLR1p1T2lBb2RHaHBjem9nVkdocGN5d2dkbUZzZFdVNklGWXNJR3RsZVRvZ1N5d2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnVkN3Z2RHaHBjMEZ5WnpvZ1ZHaHBjeWs2SUVOdmJHeGxZM1JwYjI0OFN5d2dWRDQ3WEc1Y2RIQjFZbXhwWXlCdFlYQldZV3gxWlhNOFZENG9abTQ2SUNoMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQlVMQ0IwYUdselFYSm5Qem9nZFc1cmJtOTNiaWs2SUVOdmJHeGxZM1JwYjI0OFN5d2dWRDRnZTF4dVhIUmNkR2xtSUNoMGVYQmxiMllnZEdocGMwRnlaeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJR1p1SUQwZ1ptNHVZbWx1WkNoMGFHbHpRWEpuS1R0Y2JseDBYSFJqYjI1emRDQmpiMnhzSUQwZ2JtVjNJSFJvYVhNdVkyOXVjM1J5ZFdOMGIzSmJVM2x0WW05c0xuTndaV05wWlhOZFBFc3NJRlErS0NrZ1lYTWdRMjlzYkdWamRHbHZianhMTENCVVBqdGNibHgwWEhSbWIzSWdLR052Ym5OMElGdHJaWGtzSUhaaGJGMGdiMllnZEdocGN5a2dZMjlzYkM1elpYUW9hMlY1TENCbWJpaDJZV3dzSUd0bGVTd2dkR2hwY3lrcE8xeHVYSFJjZEhKbGRIVnliaUJqYjJ4c08xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU5vWldOcmN5QnBaaUIwYUdWeVpTQmxlR2x6ZEhNZ1lXNGdhWFJsYlNCMGFHRjBJSEJoYzNObGN5QmhJSFJsYzNRdUlFbGtaVzUwYVdOaGJDQnBiaUJpWldoaGRtbHZjaUIwYjF4dVhIUWdLaUJiUVhKeVlYa3VjMjl0WlNncFhTaG9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUtZWFpoVTJOeWFYQjBMMUpsWm1WeVpXNWpaUzlIYkc5aVlXeGZUMkpxWldOMGN5OUJjbkpoZVM5emIyMWxLUzVjYmx4MElDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnUm5WdVkzUnBiMjRnZFhObFpDQjBieUIwWlhOMElDaHphRzkxYkdRZ2NtVjBkWEp1SUdFZ1ltOXZiR1ZoYmlsY2JseDBJQ29nUUhCaGNtRnRJSHNxZlNCYmRHaHBjMEZ5WjEwZ1ZtRnNkV1VnZEc4Z2RYTmxJR0Z6SUdCMGFHbHpZQ0IzYUdWdUlHVjRaV04xZEdsdVp5Qm1kVzVqZEdsdmJseHVYSFFnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4xY2JseDBJQ29nUUdWNFlXMXdiR1VnWTI5c2JHVmpkR2x2Ymk1emIyMWxLSFZ6WlhJZ1BUNGdkWE5sY2k1a2FYTmpjbWx0YVc1aGRHOXlJRDA5UFNBbk1EQXdNQ2NwTzF4dVhIUWdLaTljYmx4MGNIVmliR2xqSUhOdmJXVW9abTQ2SUNoMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQmliMjlzWldGdUtUb2dZbTl2YkdWaGJqdGNibHgwY0hWaWJHbGpJSE52YldVOFZENG9abTQ2SUNoMGFHbHpPaUJVTENCMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQmliMjlzWldGdUxDQjBhR2x6UVhKbk9pQlVLVG9nWW05dmJHVmhianRjYmx4MGNIVmliR2xqSUhOdmJXVW9abTQ2SUNoMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQmliMjlzWldGdUxDQjBhR2x6UVhKblB6b2dkVzVyYm05M2JpazZJR0p2YjJ4bFlXNGdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdkR2hwYzBGeVp5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHWnVJRDBnWm00dVltbHVaQ2gwYUdselFYSm5LVHRjYmx4MFhIUm1iM0lnS0dOdmJuTjBJRnRyWlhrc0lIWmhiRjBnYjJZZ2RHaHBjeWtnZTF4dVhIUmNkRngwYVdZZ0tHWnVLSFpoYkN3Z2EyVjVMQ0IwYUdsektTa2djbVYwZFhKdUlIUnlkV1U3WEc1Y2RGeDBmVnh1WEhSY2RISmxkSFZ5YmlCbVlXeHpaVHRjYmx4MGZWeHVYRzVjZEM4cUtseHVYSFFnS2lCRGFHVmphM01nYVdZZ1lXeHNJR2wwWlcxeklIQmhjM05sY3lCaElIUmxjM1F1SUVsa1pXNTBhV05oYkNCcGJpQmlaV2hoZG1sdmNpQjBiMXh1WEhRZ0tpQmJRWEp5WVhrdVpYWmxjbmtvS1Ywb2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlNtRjJZVk5qY21sd2RDOVNaV1psY21WdVkyVXZSMnh2WW1Gc1gwOWlhbVZqZEhNdlFYSnlZWGt2WlhabGNua3BMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQm1iaUJHZFc1amRHbHZiaUIxYzJWa0lIUnZJSFJsYzNRZ0tITm9iM1ZzWkNCeVpYUjFjbTRnWVNCaWIyOXNaV0Z1S1Z4dVhIUWdLaUJBY0dGeVlXMGdleXA5SUZ0MGFHbHpRWEpuWFNCV1lXeDFaU0IwYnlCMWMyVWdZWE1nWUhSb2FYTmdJSGRvWlc0Z1pYaGxZM1YwYVc1bklHWjFibU4wYVc5dVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlZ4dVhIUWdLaUJBWlhoaGJYQnNaU0JqYjJ4c1pXTjBhVzl1TG1WMlpYSjVLSFZ6WlhJZ1BUNGdJWFZ6WlhJdVltOTBLVHRjYmx4MElDb3ZYRzVjZEhCMVlteHBZeUJsZG1WeWVTaG1iam9nS0haaGJIVmxPaUJXTENCclpYazZJRXNzSUdOdmJHeGxZM1JwYjI0NklIUm9hWE1wSUQwK0lHSnZiMnhsWVc0cE9pQmliMjlzWldGdU8xeHVYSFJ3ZFdKc2FXTWdaWFpsY25rOFZENG9abTQ2SUNoMGFHbHpPaUJVTENCMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQmliMjlzWldGdUxDQjBhR2x6UVhKbk9pQlVLVG9nWW05dmJHVmhianRjYmx4MGNIVmliR2xqSUdWMlpYSjVLR1p1T2lBb2RtRnNkV1U2SUZZc0lHdGxlVG9nU3l3Z1kyOXNiR1ZqZEdsdmJqb2dkR2hwY3lrZ1BUNGdZbTl2YkdWaGJpd2dkR2hwYzBGeVp6ODZJSFZ1YTI1dmQyNHBPaUJpYjI5c1pXRnVJSHRjYmx4MFhIUnBaaUFvZEhsd1pXOW1JSFJvYVhOQmNtY2dJVDA5SUNkMWJtUmxabWx1WldRbktTQm1iaUE5SUdadUxtSnBibVFvZEdocGMwRnlaeWs3WEc1Y2RGeDBabTl5SUNoamIyNXpkQ0JiYTJWNUxDQjJZV3hkSUc5bUlIUm9hWE1wSUh0Y2JseDBYSFJjZEdsbUlDZ2habTRvZG1Gc0xDQnJaWGtzSUhSb2FYTXBLU0J5WlhSMWNtNGdabUZzYzJVN1hHNWNkRngwZlZ4dVhIUmNkSEpsZEhWeWJpQjBjblZsTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlFRndjR3hwWlhNZ1lTQm1kVzVqZEdsdmJpQjBieUJ3Y205a2RXTmxJR0VnYzJsdVoyeGxJSFpoYkhWbExpQkpaR1Z1ZEdsallXd2dhVzRnWW1Wb1lYWnBiM0lnZEc5Y2JseDBJQ29nVzBGeWNtRjVMbkpsWkhWalpTZ3BYU2hvZEhSd2N6b3ZMMlJsZG1Wc2IzQmxjaTV0YjNwcGJHeGhMbTl5Wnk5bGJpMVZVeTlrYjJOekwxZGxZaTlLWVhaaFUyTnlhWEIwTDFKbFptVnlaVzVqWlM5SGJHOWlZV3hmVDJKcVpXTjBjeTlCY25KaGVTOXlaV1IxWTJVcExseHVYSFFnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWJpQkdkVzVqZEdsdmJpQjFjMlZrSUhSdklISmxaSFZqWlN3Z2RHRnJhVzVuSUdadmRYSWdZWEpuZFcxbGJuUnpPeUJnWVdOamRXMTFiR0YwYjNKZ0xDQmdZM1Z5Y21WdWRGWmhiSFZsWUN3Z1lHTjFjbkpsYm5STFpYbGdMRnh1WEhRZ0tpQmhibVFnWUdOdmJHeGxZM1JwYjI1Z1hHNWNkQ0FxSUVCd1lYSmhiU0I3S24wZ1cybHVhWFJwWVd4V1lXeDFaVjBnVTNSaGNuUnBibWNnZG1Gc2RXVWdabTl5SUhSb1pTQmhZMk4xYlhWc1lYUnZjbHh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdLbjFjYmx4MElDb2dRR1Y0WVcxd2JHVWdZMjlzYkdWamRHbHZiaTV5WldSMVkyVW9LR0ZqWXl3Z1ozVnBiR1FwSUQwK0lHRmpZeUFySUdkMWFXeGtMbTFsYldKbGNrTnZkVzUwTENBd0tUdGNibHgwSUNvdlhHNWNkSEIxWW14cFl5QnlaV1IxWTJVOFZENG9abTQ2SUNoaFkyTjFiWFZzWVhSdmNqb2dWQ3dnZG1Gc2RXVTZJRllzSUd0bGVUb2dTeXdnWTI5c2JHVmpkR2x2YmpvZ2RHaHBjeWtnUFQ0Z1ZDd2dhVzVwZEdsaGJGWmhiSFZsUHpvZ1ZDazZJRlFnZTF4dVhIUmNkR3hsZENCaFkyTjFiWFZzWVhSdmNpRTZJRlE3WEc1Y2JseDBYSFJwWmlBb2RIbHdaVzltSUdsdWFYUnBZV3hXWVd4MVpTQWhQVDBnSjNWdVpHVm1hVzVsWkNjcElIdGNibHgwWEhSY2RHRmpZM1Z0ZFd4aGRHOXlJRDBnYVc1cGRHbGhiRlpoYkhWbE8xeHVYSFJjZEZ4MFptOXlJQ2hqYjI1emRDQmJhMlY1TENCMllXeGRJRzltSUhSb2FYTXBJR0ZqWTNWdGRXeGhkRzl5SUQwZ1ptNG9ZV05qZFcxMWJHRjBiM0lzSUhaaGJDd2dhMlY1TENCMGFHbHpLVHRjYmx4MFhIUmNkSEpsZEhWeWJpQmhZMk4xYlhWc1lYUnZjanRjYmx4MFhIUjlYRzVjZEZ4MGJHVjBJR1pwY25OMElEMGdkSEoxWlR0Y2JseDBYSFJtYjNJZ0tHTnZibk4wSUZ0clpYa3NJSFpoYkYwZ2IyWWdkR2hwY3lrZ2UxeHVYSFJjZEZ4MGFXWWdLR1pwY25OMEtTQjdYRzVjZEZ4MFhIUmNkR0ZqWTNWdGRXeGhkRzl5SUQwZ2RtRnNJR0Z6SUhWdWEyNXZkMjRnWVhNZ1ZEdGNibHgwWEhSY2RGeDBabWx5YzNRZ1BTQm1ZV3h6WlR0Y2JseDBYSFJjZEZ4MFkyOXVkR2x1ZFdVN1hHNWNkRngwWEhSOVhHNWNkRngwWEhSaFkyTjFiWFZzWVhSdmNpQTlJR1p1S0dGalkzVnRkV3hoZEc5eUxDQjJZV3dzSUd0bGVTd2dkR2hwY3lrN1hHNWNkRngwZlZ4dVhHNWNkRngwTHk4Z1RtOGdhWFJsYlhNZ2FYUmxjbUYwWldRdVhHNWNkRngwYVdZZ0tHWnBjbk4wS1NCN1hHNWNkRngwWEhSMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDZFNaV1IxWTJVZ2IyWWdaVzF3ZEhrZ1kyOXNiR1ZqZEdsdmJpQjNhWFJvSUc1dklHbHVhWFJwWVd3Z2RtRnNkV1VuS1R0Y2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdZV05qZFcxMWJHRjBiM0k3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1NXUmxiblJwWTJGc0lIUnZYRzVjZENBcUlGdE5ZWEF1Wm05eVJXRmphQ2dwWFNob2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTFWVXk5a2IyTnpMMWRsWWk5S1lYWmhVMk55YVhCMEwxSmxabVZ5Wlc1alpTOUhiRzlpWVd4ZlQySnFaV04wY3k5TllYQXZabTl5UldGamFDa3NYRzVjZENBcUlHSjFkQ0J5WlhSMWNtNXpJSFJvWlNCamIyeHNaV04wYVc5dUlHbHVjM1JsWVdRZ2IyWWdkVzVrWldacGJtVmtMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQm1iaUJHZFc1amRHbHZiaUIwYnlCbGVHVmpkWFJsSUdadmNpQmxZV05vSUdWc1pXMWxiblJjYmx4MElDb2dRSEJoY21GdElIc3FmU0JiZEdocGMwRnlaMTBnVm1Gc2RXVWdkRzhnZFhObElHRnpJR0IwYUdsellDQjNhR1Z1SUdWNFpXTjFkR2x1WnlCbWRXNWpkR2x2Ymx4dVhIUWdLaUJBY21WMGRYSnVjeUI3UTI5c2JHVmpkR2x2Ym4xY2JseDBJQ29nUUdWNFlXMXdiR1ZjYmx4MElDb2dZMjlzYkdWamRHbHZibHh1WEhRZ0tpQWdMbVZoWTJnb2RYTmxjaUE5UGlCamIyNXpiMnhsTG14dlp5aDFjMlZ5TG5WelpYSnVZVzFsS1NsY2JseDBJQ29nSUM1bWFXeDBaWElvZFhObGNpQTlQaUIxYzJWeUxtSnZkQ2xjYmx4MElDb2dJQzVsWVdOb0tIVnpaWElnUFQ0Z1kyOXVjMjlzWlM1c2IyY29kWE5sY2k1MWMyVnlibUZ0WlNrcE8xeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklHVmhZMmdvWm00NklDaDJZV3gxWlRvZ1Zpd2dhMlY1T2lCTExDQmpiMnhzWldOMGFXOXVPaUIwYUdsektTQTlQaUIyYjJsa0tUb2dkR2hwY3p0Y2JseDBjSFZpYkdsaklHVmhZMmc4VkQ0b1ptNDZJQ2gwYUdsek9pQlVMQ0IyWVd4MVpUb2dWaXdnYTJWNU9pQkxMQ0JqYjJ4c1pXTjBhVzl1T2lCMGFHbHpLU0E5UGlCMmIybGtMQ0IwYUdselFYSm5PaUJVS1RvZ2RHaHBjenRjYmx4MGNIVmliR2xqSUdWaFkyZ29abTQ2SUNoMllXeDFaVG9nVml3Z2EyVjVPaUJMTENCamIyeHNaV04wYVc5dU9pQjBhR2x6S1NBOVBpQjJiMmxrTENCMGFHbHpRWEpuUHpvZ2RXNXJibTkzYmlrNklIUm9hWE1nZTF4dVhIUmNkSFJvYVhNdVptOXlSV0ZqYUNobWJpQmhjeUFvZG1Gc2RXVTZJRllzSUd0bGVUb2dTeXdnYldGd09pQk5ZWEE4U3l3Z1ZqNHBJRDArSUhadmFXUXNJSFJvYVhOQmNtY3BPMXh1WEhSY2RISmxkSFZ5YmlCMGFHbHpPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZKMWJuTWdZU0JtZFc1amRHbHZiaUJ2YmlCMGFHVWdZMjlzYkdWamRHbHZiaUJoYm1RZ2NtVjBkWEp1Y3lCMGFHVWdZMjlzYkdWamRHbHZiaTVjYmx4MElDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnUm5WdVkzUnBiMjRnZEc4Z1pYaGxZM1YwWlZ4dVhIUWdLaUJBY0dGeVlXMGdleXA5SUZ0MGFHbHpRWEpuWFNCV1lXeDFaU0IwYnlCMWMyVWdZWE1nWUhSb2FYTmdJSGRvWlc0Z1pYaGxZM1YwYVc1bklHWjFibU4wYVc5dVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0RGIyeHNaV04wYVc5dWZWeHVYSFFnS2lCQVpYaGhiWEJzWlZ4dVhIUWdLaUJqYjJ4c1pXTjBhVzl1WEc1Y2RDQXFJQ0F1ZEdGd0tHTnZiR3dnUFQ0Z1kyOXVjMjlzWlM1c2IyY29ZMjlzYkM1emFYcGxLU2xjYmx4MElDb2dJQzVtYVd4MFpYSW9kWE5sY2lBOVBpQjFjMlZ5TG1KdmRDbGNibHgwSUNvZ0lDNTBZWEFvWTI5c2JDQTlQaUJqYjI1emIyeGxMbXh2WnloamIyeHNMbk5wZW1VcEtWeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklIUmhjQ2htYmpvZ0tHTnZiR3hsWTNScGIyNDZJSFJvYVhNcElEMCtJSFp2YVdRcE9pQjBhR2x6TzF4dVhIUndkV0pzYVdNZ2RHRndQRlErS0dadU9pQW9kR2hwY3pvZ1ZDd2dZMjlzYkdWamRHbHZiam9nZEdocGN5a2dQVDRnZG05cFpDd2dkR2hwYzBGeVp6b2dWQ2s2SUhSb2FYTTdYRzVjZEhCMVlteHBZeUIwWVhBb1ptNDZJQ2hqYjJ4c1pXTjBhVzl1T2lCMGFHbHpLU0E5UGlCMmIybGtMQ0IwYUdselFYSm5Qem9nZFc1cmJtOTNiaWs2SUhSb2FYTWdlMXh1WEhSY2RHbG1JQ2gwZVhCbGIyWWdkR2hwYzBGeVp5QWhQVDBnSjNWdVpHVm1hVzVsWkNjcElHWnVJRDBnWm00dVltbHVaQ2gwYUdselFYSm5LVHRjYmx4MFhIUm1iaWgwYUdsektUdGNibHgwWEhSeVpYUjFjbTRnZEdocGN6dGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJEY21WaGRHVnpJR0Z1SUdsa1pXNTBhV05oYkNCemFHRnNiRzkzSUdOdmNIa2diMllnZEdocGN5QmpiMnhzWldOMGFXOXVMbHh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdRMjlzYkdWamRHbHZibjFjYmx4MElDb2dRR1Y0WVcxd2JHVWdZMjl1YzNRZ2JtVjNRMjlzYkNBOUlITnZiV1ZEYjJ4c0xtTnNiMjVsS0NrN1hHNWNkQ0FxTDF4dVhIUndkV0pzYVdNZ1kyeHZibVVvS1RvZ2RHaHBjeUI3WEc1Y2RGeDBjbVYwZFhKdUlHNWxkeUIwYUdsekxtTnZibk4wY25WamRHOXlXMU41YldKdmJDNXpjR1ZqYVdWelhTaDBhR2x6S1NCaGN5QjBhR2x6TzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlFTnZiV0pwYm1WeklIUm9hWE1nWTI5c2JHVmpkR2x2YmlCM2FYUm9JRzkwYUdWeWN5QnBiblJ2SUdFZ2JtVjNJR052Ykd4bFkzUnBiMjR1SUU1dmJtVWdiMllnZEdobElITnZkWEpqWlNCamIyeHNaV04wYVc5dWN5QmhjbVVnYlc5a2FXWnBaV1F1WEc1Y2RDQXFJRUJ3WVhKaGJTQjdMaTR1UTI5c2JHVmpkR2x2Ym4wZ1kyOXNiR1ZqZEdsdmJuTWdRMjlzYkdWamRHbHZibk1nZEc4Z2JXVnlaMlZjYmx4MElDb2dRSEpsZEhWeWJuTWdlME52Ykd4bFkzUnBiMjU5WEc1Y2RDQXFJRUJsZUdGdGNHeGxJR052Ym5OMElHNWxkME52Ykd3Z1BTQnpiMjFsUTI5c2JDNWpiMjVqWVhRb2MyOXRaVTkwYUdWeVEyOXNiQ3dnWVc1dmRHaGxja052Ykd3c0lHOW9RbTk1UVVOdmJHd3BPMXh1WEhRZ0tpOWNibHgwY0hWaWJHbGpJR052Ym1OaGRDZ3VMaTVqYjJ4c1pXTjBhVzl1Y3pvZ1EyOXNiR1ZqZEdsdmJqeExMQ0JXUGx0ZEtUb2dkR2hwY3lCN1hHNWNkRngwWTI5dWMzUWdibVYzUTI5c2JDQTlJSFJvYVhNdVkyeHZibVVvS1R0Y2JseDBYSFJtYjNJZ0tHTnZibk4wSUdOdmJHd2diMllnWTI5c2JHVmpkR2x2Ym5NcElIdGNibHgwWEhSY2RHWnZjaUFvWTI5dWMzUWdXMnRsZVN3Z2RtRnNYU0J2WmlCamIyeHNLU0J1WlhkRGIyeHNMbk5sZENoclpYa3NJSFpoYkNrN1hHNWNkRngwZlZ4dVhIUmNkSEpsZEhWeWJpQnVaWGREYjJ4c08xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU5vWldOcmN5QnBaaUIwYUdseklHTnZiR3hsWTNScGIyNGdjMmhoY21WeklHbGtaVzUwYVdOaGJDQnBkR1Z0Y3lCM2FYUm9JR0Z1YjNSb1pYSXVYRzVjZENBcUlGUm9hWE1nYVhNZ1pHbG1abVZ5Wlc1MElIUnZJR05vWldOcmFXNW5JR1p2Y2lCbGNYVmhiR2wwZVNCMWMybHVaeUJsY1hWaGJDMXphV2R1Y3l3Z1ltVmpZWFZ6WlZ4dVhIUWdLaUIwYUdVZ1kyOXNiR1ZqZEdsdmJuTWdiV0Y1SUdKbElHUnBabVpsY21WdWRDQnZZbXBsWTNSekxDQmlkWFFnWTI5dWRHRnBiaUIwYUdVZ2MyRnRaU0JrWVhSaExseHVYSFFnS2lCQWNHRnlZVzBnZTBOdmJHeGxZM1JwYjI1OUlHTnZiR3hsWTNScGIyNGdRMjlzYkdWamRHbHZiaUIwYnlCamIyMXdZWEpsSUhkcGRHaGNibHgwSUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGZG9aWFJvWlhJZ2RHaGxJR052Ykd4bFkzUnBiMjV6SUdoaGRtVWdhV1JsYm5ScFkyRnNJR052Ym5SbGJuUnpYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdaWEYxWVd4ektHTnZiR3hsWTNScGIyNDZJRU52Ykd4bFkzUnBiMjQ4U3l3Z1ZqNHBPaUJpYjI5c1pXRnVJSHRjYmx4MFhIUnBaaUFvSVdOdmJHeGxZM1JwYjI0cElISmxkSFZ5YmlCbVlXeHpaVHRjYmx4MFhIUnBaaUFvZEdocGN5QTlQVDBnWTI5c2JHVmpkR2x2YmlrZ2NtVjBkWEp1SUhSeWRXVTdYRzVjZEZ4MGFXWWdLSFJvYVhNdWMybDZaU0FoUFQwZ1kyOXNiR1ZqZEdsdmJpNXphWHBsS1NCeVpYUjFjbTRnWm1Gc2MyVTdYRzVjZEZ4MFptOXlJQ2hqYjI1emRDQmJhMlY1TENCMllXeDFaVjBnYjJZZ2RHaHBjeWtnZTF4dVhIUmNkRngwYVdZZ0tDRmpiMnhzWldOMGFXOXVMbWhoY3loclpYa3BJSHg4SUhaaGJIVmxJQ0U5UFNCamIyeHNaV04wYVc5dUxtZGxkQ2hyWlhrcEtTQjdYRzVjZEZ4MFhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2RGeDBjbVYwZFhKdUlIUnlkV1U3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1ZHaGxJSE52Y25RZ2JXVjBhRzlrSUhOdmNuUnpJSFJvWlNCcGRHVnRjeUJ2WmlCaElHTnZiR3hsWTNScGIyNGdhVzRnY0d4aFkyVWdZVzVrSUhKbGRIVnlibk1nYVhRdVhHNWNkQ0FxSUZSb1pTQnpiM0owSUdseklHNXZkQ0J1WldObGMzTmhjbWxzZVNCemRHRmliR1VnYVc0Z1RtOWtaU0F4TUNCdmNpQnZiR1JsY2k1Y2JseDBJQ29nVkdobElHUmxabUYxYkhRZ2MyOXlkQ0J2Y21SbGNpQnBjeUJoWTJOdmNtUnBibWNnZEc4Z2MzUnlhVzVuSUZWdWFXTnZaR1VnWTI5a1pTQndiMmx1ZEhNdVhHNWNkQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUZ0amIyMXdZWEpsUm5WdVkzUnBiMjVkSUZOd1pXTnBabWxsY3lCaElHWjFibU4wYVc5dUlIUm9ZWFFnWkdWbWFXNWxjeUIwYUdVZ2MyOXlkQ0J2Y21SbGNpNWNibHgwSUNvZ1NXWWdiMjFwZEhSbFpDd2dkR2hsSUdOdmJHeGxZM1JwYjI0Z2FYTWdjMjl5ZEdWa0lHRmpZMjl5WkdsdVp5QjBieUJsWVdOb0lHTm9ZWEpoWTNSbGNpZHpJRlZ1YVdOdlpHVWdZMjlrWlNCd2IybHVkQ0IyWVd4MVpTeGNibHgwSUNvZ1lXTmpiM0prYVc1bklIUnZJSFJvWlNCemRISnBibWNnWTI5dWRtVnljMmx2YmlCdlppQmxZV05vSUdWc1pXMWxiblF1WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHREYjJ4c1pXTjBhVzl1ZlZ4dVhIUWdLaUJBWlhoaGJYQnNaU0JqYjJ4c1pXTjBhVzl1TG5OdmNuUW9LSFZ6WlhKQkxDQjFjMlZ5UWlrZ1BUNGdkWE5sY2tFdVkzSmxZWFJsWkZScGJXVnpkR0Z0Y0NBdElIVnpaWEpDTG1OeVpXRjBaV1JVYVcxbGMzUmhiWEFwTzF4dVhIUWdLaTljYmx4MGNIVmliR2xqSUhOdmNuUW9ZMjl0Y0dGeVpVWjFibU4wYVc5dU9pQW9abWx5YzNSV1lXeDFaVG9nVml3Z2MyVmpiMjVrVm1Gc2RXVTZJRllzSUdacGNuTjBTMlY1T2lCTExDQnpaV052Ym1STFpYazZJRXNwSUQwK0lHNTFiV0psY2lBOUlDaDRMQ0I1S1RvZ2JuVnRZbVZ5SUQwK0lFNTFiV0psY2loNElENGdlU2tnZkh3Z1RuVnRZbVZ5S0hnZ1BUMDlJSGtwSUMwZ01TazZJSFJvYVhNZ2UxeHVYSFJjZEdOdmJuTjBJR1Z1ZEhKcFpYTWdQU0JiTGk0dWRHaHBjeTVsYm5SeWFXVnpLQ2xkTzF4dVhIUmNkR1Z1ZEhKcFpYTXVjMjl5ZENnb1lTd2dZaWs2SUc1MWJXSmxjaUE5UGlCamIyMXdZWEpsUm5WdVkzUnBiMjRvWVZzeFhTd2dZbHN4WFN3Z1lWc3dYU3dnWWxzd1hTa3BPMXh1WEc1Y2RGeDBMeThnVUdWeVptOXliU0JqYkdWaGJpMTFjRnh1WEhSY2RITjFjR1Z5TG1Oc1pXRnlLQ2s3WEc1Y2RGeDBkR2hwY3k1ZllYSnlZWGtnUFNCdWRXeHNPMXh1WEhSY2RIUm9hWE11WDJ0bGVVRnljbUY1SUQwZ2JuVnNiRHRjYmx4dVhIUmNkQzh2SUZObGRDQjBhR1VnYm1WM0lHVnVkSEpwWlhOY2JseDBYSFJtYjNJZ0tHTnZibk4wSUZ0ckxDQjJYU0J2WmlCbGJuUnlhV1Z6S1NCN1hHNWNkRngwWEhSemRYQmxjaTV6WlhRb2F5d2dkaWs3WEc1Y2RGeDBmVnh1WEhSY2RISmxkSFZ5YmlCMGFHbHpPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUZSb1pTQnBiblJsY25ObFkzUWdiV1YwYUc5a0lISmxkSFZ5Ym5NZ1lTQnVaWGNnYzNSeWRXTjBkWEpsSUdOdmJuUmhhVzVwYm1jZ2FYUmxiWE1nZDJobGNtVWdkR2hsSUd0bGVYTWdZWEpsSUhCeVpYTmxiblFnYVc0Z1ltOTBhQ0J2Y21sbmFXNWhiQ0J6ZEhKMVkzUjFjbVZ6TGx4dVhIUWdLaUJBY0dGeVlXMGdlME52Ykd4bFkzUnBiMjU5SUc5MGFHVnlJRlJvWlNCdmRHaGxjaUJEYjJ4c1pXTjBhVzl1SUhSdklHWnBiSFJsY2lCaFoyRnBibk4wWEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHREYjJ4c1pXTjBhVzl1ZlZ4dVhIUWdLaTljYmx4MGNIVmliR2xqSUdsdWRHVnljMlZqZENodmRHaGxjam9nUTI5c2JHVmpkR2x2Ymp4TExDQldQaWs2SUVOdmJHeGxZM1JwYjI0OFN5d2dWajRnZTF4dVhIUmNkSEpsZEhWeWJpQnZkR2hsY2k1bWFXeDBaWElvS0Y4c0lHc3BJRDArSUhSb2FYTXVhR0Z6S0dzcEtUdGNibHgwZlZ4dVhHNWNkQzhxS2x4dVhIUWdLaUJVYUdVZ1pHbG1abVZ5Wlc1alpTQnRaWFJvYjJRZ2NtVjBkWEp1Y3lCaElHNWxkeUJ6ZEhKMVkzUjFjbVVnWTI5dWRHRnBibWx1WnlCcGRHVnRjeUIzYUdWeVpTQjBhR1VnYTJWNUlHbHpJSEJ5WlhObGJuUWdhVzRnYjI1bElHOW1JSFJvWlNCdmNtbG5hVzVoYkNCemRISjFZM1IxY21WeklHSjFkQ0J1YjNRZ2RHaGxJRzkwYUdWeUxseHVYSFFnS2lCQWNHRnlZVzBnZTBOdmJHeGxZM1JwYjI1OUlHOTBhR1Z5SUZSb1pTQnZkR2hsY2lCRGIyeHNaV04wYVc5dUlIUnZJR1pwYkhSbGNpQmhaMkZwYm5OMFhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0RGIyeHNaV04wYVc5dWZWeHVYSFFnS2k5Y2JseDBjSFZpYkdsaklHUnBabVpsY21WdVkyVW9iM1JvWlhJNklFTnZiR3hsWTNScGIyNDhTeXdnVmo0cE9pQkRiMnhzWldOMGFXOXVQRXNzSUZZK0lIdGNibHgwWEhSeVpYUjFjbTRnYjNSb1pYSXVabWxzZEdWeUtDaGZMQ0JyS1NBOVBpQWhkR2hwY3k1b1lYTW9heWtwTG1OdmJtTmhkQ2gwYUdsekxtWnBiSFJsY2lnb1h5d2dheWtnUFQ0Z0lXOTBhR1Z5TG1oaGN5aHJLU2twTzF4dVhIUjlYRzVjYmx4MEx5b3FYRzVjZENBcUlGUm9aU0J6YjNKMFpXUWdiV1YwYUc5a0lITnZjblJ6SUhSb1pTQnBkR1Z0Y3lCdlppQmhJR052Ykd4bFkzUnBiMjRnWVc1a0lISmxkSFZ5Ym5NZ2FYUXVYRzVjZENBcUlGUm9aU0J6YjNKMElHbHpJRzV2ZENCdVpXTmxjM05oY21sc2VTQnpkR0ZpYkdVZ2FXNGdUbTlrWlNBeE1DQnZjaUJ2YkdSbGNpNWNibHgwSUNvZ1ZHaGxJR1JsWm1GMWJIUWdjMjl5ZENCdmNtUmxjaUJwY3lCaFkyTnZjbVJwYm1jZ2RHOGdjM1J5YVc1bklGVnVhV052WkdVZ1kyOWtaU0J3YjJsdWRITXVYRzVjZENBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlGdGpiMjF3WVhKbFJuVnVZM1JwYjI1ZElGTndaV05wWm1sbGN5QmhJR1oxYm1OMGFXOXVJSFJvWVhRZ1pHVm1hVzVsY3lCMGFHVWdjMjl5ZENCdmNtUmxjaTVjYmx4MElDb2dTV1lnYjIxcGRIUmxaQ3dnZEdobElHTnZiR3hsWTNScGIyNGdhWE1nYzI5eWRHVmtJR0ZqWTI5eVpHbHVaeUIwYnlCbFlXTm9JR05vWVhKaFkzUmxjaWR6SUZWdWFXTnZaR1VnWTI5a1pTQndiMmx1ZENCMllXeDFaU3hjYmx4MElDb2dZV05qYjNKa2FXNW5JSFJ2SUhSb1pTQnpkSEpwYm1jZ1kyOXVkbVZ5YzJsdmJpQnZaaUJsWVdOb0lHVnNaVzFsYm5RdVhHNWNkQ0FxSUVCeVpYUjFjbTV6SUh0RGIyeHNaV04wYVc5dWZWeHVYSFFnS2lCQVpYaGhiWEJzWlNCamIyeHNaV04wYVc5dUxuTnZjblJsWkNnb2RYTmxja0VzSUhWelpYSkNLU0E5UGlCMWMyVnlRUzVqY21WaGRHVmtWR2x0WlhOMFlXMXdJQzBnZFhObGNrSXVZM0psWVhSbFpGUnBiV1Z6ZEdGdGNDazdYRzVjZENBcUwxeHVYSFJ3ZFdKc2FXTWdjMjl5ZEdWa0tHTnZiWEJoY21WR2RXNWpkR2x2YmpvZ0tHWnBjbk4wVm1Gc2RXVTZJRllzSUhObFkyOXVaRlpoYkhWbE9pQldMQ0JtYVhKemRFdGxlVG9nU3l3Z2MyVmpiMjVrUzJWNU9pQkxLU0E5UGlCdWRXMWlaWElnUFNBb2VDd2dlU2s2SUc1MWJXSmxjaUE5UGlCT2RXMWlaWElvZUNBK0lIa3BJSHg4SUU1MWJXSmxjaWg0SUQwOVBTQjVLU0F0SURFcE9pQjBhR2x6SUh0Y2JseDBYSFJ5WlhSMWNtNGdLRzVsZHlCMGFHbHpMbU52Ym5OMGNuVmpkRzl5VzFONWJXSnZiQzV6Y0dWamFXVnpYU2hiTGk0dWRHaHBjeTVsYm5SeWFXVnpLQ2xkS1NCaGN5QjBhR2x6S1Z4dVhIUmNkRngwTG5OdmNuUW9LR0YyTENCaWRpd2dZV3NzSUdKcktTQTlQaUJqYjIxd1lYSmxSblZ1WTNScGIyNG9ZWFlzSUdKMkxDQmhheXdnWW1zcEtUdGNibHgwZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRU52Ykd4bFkzUnBiMjQ3WEc1bGVIQnZjblFnZXlCRGIyeHNaV04wYVc5dUlIMDdYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQkRiMnhzWldOMGFXOXVPMXh1SWwxOSIsIi8qISAoYykgQW5kcmVhIEdpYW1tYXJjaGkgLSBJU0MgKi9cbnZhciBzZWxmID0gdGhpcyB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7fTtcbnRyeSB7XG4gIChmdW5jdGlvbiAoVVJMU2VhcmNoUGFyYW1zLCBwbHVzKSB7XG4gICAgaWYgKFxuICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcygncT0lMkInKS5nZXQoJ3EnKSAhPT0gcGx1cyB8fFxuICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyh7cTogcGx1c30pLmdldCgncScpICE9PSBwbHVzIHx8XG4gICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKFtbJ3EnLCBwbHVzXV0pLmdldCgncScpICE9PSBwbHVzIHx8XG4gICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKCdxPVxcbicpLnRvU3RyaW5nKCkgIT09ICdxPSUwQScgfHxcbiAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoe3E6ICcgJid9KS50b1N0cmluZygpICE9PSAncT0rJTI2JyB8fFxuICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyh7cTogJyV6eCd9KS50b1N0cmluZygpICE9PSAncT0lMjV6eCdcbiAgICApXG4gICAgICB0aHJvdyBVUkxTZWFyY2hQYXJhbXM7XG4gICAgc2VsZi5VUkxTZWFyY2hQYXJhbXMgPSBVUkxTZWFyY2hQYXJhbXM7XG4gIH0oVVJMU2VhcmNoUGFyYW1zLCAnKycpKTtcbn0gY2F0Y2goVVJMU2VhcmNoUGFyYW1zKSB7XG4gIChmdW5jdGlvbiAoT2JqZWN0LCBTdHJpbmcsIGlzQXJyYXkpIHsndXNlIHN0cmljdCc7XG4gICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgIHZhciBmaW5kID0gL1shJ1xcKFxcKX5dfCUyMHwlMDAvZztcbiAgICB2YXIgZmluZFBlcmNlbnRTaWduID0gLyUoPyFbMC05YS1mQS1GXXsyfSkvZztcbiAgICB2YXIgcGx1cyA9IC9cXCsvZztcbiAgICB2YXIgcmVwbGFjZSA9IHtcbiAgICAgICchJzogJyUyMScsXG4gICAgICBcIidcIjogJyUyNycsXG4gICAgICAnKCc6ICclMjgnLFxuICAgICAgJyknOiAnJTI5JyxcbiAgICAgICd+JzogJyU3RScsXG4gICAgICAnJTIwJzogJysnLFxuICAgICAgJyUwMCc6ICdcXHgwMCdcbiAgICB9O1xuICAgIHZhciBwcm90byA9IHtcbiAgICAgIGFwcGVuZDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgYXBwZW5kVG8odGhpcy5fdW5nYXAsIGtleSwgdmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fdW5nYXBba2V5XTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGtleSkgPyB0aGlzLl91bmdhcFtrZXldWzBdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBnZXRBbGw6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGtleSkgPyB0aGlzLl91bmdhcFtrZXldLnNsaWNlKDApIDogW107XG4gICAgICB9LFxuICAgICAgaGFzOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgaW4gdGhpcy5fdW5nYXA7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl91bmdhcFtrZXldID0gW1N0cmluZyh2YWx1ZSldO1xuICAgICAgfSxcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl91bmdhcClcbiAgICAgICAgICBzZWxmLl91bmdhcFtrZXldLmZvckVhY2goaW52b2tlLCBrZXkpO1xuICAgICAgICBmdW5jdGlvbiBpbnZva2UodmFsdWUpIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBTdHJpbmcoa2V5KSwgc2VsZik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b0pTT046IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fdW5nYXApIHtcbiAgICAgICAgICB2YXIgZW5jb2RlZCA9IGVuY29kZShrZXkpO1xuICAgICAgICAgIGZvciAodmFyXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fdW5nYXBba2V5XTtcbiAgICAgICAgICAgIGkgPCB2YWx1ZS5sZW5ndGg7IGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVkICsgJz0nICsgZW5jb2RlKHZhbHVlW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVyeS5qb2luKCcmJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvdG8pXG4gICAgICBkZWZpbmVQcm9wZXJ0eShVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3RvW2tleV1cbiAgICAgIH0pO1xuICAgIHNlbGYuVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zO1xuICAgIGZ1bmN0aW9uIFVSTFNlYXJjaFBhcmFtcyhxdWVyeSkge1xuICAgICAgdmFyIGRpY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3VuZ2FwJywge3ZhbHVlOiBkaWN0fSk7XG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSAhcXVlcnk6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHlwZW9mIHF1ZXJ5ID09PSAnc3RyaW5nJzpcbiAgICAgICAgICBpZiAocXVlcnkuY2hhckF0KDApID09PSAnPycpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkuc2xpY2UoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyXG4gICAgICAgICAgICBwYWlycyA9IHF1ZXJ5LnNwbGl0KCcmJyksXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYWlyc1tpXTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHZhbHVlLmluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGlmICgtMSA8IGluZGV4KSB7XG4gICAgICAgICAgICAgIGFwcGVuZFRvKFxuICAgICAgICAgICAgICAgIGRpY3QsXG4gICAgICAgICAgICAgICAgZGVjb2RlKHZhbHVlLnNsaWNlKDAsIGluZGV4KSksXG4gICAgICAgICAgICAgICAgZGVjb2RlKHZhbHVlLnNsaWNlKGluZGV4ICsgMSkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCl7XG4gICAgICAgICAgICAgIGFwcGVuZFRvKFxuICAgICAgICAgICAgICAgIGRpY3QsXG4gICAgICAgICAgICAgICAgZGVjb2RlKHZhbHVlKSxcbiAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBpc0FycmF5KHF1ZXJ5KTpcbiAgICAgICAgICBmb3IgKHZhclxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSBxdWVyeS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcXVlcnlbaV07XG4gICAgICAgICAgICBhcHBlbmRUbyhkaWN0LCB2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9yRWFjaCcgaW4gcXVlcnk6XG4gICAgICAgICAgcXVlcnkuZm9yRWFjaChhZGRFYWNoLCBkaWN0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcXVlcnkpXG4gICAgICAgICAgICBhcHBlbmRUbyhkaWN0LCBrZXksIHF1ZXJ5W2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEVhY2godmFsdWUsIGtleSkge1xuICAgICAgYXBwZW5kVG8odGhpcywga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kVG8oZGljdCwga2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIHJlcyA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCcpIDogdmFsdWU7XG4gICAgICBpZiAoa2V5IGluIGRpY3QpXG4gICAgICAgIGRpY3Rba2V5XS5wdXNoKHJlcyk7XG4gICAgICBlbHNlXG4gICAgICAgIGRpY3Rba2V5XSA9IFtyZXNdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoZmluZFBlcmNlbnRTaWduLCAnJTI1JykucmVwbGFjZShwbHVzLCAnICcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZShmaW5kLCByZXBsYWNlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICAgIHJldHVybiByZXBsYWNlW21hdGNoXTtcbiAgICB9XG5cbiAgfShPYmplY3QsIFN0cmluZywgQXJyYXkuaXNBcnJheSkpO1xufVxuXG4oZnVuY3Rpb24gKFVSTFNlYXJjaFBhcmFtc1Byb3RvKSB7XG5cbiAgdmFyIGl0ZXJhYmxlID0gZmFsc2U7XG4gIHRyeSB7IGl0ZXJhYmxlID0gISFTeW1ib2wuaXRlcmF0b3I7IH0gY2F0Y2ggKG9fTykge31cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoISgnZm9yRWFjaCcgaW4gVVJMU2VhcmNoUGFyYW1zUHJvdG8pKSB7XG4gICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBuYW1lcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICB0aGlzLnRvU3RyaW5nKClcbiAgICAgICAgICAucmVwbGFjZSgvPVtcXHNcXFNdKj8oPzomfCQpL2csICc9JylcbiAgICAgICAgICAuc3BsaXQoJz0nKVxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW5hbWUubGVuZ3RoIHx8IG5hbWUgaW4gbmFtZXMpXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIChuYW1lc1tuYW1lXSA9IHNlbGYuZ2V0QWxsKG5hbWUpKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHNlbGYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICghKCdrZXlzJyBpbiBVUkxTZWFyY2hQYXJhbXNQcm90bykpIHtcbiAgICBVUkxTZWFyY2hQYXJhbXNQcm90by5rZXlzID0gZnVuY3Rpb24ga2V5cygpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvcih0aGlzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7IHRoaXMucHVzaChrZXkpOyB9KTtcbiAgICB9O1xuICB9XG5cbiAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICghKCd2YWx1ZXMnIGluIFVSTFNlYXJjaFBhcmFtc1Byb3RvKSkge1xuICAgIFVSTFNlYXJjaFBhcmFtc1Byb3RvLnZhbHVlcyA9IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvcih0aGlzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7IHRoaXMucHVzaCh2YWx1ZSk7IH0pO1xuICAgIH07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoISgnZW50cmllcycgaW4gVVJMU2VhcmNoUGFyYW1zUHJvdG8pKSB7XG4gICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8uZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IodGhpcywgZnVuY3Rpb24odmFsdWUsIGtleSkgeyB0aGlzLnB1c2goW2tleSwgdmFsdWVdKTsgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChpdGVyYWJsZSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiBVUkxTZWFyY2hQYXJhbXNQcm90bykpIHtcbiAgICBVUkxTZWFyY2hQYXJhbXNQcm90b1tTeW1ib2wuaXRlcmF0b3JdID0gVVJMU2VhcmNoUGFyYW1zUHJvdG8uZW50cmllcztcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICghKCdzb3J0JyBpbiBVUkxTZWFyY2hQYXJhbXNQcm90bykpIHtcbiAgICBVUkxTZWFyY2hQYXJhbXNQcm90by5zb3J0ID0gZnVuY3Rpb24gc29ydCgpIHtcbiAgICAgIHZhclxuICAgICAgICBlbnRyaWVzID0gdGhpcy5lbnRyaWVzKCksXG4gICAgICAgIGVudHJ5ID0gZW50cmllcy5uZXh0KCksXG4gICAgICAgIGRvbmUgPSBlbnRyeS5kb25lLFxuICAgICAgICBrZXlzID0gW10sXG4gICAgICAgIHZhbHVlcyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgIGksIGtleSwgdmFsdWVcbiAgICAgIDtcbiAgICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICB2YWx1ZSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICBrZXkgPSB2YWx1ZVswXTtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIGlmICghKGtleSBpbiB2YWx1ZXMpKSB7XG4gICAgICAgICAgdmFsdWVzW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNba2V5XS5wdXNoKHZhbHVlWzFdKTtcbiAgICAgICAgZW50cnkgPSBlbnRyaWVzLm5leHQoKTtcbiAgICAgICAgZG9uZSA9IGVudHJ5LmRvbmU7XG4gICAgICB9XG4gICAgICAvLyBub3QgdGhlIGNoYW1waW9uIGluIGVmZmljaWVuY3lcbiAgICAgIC8vIGJ1dCB0aGVzZSB0d28gYml0cyBqdXN0IGRvIHRoZSBqb2JcbiAgICAgIGtleXMuc29ydCgpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kZWxldGUoa2V5c1tpXSk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlc1trZXldLnNoaWZ0KCkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpdGVyYXRvcihzZWxmLCBjYWxsYmFjaykge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHNlbGYuZm9yRWFjaChjYWxsYmFjaywgaXRlbXMpO1xuICAgIHJldHVybiBpdGVyYWJsZSA/XG4gICAgICBpdGVtc1tTeW1ib2wuaXRlcmF0b3JdKCkgOlxuICAgICAge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIChmdW5jdGlvbiAoT2JqZWN0KSB7XG4gICAgdmFyXG4gICAgICBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zUG9sbHV0ZSA9IGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICAgICAgZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgVVJMU2VhcmNoUGFyYW1zUHJvdG8uYXBwZW5kLmNhbGwodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIG5hbWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgc2VhcmNoLnNldC5jYWxsKHRoaXMuX3VzcCwgbmFtZSA/ICgnPycgKyBuYW1lKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZWwobmFtZSkge1xuICAgICAgICAgIFVSTFNlYXJjaFBhcmFtc1Byb3RvLmRlbGV0ZS5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgICAgIG5hbWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgc2VhcmNoLnNldC5jYWxsKHRoaXMuX3VzcCwgbmFtZSA/ICgnPycgKyBuYW1lKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICBVUkxTZWFyY2hQYXJhbXNQcm90by5zZXQuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgbmFtZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICBzZWFyY2guc2V0LmNhbGwodGhpcy5fdXNwLCBuYW1lID8gKCc/JyArIG5hbWUpIDogJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3AsIHZhbHVlKSB7XG4gICAgICAgICAgc3AuYXBwZW5kID0gYXBwZW5kO1xuICAgICAgICAgIHNwLmRlbGV0ZSA9IGRlbDtcbiAgICAgICAgICBzcC5zZXQgPSBzZXQ7XG4gICAgICAgICAgcmV0dXJuIGRQKHNwLCAnX3VzcCcsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zQ3JlYXRlID0gZnVuY3Rpb24gKHBvbGx1dGVTZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIHNwKSB7XG4gICAgICAgICAgZFAoXG4gICAgICAgICAgICBvYmosICdfc2VhcmNoUGFyYW1zJywge1xuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICB2YWx1ZTogcG9sbHV0ZVNlYXJjaFBhcmFtcyhzcCwgb2JqKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHNwO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZVNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uIChzcCkge1xuICAgICAgICB2YXIgYXBwZW5kID0gc3AuYXBwZW5kO1xuICAgICAgICBzcC5hcHBlbmQgPSBVUkxTZWFyY2hQYXJhbXNQcm90by5hcHBlbmQ7XG4gICAgICAgIFVSTFNlYXJjaFBhcmFtcy5jYWxsKHNwLCBzcC5fdXNwLnNlYXJjaC5zbGljZSgxKSk7XG4gICAgICAgIHNwLmFwcGVuZCA9IGFwcGVuZDtcbiAgICAgIH0sXG4gICAgICB2ZXJpZnlTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAob2JqLCBDbGFzcykge1xuICAgICAgICBpZiAoIShvYmogaW5zdGFuY2VvZiBDbGFzcykpIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCInc2VhcmNoUGFyYW1zJyBhY2Nlc3NlZCBvbiBhbiBvYmplY3QgdGhhdCBcIiArXG4gICAgICAgICAgXCJkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFwiICsgQ2xhc3MubmFtZVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHVwZ3JhZGVDbGFzcyA9IGZ1bmN0aW9uIChDbGFzcykge1xuICAgICAgICB2YXJcbiAgICAgICAgICBDbGFzc1Byb3RvID0gQ2xhc3MucHJvdG90eXBlLFxuICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IGdPUEQoQ2xhc3NQcm90bywgJ3NlYXJjaFBhcmFtcycpLFxuICAgICAgICAgIGhyZWYgPSBnT1BEKENsYXNzUHJvdG8sICdocmVmJyksXG4gICAgICAgICAgc2VhcmNoID0gZ09QRChDbGFzc1Byb3RvLCAnc2VhcmNoJyksXG4gICAgICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zXG4gICAgICAgIDtcbiAgICAgICAgaWYgKCFzZWFyY2hQYXJhbXMgJiYgc2VhcmNoICYmIHNlYXJjaC5zZXQpIHtcbiAgICAgICAgICBjcmVhdGVTZWFyY2hQYXJhbXMgPSBjcmVhdGVTZWFyY2hQYXJhbXNDcmVhdGUoXG4gICAgICAgICAgICBjcmVhdGVTZWFyY2hQYXJhbXNQb2xsdXRlKHNlYXJjaClcbiAgICAgICAgICApO1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuICAgICAgICAgICAgQ2xhc3NQcm90byxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaHJlZjoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGhyZWYuZ2V0LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHNwID0gdGhpcy5fc2VhcmNoUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgaHJlZi5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoc3ApIHVwZGF0ZVNlYXJjaFBhcmFtcyhzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2guZ2V0LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHNwID0gdGhpcy5fc2VhcmNoUGFyYW1zO1xuICAgICAgICAgICAgICAgICAgc2VhcmNoLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzcCkgdXBkYXRlU2VhcmNoUGFyYW1zKHNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNlYXJjaFBhcmFtczoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmVyaWZ5U2VhcmNoUGFyYW1zKHRoaXMsIENsYXNzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hQYXJhbXMgfHwgY3JlYXRlU2VhcmNoUGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMuc2VhcmNoLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHNwKSB7XG4gICAgICAgICAgICAgICAgICB2ZXJpZnlTZWFyY2hQYXJhbXModGhpcywgQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgY3JlYXRlU2VhcmNoUGFyYW1zKHRoaXMsIHNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgO1xuICAgIHRyeSB7XG4gICAgICB1cGdyYWRlQ2xhc3MoSFRNTEFuY2hvckVsZW1lbnQpO1xuICAgICAgaWYgKC9eZnVuY3Rpb258b2JqZWN0JC8udGVzdCh0eXBlb2YgVVJMKSAmJiBVUkwucHJvdG90eXBlKVxuICAgICAgICB1cGdyYWRlQ2xhc3MoVVJMKTtcbiAgICB9IGNhdGNoIChtZWgpIHt9XG4gIH0oT2JqZWN0KSk7XG5cbn0oc2VsZi5VUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLCBPYmplY3QpKTtcbmV4cG9ydCBkZWZhdWx0IHNlbGYuVVJMU2VhcmNoUGFyYW1zO1xuIiwidmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzO1xudmFyIF9fc2VsZl9fID0gKGZ1bmN0aW9uICgpIHtcbmZ1bmN0aW9uIEYoKSB7XG50aGlzLmZldGNoID0gZmFsc2U7XG50aGlzLkRPTUV4Y2VwdGlvbiA9IGdsb2JhbC5ET01FeGNlcHRpb25cbn1cbkYucHJvdG90eXBlID0gZ2xvYmFsO1xucmV0dXJuIG5ldyBGKCk7XG59KSgpO1xuKGZ1bmN0aW9uKHNlbGYpIHtcblxudmFyIGlycmVsZXZhbnQgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZXhwb3J0cztcblxufSkoe30pO1xufSkoX19zZWxmX18pO1xuX19zZWxmX18uZmV0Y2gucG9ueWZpbGwgPSB0cnVlO1xuLy8gUmVtb3ZlIFwicG9seWZpbGxcIiBwcm9wZXJ0eSBhZGRlZCBieSB3aGF0d2ctZmV0Y2hcbmRlbGV0ZSBfX3NlbGZfXy5mZXRjaC5wb2x5ZmlsbDtcbi8vIENob29zZSBiZXR3ZWVuIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiAoZ2xvYmFsKSBvciBjdXN0b20gaW1wbGVtZW50YXRpb24gKF9fc2VsZl9fKVxuLy8gdmFyIGN0eCA9IGdsb2JhbC5mZXRjaCA/IGdsb2JhbCA6IF9fc2VsZl9fO1xudmFyIGN0eCA9IF9fc2VsZl9fOyAvLyB0aGlzIGxpbmUgZGlzYWJsZSBzZXJ2aWNlIHdvcmtlciBzdXBwb3J0IHRlbXBvcmFyaWx5XG5leHBvcnRzID0gY3R4LmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJ1xuZXhwb3J0cy5kZWZhdWx0ID0gY3R4LmZldGNoIC8vIEZvciBUeXBlU2NyaXB0IGNvbnN1bWVycyB3aXRob3V0IGVzTW9kdWxlSW50ZXJvcC5cbmV4cG9ydHMuZmV0Y2ggPSBjdHguZmV0Y2ggLy8gVG8gZW5hYmxlOiBpbXBvcnQge2ZldGNofSBmcm9tICdjcm9zcy1mZXRjaCdcbmV4cG9ydHMuSGVhZGVycyA9IGN0eC5IZWFkZXJzXG5leHBvcnRzLlJlcXVlc3QgPSBjdHguUmVxdWVzdFxuZXhwb3J0cy5SZXNwb25zZSA9IGN0eC5SZXNwb25zZVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb2xsZWN0aW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkBkaXNjb3JkanMvY29sbGVjdGlvblwiKSk7XHJcbnZhciB1cmxfc2VhcmNoX3BhcmFtc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAdW5nYXAvdXJsLXNlYXJjaC1wYXJhbXNcIikpO1xyXG52YXIgY3Jvc3NfZmV0Y2hfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY3Jvc3MtZmV0Y2hcIikpO1xyXG52YXIgZW51bWVyYWJsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9kZWNvcmF0b3JzL2VudW1lcmFibGVcIikpO1xyXG52YXIgQkFTRV9VUkkgPSBcImh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjJcIjtcclxudmFyIEVuZHBvaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRW5kcG9pbnQocmVzb3VyY2UpIHtcclxuICAgICAgICB0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5jYWNoZSA9IG5ldyBjb2xsZWN0aW9uXzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBhIHJlc291cmNlIGZyb20gdGhlIGNhY2hlXHJcbiAgICAgKiBAcGFyYW0ge0VuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIElEIG9mIHRoZSByZXNvdXJjZSB0byByZXRyaWV2ZSBmcm9tIGNhY2hlXHJcbiAgICAgKiBAcmV0dXJucyB7P1R9XHJcbiAgICAgKi9cclxuICAgIEVuZHBvaW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQocGFyYW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmUgYSByZXNvdXJjZSBmcm9tIGNhY2hlIGlmIGl0IGV4aXN0cywgb3IgYXR0ZW1wdCB0byBmZXRjaCBpdCBmcm9tIHRoZSBBUElcclxuICAgICAqIEBwYXJhbSB7RW5kcG9pbnRQYXJhbX0gcGFyYW0gLSBUaGUgSUQgb2YgdGhlIHJlc291cmNlIHRvIHJlc29sdmVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBFbmRwb2ludC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuZ2V0KHBhcmFtKSB8fCB0aGlzLmZldGNoKHBhcmFtKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggYSByZXNvdXJjZSBmcm9tIHRoZSBBUElcclxuICAgICAqIEBwYXJhbSB7RW5kcG9pbnRQYXJhbX0gcGFyYW0gLSBUaGUgSUQgb2YgdGhlIGl0ZW0gdG8gZmV0Y2hcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhY2hlPXRydWVdIC0gV2hldGhlciBvciBub3QgdG8gY2FjaGUgdGhpcyByZXNvdXJjZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIEVuZHBvaW50LnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uIChwYXJhbSwgY2FjaGUpIHtcclxuICAgICAgICBpZiAoY2FjaGUgPT09IHZvaWQgMCkgeyBjYWNoZSA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBjcm9zc19mZXRjaF8xLmRlZmF1bHQoQkFTRV9VUkkgKyBcIi9cIiArIHRoaXMucmVzb3VyY2UgKyBcIi9cIiArIHBhcmFtKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgcGFnaW5hdGVkIHJlc291cmNlIGxpc3QgZnJvbSB0aGUgQVBJLCBvciB1c2VzIHRoZSBpbnRlcm5hbCBjYWNoZSBpZiBsaXN0QWxsKCkgaGFzIGJlZW4gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsaW1pdD0yMF0gLSBIb3cgbWFueSByZXNvdXJjZXMgdG8gbGlzdFxyXG4gICAgICogQHBhcmFtIHtvZmZzZXR9IFtvZmZzZXQ9MF1cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE5hbWVkQXBpUmVzb3VyY2VMaXN0PFQ+Pn1cclxuICAgICAqL1xyXG4gICAgRW5kcG9pbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAobGltaXQsIG9mZnNldCkge1xyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMjA7IH1cclxuICAgICAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdHMsIF9hLCBjb3VudCwgbmV4dCwgcHJldmlvdXMsIHBhcmFtcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gdGhpcy5fbGlzdC5yZXN1bHRzLnNsaWNlKG9mZnNldCwgbGltaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5fbGlzdCwgY291bnQgPSBfYS5jb3VudCwgbmV4dCA9IF9hLm5leHQsIHByZXZpb3VzID0gX2EucHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHsgY291bnQ6IGNvdW50LCBuZXh0OiBuZXh0LCBwcmV2aW91czogcHJldmlvdXMsIHJlc3VsdHM6IHJlc3VsdHMgfV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBuZXcgdXJsX3NlYXJjaF9wYXJhbXNfMS5kZWZhdWx0KHsgbGltaXQ6IFwiXCIgKyBsaW1pdCwgb2Zmc2V0OiBcIlwiICsgb2Zmc2V0IH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNyb3NzX2ZldGNoXzEuZGVmYXVsdChCQVNFX1VSSSArIFwiL1wiICsgdGhpcy5yZXNvdXJjZSArIFwiP1wiICsgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIHRoZSBjb21wbGV0ZSByZXNvdXJjZSBsaXN0IGZyb20gdGhlIEFQSSBieSBtYWtpbmcgdHdvIGNhbGxzLlxyXG4gICAgICogQ2FjaGVzIHRoZSBsaXN0IGJ5IGRlZmF1bHQgZm9yIEFQSS1sZXNzIHBhZ2luYXRpb25cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhY2hlPXRydWVdIC0gSWYgdGhlIHJlc3VsdCBzaG91bGQgYmUgY2FoY2VkIGluLW1lbW9yeVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TmFtZWRBcGlSZXNvdXJjZUxpc3Q8VD4+fVxyXG4gICAgICovXHJcbiAgICBFbmRwb2ludC5wcm90b3R5cGUubGlzdEFsbCA9IGZ1bmN0aW9uIChjYWNoZSkge1xyXG4gICAgICAgIGlmIChjYWNoZSA9PT0gdm9pZCAwKSB7IGNhY2hlID0gdHJ1ZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50LCBkYXRhO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuX2xpc3RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyb3NzX2ZldGNoXzEuZGVmYXVsdChCQVNFX1VSSSArIFwiL1wiICsgdGhpcy5yZXNvdXJjZSArIFwiP2xpbWl0PTFcIikudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IChfYS5zZW50KCkpLmNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcm9zc19mZXRjaF8xLmRlZmF1bHQoQkFTRV9VUkkgKyBcIi9cIiArIHRoaXMucmVzb3VyY2UgKyBcIj9saW1pdD1cIiArIGNvdW50KS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBFbmRwb2ludC5wcm90b3R5cGUuX2NhY2hlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNhY2hlLnNldChkYXRhLmlkLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBlbnVtZXJhYmxlXzEuZGVmYXVsdFxyXG4gICAgXSwgRW5kcG9pbnQucHJvdG90eXBlLCBcInJlc291cmNlXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBlbnVtZXJhYmxlXzEuZGVmYXVsdFxyXG4gICAgXSwgRW5kcG9pbnQucHJvdG90eXBlLCBcIl9saXN0XCIsIHZvaWQgMCk7XHJcbiAgICByZXR1cm4gRW5kcG9pbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRW5kcG9pbnQgPSBFbmRwb2ludDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW5kcG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHVybF9zZWFyY2hfcGFyYW1zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkB1bmdhcC91cmwtc2VhcmNoLXBhcmFtc1wiKSk7XHJcbnZhciBjcm9zc19mZXRjaF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjcm9zcy1mZXRjaFwiKSk7XHJcbnZhciBlbnVtZXJhYmxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2RlY29yYXRvcnMvZW51bWVyYWJsZVwiKSk7XHJcbnZhciBFbmRwb2ludF8xID0gcmVxdWlyZShcIi4vRW5kcG9pbnRcIik7XHJcbnZhciBCQVNFX1VSSSA9IFwiaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92MlwiO1xyXG52YXIgTmFtZWRFbmRwb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhOYW1lZEVuZHBvaW50LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTmFtZWRFbmRwb2ludChyZXNvdXJjZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlc291cmNlKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9uYW1lTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmUgYSByZXNvdXJjZSBmcm9tIHRoZSBjYWNoZSBieSBuYW1lIG9yIElEXHJcbiAgICAgKiBAcGFyYW0ge05hbWVkRW5kcG9pbnRQYXJhbX0gcGFyYW0gLSBUaGUgbmFtZSBvciBJRCBvZiB0aGUgcmVzb3VyY2UgdG8gcmV0cmlldmUgZnJvbSBjYWNoZVxyXG4gICAgICogQHJldHVybnMgez9UfVxyXG4gICAgICovXHJcbiAgICBOYW1lZEVuZHBvaW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQodHlwZW9mIHBhcmFtID09PSBcIm51bWJlclwiID8gcGFyYW0gOiB0aGlzLl9uYW1lTWFwLmdldChwYXJhbS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaCBhIHJlc291cmNlIGZyb20gdGhlIEFQSVxyXG4gICAgICogQHBhcmFtIHtOYW1lZEVuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIG5hbWUgb3JjSUQgb2YgdGhlIHJlc291cmNlIHRvIGZldGNoXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjYWNoZT10cnVlXSAtIFdoZXRoZXIgb3Igbm90IHRvIGNhY2hlIHRoaXMgcmVzb3VyY2VcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBOYW1lZEVuZHBvaW50LnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uIChwYXJhbSwgY2FjaGUpIHtcclxuICAgICAgICBpZiAoY2FjaGUgPT09IHZvaWQgMCkgeyBjYWNoZSA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIiA/IHBhcmFtLnRvTG93ZXJDYXNlKCkgOiBwYXJhbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCIvXCIgKyBwYXJhbSkudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGEgcmVzb3VyY2UgZnJvbSBjYWNoZSBpZiBpdCBleGlzdHMsIG9yIGF0dGVtcHQgdG8gZmV0Y2ggaXQgZnJvbSB0aGUgQVBJXHJcbiAgICAgKiBAcGFyYW0ge0VuZHBvaW50UGFyYW19IHBhcmFtIC0gVGhlIElEIG9mIHRoZSByZXNvdXJjZSB0byByZXNvbHZlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuZ2V0KHBhcmFtKSB8fCB0aGlzLmZldGNoKHBhcmFtKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgcGFnaW5hdGVkIHJlc291cmNlIGxpc3QgZnJvbSB0aGUgQVBJLCBvciB1c2VzIHRoZSBpbnRlcm5hbCBjYWNoZSBpZiBsaXN0QWxsKCkgaGFzIGJlZW4gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsaW1pdD0yMF0gLSBIb3cgbWFueSByZXNvdXJjZXMgdG8gbGlzdFxyXG4gICAgICogQHBhcmFtIHtvZmZzZXR9IFtvZmZzZXQ9MF1cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE5hbWVkQXBpUmVzb3VyY2VMaXN0PFQ+Pn1cclxuICAgICAqL1xyXG4gICAgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChsaW1pdCwgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKGxpbWl0ID09PSB2b2lkIDApIHsgbGltaXQgPSAyMDsgfVxyXG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cywgX2EsIGNvdW50LCBuZXh0LCBwcmV2aW91cywgcGFyYW1zO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSB0aGlzLl9saXN0LnJlc3VsdHMuc2xpY2Uob2Zmc2V0LCBsaW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSB0aGlzLl9saXN0LCBjb3VudCA9IF9hLmNvdW50LCBuZXh0ID0gX2EubmV4dCwgcHJldmlvdXMgPSBfYS5wcmV2aW91cztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeyBjb3VudDogY291bnQsIG5leHQ6IG5leHQsIHByZXZpb3VzOiBwcmV2aW91cywgcmVzdWx0czogcmVzdWx0cyB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IG5ldyB1cmxfc2VhcmNoX3BhcmFtc18xLmRlZmF1bHQoeyBsaW1pdDogXCJcIiArIGxpbWl0LCBvZmZzZXQ6IFwiXCIgKyBvZmZzZXQgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCI/XCIgKyBwYXJhbXMpLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmpzb24oKTsgfSldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIGNvbXBsZXRlIHJlc291cmNlIGxpc3QgZnJvbSB0aGUgQVBJIGJ5IG1ha2luZyB0d28gY2FsbHMuXHJcbiAgICAgKiBDYWNoZXMgdGhlIGxpc3QgYnkgZGVmYXVsdCBmb3IgQVBJLWxlc3MgcGFnaW5hdGlvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY2FjaGU9dHJ1ZV0gLSBJZiB0aGUgcmVzdWx0IHNob3VsZCBiZSBjYWhjZWQgaW4tbWVtb3J5XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxOYW1lZEFwaVJlc291cmNlTGlzdDxUPj59XHJcbiAgICAgKi9cclxuICAgIE5hbWVkRW5kcG9pbnQucHJvdG90eXBlLmxpc3RBbGwgPSBmdW5jdGlvbiAoY2FjaGUpIHtcclxuICAgICAgICBpZiAoY2FjaGUgPT09IHZvaWQgMCkgeyBjYWNoZSA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCwgZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLl9saXN0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcm9zc19mZXRjaF8xLmRlZmF1bHQoQkFTRV9VUkkgKyBcIi9cIiArIHRoaXMucmVzb3VyY2UgKyBcIj9saW1pdD0xXCIpLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmpzb24oKTsgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgPSAoX2Euc2VudCgpKS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0KEJBU0VfVVJJICsgXCIvXCIgKyB0aGlzLnJlc291cmNlICsgXCI/bGltaXQ9XCIgKyBjb3VudCkudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTmFtZWRFbmRwb2ludC5wcm90b3R5cGUuX2NhY2hlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNhY2hlLnNldChkYXRhLmlkLCBkYXRhKTtcclxuICAgICAgICB0aGlzLl9uYW1lTWFwLnNldChkYXRhLm5hbWUsIGRhdGEuaWQpO1xyXG4gICAgfTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGVudW1lcmFibGVfMS5kZWZhdWx0XHJcbiAgICBdLCBOYW1lZEVuZHBvaW50LnByb3RvdHlwZSwgXCJfbGlzdFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgZW51bWVyYWJsZV8xLmRlZmF1bHRcclxuICAgIF0sIE5hbWVkRW5kcG9pbnQucHJvdG90eXBlLCBcIl9uYW1lTWFwXCIsIHZvaWQgMCk7XHJcbiAgICByZXR1cm4gTmFtZWRFbmRwb2ludDtcclxufShFbmRwb2ludF8xLkVuZHBvaW50KSk7XHJcbmV4cG9ydHMuTmFtZWRFbmRwb2ludCA9IE5hbWVkRW5kcG9pbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5hbWVkRW5kcG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIG5vbmVudW1lcmFibGUgPSBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpIHx8IHt9O1xyXG4gICAgaWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eUtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gbm9uZW51bWVyYWJsZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW51bWVyYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgRW5kcG9pbnRfMSA9IHJlcXVpcmUoXCIuL2NsYXNzZXMvRW5kcG9pbnRcIik7XHJcbnZhciBOYW1lZEVuZHBvaW50XzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzL05hbWVkRW5kcG9pbnRcIik7XHJcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ludGVyZmFjZXMvQmVycmllcy9CZXJyeVwiKSk7XHJcbnZhciBQb2tlQVBJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUG9rZUFQSSgpIHtcclxuICAgIH1cclxuICAgIFBva2VBUEkuZnJvbVJlc291cmNlID0gZnVuY3Rpb24gKGFwaVJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX2EsIG1hdGNoLCByZXNvdXJjZSwgaWQsIGVuZHBvaW50O1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBfYSA9IC8oW2Etei1dKylcXC8oXFxkKykvLmV4ZWMoYXBpUmVzb3VyY2UudXJsKSwgbWF0Y2ggPSBfYVswXSwgcmVzb3VyY2UgPSBfYVsxXSwgaWQgPSBfYVsyXTtcclxuICAgICAgICAgICAgICAgIGlmIChhcGlSZXNvdXJjZS5lbmRwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBhcGlSZXNvdXJjZS5lbmRwb2ludC5yZXNvbHZlKHBhcnNlSW50KGlkLCAxMCkpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVuZHBvaW50ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykuZmluZChmdW5jdGlvbiAocHJvcCkgeyByZXR1cm4gX3RoaXNbcHJvcF0ucmVzb3VyY2UgPT09IHJlc291cmNlOyB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzW2VuZHBvaW50XS5yZXNvbHZlKHBhcnNlSW50KGlkLCAxMCkpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUG9rZUFQSS5CZXJyeSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImJlcnJ5XCIpO1xyXG4gICAgUG9rZUFQSS5CZXJyeUZpcm1uZXNzID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiYmVycnktZmlybW5lc3NcIik7XHJcbiAgICBQb2tlQVBJLkJlcnJ5Rmxhdm9yID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiYmVycnktZmxhdm9yXCIpO1xyXG4gICAgUG9rZUFQSS5Db250ZXN0VHlwZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImNvbnRlc3QtdHlwZVwiKTtcclxuICAgIFBva2VBUEkuQ29udGVzdEVmZmVjdCA9IG5ldyBFbmRwb2ludF8xLkVuZHBvaW50KFwiY29udGVzdC1lZmZlY3RcIik7XHJcbiAgICBQb2tlQVBJLlN1cGVyQ29udGVzdEVmZmVjdCA9IG5ldyBFbmRwb2ludF8xLkVuZHBvaW50KFwic3VwZXItY29udGVzdC1lZmZlY3RcIik7XHJcbiAgICBQb2tlQVBJLkVuY291bnRlck1ldGhvZCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImVuY291bnRlci1tZXRob2RcIik7XHJcbiAgICBQb2tlQVBJLkVuY291bnRlckNvbmRpdGlvbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImVuY291bnRlci1jb25kaXRpb25cIik7XHJcbiAgICBQb2tlQVBJLkVuY291bnRlckNvbmRpdGlvblZhbHVlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiZW5jb3VudGVyLWNvbmRpdGlvbi12YWx1ZVwiKTtcclxuICAgIFBva2VBUEkuRXZvbHV0aW9uQ2hhaW4gPSBuZXcgRW5kcG9pbnRfMS5FbmRwb2ludChcImV2b2x1dGlvbi1jaGFpblwiKTtcclxuICAgIFBva2VBUEkuRXZvbHV0aW9uVHJpZ2dlciA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImV2b2x1dGlvbi10cmlnZ2VyXCIpO1xyXG4gICAgUG9rZUFQSS5HZW5lcmFpdGlvbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImdlbmVyYXRpb25cIik7XHJcbiAgICBQb2tlQVBJLlBva2VkZXggPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlZGV4XCIpO1xyXG4gICAgUG9rZUFQSS5WZXJzaW9uID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwidmVyc2lvblwiKTtcclxuICAgIFBva2VBUEkuVmVyaW9uR3JvdXAgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJ2ZXJzaW9uLWdyb3VwXCIpO1xyXG4gICAgUG9rZUFQSS5JdGVtID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiaXRlbVwiKTtcclxuICAgIFBva2VBUEkuSXRlbUF0dHJpYnV0ZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIml0ZW0tYXR0cmlidXRlXCIpO1xyXG4gICAgUG9rZUFQSS5JdGVtQ2F0ZWdvcnkgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJpdGVtLWNhdGVnb3J5XCIpO1xyXG4gICAgUG9rZUFQSS5JdGVtRmxpbmdFZmZlY3QgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJpdGVtLWZsaW5nLWVmZmVjdFwiKTtcclxuICAgIFBva2VBUEkuSXRlbVBvY2tldCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIml0ZW0tcG9ja2V0XCIpO1xyXG4gICAgUG9rZUFQSS5Mb2NhdGlvbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcImxvY2F0aW9uXCIpO1xyXG4gICAgUG9rZUFQSS5Mb2NhdGlvbkFyZWEgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJsb2NhdGlvbi1hcmVhXCIpO1xyXG4gICAgUG9rZUFQSS5QYWxQYXJrQXJlYSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBhbC1wYXJrLWFyZWFcIik7XHJcbiAgICBQb2tlQVBJLlJlZ2lvbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInJlZ2lvblwiKTtcclxuICAgIFBva2VBUEkuTWFjaGluZSA9IG5ldyBFbmRwb2ludF8xLkVuZHBvaW50KFwibWFjaGluZVwiKTtcclxuICAgIFBva2VBUEkuTW92ZSA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmVcIik7XHJcbiAgICBQb2tlQVBJLk1vdmVBaWxtZW50ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibW92ZS1haWxtZW50XCIpO1xyXG4gICAgUG9rZUFQSS5Nb3ZlQmF0dGxlU3R5bGUgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJtb3ZlLWJhdHRsZS1zdHlsZVwiKTtcclxuICAgIFBva2VBUEkuTW92ZUNhdGVnb3J5ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibW92ZS1jYXRlZ29yeVwiKTtcclxuICAgIFBva2VBUEkuTW92ZURhbWFnZUNsYXNzID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibW92ZS1kYW1hZ2UtY2xhc3NcIik7XHJcbiAgICBQb2tlQVBJLk1vdmVMZWFybk1ldGhvZCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcIm1vdmUtbGVhcm4tbWV0aG9kXCIpO1xyXG4gICAgUG9rZUFQSS5Nb3ZlVGFyZ2V0ID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibW92ZS10YXJnZXRcIik7XHJcbiAgICBQb2tlQVBJLkFiaWxpdHkgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJhYmlsaXR5XCIpO1xyXG4gICAgUG9rZUFQSS5DaGFyYWN0ZXJpc3RpYyA9IG5ldyBFbmRwb2ludF8xLkVuZHBvaW50KFwiY2hhcmFjdGVyaXN0aWNcIik7XHJcbiAgICBQb2tlQVBJLkVnZ0dyb3VwID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwiZWdnLWdyb3VwXCIpO1xyXG4gICAgUG9rZUFQSS5HZW5kZXIgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJnZW5kZXJcIik7XHJcbiAgICBQb2tlQVBJLkdyb3d0aFJhdGUgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJncm93dGgtcmF0ZVwiKTtcclxuICAgIFBva2VBUEkuTmF0dXJlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwibmF0dXJlXCIpO1xyXG4gICAgUG9rZUFQSS5Qb2tlYXRobG9uU3RhdCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2VhdGhsb24tc3RhdFwiKTtcclxuICAgIFBva2VBUEkuUG9rZW1vbiA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2Vtb25cIik7XHJcbiAgICBQb2tlQVBJLlBva2Vtb25Db2xvciA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2Vtb24tY29sb3JcIik7XHJcbiAgICBQb2tlQVBJLlBva2Vtb25Gb3JtID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwicG9rZW1vbi1mb3JtXCIpO1xyXG4gICAgUG9rZUFQSS5Qb2tlbW9uSGFiaXRhdCA9IG5ldyBOYW1lZEVuZHBvaW50XzEuTmFtZWRFbmRwb2ludChcInBva2Vtb24taGFiaXRhdFwiKTtcclxuICAgIFBva2VBUEkuUG9rZW1vblNoYXBlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwicG9rZW1vbi1zaGFwZVwiKTtcclxuICAgIFBva2VBUEkuUG9rZW1vblNwZWNpZXMgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJwb2tlbW9uLXNwZWNpZXNcIik7XHJcbiAgICBQb2tlQVBJLlN0YXQgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJzdGF0XCIpO1xyXG4gICAgUG9rZUFQSS5UeXBlID0gbmV3IE5hbWVkRW5kcG9pbnRfMS5OYW1lZEVuZHBvaW50KFwidHlwZVwiKTtcclxuICAgIFBva2VBUEkuTGFuZ3VhZ2UgPSBuZXcgTmFtZWRFbmRwb2ludF8xLk5hbWVkRW5kcG9pbnQoXCJsYW5ndWFnZVwiKTtcclxuICAgIHJldHVybiBQb2tlQVBJO1xyXG59KCkpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFBva2VBUEk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFBva2VBUEk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBCZXJyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJlcnJ5KCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJlcnJ5O1xyXG59KCkpO1xyXG5leHBvcnRzLkJlcnJ5ID0gQmVycnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJlcnJ5LmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb25zdCBQID0gbmV3IFBva2VkZXguUG9rZWRleCgpXG5pbXBvcnQgUG9rZUFQSSBmcm9tICdwb2tlYXBpLXR5cGVzY3JpcHQnXG5cbmNvbnN0IFAgPSBQb2tlQVBJLlBva2Vtb25cblxuLy8gY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbi8vICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSlcbi8vIH1cblxud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgaHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJylcblxuICBjb25zdCBnZXRQb2tlbW9ucyA9IGF3YWl0IFAubGlzdEFsbCgpXG4gIGNvbnN0IHBva2Vtb25zID0gZ2V0UG9rZW1vbnMucmVzdWx0c1xuICBjb25zdCBmaWx0ZXJQb2tlbW9ucyA9IHBva2Vtb25zLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4IDwgNTApXG5cbiAgY29uc3QgcmVzcG9uc2VQb2tlbW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGZpbHRlclBva2Vtb25zLm1hcChhc3luYyAocG9rZW1vbikgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUG9rZUFQSS5Qb2tlbW9uLmZldGNoKHBva2Vtb24ubmFtZSlcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHJlc3VsdC5pZCxcbiAgICAgICAgbmFtZTogcmVzdWx0Lm5hbWUsXG4gICAgICAgIGltYWdlOiByZXN1bHQuc3ByaXRlcy5mcm9udF9kZWZhdWx0LFxuICAgICAgICB0eXBlOiByZXN1bHQudHlwZXMubWFwKCh7IHR5cGUgfSkgPT4gdHlwZS5uYW1lKVxuICAgICAgfVxuICAgIH0pXG4gIClcbiAgY29uc3QgY2FyZHNIdG1sID0gcmVzcG9uc2VQb2tlbW9ucy5tYXAoXG4gICAgKHBva2Vtb24pID0+IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIGRhdGEtaWQ9XCIke3Bva2Vtb24uaWR9XCI+XG4gICAgICA8aW1nIHNyYz1cIiR7cG9rZW1vbi5pbWFnZX1cIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiNTBcIiAvPlxuICAgICAgPHNwYW4+JHtwb2tlbW9uLm5hbWV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgXG4gIClcblxuICBpZiAoaHRtbCkgaHRtbC5pbm5lckhUTUwgPSBjYXJkc0h0bWwuam9pbignXFxuJylcbiAgLy8gTk9URTogRXZlbnRvIHBhcmEgYWJyaXIgbyBtb2RhbCBhbyBjbGljYXIgbm8gY2FyZFxuICAvLyBjb25zdCBjYXJkQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKVxuICAvLyBjYXJkQWxsLmZvckVhY2goZnVuY3Rpb24gKGFib2JyaW5oYSkge1xuICAvLyAgIGFib2JyaW5oYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJylcbiAgLy8gICAgIG1vZGFsIS5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC0tY2xvc2UnKVxuICAvLyAgICAgbW9kYWw/LmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1vcGVuJylcbiAgLy8gICAgIGNvbnN0IHVzZUlkID0gcGFyc2VGbG9hdCh0aGlzLmRhdGFzZXQuaWQpXG4gIC8vICAgICBjb25zdCBwb2tlbW9uID0gcmVzcG9uc2VQb2tlbW9ucy5maW5kKChkYXRhKSA9PiBkYXRhLmlkID09PSB1c2VJZClcbiAgLy8gICAgIGNvbnN0IG1vZGFsX19jb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19jb250ZW50JylcbiAgLy8gICAgIGlmIChtb2RhbF9fY29udGVudCkge1xuICAvLyAgICAgICBtb2RhbF9fY29udGVudC5pbm5lckhUTUwgPSBgXG4gIC8vICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uXCI+XG4gIC8vICAgICAgICAgPGRpdiBjbGFzcz1cInBva2Vtb25fX2hlYWRcIj5cbiAgLy8gICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwb2tlbW9uX19iYWNrXCIgdHlwZT1cImJ1dHRvblwiPlxuICAvLyAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZXZyb24tYmFjay1vdXRsaW5lXCI+PC9pb24taWNvbj5cbiAgLy8gICAgICAgICAgIDwvYnV0dG9uPlxuICAvLyAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb2tlbW9uX19pZFwiPiMke3Bva2Vtb24uaWR9PC9zcGFuPlxuICAvLyAgICAgICAgIDwvZGl2PlxuICAvLyAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uX19tYWluXCI+XG4gIC8vICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9rZW1vbl9faW1hZ2VtXCI+XG4gIC8vICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uX19ibHVyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtcbiAgLy8gICAgICAgICAgICAgICBwb2tlbW9uLmltYWdlXG4gIC8vICAgICAgICAgICAgIH0pO1wiPjwvZGl2PlxuICAvLyAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicG9rZW1vbl9faW1hZ2VtXCIgc3JjPVwiJHtcbiAgLy8gICAgICAgICAgICAgICBwb2tlbW9uLmltYWdlXG4gIC8vICAgICAgICAgICAgIH1cIiBoZWlnaHQ9XCIzMDBcIiAvPlxuICAvLyAgICAgICAgICAgPC9kaXY+XG4gIC8vICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9rZW1vbl9faW5mb1wiPlxuICAvLyAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBva2Vtb25fX25hbWVcIj4ke3Bva2Vtb24ubmFtZX08L3NwYW4+XG4gIC8vICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2tlbW9uX190eXBlc1wiPlxuICAvLyAgICAgICAgICAgICAgICR7cG9rZW1vbi50eXBlXG4gIC8vICAgICAgICAgICAgICAgICAubWFwKFxuICAvLyAgICAgICAgICAgICAgICAgICAodHlwZSkgPT4gYFxuICAvLyAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb2tlbW9uX190eXBlTmFtZSBwb2tlbW9uX190eXBlTmFtZS0tJHt0eXBlfVwiPlxuICAvLyAgICAgICAgICAgICAgICAgICAke2NhcGl0YWxpemVGaXJzdExldHRlcih0eXBlKX1cbiAgLy8gICAgICAgICAgICAgICAgIDwvcD5cbiAgLy8gICAgICAgICAgICAgICBgXG4gIC8vICAgICAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICAgICAgICAuam9pbignXFxuJyl9XG4gIC8vICAgICAgICAgICAgIDwvZGl2PlxuICAvLyAgICAgICAgICAgPC9kaXY+XG4gIC8vICAgICAgICAgPC9kaXY+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgYFxuICAvLyAgICAgfVxuICAvLyAgICAgLy8gZXZlbnRvc1xuICAvLyAgICAgY29uc3QgcG9rZW1vbl9fYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uX19iYWNrJylcbiAgLy8gICAgIHBva2Vtb25fX2JhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIC8vICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1vcGVuJylcbiAgLy8gICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWNsb3NlJylcbiAgLy8gICAgIH0pXG4gIC8vICAgfSlcbiAgLy8gfSlcbiAgLy8gRUxFTUVOVE8gLkFERF9FVkVOVE8oJ0VWRU5UTyBERSBDTElDSycsICgpID0+IHtcbiAgLy8gICAvLyBtZXUgY29kaWdvXG4gIC8vIH0pXG4gIC8vIE5PVEU6IEZlY2hhIHRvZG9zIG9zIG1vZGFsXG4gIC8vIGNvbnN0IG1vZGFsX19jbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKVxuICAvLyBtb2RhbF9fY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIC8vICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAvLyAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1vcGVuJylcbiAgLy8gICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbC0tY2xvc2UnKVxuICAvLyB9KVxufVxuIl0sIm5hbWVzIjpbIlBva2VBUEkiLCJQIiwiUG9rZW1vbiIsIndpbmRvdyIsIm9ubG9hZCIsImh0bWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRQb2tlbW9ucyIsImxpc3RBbGwiLCJwb2tlbW9ucyIsInJlc3VsdHMiLCJmaWx0ZXJQb2tlbW9ucyIsImZpbHRlciIsIl8iLCJpbmRleCIsInJlc3BvbnNlUG9rZW1vbnMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicG9rZW1vbiIsInJlc3VsdCIsImZldGNoIiwibmFtZSIsImlkIiwiaW1hZ2UiLCJzcHJpdGVzIiwiZnJvbnRfZGVmYXVsdCIsInR5cGUiLCJ0eXBlcyIsImNhcmRzSHRtbCIsImlubmVySFRNTCIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9