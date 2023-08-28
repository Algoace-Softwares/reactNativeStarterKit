import {Animated, FlatList, StyleSheet, View, Image, ViewStyle} from 'react-native';
import React, {useRef} from 'react';
import {GlobalStyles, WIDTH, COLORS} from '../../assets';

type dataItem = {
  path: number | string;
  id: number;
};

interface carosalViewComponentType {
  data: dataItem[];
  mainViewStyle?: ViewStyle;
  flatListStyle?: ViewStyle;
  dotViewStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  selectedDotColor: string;
  unSelectedColor: string;
}

export default function CarosalViewComponent(props: carosalViewComponentType): JSX.Element {
  // destructing props
  const {
    data = [],
    mainViewStyle = {},
    flatListStyle = {},
    dotViewStyle = {},
    dotStyle = {},
    selectedDotColor = COLORS.primary,
    unSelectedColor = COLORS.grey5,
  } = props;
  //Refs
  const scrollX = useRef(new Animated.Value(0)).current;

  // redering top image slider
  const renderPictureSlider = ({item}: {item: dataItem}): JSX.Element => {
    console.log('item is:', item);
    return (
      <View style={styles.carosalItemStyle}>
        {typeof item?.path === 'number' ? (
          <Image source={item?.path} style={GlobalStyles.mainImageStyle} resizeMode={'cover'} />
        ) : (
          <Image
            source={{uri: item?.path}}
            style={GlobalStyles.mainImageStyle}
            resizeMode={'cover'}
          />
        )}
      </View>
    );
  };

  // controlling footer dots
  const renderFooter = (): JSX.Element => {
    const dotPosition = Animated.divide(scrollX, WIDTH);
    return (
      <View style={[styles.dotContainer, dotViewStyle]}>
        {data.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [unSelectedColor, selectedDotColor, unSelectedColor],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                ...styles.dotAnimation,
                backgroundColor: dotColor,
                ...dotStyle,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.mainViewStyle, mainViewStyle]}>
      <FlatList
        data={data}
        keyExtractor={(i, index) => `index-${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderPictureSlider}
        pagingEnabled={true}
        style={[GlobalStyles.mainContainer, flatListStyle]}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: false,
        })}
      />
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  dotAnimation: {
    borderRadius: 5,
    marginHorizontal: 6,
    width: 10,
    height: 10,
  },
  mainViewStyle: {
    width: '100%',
    height: '100%',
  },
  videoViewStyle: {
    width: WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey3,
  },
  carosalItemStyle: {
    height: '100%',
    width: WIDTH,
  },
});
