//Linked list implementation

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    insert(nthPosition, value) {
        if (nthPosition < 0 || nthPosition > this.length) {
            throw new Error('Index error');
        }

        const newNode = {
            value
        };

        if (nthPosition == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }
        else {
            // Find the node which we want to insert after
            const node = this._findNthElement(nthPosition - 1);
            newNode.next = node.next; 
            node.next = newNode;
        }

        this.length++;
    }
    //this is another way of finding things when you don't have the nth item which in most cases you don't
    _findItem(item) {
        let node = this.head;
        while(node && node.value != item){
            node = node.next;
        }
        return node;
    }
    //----------------------------
   _findNthElement(nthElement) {
        let node = this.head;
        for (let i=0; i<nthElement; i++) {
            node = node.next;
        }
        return node;
    }
    //----------------------------
    get(nthElement) {
        if (nthElement < 0 || nthElement >= this.length) {
            throw new Error('Index error');
        }

        return this._findNthElement(nthElement).value;
    }

    remove(nthElement) {
        if (nthElement < 0 || nthElement >= this.length) {
            throw new Error('Number of item is incorrect error');
        }

        if (nthElement == 0) {
            this.head = this.head.next;
        }
        else {
            // Find the node before the one we want to remove
            const node = this._findNthElement(nthElement - 1);
            node.next = node.next.next;
        }

        this.length--;
    }
    
}
const preguntas = [
    {
      question: 'casa',
      answer: 'house',
      id: 1
    },
    {
      question: 'hambre',
      answer: 'hunger',
      id: 2
    },
    {
      question: 'perro',
      answer: 'dog',
      id: 3
    },
    {
      question: 'hola',
      answer: 'hello',
      id: 4
    },
    {
      question: 'mundo',
      answer: 'world',
      id: 5
    },
    {
      question: 'grande',
      answer: 'big',
      id: 6
    },
    {
      question: 'izquierda',
      answer: 'left',
      id: 7
    },
    {
      question: 'durmiendo',
      answer: 'sleeping',
      id: 8
    },
    {
      question: 'mesa',
      answer: 'table',
      id: 9
    },
    {
      question: 'pajaro',
      answer: 'bird',
      id: 10
    }
  ];

// 
  const linkedList = new LinkedList;


  linkedList.insert(0,'A')
  linkedList.insert(1, 'B')
  linkedList.insert(2, 'C')

//   console.log(linkedList)
// Algorithm Fn----------------------------------------------->>>>>>>
// first question should be the head
// 'next of head' is next question
// a question that was answered correctly pointer points at = null
// if question was answered incorrectly pointer points to next of head

// ```Given a list of questions with corresponding "memory values", M, starting at 1:
// Take the first question in the list
// Ask the question
// If the answer was correct:
// Double the value of M
// If the answer was wrong:
// Reset M to 1
// Move the question back M places in the list
// You can use a singly linked list to do this```

function algorithm(linkedList, mValue){
    // when user logs in to resume playing
    let currentNode = linkedList.head;
    if(currentNode !== mValue){
        cureentNode = currentNode.next
    }
    return currentNode;
}

console.log(algorithm(0, 2))

// function listLength(linkedList){
// 	let i = 0;
// 	let currentNode = linkedList.head;
// 	while (currentNode !== null) {
// 		i++;
// 		currentNode = currentNode.next;
// 	}
// 	return i;
// }

// console.log(listLength(linkedList))