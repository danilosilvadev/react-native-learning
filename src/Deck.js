import React, { Component } from 'react';
import { 
  View, 
  Animated,
  PanResponder
} from 'react-native';

class Deck extends Component {

  constructor(props){
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      // chooses the component to respond
      onStartShouldSetPanResponder: () => true,
      // It is called when the user move/drags some el
      onPanResponderMove: (event, gesture) => {
        // This part wires gesture system with animated system
        position.setValue({x: gesture.dx, y: gesture.dy})
      },
      // It is called when the user release the el
      onPanResponderRelease: () => {}
    });
    this.panResponder = panResponder;
    this.position = position;
    this.state = { panResponder };
  }

  renderCards(){
    return this.props.data.map((item, index) => {
      if(index === 0){
        return (
          <Animated.View 
            style={this.position.getLayout()}
            {...this.panResponder.panHandlers} 
          >
            {this.propsRenderCard(item)}
          </Animated.View>
        )
      }
  
       return this.props.renderCard(item);

    })
  }

  render(){
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck;