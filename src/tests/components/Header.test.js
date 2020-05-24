import React from "react";
import { Header } from '../../components/Header'; //grabbing named export, we want unconnected version
import { shallow } from 'enzyme';
//import toJson from 'enzyme-to-json'; //quick fix if nothing works and snapshot is still empty

//react-test-renderer
//import ReactShallowRenderer from 'react-test-renderer/shallow';

// we are not concerned about user interaction or lifecycle events in this component so sticking to only shallow rendering

// we are concerned about just what is rendering, so shallow rendering is used here

//Snapshot testing will compare previously rendered output with current one, if its same then pass the test, if not then ask user to update the snapshot by pressing "u"

//test('should render Header correctly', ()=>{
//    const renderer = new ReactShallowRenderer();
//    renderer.render(<Header/>);
//    expect(renderer.getRenderOutput()).toMatchSnapshot();
//    
//})

test('should render Header correctly', () => {
   const wrapper = shallow(<Header startLogout={ () => { } }/>);
  //expect(toJson(wrapper)).toMatchSnapshot();  
 expect(wrapper).toMatchSnapshot();                           
//  expect(wrapper.find('h1').length).toBe(1);
//  expect(wrapper.find('h1').text()).toBe('Expensify');
})

test('should call startlogout on button click', () => {
    const onStartlogoutCLick = jest.fn();
    const wrapper = shallow(<Header startLogout={onStartlogoutCLick}/>); 
    wrapper.find('button').simulate('click');
    expect(onStartlogoutCLick).toHaveBeenCalled() //fails if the fake function(onStartlogoutCLick) is not called
})
