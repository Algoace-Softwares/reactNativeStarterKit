import React from 'react';
import {
  Send,
  InputToolbar,
  Bubble,
  SendProps,
  IMessage,
  InputToolbarProps,
  Composer,
  BubbleProps,
  ComposerProps,
  Actions,
  ActionsProps,
} from 'react-native-gifted-chat';
import {SVG} from '../assets';
import {COLORS, HEIGHT, SPACING} from '../theme';
import {ActivityIndicator, StyleSheet} from 'react-native';

/*
 ** renderSend btn on gifter chat customize Send btn
 */
export const renderSend = (props: SendProps<IMessage>, loading: boolean) => {
  return (
    <Send {...props} disabled={!props.text} containerStyle={styles.sendBtnStyle}>
      {loading ? (
        <ActivityIndicator size='small' color={COLORS.palette.black} />
      ) : (
        <SVG.sendIcon fill={COLORS.background} />
      )}
    </Send>
  );
};
/*
 ** render tool bar at bottom
 */
export const renderToolBar = (props: InputToolbarProps<IMessage>) => {
  return <InputToolbar {...props} containerStyle={[styles.inputToolBarStyle, {}]} />;
};
/*
 ** render composer in tool bar bottom
 */
export const renderComposer = (props: ComposerProps) => (
  <Composer {...props} textInputStyle={styles.composerStyle} composerHeight={45} />
);
/*
 ** render tool bar at bottom
//  */
export const renderActions = (props: ActionsProps) => (
  <Actions
    {...props}
    containerStyle={styles.actionsStyle}
    icon={() => <SVG.uploadIcon width={30} height={30} />}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor='#222B45'
  />
);
/*
 ** Render message container
 */
// export const renderMessageContainer = (props: any) => {
//   return (
//     <MessageImage
//       {...props}
//       lightboxProps={{
//         disabled: true,
//       }}
//     />
//   );
// };

// render bubble component
export const renderBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      // renderMessageText={() => {
      //   return <Text style={{color: 'green'}}>hello wolrd</Text>;
      // }}
      // renderTime={() => <Text>Time</Text>}
      // renderTicks={() => <Text>Ticks</Text>}
      // containerStyle={{
      //   left: {},
      //   right: {},
      // }}
      wrapperStyle={{
        left: {marginVertical: 5},
        right: {marginVertical: 5},
      }}
      // bottomContainerStyle={{
      //   left: {borderColor: 'purple', borderWidth: 4},
      //   right: {},
      // }}
      // tickStyle={{}}
      // usernameStyle={{color: 'tomato', fontWeight: '100'}}
      // containerToNextStyle={{
      //   left: {borderColor: 'navy', borderWidth: 4},
      //   right: {},
      // }}
      // containerToPreviousStyle={{
      //   left: {borderColor: 'mediumorchid', borderWidth: 4},
      //   right: {},
      // }}
    />
  );
};

const styles = StyleSheet.create({
  actionsStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    marginTop: SPACING.xs,
  },

  composerStyle: {
    backgroundColor: COLORS.header,
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: 12,
  },
  inputToolBarStyle: {
    height: HEIGHT * 0.1,
    maxHeight: 100,
  },

  sendBtnStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    marginHorizontal: SPACING.xs,
    width: 44,
  },
});
