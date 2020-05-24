import React from "react";
import { Login } from '../../components/Login'; //grabbing named export, we want unconnected version
import { shallow } from 'enzyme';

test('should render Login page', ()=>{
    const wrapper=shallow(<Login startLogin={ () => { } }/>);
    expect(wrapper).toMatchSnapshot();                     
})

test('should call startlogin on button click', () => {
    const onStartloginCLick = jest.fn();
    const wrapper = shallow(<Login startLogin={onStartloginCLick}/>); 
    wrapper.find('button').simulate('click');
    expect(onStartloginCLick).toHaveBeenCalled() //fails if the fake function(onStartlogoutCLick) is not called
})
