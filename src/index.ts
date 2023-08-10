#!/usr/bin/env node

class Tree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(value: number) {
        const newNode = new TreeNode(value)

        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node: TreeNode, newNode: TreeNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    remove(value: number) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node: TreeNode | null, value: number): TreeNode | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }

        if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        }

        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const minNode = this.findMinNode(node.right);
        node.value = minNode.value;

        node.right = this.removeNode(node.right, minNode.value);
        return node;
    }

    findMinNode(node: TreeNode): TreeNode {
        if (node.left === null) {
            return node;
        }

        return this.findMinNode(node.left);
    }

    inorder(root: TreeNode | null = null): Array<number> {
        console.log('inorder invoked with: ', { root });
        if (!root && this.root) root = this.root;
        if (!root) return [];

        const nodes = [];

        root.left && this.inorder(root.left);
        nodes.push(root.value);
        root.right && this.inorder(root.right);

        return nodes;
    }
}

class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const tree = new Tree();
tree.insert(1);
tree.insert(2);
tree.insert(4);
tree.insert(3);

console.log(tree);
console.log(tree.inorder());