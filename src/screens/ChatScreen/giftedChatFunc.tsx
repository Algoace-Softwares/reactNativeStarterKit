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
import {SVG} from '../../assets';
import {COLORS} from '../../theme';
import styles from './style';
/*
 ** renderSend btn on gifter chat customize Send btn
 */
export const renderSend = (props: SendProps<IMessage>) => {
  return (
    <Send {...props} disabled={!props.text} containerStyle={styles.sendBtnStyle}>
      <SVG.sendIcon fill={COLORS.background} />
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
  console.log('🚀 ~ renderBubble ~ props:', props);
  const {currentMessage} = props;
  console.log('🚀 ~ renderBubble ~ currentMessage:', currentMessage);
  // Destructure currentMessage and add a new property
  const modifiedMessage = {
    ...currentMessage,
    text: currentMessage?.message as unknown as string,
    user: currentMessage?.sender as unknown as string,
  };
  return (
    <Bubble
      {...props}
      currentMessage={modifiedMessage}
      // renderMessageText={() => {
      //   return <Text style={{color: 'green'}}>hello wolrd</Text>;
      // }}
      // renderTime={() => <Text>Time</Text>}
      // renderTicks={() => <Text>Ticks</Text>}
      containerStyle={{
        left: {borderColor: 'teal', borderWidth: 8},
        right: {},
      }}
      wrapperStyle={{
        left: {borderColor: 'tomato', borderWidth: 4},
        right: {},
      }}
      bottomContainerStyle={{
        left: {borderColor: 'purple', borderWidth: 4},
        right: {},
      }}
      tickStyle={{}}
      usernameStyle={{color: 'tomato', fontWeight: '100'}}
      containerToNextStyle={{
        left: {borderColor: 'navy', borderWidth: 4},
        right: {},
      }}
      containerToPreviousStyle={{
        left: {borderColor: 'mediumorchid', borderWidth: 4},
        right: {},
      }}
    />
  );
};
