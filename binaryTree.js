"use strict";

class Node {
  constructor(value) {
    this.val = value; // value of the node
    this.leftChild = null;
    this.rightChild = null;
  }
}
// var myNode = new Node(6);
// console.log(myNode)

class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  insert(newValue) {
    if (this.root == null) {
      this.root = new Node(newValue);
      return;
    }
    var currentNode = this.root;
    var parent;
    while (currentNode) {
      parent = currentNode;
      if (newValue < currentNode.val) {
        currentNode = currentNode.leftChild
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    if (newValue < parent.val) {
      parent.leftChild = new Node(newValue)
    } else {
      parent.rightChild = new Node(newValue)
    }
  }

  insertRecursiveAlgo(currentNode, newValue) {
    if (currentNode === null) {
      // We found a place! Now initialize currentNode with the newValue
      currentNode = new Node(newValue);
    } else if (newValue < currentNode.val) {
      //if newValue < currentNode.val, let's go to the left subtree
      currentNode.leftChild = this.insertRecursiveAlgo(currentNode.leftChild, newValue);
    } else {
      //if newValue >= currentNode.val, let's go to the right subtree
      currentNode.rightChild = this.insertRecursiveAlgo(currentNode.rightChild, newValue);
    }

    return currentNode;
  }
  insertRecursiveStart(newValue) {
    if (this.root == null) {
      this.root = new Node(newValue);
      return;
    }
    this.insertRecursiveAlgo(this.root, newValue);
  }

  preOrderPrintTest(currentNode, side = null) {
    //if the currentNode IS NOT EQUAL to null
    if (currentNode !== null) {
      //print its value
      console.log(side);
      console.log(currentNode.val);
      //make recursive call to the left subtree
      this.preOrderPrint(currentNode.leftChild, "LEFT");
      //make recursive call to the right subtree
      this.preOrderPrint(currentNode.rightChild, "RIGHT");
    }
    //if the currentNode IS EQUAL to null, then 
    //we simply return
  }

  preOrderPrint(currentNode) {
    if (currentNode !== null) {
      console.log(currentNode.val);
      this.preOrderPrint(currentNode.leftChild);
      this.preOrderPrint(currentNode.rightChild);
    }
  }

  inOrderPrint(currentNode) {
    if (currentNode !== null) {
      this.inOrderPrint(currentNode.leftChild);
      console.log(currentNode.val);
      this.inOrderPrint(currentNode.rightChild);
    }
  }

  postOrderPrint(currentNode) {
    if (currentNode !== null) {
      this.postOrderPrint(currentNode.leftChild);
      this.postOrderPrint(currentNode.rightChild);
      console.log(currentNode.val);
    }
  }

  search(value) {
    var currentNode = this.root;
    while (currentNode && (currentNode.val != value)) {
      if (value < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return currentNode;
  }

  searchRecursive(currentNode, value) {
    if (currentNode !== null) {
      if (value == currentNode.val) {
        return currentNode;
      } else if (value < currentNode.val) {
        return this.searchRecursive(currentNode.leftChild, value)
      } else {
        return this.searchRecursive(currentNode.rightChild, value)
      }
    } else {
      return null;
    }
  }

  delete(currentNode, value) {
    //case 1: checking for the empty tree
    //if rootNode equals Null
    if (currentNode == null) {
      return false;
    }
    //start traversing the tree
    //until we find the value to be deleted
    //or end up with a null node
    var parentNode;
    while (currentNode && (currentNode.val != value)) {
      parentNode = currentNode;
      if (value < currentNode.val) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    //case 2 : currentNode IS EQUAL to null. Value not found!
    if (currentNode === null) {
      return false;
    } else if (currentNode.leftChild == null && currentNode.rightChild == null) {
      //case 3: currentNode is a leaf node
      //i.e. right and left EQUAL to null

      //now checking if the node to be deleted 
      //is a left or a right child of its parent or if it's the root
      if (currentNode.val == this.root.val) {
        this.root = null;
        return true;
      } else if (currentNode.val < parentNode.val) {
        parentNode.leftChild = null;
        return true;
      } else {
        parentNode.rightChild = null;
        return true;
      }
    } else if (currentNode.rightChild == null) {
      //if the node to be deleted has a left child only 
      //we'll link the left child to the parent of 
      //the node to be deleted  
      if (currentNode.val == this.root.val) {
        this.root = currentNode.leftChild;
        return true;
      } else if (currentNode.leftChild.val < parentNode.val) {
        parentNode.leftChild = currentNode.leftChild;
        return true;
      } else {
        parentNode.rightChild = currentNode.leftChild;
        return true;
      }
    } else if (currentNode.leftChild = null) {
      //if the node to be deleted has a right child only 
      //we'll link the right child to the parent of 
      //the node to be deleted  
      if (currentNode.val == this.root.val) {
        this.root = currentNode.rightChild;
        return true;
      }
      else if (currentNode.rightChild.val < parentNode.val) {
        parentNode.leftChild = currentNode.rightChild;
        return true;
      }
      else {
        parentNode.rightChild = currentNode.rightChild;
        return true;
      }
    } else {
      //case where the node to be deleted has 2 children
      //starting point for the right sub tree
      var minRight = currentNode.rightChild;
      //traverse to find the left most node in the right subtree
      while (minRight.leftChild !== null) {
        minRight = minRight.leftChild;
      }
      var temp = minRight.val;
      //delete the left most node in the right subtree
      //by calling in the same delete function
      //to cater for whether it has children or not
      this.delete(this.root, minRight.val);
      //replace the currentNode with left most node in the right subtree
      currentNode.val = temp;
      return true;
    }
  }

  findMin(currentNode) {
    if (currentNode == null) {
      return false;
    }

    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild
    }

    console.log(currentNode.val)
    return currentNode.val
  }

  findAncestors(rootNode, k) {
    if (rootNode == null) {
      return false;
    }

    var currentNode = rootNode
    var s = "";

    while (currentNode.val != k) {
      s += currentNode.val + " "
      if (k < currentNode.val) {
        currentNode = currentNode.leftChild
      } else {
        currentNode = currentNode.rightChild
      }
    }

    console.log(s)
    return s;
  }

  findHeight(rootNode) {
    if (rootNode === null)
      return 0;
    else if (rootNode.leftChild === null && rootNode.rightChild === null)
      return 0
    else {
      //Find Height of left subtree and then right subtree
      //Return greater height value of left or right subtree (plus 1)
      var leftHeight = this.findHeight(rootNode.leftChild)
      var rightHeight = this.findHeight(rootNode.rightChild)
      if (leftHeight > rightHeight)
        return leftHeight + 1
      else
        return rightHeight + 1
    }
  }

  findKNodes(rootNode, k) {
    var result = [];
    this.findK(rootNode, k, result);
    return result;
  }

  //Helper recursive function to traverse tree and push all the nodes at "k" distance into "result" list
  findK(rootNode, k, result) {
    if (rootNode == null)
      return
    if (k == 0) {
      result.push(rootNode.val)
    } else {
      //Decrement k at each step till you reach at the leaf node
      //or when k == 0 then push the Node's data into result 
      this.findK(rootNode.leftChild, k - 1, result)
      this.findK(rootNode.rightChild, k - 1, result)
    }
  }
}


var BST = new BinarySearchTree(5);
BST.insertRecursiveStart(8)
BST.insertRecursiveStart(10)
BST.insertRecursiveStart(3)
BST.insertRecursiveStart(1)
BST.insertRecursiveStart(6)
BST.insertRecursiveStart(9)
BST.insertRecursiveStart(7)
BST.insertRecursiveStart(2)
BST.insertRecursiveStart(0)
//BST.inOrderPrint(BST.root)
console.log(BST.findKNodes(BST.root, 0))
console.log(BST.findKNodes(BST.root, 1))
console.log(BST.findKNodes(BST.root, 2))
console.log(BST.findKNodes(BST.root, 3))