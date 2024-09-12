import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
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
  AvatarProps,
} from 'react-native-gifted-chat';
import {SVG} from '../assets';
import {COLORS, HEIGHT, SPACING} from '../theme';
import AppImage from './common/AppImage';
/*
 ** renderSend btn on gifter chat customize Send btn
 */
export const renderSend = (props: SendProps<IMessage>, loading: boolean) => {
  return (
    <Send {...props} disabled={!props.text} containerStyle={styles.sendBtnStyle}>
      {loading ? (
        <ActivityIndicator size='small' color={COLORS.background} />
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
  return <InputToolbar {...props} containerStyle={[styles.inputToolBarStyle]} />;
};
/*
 ** render composer in tool bar bottom
 */
export const renderComposer = (props: ComposerProps) => (
  <Composer {...props} textInputStyle={styles.composerStyle} composerHeight={45} />
);
/*
 ** Custom component to render below the MessageContainer (separate from the ListView)
 */
export const renderChatFooter = (loading: boolean, color: string) => {
  return loading ? <ActivityIndicator size='small' color={color} /> : null;
};

/*
 ** render tool bar at bottom
 */
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
 ** Render avatar for user
 */
export const renderAvatar = (props: AvatarProps<IMessage>) => {
  const {currentMessage} = props;
  if (currentMessage?.user?.profileImage) {
    return <AppImage source={{uri: currentMessage?.user?.profileImage}} style={styles.avatarStyle} />;
  } else {
    return <SVG.UserIcon fill={COLORS.text} width={35} height={35} />;
  }
};
/*
 ** Render bubble component
 */
export const renderBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {marginVertical: 5},
        right: {marginVertical: 5},
      }}
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
  avatarStyle: {
    borderRadius: 50,
    height: 35,
    width: 35,
  },
  composerStyle: {
    backgroundColor: COLORS.header,
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.xs,
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
