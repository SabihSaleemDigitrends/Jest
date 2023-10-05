import React, {useRef, useEffect, useState} from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';

const Test = () => {
  const scrollViewRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [timer, setTimer] = useState(50);
  const [contentHeight, setContentHeight] = useState(null);

  let scrollInterval;
  useEffect(() => {
    scrollInterval = setInterval(() => {
      const newScrollY = scrollY + 1;

      scrollViewRef.current.scrollTo({y: newScrollY, animated: false});

      setScrollY(newScrollY);
    }, timer);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [scrollY]);

  console.log(
    'Dimensions',
    scrollY,
    contentHeight - 270,
  );

  return (
    <View
      style={{
        height: 250,
      }}>
      <ScrollView
        style={{
          marginVertical: '5%',
          borderWidth: 1,
          flex: 1,
        }}
        ref={scrollViewRef}
        onScroll={event => {
          if (
            scrollY ===
            Math.round(event?.nativeEvent?.contentSize?.height) - 220
          ) {
            clearInterval(scrollInterval);
          }

          setContentHeight(event?.nativeEvent?.contentSize?.height);
        }}>
        <Text style={{}}>
          {`Agora Video Calling Quickstart
    
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart

        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        Agora Video Calling Quickstart
        `}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Test;
