function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                if(typeof child === 'object') {
                   return child
                } else {
                    return createTextElement(child)
                }
            })
        }
    }
  }
  
function createTextElement(text) {
    //console.log("text child element" + JSON.stringify(text))
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
  
// function render(element, container) {
//     console.log("element" + JSON.stringify(element))
//     if(element.type === "TEXT_ELEMENT") {
//        var dom =  document.createTextNode("")
//     } else {
//         var dom = document.createElement(element.type)
//     }
//     //add the element properties to the dom element created
//     const { children, ...properties} = element.props;
//     //add the properties to the newly created element
//     console.log("properties " + JSON.stringify(properties))
//     for(let name in properties) {
//         dom[name] = properties[name];
//     }
//     console.log("dom" + JSON.stringify(dom));
//     element.props.children.forEach(child => render(child, dom));
//     //insert the new element to the container
//     container.appendChild(dom);    
// }
//we need to have the render function check for any other actions or events in the browser, the idea of having the 
//children render recursively is not right. 

function createDom(fiber) {
    if(fiber.type = "TEXT_ELEMENT") {
        var dom = document.createTextNode("");
    } else {
        var dom = document.createElement(fiber.type);
    }

    const {children, ...props} = fiber.props;
    for(let name in props) {
        dom[name] = props[name];
    }
    return dom;
}

function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
}

let nextUnitOfWork = null;
let currentRoot = null;

function workLoop(deadline) {
    //should yeild to the browser
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(
        nextUnitOfWork
      )
      shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}

function performUnitOfWork(fiber) {
  // add dom node
    if(!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber);
    }
  // create new fibers
  console.log("nextUnitOfWork " + JSON.stringify(fiber));
  const elements = fiber.props.children;
  let index = 0; 
  let previousSibling = null; 

  while(index < elements.length) {
    element = elements[index];

    const newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: null
      }

    if(index ==0) {
        fiber.child = newFiber;
    } else {
        previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
    index++;
    
  }

  // return next unit of work
}

//requestIdleCallback is a method provided by the browser's window object. It schedules a callback to be called during a browser's idle periods. 
requestIdleCallback(workLoop);

const Act = {
    createElement,
    render
};
  
  /** @jsx Act.createElement */
  const element = (
    <div style="background: red">
      <h2 style="text-align:left">ACT ACT</h2>
    </div>
  );
  alert('test');
  const container = document.getElementById("root");
  Act.render(element, container);
  



