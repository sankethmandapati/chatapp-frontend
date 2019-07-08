import mergeSort from './mergeSort';
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    unshift(element) {
        if(!element instanceof Node)
            element = new Node(element);
        element.previous = null;

        this.head.previous = element;
        element.next = this.head;
        this.head = element;
        this.length++;
        return this.head;
    }

    addArray(arr) {
        arr.forEach(this.push);
    }

    push(element) {
        const newNode = new Node(element);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return element;
        }
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
        this.length++;
        return this.tail;
    }

    removeByKey(key, value) {
        let current = this.head;
        while(current[key] != value) {
            current = current.next;
        }
        let previous = current.previous;
        let next = current.next;
        previous.next = next;
        next.previous = previous;
        this.length--;
        return current;
    }

    // removeByValue(element) {}

    // removeByIndex() {}

    pushToTop(key, value) {
        const element = this.removeByKey(key, value);
        this.unshift(element);
    }

    map(fn, reverse) {
        let node = reverse ? this.tail : this.head;
        if(!node) {
            return [];
        }
        let index = 0;
        let mappedArray = [];
        while(node) {
            mappedArray.push(fn(node.element, index++));
            // current = reverse ? current.previous : current.next;
            node = reverse ? node.previous : node.next;
        }
        return mappedArray;
    }

    reduce(fn, data, reverse) {
        let node = reverse ? this.tail : this.head;
        if(!node) {
            return data;
        }
        let index = 0;
        while(node) {
            data = fn(data, node.element, index++);
            node = reverse ? node.previous : node.next;
        }
        return data;
    }
    filter(fn, filterOnlyOne) {
        let filteredList = [];
        let node = this.head;
        if(!node) {
            return [];
        }
        let index = 0;
        while(node) {
            const filterElement = fn(node, index++);
            if(filterElement) {
                filteredList.push(node);
                if(filterOnlyOne)
                    break;
            }
            node = node.next;
        }
        return filteredList;
    }
    find(fn) {
        const foundElement = this.filter(fn, true)[0] ? this.filter(fn, true)[0] : null;
        return foundElement;
    }
    sort(fn) {
        const halfLength = Math.floor(this.length/2);
        const sortedArray = this.mergeSort();
    }
    mergeSort(leftElement, rightElement) {
        
    }
}
