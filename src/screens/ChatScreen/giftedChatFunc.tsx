import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Send, InputToolbar, Actions, LoadEarlier, Bubble, MessageImage} from 'react-native-gifted-chat';
import {COLORS, ICONS} from '../../assets';
import styles from './styles';
import {LABELS} from '../../labels';
import {downloadFile} from '../../utils';
/*
 ** renderSend btn on gifter chat customize Send btn
 */
export const renderSend = props => {
  return (
    <Send {...props} containerStyle={styles.sendBtnStyle}>
      <ICONS.SendMessageIcon />
    </Send>
  );
};
/*
 ** render tool bar at bottom
 */
export const renderToolBar = props => {
  return <InputToolbar {...props} containerStyle={styles.inputToolBarStyle} />;
};
/*
 ** render tool bar at bottom
 */
export const renderLeftSideBtn = (props, callbck) => {
  return (
    <Actions
      {...props}
      icon={() => <ICONS.FileUploadIcon />}
      options={{
        'Choose File From Library': () => callbck(),
        Cancel: () => console.log('document picker cancel'),
      }}
      optionTintColor={'#222B45'}
    />
  );
};
/*
 ** custom loading earlir componenet
 */
export const customLoadEarlierBtn = ({props}: {props: object}) => {
  return (
    <View style={styles.loadEarlierMainView}>
      <View style={styles.encryptedMsgView}>
        <Text style={styles.encryptedMsgTextStyle}>{LABELS.encryptionMsg}</Text>
      </View>
      <LoadEarlier {...props} />
    </View>
  );
};
/*
 ** Render message container
 */
export const renderMessageContainer = (props: any) => {
  return (
    <MessageImage
      {...props}
      lightboxProps={{
        disabled: true,
      }}
    />
  );
};

interface renderBubbleType {
  props: any;
  convId: string;
  userId: string;
  callBck: (option: number) => void;
}

// render bubble component
export const renderBubble = (props, userId, convId) => {
  const currentMessage = props?.currentMessage;
  if (currentMessage?.msgType === 'audioCallMessage') {
    return (
      <Bubble
        {...props}
        onLongPress={() => <></>}
        onPress={() => <></>}
        renderCustomView={() => {
          return (
            <View style={styles.customViewStyle}>
              <ICONS.AudioCallIcon color={COLORS.white} width={80} height={80} />
              {currentMessage?.user?._id === userId?.toLowerCase() ? (
                <Text style={{color: COLORS.white}}>{'You made a voice call'}</Text>
              ) : (
                <Text
                  style={{
                    color: COLORS.white,
                  }}>{`${currentMessage?.user?.name}\n  called you`}</Text>
              )}
            </View>
          );
        }}
        wrapperStyle={{
          left: styles.bubbleLeftStyle,
          right: styles.bubbleRightStyle,
        }}
      />
    );
  } else if (currentMessage?.msgType === 'file') {
    return (
      <Bubble
        {...props}
        onLongPress={() => <></>}
        onPress={() => <></>}
        renderCustomView={() => {
          return (
            <TouchableOpacity
              style={styles.customViewStyle}
              onPress={() => {
                downloadFile(currentMessage?.remoteUrl as string, currentMessage.fileName);
              }}>
              <ICONS.FileIcon color={COLORS.white} width={66} height={70} />
              <View style={styles.downloadIconStyle(convId, currentMessage.user._id)}>
                <ICONS.DownloadIcon color={currentMessage.user._id === convId ? COLORS.grey5 : COLORS.darkGrey} />
              </View>
            </TouchableOpacity>
          );
        }}
        wrapperStyle={{
          left: styles.bubbleLeftStyle,
          right: styles.bubbleRightStyle,
        }}
      />
    );
  } else {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: styles.bubbleTextStyle,
          right: styles.bubbleTextStyle,
        }}
        wrapperStyle={{
          left: styles.bubbleLeftStyle,
          right: styles.bubbleRightStyle,
        }}
      />
    );
  }
};
