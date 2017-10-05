import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers/index'
import { mount } from 'enzyme';

// Wraps a provided component with a Provider
// This allows the provided component to have a redux store
export default class TestProvider {

  // Returns the string name of the component class
  // If the provided component is a connected component, will
  // return the name of the wrapped component
  static _componentType(component){
    if(component.type.name === 'Connect'){
      return component.type.WrappedComponent.name
    }
    return component.type.name
  }

  // Returns the provided component after it has been wrapped with
  // a Provider.
  static provide(component, preloadStore = {}){
    const provider = mount(
      <Provider store={createStore(reducer, preloadStore)} >
        {component}
      </Provider>
    )
    return provider.find(this._componentType(component))
  }
}
