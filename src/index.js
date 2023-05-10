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
  
function render(element, container) {
    console.log("element" + JSON.stringify(element))
    if(element.type === "TEXT_ELEMENT") {
       var dom =  document.createTextNode("")
    } else {
        var dom = document.createElement(element.type)
    }
    //add the element properties to the dom element created
    const { children, ...properties} = element.props;
    //add the properties to the newly created element
    console.log("properties " + JSON.stringify(properties))
    for(let name in properties) {
        dom[name] = properties[name];
    }
    console.log("dom" + JSON.stringify(dom));
    element.props.children.forEach(child => render(child, dom));
    //insert the new element to the container
    container.appendChild(dom);    
}
  
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
  const container = document.getElementById("root");
  Act.render(element, container);
  



