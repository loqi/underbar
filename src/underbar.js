/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ?
      array[array.length - 1] :
      array.slice(Math.max(array.length - n, 0));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection == null) return;
    if (Array.isArray(collection)) {
      for (var c = collection.length, i = 0; c--; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var k in collection) {
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){ // Returns on first instance found.
    for (var c = array.length, i = 0; c--; i++) {
      if (array[i]===target) return i;
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var rval = [];
    _.each( collection ,
      function(item){if(test(item)) rval.push(item);} ); // FIXME: Handle more parameters?
    return rval;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter( collection, function (item){return !test(item);} ); // FIXME: Handle more parameters.
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var rval = [], seen = {};
    _.each(array, function(item){
      if (!seen.hasOwnProperty(item)) { seen[item] = 1; rval.push(item); }
    });
    return rval;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var rval = [];
    _.each( collection , function(item){rval.push(iterator(item));} );
    return rval;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map( collection , function(item){return item[key];} );
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map( collection , function(item){
      return ((typeof functionOrKey === 'function') ?
        functionOrKey.apply(item, args) :
        item[functionOrKey](args)
      );
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var isInitialized = arguments.length > 2;
    if (collection == null) collection = [];
    _.each(collection, function(item, index, collection){
      accumulator = isInitialized ?
        iterator(accumulator, item, index, collection) :
        isInitialized=true, item;
    });
    // if (!isInitialized) throw new TypeError("reduce() received an empty collection and no accumulator.");
    return isInitialized ? accumulator : null;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      return wasFound || item === target;
    }, false);
  };

// FIXME: All these should return short on the first positive test.

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (typeof iterator === 'undefined') iterator = _.identity;
    return _.reduce(collection, function(everySoFar, item){
      return everySoFar && !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (typeof iterator === 'undefined') iterator = _.identity;
    return !_.every( collection , function(item){
      return !iterator(item);
    });
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */


  // Utility function serving _.extend and _.defaults.
  function mergeObjs(mayOverwrite, firstObj, moreObjs) {
    _.each(moreObjs, function(anotherObj) {
      if (anotherObj) {
        for (var prop in anotherObj) {
          if (mayOverwrite || !firstObj.hasOwnProperty(prop)) {
            firstObj[prop] = anotherObj[prop];
          }
        }
      }
    });
    return firstObj;
  }
  // Extend a given object with all the properties of the passed-in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(firstObj) {
    return mergeObjs(true, firstObj, Array.prototype.slice.call(arguments, 1));
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(firstObj) {
    return mergeObjs(false, firstObj, Array.prototype.slice.call(arguments, 1));
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead, if possible.
  _.memoize = function(func) {
    var memoTab = {};
    return function(param) {
      var key = (typeof param) + '~' + param;
      if (memoTab.hasOwnProperty(key)) return memoTab[key];
      return (memoTab[key] = func(param));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
