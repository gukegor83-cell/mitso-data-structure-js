

export default class BloomFilter {
  /**
   * @param {number} size - the size of the storage.
   */
  constructor(size = 100) {
    this.size = size;
    this.storage = this.createStore(size);
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashValues = this.getHashValues(item);
    hashValues.forEach((val)=> this.storage.setValue(val));
  }

  /**
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashValues = this.getHashValues(item);

    for(let i=0; i < hashValues.length ; i++){
    if(!this.storage.getValue(hashValues[i])){
      return false;
    }
  } 
    return true;
  
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   *
   * @param {number} size
   * @return {Object}
   */
  createStore(size) {
    const storage = new Array(size).fill(false);

    return{
      getValue(index){
        return storage[index];
      },
      setValue(index){
        storage[index] = true;
      },
    };
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    let hash = 0;
    for(let i = 0; i<item.length;i++){
    const char = item.charCodeAt(i);
    hash = (hash << 5) + hash + char;
    hash = hash & hash;
    }
    return Math.abs(hash % this.size);
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    let hash = 0;
    for(let i = 0; i<item.length;i++){
    const char = item.charCodeAt(i);
    hash = (hash << 5) + char;
    hash = hash & hash;
    }
    return Math.abs(hash % this.size);
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = 0;
    for(let i = 0; i<item.length;i++){
    const char = item.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash
    }
    return Math.abs(hash % this.size);
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   *
   * @param {string} item
   * @return {number[]}
   */
  getHashValues(item) {
    return [this.hash1(item),this.hash2(item),this.hash3(item)];
  }
}
