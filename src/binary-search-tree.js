import { Node } from "../extensions/list-tree.js";




export default class BinarySearchTree {
  constructor(){
    this.treeRoot = null;
  }



  root() {
     return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if(this.treeRoot === null){
      this.treeRoot = newNode;
      return;
    }

    let current =this.treeRoot;
    while(true){
      if(data<current.data){
        if(current.left === null){
          current.left = newNode;
          break;
        }
        current = current.left;
      }else if(data>current.data){
        if(current.right === null){
          current.right = newNode;
          break;
        } 
        current = current.right;
      }else{
        break;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.treeRoot;
    while(current !== null){
      if(data === current.data){
        return current;
      }else if(data<current.data){
        current = current.left;
      }else current = current.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node,value) =>{
      if(node === null)
        return null;

      if(value === node.data){
        if(node.left === null)
          return node.right;
        if(node.right === null)
          return node.left;

        let minRight = node.right;
        while(minRight.left !== null){
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }

      if (value <node.data){
        node.left = removeNode(node.left, value);
      }else{
        node.right = removeNode(node.right, value);
      }
      return node;
    };
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    if(this.treeRoot === null) return null;
    let current = this.treeRoot;
    while(current.left !== null) current = current.left;
    return current.data;
  }

  max() {
    if(this.treeRoot === null) return null;
    let current = this.treeRoot;
    while(current.right !== null) current = current.right;
    return current.data;
  }
};